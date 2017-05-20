import { CALL_API, Schemas } from '../middleware/api'
import 'whatwg-fetch';
import { browserHistory } from 'react-router'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
    [CALL_API]: {
        types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
        endpoint: `users/${login}`,
        schema: Schemas.USER
    }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchUser(login))
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
    [CALL_API]: {
        types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
        endpoint: `repos/${fullName}`,
        schema: Schemas.REPO
    }
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
    const repo = getState().entities.repos[fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchRepo(fullName))
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
    login,
    [CALL_API]: {
        types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.REPO_ARRAY
    }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `users/${login}/starred`,
            pageCount = 0
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStarred(login, nextPageUrl))
}

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
    fullName,
    [CALL_API]: {
        types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.USER_ARRAY
    }
})

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `repos/${fullName}/stargazers`,
            pageCount = 0
    } = getState().pagination.stargazersByRepo[fullName] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStargazers(fullName, nextPageUrl))
}


const fetchManager = (name, password) => {

    const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/api/manager/signIn";

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {

            let action = {
                type: "getManager",
                name: json.data.name,
                managerId: json.data.managerId
            }
            console.log(action);
            resolve(action);
        })


        // window.fetch(_url, fetchParams)
        //     .then((response) => {
        //         return response.json();
        //     }).then((result) => {
        //         resolve(result)
        //     }).catch((err) => {
        //         reject(err)
        //     })
    })



    // return {
    //     type: "getManager",
    //     name: name,
    //     managerId: managerId
    // }

}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const getManager = (name, password) => (dispatch, getState) => {

    console.log("getManager...");
    fetchManager(name, password).then(function(action) {
            return dispatch(action);
        })
        // return dispatch(fetchManager(name, managerId))
}


const loginManager = (name, password) => {

    const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/api/manager/signIn";

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
            })
        }).then(function(response) {
            console.log("response: " + response);
            return response.json()
        }).then(function(json) {

            if (json.success) {
                let action = {
                        type: "loginManager",
                        name: json.data.name,
                        managerId: json.data.managerId,
                        token: json.data.token
                    }
                    // console.log(action);

                resolve(action);
                browserHistory.push(`/manager`);
            } else {
                let action = {
                    type: "loginFail",
                    errorMessage: json.message
                }
                console.log(action);
                resolve(action);
            }

        })


        // window.fetch(_url, fetchParams)
        //     .then((response) => {
        //         return response.json();
        //     }).then((result) => {
        //         resolve(result)
        //     }).catch((err) => {
        //         reject(err)
        //     })
    })



    // return {
    //     type: "getManager",
    //     name: name,
    //     managerId: managerId
    // }

}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loginAction = (name, password) =>
    (dispatch, getState) => {

        console.log("getManager...");
        // let loginResultAction = loginManager(name, password);
        loginManager(name, password).then(function(action) {
            // if (action.token) {
            //     browserHistory.push(`/manager`)
            // } else {

            // }
            return dispatch(action);
        })


    }


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})