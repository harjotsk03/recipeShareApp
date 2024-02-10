import React, { useState } from "react";
import axios from "axios";

const UpdateUsernameForm = ({ userID }) => {
    const [newUsername, setNewUsername] = useState("");

    const handleUsernameChange = (event) => {
        setNewUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put("http://localhost:3001/user/update-username", {
                userID,
                newUsername,
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating username:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={newUsername} onChange={handleUsernameChange} />
            <button type="submit">Update Username</button>
        </form>
    );
};

export default UpdateUsernameForm;
