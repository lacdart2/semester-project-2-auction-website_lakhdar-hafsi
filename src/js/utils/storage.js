const tokenKey = "token";
const userKey = "profile";
const creditKey = "credit";


export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey);
}
/*******/


export function saveCredit(credit) {
    saveToStorage(creditKey, credit);
}

export function getCredit() {
    return getFromStorage(creditKey);
}

/********/



export function saveUser(profile) {
    saveToStorage(userKey, profile);
}

export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.name;
    }

    return null;
}

/*******/

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return [];
    }

    return JSON.parse(value);
}
export function remove(key) {
    localStorage.removeItem(key);
}