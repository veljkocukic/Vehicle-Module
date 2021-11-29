export const smallTableReducer = (state = false, action) => {
    if (action.type === "ON") {
        return true
    }
    return false
}