import { PiFilmSlateLight } from "react-icons/pi";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

function Header() {
  const activeStyle = "font-bold border-b-[2px] border-white";
  const location = useLocation();

  return (
    <header className=" relative  bg-[#F1B63F] px-[1.2em] py-[2.5em]">
      <div className=" flex items-center justify-between">
        <div className="relative flex select-none items-center">
          <PiFilmSlateLight className="ml-3 text-[2.3rem]" />
          <Link
            to="/"
            className="text-[2rem]"
          >
            moviesearch.
          </Link>
          <p className="absolute bottom-[-0.5em] right-0 text-[0.85rem]">
            by jako
          </p>
        </div>
        <nav className={`flex flex-col items-end gap-3 min-[500px]:flex-row`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:font-bold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? activeStyle : "hover:font-bold"
            }
          >
            Watchlist
          </NavLink>
        </nav>
      </div>
      {location.pathname === "/" && <SearchBar />}
    </header>
  );
}

export default Header;
