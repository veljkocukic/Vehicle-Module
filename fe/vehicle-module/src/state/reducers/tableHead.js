export const tableHeadReducer = (state=[],action)=>{

    if(action.type==="TABLEHEAD"){
        return action.payload
    }
    return state

}