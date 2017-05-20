// import * as ActionTypes from '../actions'
// import merge from 'lodash/merge'
// import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { browserHistory } from 'react-router'


const defaultState = {
    isLogin: false,
    name: "zstiu",
    managerId: "9"

};

// Updates an entity cache in response to any action with response.entities.
// const entities = (state = { users: {}, repos: {} }, action) => {
//     if (action.response && action.response.entities) {
//         return merge({}, state, action.response.entities)
//     }

//     return state
// }

// Updates an entity cache in response to any action with response.entities.
// const start = (state = defaultState, action) => {
//     if (action.response && action.response.entities) {
//         return merge({}, state, action.response.entities)
//     }

//     return state
// }

// Updates error message to notify about the failed fetches.
// const errorMessage = (state = null, action) => {
//     const { type, error } = action

//     if (type === ActionTypes.RESET_ERROR_MESSAGE) {
//         return null
//     } else if (error) {
//         return error
//     }

//     return state
// }

const manager = (state = defaultState, action) => {
    const { type } = action

    console.log("type = " + type);

    switch (action.type) {
        case "getManager":
            let name = action.name;
            // name: action.name,
            let managerId = action.managerId
            console.log("name = " + name);
            console.log("managerId = " + managerId);
            let newState = {
                isLogin: true,
                name: name,
                managerId: managerId
            }
            console.log(newState);
            return newState;

        case "loginManager":
            newState = {
                isLogin: true,
                name: action.data.name,
                managerId: action.data.managerId,
                token: action.data.token,
                email: action.data.email || "未绑定",
                created_time: action.data.created_time,
                phone: action.data.phone || "未绑定"
            };
            // browserHistory.push(`/manager`);
            console.log("newState:" + newState);
            return newState;

        case "loginFail":
            // let name = action.name;
            // // name: action.name,
            // let managerId = action.managerId
            // console.log("name = " + name);
            // console.log("managerId = " + managerId);
            newState = {
                isLogin: false,
                errorMessage: action.errorMessage
            }
            return newState;

        default:
            return state
    }


    // if (action.type === "getManager") {


    //     // let result = merge({}, state, name, managerId);
    //     let result = {
    //         name: name,
    //         managerId: managerId
    //     }
    //     console.log("state = " + result);
    //     return result;
    // }
    // console.log("return old state")
    // return state
}

// Updates the pagination data for different actions.
// const pagination = combineReducers({
//     starredByUser: paginate({
//         mapActionToKey: action => action.login,
//         types: [
//             ActionTypes.STARRED_REQUEST,
//             ActionTypes.STARRED_SUCCESS,
//             ActionTypes.STARRED_FAILURE
//         ]
//     }),
//     stargazersByRepo: paginate({
//         mapActionToKey: action => action.fullName,
//         types: [
//             ActionTypes.STARGAZERS_REQUEST,
//             ActionTypes.STARGAZERS_SUCCESS,
//             ActionTypes.STARGAZERS_FAILURE
//         ]
//     })
// })

const rootReducer = combineReducers({
    // entities,
    manager,
    // pagination,
    // errorMessage,
    routing
})

export default rootReducer