import { BiUserCircle } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";

function SideNav({ isVisible, setIsVisible }) {
  const activeStyle =
    "font-bold underline underline-offset-[5px] decoration-[#ffa060] text-[#eeeeee]";

  return (
    <div
      className={`${
        isVisible ? "translate-x-0" : "translate-x-[100%]"
      } flex p-10 gap-5 flex-col min-h-[100vh] w-[66%]  fixed z-10 top-0 right-0 bg-neutral-700 duration-[0.5s] text-[1.3rem]`}
    >
      <Link
        to="/account"
        onClick={() => setIsVisible(false)}
        className="flex items-center justify-between hover:cursor-pointer text-[#eeeeee] hover:font-bold"
      >
        Account
        <BiUserCircle className="text-[2rem] hover:cursor-pointer hover:text-[#eeeeee]" />
      </Link>
      <NavLink
        to="/"
        onClick={() => setIsVisible(false)}
        className={({ isActive }) =>
          isActive ? activeStyle : "hover:font-bold text-[#eeeeee]"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/watchlist"
        onClick={() => setIsVisible(false)}
        className={({ isActive }) =>
          isActive ? activeStyle : "hover:font-bold text-[#eeeeee]"
        }
      >
        Watchlist
      </NavLink>
    </div>
  );
}

export default SideNav;
