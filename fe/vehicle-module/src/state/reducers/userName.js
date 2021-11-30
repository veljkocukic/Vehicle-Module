export const userNameReducer = (state="",action) =>{
    if(action.type ==="LOGINNAME"){
        return action.payload
    }
    return state
}