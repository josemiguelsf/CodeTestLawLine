import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    Button,
    Modal,
    FormGroup,
    FormControl,
    FormLabel
} from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    useHistory
} from "react-router-dom";
import Products from "../components/Products";
import ProductForm from "../components/ProductForm";


export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, setValue, errors } = useForm();
    const [showMsg, setShowMsg] = useState(false);
	const [show, setShow] = useState(true);
	const [showProducts, setShowProducts] = useState(false);
	const [msg, setMsg] = useState();
	const [logged, setLogged] = useState();
    const history = useHistory();
    const [urlApi, setUrlApi] = useState(
        $("#urlApi")
            .text()
            .trim()
    );
    $(".indexSponsor").css("display", "none");
    $(".navbar-collapse").collapse("hide");
    const onSubmit = data => {
        //console.log(data);

        const result = axios
            .post(urlApi + "/api/login", data)
            .then(response => {
                console.log("555555555555555555");
                console.log(response.data);
                console.log("666666666666666666");
                if (response.data == "unauthorized") {
                    setShowMsg(true);
                    //console.log('INVALIDO')

                    setMsg("Invalid Id or Password");
                    //history.push(
                    //	"/avatar/login")
                    //console.log("pushing to login")
                } else {				
					props.loggedUser(response.data);
					//console.log('authorized user')
					//setShowProducts(true)
                 }
             
                //if (response.data.role !== 'superusuario') $('#admin').hide();
            })
            .catch(error => {
                //if (mounted) {
                ////console.log(error);
                //}
            });
    };
    $(".redTitle").hide();
    $(".home-block").hide();
    return (
        <div className="container">
            <div className="row">
                <div className="col-2 col-xl-3 col-lg-2 col-md-6 col-sm-6 offset-5">
                    <img
                        className="loginImg"
                        src={urlApi + "/public/images/login3.jpg"}
                        title="Login"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3">
                    {showMsg && (
                        <p className="alert alert-danger mb-3">{msg}</p>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <FormGroup
                            className="mt-3"
                            controlId="email"
                            bssize="large"
                        >
                            <FormLabel className="formLabel">Email</FormLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                //value={email}
                                //onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                ref={register({ required: true })}
                            />
                        </FormGroup>
                        <FormGroup
                            className="mt-3"
                            controlId="password"
                            bssize="large"
                        >
                            <FormLabel className="formLabel">
                                Password
                            </FormLabel>
                            <FormControl
                                //value={password}
                                //onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                ref={register({ required: true })}
                            />
                        </FormGroup>
                        <div className="row form-group mt-3">
                            <div className="col-md-12">
                                <input
                                    type="submit"
                                    value="Login"
                                    className="btn btn-lg btn-block login-button"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

if (document.getElementById("login")) {
    ReactDOM.render(<Login />, document.getElementById("login"));
}
