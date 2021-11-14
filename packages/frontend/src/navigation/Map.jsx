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
    await cx.get("/hi").then((res) => {
      console.log(res);
    });
    setShortcut(true);
  }

  React.useEffect(() => {
    setSearch()
  }, []);

console.log(history.location)
  return (
    <div>
      Map!
    </div>
  );
}