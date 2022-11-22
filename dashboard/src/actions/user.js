import API from './api'
import { LOGIN, LOGIN_ERROR, LOGOUT, LOGOUT_ERROR } from '../constants/user';

export const login = (email, pass) => async dispatch => {
    try {
        var data = {
            "email": email,
            "pass": pass
        }

        API.login(data).then(user => {
            dispatch({
                type: LOGIN,
                payload: user
            })
        }).catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err
            })
        })

        
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR,
            payload: err
        })
    }
}

export const logout = () => async dispatch => {
    API.logout().then(res => {
        dispatch({
            type: LOGOUT
        })
    })
}