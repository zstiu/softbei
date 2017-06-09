import { CALL_API, Schemas } from '../middleware/api'
import 'whatwg-fetch';
import { browserHistory } from 'react-router'
import config from '../../config.js'
const rootUrl = "http://" + config.apiUrl



const fetchManager = (name, password) => {

    // const rootUrl = "http://localhost:3001";

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


//以下实现登录
const loginManager = (name, password) => {

    // const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/manager/signIn";

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

            let data = json.data

            if (json.success) {
                let action = {
                        type: "loginManager",
                        // name: json.data.name,
                        // managerId: json.data.managerId,
                        // token: json.data.token
                        data
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


    })



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



const signUpManager = (name, password, confirmPassword, email, phone) => {

    // const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/manager/signUp";

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                confirmPassword: confirmPassword,
                email: email,
                phone: phone
            })
        }).then(function(response) {
            console.log("response: " + response);
            return response.json()
        }).then(function(json) {

            let data = json.data

            if (json.success) {
                let action = {
                        type: "signUpManager",
                        // name: json.data.name,
                        // managerId: json.data.managerId,
                        // token: json.data.token
                        data
                    }
                    // console.log(action);

                resolve(action);
            } else {
                let action = {
                    type: "signUpFail",
                    errorMessage: json.message
                }
                console.log(action);
                resolve(action);
            }

        })


    })



}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const signUpAction = (name, password, confirmPassword, email, phone) =>
    (dispatch, getState) => {

        console.log("signUpManager...");
        // let loginResultAction = loginManager(name, password);
        signUpManager(name, password, confirmPassword, email, phone).then(function(action) {
            // if (action.token) {
            //     browserHistory.push(`/manager`)
            // } else {

            // }
            return dispatch(action);
        })


    }



const updateManager = (name, email, phone) => {

    // const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/manager/signIn";

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                // password: password,
            })
        }).then(function(response) {
            console.log("response: " + response);
            return response.json()
        }).then(function(json) {

            let data = json.data

            if (json.success) {
                let action = {
                        type: "loginManager",
                        // name: json.data.name,
                        // managerId: json.data.managerId,
                        // token: json.data.token
                        data
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


    })



}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const updateAction = (name, email, phone) =>
    (dispatch, getState) => {

        console.log("updateManager...");
        // let loginResultAction = loginManager(name, password);
        updateManager(name, email, phone).then(function(action) {
            // if (action.token) {
            //     browserHistory.push(`/manager`)
            // } else {

            // }
            return dispatch(action);
        })


    }




//以下实现获取picture完成情况
const getPictureInfo = (id) => {

    // const rootUrl = "http://localhost:3001";

    let url = rootUrl + "/manager/getAllPictureInfo";

    return new Promise((resolve, reject) => {

        fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                managerId: id
            })
        }).then(function(response) {
            console.log("response: " + response);
            return response.json()
        }).then(function(json) {

            let data = json.data

            if (json.success) {
                let action = {
                        type: "pictureInfo",
                        // name: json.data.name,
                        // managerId: json.data.managerId,
                        // token: json.data.token
                        data
                    }
                    // console.log(action);

                resolve(action);
                // browserHistory.push(`/show`);
            } else {
                let action = {
                    type: "pictureInfoFail",
                    errorMessage: json.message
                }
                console.log(action);
                resolve(action);
            }

        })


    })



}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const getPictureInfoAction = (id) =>
    (dispatch, getState) => {

        // console.log("getManager...");
        // let loginResultAction = loginManager(name, password);
        getPictureInfo(id).then(function(action) {
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