import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Landing from "./navigation/landing";
import Search from './navigation/Search';
import Map from "./navigation/Map";

// ... or just import the browser history singleton instance.
import history from 'history/browser';
// Alternatively, if you're using hash history import
// the hash history singleton instance.
// import history from 'history/hash';
// Get the current location.
let location = history.location;


export default function App() {
  // console.log(location)
  return (
<Router history={history}>
      <div>
        <nav>
          <Link to="/">Landing</Link>
          <Link to="/search?q=In-N">Search</Link>
          <Link to="/users">Users</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={ <Landing />} />
          <Route path="/search" element={ <Search />} />
          <Route path="/map" element={ <Map />} />

          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
