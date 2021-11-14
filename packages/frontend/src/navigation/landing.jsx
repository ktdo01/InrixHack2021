import './../App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import NodesImg from "./nodes.svg";


export default () => {
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/nodes.svg"} width="60%" />
      <h1>Find drive thru food fast.</h1>
      <form>
        <input type="text" value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} />
        <Link to={"/search?q=" + search}>Find</Link>
      </form>
    </div>
  );
}