import { PiFilmSlateLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideNav from "./SideNav";
import { useState } from "react";

function Header() {
  const [isVisible, setIsVisible] = useState(false);

  const activeStyle = "font-bold border-b-[2px] border-white";
  const location = useLocation();

  return (
    <header className="relative bg-[#ffa060] px-[1.2em] py-[2.5em]">
      <div className=" flex items-center justify-between text-[#383838]">
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

        <div>
          <nav className={`hidden items-center gap-5 min-[550px]:flex`}>
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
            <Link to="/account">
              <BiUserCircle className="text-[2rem] hover:cursor-pointer hover:text-[#eeeeee]" />
            </Link>
          </nav>
          <GiHamburgerMenu
            onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}
            className="text-[1.5rem] min-[550px]:hidden"
          />
        </div>
      </div>
      <SideNav
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {location.pathname === "/" && <SearchBar />}
    </header>
  );
}

export default Header;
