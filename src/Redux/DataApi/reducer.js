
const initState = { selectedProduct: [] }

export const getDataReducer = (state = initState, action) => {
    switch (action.type) {


        case "SELECT_PRODUCT":
            return {
                ...state,
                selectedProduct: action.payload
            }

        default:
            return state;
    }

}
