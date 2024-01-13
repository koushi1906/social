import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GET_PROFILE_SUCCESS, GET_PROFILE_REQUEST, GET_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS, SEARCH_USER_SUCCESS} from './auth.actionType'

const initialState = {
    jwt: null,
    error:null,
    loading:false,
    user: null,
    searchUser: []
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
            return {...state, loading:true, error:null}

        case GET_PROFILE_SUCCESS:
            return {...state, user:action.payload, error:null, loading:false}
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user:{...state.user, firstName: action.payload.firstName, lastName: action.payload.lastName}}
        case SEARCH_USER_SUCCESS:
            return {...state, searchUser: action.payload, loading:false, error:null}

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {...state, jwt:action.payload, loading:false, error:null}
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case GET_PROFILE_FAILURE:
            return {...state, loading:false, error:action.payload}
    
        default:
            return state;
    }
}