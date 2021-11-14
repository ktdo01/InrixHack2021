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

export default function App() {
  return (
<Router>
      <div>
        <nav>
          <Link to="/">Landing</Link>
          <Link to="/search?name=fdsa">Search</Link>
          <Link to="/users">Users</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={ <Landing />} />
          <Route path="/search" element={ <Search />} />

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
