import { grafikImeReducer } from "./grafikIme";
import { grafikBrojReducer } from "./grafikBroj";
import { combineReducers } from "redux";



export const allReducers = combineReducers({
    grafikImeReducer, grafikBrojReducer
})