import { categoryActionsType } from "../actions/action_types";

const initState = {
    categories: null,
    loading: false,
    error: null
}

const catReducer = (state = initState, action) => {
    console.log(action.type);
    switch (action.type) {
        case categoryActionsType.REQUIRE_CATEGORIES:
            state = {
                ...state,
                loading: true
            };
            break;
        case categoryActionsType.LOAD_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload,
                loading: false
            };
            break;
        case categoryActionsType.LOAD_CATEGORIES_FAIL:
            state = {
                ...initState,
                ...action.payload,
                loading: false
            };
            break;
        case categoryActionsType.REQUEST_ADD_CATEGORY:
            state = {
                ...state,
                loading: true
            };
            break;

        case categoryActionsType.ADD_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false
            };
            break;
        default:
    }
    return state;
}

export default catReducer;