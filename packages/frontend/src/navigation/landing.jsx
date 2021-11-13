import './../App.css';
import React from "react";

// import NodesImg from "./nodes.svg";


export default () => {
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/nodes.svg"} width="60%" />
      <h1>Find drive thru food fast.</h1>
      <form>
        <input type="text" value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} />
        <input type="submit" />
      </form>
    </div>
  );
}