import { authActionsType } from "../actions/action_types";

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

const authReducer = (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case authActionsType.REQUEST_LOGIN:
            state = {
                ...state,
                authenticating: true
            };
            break;

        case authActionsType.LOGIN_SUCCESS:
            state = {
                ...state,
                ...action.payload,
                authenticating: false,
                authenticate: true
            };
            break;

        case authActionsType.LOGIN_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
            }
            break;

        default:
    }
    return state;
}

export default authReducer;