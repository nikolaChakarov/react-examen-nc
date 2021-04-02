export const setLocalStorage = (user) => {

    if (!user.token) {
        localStorage.clear();
        return;
    }

    localStorage.setItem('userToken', user.token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
}

export const getLocalStorage = () => {
    return {
        token: localStorage.getItem('userToken'),
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username')
    }
}