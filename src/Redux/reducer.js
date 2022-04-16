import { DELETE_ID } from "./action";

const initState = { token: "", data: [] }

export const deleteReducer = (store = initState, { type, payload }) => {
    switch (type) {
        case DELETE_ID:
            return {
                ...store,
                token: payload,
                data: payload
            }
        default:
            return store;
    }

} 