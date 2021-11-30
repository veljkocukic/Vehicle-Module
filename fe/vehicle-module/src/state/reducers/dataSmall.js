export const dataSmallReducer = (state=[],action) =>{
    
    if(action.type==="DATASMALL"){
        return action.payload
    }
    return state

}