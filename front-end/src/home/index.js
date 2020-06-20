import React, { Fragment } from "react";
import EventList from "./../event/EventList/index.js";

export default function Home() {
  return window.sessionStorage.getItem("auth") &&
    JSON.parse(window.sessionStorage.getItem("auth")).isLoggedIn ? (
    <EventList />
  ) : (
    <div>Home</div>
  );
}
