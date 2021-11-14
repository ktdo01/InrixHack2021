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
      <div class = "Divider">
        <img src={process.env.PUBLIC_URL + "/Nodes and Divider.svg"} width="60%" />
        <img src={process.env.PUBLIC_URL + "/Person.svg"} width="20%" />
      </div>

      <br></br>

      <div class = "Tagline">
        <h1>Find </h1>
        <h1>drivethru </h1>
        <h1>food fast.</h1>
      </div>
    
      <div class = "Dynamic-Searchbar">
          
          <input type="text" value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} />
          <Link to={"/search?query=" + search}>
            <img src={process.env.PUBLIC_URL + "/SearchButton.svg"}/>
          </Link>

      </div>
      
    </div>
  );
}