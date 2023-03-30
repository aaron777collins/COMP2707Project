import { createTheme } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin/Admin";
import "./App.css";
import Create from "./Create/Create";
import Home from "./Home/Home";
import Loading from "./Loading/Loading";
import Login from "./Login/Login";
import Navigationbar from "./Navbar/Navigationbar";
import NoPage from "./NoPage/NoPage";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Search from "./Search/Search";
import { UserType } from "./Types/UserType";

function App() {
  const urlExtension = getProcessExtension();
  const apiURL = getAPIURL();

  const [user, setUser] = React.useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    token: "",
  } as UserType);

  React.useEffect(() => {
    const user = sessionStorage.getItem("userinfo");
    if (user) {
      setUser(JSON.parse(user));
    }
    console.log(user);
  }, []);

  const [loading, setLoading] = React.useState(false);

  // Home
  // Search
  // Create
  // Admin
  // Profile
  // Login
  // Register
  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar urlExtension={urlExtension} user={user} setUser={setUser} />
        <Loading loading={loading} />
        <Routes>
          <Route path={urlExtension + "/"} element={<Home />} />
          <Route path={urlExtension + "/home"} element={<Home />} />
          <Route path={urlExtension + "/search"} element={<Search />} />
          <Route path={urlExtension + "/create"} element={<Create />} />
          <Route path={urlExtension + "/admin"} element={<Admin />} />
          <Route path={urlExtension + "/profile"} element={<Profile />} />
          <Route
            path={urlExtension + "/login"}
            element={
              <Login
                setLoading={setLoading}
                apiURL={apiURL}
                urlExtension={urlExtension}
                setUser={setUser}
              />
            }
          />
          <Route path={urlExtension + "/register"} element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
function getProcessExtension(): string {
  if (process.env.REACT_APP_DEV === "true") {
    return "";
  } else {
    return "/COMP-2707-W23/project/frontend/build";
  }
}

function getAPIURL(): string {
  if (process.env.REACT_APP_DEV === "true") {
    return "http://localhost:8080";
  } else {
    return "https://colli11s.myweb.cs.uwindsor.ca/COMP-2707-W23/project/backend";
  }
}
