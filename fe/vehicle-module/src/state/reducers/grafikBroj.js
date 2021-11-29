export const grafikBrojReducer = (state = 1, action) => {

    if (action.type === "BROJ") {
        return action.payload
    }
    return state


}
