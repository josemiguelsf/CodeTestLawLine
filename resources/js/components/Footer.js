import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../components/Login';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown';
//import $ from 'jquery';
//import Popper from 'popper.js';
//import Home from "/home";
//import About from "/about";

export default function Footer() {
	return (
		<Router>
			<footer id="main-footer">
				<div className="row m-0">
					
					<div className="col-lg-8 col-md-4 col-sm-12 text-center mt-4">
						Code Test Master
					</div>
				</div>
			</footer>
		</Router>
	);
}

if (document.getElementById('footer')) {
	ReactDOM.render(<Footer />, document.getElementById('footer'));
}
