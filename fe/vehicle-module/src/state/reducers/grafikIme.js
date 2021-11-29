export const grafikImeReducer = (state = "", action) => {

    if (action.type === "IME") {
        return action.payload
    } else {
        return state
    }


}
