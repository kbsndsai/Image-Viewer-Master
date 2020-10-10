import React, { Component } from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommonClient from "../common/CommonClient";

const commonClient = new CommonClient();

class Controller extends Component {


    render() {

        return (

            // Defining all the routes required for page navigation here
            <Router>
                <div className="main-container">
                    <Route exact path='/' render={(props) => <Login {...props}  />} />
                    <Route exact path='/home' render={(props) => <Home commonClient={commonClient} {...props} />} />
                    <Route exact path='/profile' render={(props) => <Profile commonClient={commonClient} {...props} />} />
                 

                </div>
            </Router>


        )
    }
}

export default Controller;