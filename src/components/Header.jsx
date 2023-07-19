import { PiFilmSlateLight } from "react-icons/pi";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = "font-bold border-b-[2px] border-white";

  return (
    <header className="flex items-center justify-between bg-[#F1B63F] px-[1.2em] py-[2.5em]">
      <div className="relative flex select-none items-center">
        <PiFilmSlateLight className="ml-3 text-[2.3rem]" />
        <h1 className="text-[2rem]">moviesearch.</h1>
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
    </header>
  );
}

export default Header;
