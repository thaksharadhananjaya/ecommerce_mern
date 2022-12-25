import { authActionsType } from "./action_types"
import axiosInstance from "../helpers/axios"

export const login = (user) => {
    //console.log(user);

    return async (dispatch) => {
        dispatch({
            type: authActionsType.REQUEST_LOGIN,
        });

        try {
            const response = await axiosInstance.post('admin/signin', user);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authActionsType.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                });
            } else {
                dispatch({
                    type: authActionsType.LOGIN_FAILURE,
                    payload: {
                        error: 'Failed to login'
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: authActionsType.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }

    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authActionsType.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authActionsType.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}
