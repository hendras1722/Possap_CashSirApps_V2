const initialState = {
    categorys: [],
    isLoading: false

}

const category = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {


        case 'GET_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_CATEGORY_FULFILLED':
            return {
                ...state,
                categorys: action.payload.data.result
            }

        case 'GET_SEARCHCATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_SEARCHCATEGORY_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_SEARCHCATEGORY_FULFILLED':
            return {
                ...state,
                categorys: action.payload.data.result
            }

        case 'POST_POSTCATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_POSTCATEGORY_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_POSTCATEGORY_FULFILLED':
            return {
                categorys: action.payload.data.result
            }

        case 'DELETE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_CATEGORY_FULFILLED':
            const newCategoryAfterDelete = state.categorys.filter(category => category.id !== action.payload.data.result.id);
            return {
                ...state,
                isLoading: false,
                categorys: newCategoryAfterDelete
            }

        case 'UPDATE_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_CATEGORY_FULFILLED':
            return {
                categorys: action.payload.data.result
            }
        default:
            return state;
    }
}

export default category;