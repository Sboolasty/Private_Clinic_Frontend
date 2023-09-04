// import { Router } from "react-router-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { StoreContext } from "./store/storeProvider";
import HomeLogged from "./components/HomeLogged";
import Home from "./components/Home";
import { useContext } from "react";
import AddAvailabilityDate from "./components/AddAvailabilityDate";
import ScheduledAppointments from "./components/ScheduledAppointments";
import Reservation from "./components/Reservation";
import AirPollution from "./components/AirPollution";

function App() {
  const { user } = useContext(StoreContext);

  const content =
    user?.role === "PATIENT" ? (
      <>
        <Route exact path="/reservation" element={<Reservation />}></Route>
        <Route
          path="/scheduled"
          exact
          element={<ScheduledAppointments />}
        ></Route>
      </>
    ) : (
      <>
        <Route
          path="/addAvailability"
          exact
          element={<AddAvailabilityDate />}
        ></Route>
        <Route
          path="/scheduled"
          exact
          element={<ScheduledAppointments />}
        ></Route>
      </>
    );
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route exact path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route path="/" element={user ? <HomeLogged /> : <Home />}></Route>
            {user ? content : null}
            <Route path="*" element={<h2>NOT FOUND 404</h2>} />
          </Routes>
        </main>
        <AirPollution />
      </div>
    </BrowserRouter>
  );
}

export default App;
