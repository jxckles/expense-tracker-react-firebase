
export const useGetUserInfo = () => {

    const auth = JSON.parse(localStorage.getItem('auth')) || {};

    const {name, profilePhoto, userID, isAuth} = auth;

    return {
        name,
        profilePhoto,
        userID,
        isAuth
    };
}