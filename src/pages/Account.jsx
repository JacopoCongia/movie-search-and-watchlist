import { Link } from "react-router-dom";
import SignIn from "../components/SignIn";
import useAuth from "../../hooks/use-auth";
import useWatchlist from "../../hooks/use-watchlist";

function Account() {
  const { setWatchlist } = useWatchlist();
  const { currentUser, logOut } = useAuth();

  function handleLogOut() {
    logOut();
    setWatchlist([]);
  }

  return (
    <>
      <div className="flex flex-col items-center mt-[3em] gap-[1.5em]">
        {currentUser ? (
          <>
            <h1 className="text-green-500 text-[1.3rem]">{`Logged in as ${currentUser.email}`}</h1>
            <button
              onClick={handleLogOut}
              className="text-white border px-5 py-1 rounded bg-red-700 hover:bg-red-500"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <SignIn />
            <div className="flex gap-3 text-white">
              <h1>Don&#39;t have an account yet?</h1>
              <Link
                to="/register"
                className="text-[#ffa060] hover:font-bold hover:underline"
              >
                Sign up here!
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Account;
