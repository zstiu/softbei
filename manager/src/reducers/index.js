// import * as ActionTypes from '../actions'
// import merge from 'lodash/merge'
// import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { browserHistory } from 'react-router'


const defaultManagerState = {
    isLogin: false,
    name: "zstiu",
    managerId: "9"

};

const defaultInfoState = {
    total: "读取中...",
    finished: "读取中..."
};

const manager = (state = defaultManagerState, action) => {
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
                id: action.data.id,
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
            newState = {
                isLogin: false,
                errorMessage: action.errorMessage
            }
            return newState;

        case "signUpManager":
            newState = {
                signUpSuccess: true,
            };
            // browserHistory.push(`/manager`);
            console.log("newState:" + newState);
            return newState;

        case "signUpFail":
            newState = {
                signUpSuccess: false,
                errorMessage: action.errorMessage
            }
            return newState;

        default:
            return state
    }
}


const info = (state = {}, action) => {
    const { type } = action

    console.log("type = " + type);

    switch (action.type) {
        case "pictureInfo":
            let newState = {
                total: action.data.total,
                finished: action.data.finished
            }
            return newState;

        default:
            return state
    }
}




const rootReducer = combineReducers({
    // entities,
    manager,
    info,
    // pagination,
    // errorMessage,
    routing
})

export default rootReducer