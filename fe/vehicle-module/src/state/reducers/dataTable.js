export const dataTableReducer  = (state=[],action) => {
    if(action.type === "DATATABLE"){
        return action.payload
    }
    return state
}