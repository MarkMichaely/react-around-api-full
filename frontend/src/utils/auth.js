const BASE_URL = "http://localhost:3001";

const customFetch = (url, heasders) => {
    return fetch(url, heasders).then(res => res.ok ? res.json() : Promise.reject(res.statusText));
}



export function register(password, email) {
    return customFetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
    })
        .catch(() => {
            const err = new Error("400 - one of the fields was filled in incorrectly")
            throw err;
        });

}

export const login = (password, email) => {
    return customFetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password, email: email }),
    });
};

export function checkJwt(jwt) {
    if (!jwt) {
        const err = new Error("400 — Token not provided or provided in the wrong format")
        throw err;
    }
    return customFetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Authorization": `Bearer ${jwt}`
        },
    })

        .catch(() => {
            const err = new Error("401 — The provided token is invalid")
            throw err;
        })
}