export const useGetUserID = () => {
    const userID = window.localStorage.getItem("userID");
    const username = window.localStorage.getItem("username");
    
    return [userID, username];
};
