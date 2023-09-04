import { Link, Route, Routes } from "react-router-dom";
// import "./HomeLogged.scss";
import { useContext } from "react";
import { StoreContext } from "../store/storeProvider";
import Reservation from "./Reservation";
import AddAvailabilityDate from "./AddAvailabilityDate";

function HomeLogged() {
  const { user } = useContext(StoreContext);

  return (
    <div className="home__container">
      <h1>ZALOGOWANY</h1>
      <Link to={"/reservation"}>Reserve</Link>
      <Link to={"/scheduled"}>Schedule</Link>
      <div className="nav">{/* <AsideNav /> */}</div>
      {/* <div className="content">{content}</div> */}
    </div>
  );
}

export default HomeLogged;
