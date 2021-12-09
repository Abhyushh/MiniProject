import React from "react";
import UserDetails from "../UserDetails";
import TrackSearch from "../TrackSearch";
import "./Header.css";

const Header = () => (
  <div className="header">
    <TrackSearch /><br /><br />
    <UserDetails /><br /><br />
  </div>
);


export default Header;
