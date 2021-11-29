import { grafikImeReducer } from "./grafikIme";
import { grafikBrojReducer } from "./grafikBroj";
import { smallTableReducer } from "./smallTable"
import { combineReducers } from "redux";



export const allReducers = combineReducers({
    grafikImeReducer, grafikBrojReducer, smallTableReducer
})