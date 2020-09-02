import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    useHistory
} from "react-router-dom";
import Users from "../components/Users";
import Login from "../components/Login";
import Products from "../components/Products";
import Subscriptions from "../components/Subscriptions";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
export default function Index(props) {
    const [role, setRole] = useState("");
    const [logged, setLogged] = useState({});
    const [showLogin, setShowLogin] = useState(true);
    const [showProducts, setShowProducts] = useState(true);
    const [showSubscriptions, setShowSubscriptions] = useState(true);
    const [urlApi, setUrlApi] = useState(
        $("#urlApi")
            .text()
            .trim() + "/"
    );
    let pathRoute = "/";
    if (
        $("#urlApi")
            .text()
            .trim() == "http://www.localhost/code-test-master"
    ) {
        pathRoute = "/code-test-master/";
    }

    $(".navbar-collapse").collapse("hide");

    const loggedUser = data => {
        setRole(data[0].role);
        setLogged(data[0]);
        if (data[0].role === "admin") setShowProducts(true);
        if (data[0].role === "admin") setShowSubscriptions(true);
        
    };

    return (
        <Router>
            <Navbar
                className="navbar navbar-expand-lg navbar-light bg-light fixed-top navback"
                bg="dark"
                variant="light"
                expand="lg"
                fixed="top"
            >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {role !== "superuser" &&
                            role !== "admin" &&
                            role !== "coordinator" && (
                                <NavLink
                                    className="nav-link"
                                    to={pathRoute + "login"}
                                >
                                    <div>
                                        <img
                                            src={
                                                urlApi +
                                                "/public/images/login3.jpg"
                                            }
                                            title="Login"
                                        />
                                    </div>
                                    <div>Login</div>
                                </NavLink>
                            )}
                        {(role == "superuser" ||
                            role == "admin" ||
                            role == "coordinator") && (
                            <Navbar.Brand
                                className="nav-link"
                                href="home?id=logout"
                            >
                                <div>
                                                                    </div>
                                <div>Logout</div>
                            </Navbar.Brand>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Route
                exact
                path={pathRoute + "usuarios"}
                component={() => <Users data={logged} />}
            />

            <Route
                exact
                path={pathRoute + "dashboard"}
                component={() => <Dashboard data={logged} />}
            />
            <Route
                exact
                path={pathRoute + "login"}
                render={props => <Login {...props} loggedUser={loggedUSER} />}
            />
            <article className="home-block text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-3 formLabel">
                            <h3>Test Code Master</h3>
                            <p className="mt-3"></p>
                        </div>
                    </div>
                    <div className="row mt-4 mb-5">
                        {showLogin && <Login loggedUser={loggedUser} />}
                    </div>

                    <div className="row mt-4 mb-5">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6"></div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6"></div>
                    </div>
                </div>
            </article>
            <div className="row mt-4 mb-5">{showProducts && <Products />}</div>
            <div className="row mt-4 mb-5">{showSubscriptions && <Subscriptions loggedUser = {logged} />}</div>
        </Router>
    );
}

if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}
