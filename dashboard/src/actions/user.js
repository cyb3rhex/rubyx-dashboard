import axios from 'axios'
import { GET_USER } from '../constants/user';

export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts/');
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_USER_ERROR,
            payload: err
        })
    }
}