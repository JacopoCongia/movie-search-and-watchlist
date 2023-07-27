import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";

function Bookmark({ inWatchlist, handleRemove, handleAdd, movie }) {
  return (
    <>
      {inWatchlist ? (
        <MdBookmarkRemove
          onClick={(e) => handleRemove(e, movie)}
          className={`absolute right-[3%] top-[2%] text-[2rem] hover:text-red-500 `}
        ></MdBookmarkRemove>
      ) : (
        <MdBookmarkAdd
          onClick={(e) => handleAdd(e, movie)}
          className={`absolute right-[3%] top-[2%] text-[2rem] drop-shadow hover:text-green-500`}
        ></MdBookmarkAdd>
      )}
    </>
  );
}

export default Bookmark;
