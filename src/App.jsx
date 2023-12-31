import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Layout from "./components/Layout";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Account from "./pages/Account";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="/:id"
        element={<MovieDetail />}
      />
      <Route
        path="/watchlist"
        element={<Watchlist />}
      />
      <Route
        path="/account"
        element={<Account />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
