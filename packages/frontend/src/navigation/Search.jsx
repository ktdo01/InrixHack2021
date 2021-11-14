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
// import NodesImg from "./nodes.svg";

// Props:
// IProps: {
//    query: String;
// }


export default (props) => {
  const [search, setSearch] = React.useState("");
  let params = useParams();


  React.useEffect(() => {

    setSearch(props.query)
  }, []);

  // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/nodes.svg"} width="60%" />
      <h1>Search</h1>
      <p>Topic: {query.get("query")}</p>
      <form>
        <input type="text" value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} />
        <input type="submit" />
      </form>
    </div>
  );
}