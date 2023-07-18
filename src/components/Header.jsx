import { PiFilmSlateLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = "font-bold border-b-[2px] border-white";

  return (
    <header className="bg-[#F1B63F] flex items-center py-[2em] px-[1.2em]">
      <PiFilmSlateLight className="text-[2.3rem] ml-3" />
      <h1 className="text-[2rem]">moviesearch.</h1>
      <nav className="flex ml-auto gap-3 flex-col items-end min-[500px]:flex-row">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeStyle : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? activeStyle : "")}
        >
          Watchlist
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
