import { grafikImeReducer } from "./grafikIme";
import { grafikBrojReducer } from "./grafikBroj";
import { smallTableReducer } from "./smallTable"
import { dataSmallReducer } from "./dataSmall";
import { dataTableReducer } from "./dataTable";
import { tableHeadReducer } from "./tableHead";
import { combineReducers } from "redux";



export const allReducers = combineReducers({
    grafikImeReducer, grafikBrojReducer, smallTableReducer,dataSmallReducer,dataTableReducer,tableHeadReducer
})