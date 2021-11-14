import "./../App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import history from "history/browser";
import { createPath } from "history";
import axios from "axios";
import cx from "./../utils/axios";

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
  const [shortcut, setShortcut] = React.useState(true);
  const [businesses, setBusinesses] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  const handleChangeInput = async (e) => {
    setSearch(e.target.value);
    let path = createPath({ pathname: "/search", search: encodeURI("?q=" +  e.target.value) });
    history.push(path);
    await cx
      .get("/suggestion", { params: { search } })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuggestions(res.data)
        }
      })
      .catch(console.log);
  }

  const handleSearch = async () => {
    await cx
      .get("/business", { params: { search } })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setBusinesses(res.data)
        }
      })
      .catch(console.log);


    setShortcut(true);
  };

  React.useEffect(() => {
    setSearch(query.get("q"));
  }, []);

  console.log(history.location);
  return (
    <div>
      <form
        style={{ display: "flex", alignItems: "center" }}
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
      >
        <div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for restaurant"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              handleChangeInput(e)
            }}
          />
          <select style={{ width: '60%', border: '3px solid black', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
          {suggestions
            ? suggestions.map((suggestion, i) => {
                return suggestion.text ? <option onClick={() => { setSearch(suggestion.text); handleSearch(); }} key={i}>{suggestion.text}</option> : null;
              })
            : null}
          </select>
        </div>
        <button type="submit" style={{ background: "none", border: "none" }}>
          <img src={process.env.PUBLIC_URL + "/icons/search.svg"} />
        </button>
      </form>
      
      {shortcut ? (
        <div>
          <Link to="/map">In-N-Out</Link>
        </div>
      ) : (
        <></>
      )}
      <ul>
        {businesses
          ? businesses.map((business, i) => {
              return <li key={i}>{business.name ? business.name : null}</li>;
            })
          : null}
      </ul>
    </div>
  );
};
