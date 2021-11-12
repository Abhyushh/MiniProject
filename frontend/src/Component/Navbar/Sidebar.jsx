import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="container">
      <section className="sidebar-topics">
        <NavLink exact to="/" className="item" activeClassName="active">
          <span>Home</span>
        </NavLink>

        <NavLink exact to="/discover" className="item" activeClassName="active">
          <span>Discover</span>
        </NavLink>
      </section>

      <section className="sidebar-library">
        <h4>Your Library</h4>
        <NavLink exact to="/albums" className="item" activeClassName="active">
          <span>Albums</span>
        </NavLink>

        <NavLink exact to="/artists" className="item" activeClassName="active">
          <span>Artists</span>
        </NavLink>

        <NavLink exact to="/songs" className="item" activeClassName="active">
          <span>Songs</span>
        </NavLink>

        <NavLink exact to="/playlists" className="item" activeClassName="active">
          <span>Playlists</span>
        </NavLink>
      </section>
    </div>
  );
};

export default Sidebar;
