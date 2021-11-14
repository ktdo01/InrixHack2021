import './../App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import history from 'history/browser';
import {createPath} from "history";
import axios from 'axios';
import cx from './../utils/axios';

// Props:
// IProps: {
//    query: String;
// }


export default (props) => {
    // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const [search, setSearch] = React.useState(query.get("q"));
  const [shortcut, setShortcut] = React.useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    let path = createPath({ pathname: '/search', search: '?q=' + search });
    // history.push(path);
    
    setShortcut(true);
  }

  React.useEffect(() => {
    setSearch(history.location.search)
  }, []);

console.log(history.location)
  return (
    <div>
      
      <form style={{display: "flex", alignItems: "center"}} onSubmit={handleSearch}>
        <input type="text" className="search-bar" placeholder="Search for restaurant" value={search} onChange={(e) => {e.preventDefault(); setSearch(e.target.value)}} />
        <button type="submit" style={{background: "none", border: "none"}}>
          <img src={process.env.PUBLIC_URL + "/icons/search.svg"} />
        </button>
      </form>
      { shortcut ? (
        <div>
          <Link to="/map">In-N-Out</Link>
        </div>
      ) : <></> }
    </div>
  );
}