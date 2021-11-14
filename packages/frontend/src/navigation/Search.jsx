import "./../App.css";
import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import history from "history/browser";
import { createPath } from "history";
import axios from "axios";
import cx from "./../utils/axios";

// Props:
// IProps: {
//    query: String; // Deprecated!
// }

export default (props) => {
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
    if (e.target.value.length === 0) {
      return setSuggestions([]);
    }
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
          
        {suggestions && suggestions.length !== 0
          ? <fieldset style={{ position: 'relative', top: -5, left: '2em', fontSize: '1.3em', width: '55%', border: '3px solid #2B2B45', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
            {suggestions.map((suggestion, i) => {
              return suggestion.text ? <div className="hover-me"><input type='radio' name={"suggestion"} style={{padding:'0.5em', display: 'none' }} onClick={() => { setSearch(suggestion.text); handleSearch(); }} key={i} id={"suggestion-" + i} /><label className="hover-me" htmlFor={"suggestion-" + i}>{suggestion.text}</label></div> : null;
            })}
            </fieldset>
          : null}

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
              return <li key={i}><Link to={"/map?lat=" + business.coordinates.latitude + "&lng=" + business.coordinates.longitude + "&q=" + business.name}>{business.name ? business.name : null}</Link></li>;
            })
          : null}
      </ul>
    </div>
  );
};
