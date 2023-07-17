import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
            path="watchlist"
            element={<Watchlist />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
