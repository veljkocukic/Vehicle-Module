import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import {Main} from "./Main.js"


export const Sadrzaj = () => {
  return (
<Router>
            <Switch>
                <Route path="/" exact><Main /></Route>
            </Switch>
        </Router>
  );
}
