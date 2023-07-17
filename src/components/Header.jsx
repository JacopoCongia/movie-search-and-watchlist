import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = "font-bold border-b-2 border-white";

  return (
    <header className="bg-[#F1B63F] flex justify-between items-baseline p-[3em]">
      <h1 className="text-[2rem] font-bold">Movie Search</h1>
      <nav className="flex gap-3 flex-col items-end min-[500px]:flex-row">
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
