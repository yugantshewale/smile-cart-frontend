import { NavLink, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";

const App = () => (
  <>
    <div className="flex space-x-3">
      <NavLink exact activeClassName="underline text-green-600" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline text-green-600" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} />
    </Switch>
  </>
);
export default App;
