import { useContext } from "react";
import SearchContext from "../context/searchContext";

function useSearch() {
  return useContext(SearchContext);
}

export default useSearch;
