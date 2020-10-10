import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';




class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            errorMessage: "dispNone"
        }
    }

    /* Below click handler gets executed after the LOGIN button click */
    loginClickHandler = (e) => {
        /* Mock user id and password used for authentication */
        const username = "User";
        const password = "Pwd";
        /* access token obtained from instagram for making API calls */
        const accessToken = 'IGQVJVbGprbXBiOXUxR0VTV3pPRTRSNzZAfUzE4em5zX0VlMmJzX2hVdmtwaVpxT0dzOGdyNVJkbVYteWM0MjlDTG95YWsyazhIQnJGc09qMGtsODRxdXJhNWtUUk9kTzhKdUxDRGppRWdvdkpGNjE4RVctN3NKeDBCUmk4';

        /* Check whether mandatory fields are filled*/
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username !== "" && this.state.password !== "") {
            if ((this.state.username === username) && (this.state.password === password)) {
                this.setState({ errorMessage: "dispNone" })
                /* Store access token in session storage so that it can be used later for making API calls to instagram */
                sessionStorage.setItem("access-token", accessToken)

                /* Launch home page after successful login */
                this.props.history.push({
                    pathname: `/home`,
                    state: this.state
                });
            }
            else {
                this.setState({ errorMessage: "dispBlock" })
            }


        }



    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {

        const mystyle = {
            minWidth: 280,
            maxWidth: 280,
            left: '40%',
            position: 'absolute',
            top: '15%',
        };





        return (
            <div>
                <Header />



                <Card style={mystyle} >

                    <CardContent >
                        <FormControl >
                            <Typography>LOGIN</Typography>
                        </FormControl><br />
                        <FormControl required>
                            <InputLabel htmlFor="userName">Username</InputLabel>
                            <Input className="textField" id="username" onChange={this.usernameChangeHandler} />
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br />
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input className="textField" id="password" type="password" onChange={this.passwordChangeHandler} />
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText><br />

                            <FormHelperText className={this.state.errorMessage}>
                                <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                            <br />
                        </FormControl>
                        <br />

                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>


                    </CardContent>

                </Card>
            </div>

        )
    }
}

export default Login; 