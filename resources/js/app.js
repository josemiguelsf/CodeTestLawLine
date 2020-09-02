/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
//alert("inside app.js");
//IF ON INDEX.BLADE I LOAD APP.JS WITHOUT THE ASSET() I GET AN ERROR REQUIRE NOT DEFINED
require(__dirname + '/bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
require(__dirname + '/components/Index');
//require('./components/Articulos');
//require('./components/Casos');
require(__dirname + '/components/Footer');

//import Login from "../components/Login";
