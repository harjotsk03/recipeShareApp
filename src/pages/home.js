import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchUsername, setSearchUsername] = useState(""); // State to store the search input
  const [userID, username] = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = async (recipeID) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${recipeID}`);
      setRecipes(recipes.filter(recipe => recipe._id !== recipeID));
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  // Function to filter recipes by username
  const filteredRecipes = recipes.filter(recipe => recipe.username.toLowerCase().includes(searchUsername.toLowerCase()));

  return (
    <div>
      <h1>Recipes</h1>
      {/* Search input field */}
      <input
        type="text"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
        placeholder="Search by username..."
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              {recipe.username === username ? (
                <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
              ) : (
                <div></div>
              )}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
            <p>{recipe.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
