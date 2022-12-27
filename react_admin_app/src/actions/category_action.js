import { categoryActionsType } from "./action_types";
import axiosInstance from "../helpers/axios";

export const getAllCategories = () => {
    return async (dispatch) => {
        dispatch({ type: categoryActionsType.REQUEST_CATEGORIES });
        try {
            const response = await axiosInstance.get('categories');
            if ((response).status === 200) {
                dispatch(
                    {
                        type: categoryActionsType.LOAD_CATEGORIES_SUCCESS,
                        payload: response.data
                    }
                )
            } else {
                dispatch(
                    {
                        type: categoryActionsType.LOAD_CATEGORIES_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: categoryActionsType.LOAD_CATEGORIES_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

export const addCategory = (category) => {
    return async (dispatch) => {
        dispatch({ type: categoryActionsType.REQUEST_ADD_CATEGORY });
        try {
            const response = await axiosInstance.post('category', category);
            if ((response).status === 201) {
                dispatch(
                    {
                        type: categoryActionsType.ADD_CATEGORY_SUCCESS,
                    }
                )
                dispatch(getAllCategories());
            } else {
                dispatch(
                    {
                        type: categoryActionsType.ADD_CATEGORY_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: categoryActionsType.ADD_CATEGORY_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

