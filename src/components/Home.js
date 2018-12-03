import React, { Component } from 'react';
import history from '../History';
import AuthService from '../authenticate.js';
import Form from './form.jsx'

class Home extends Component {

    constructor(){
        super()
        this.state = {
            login: {
            	username: "",
            	password: "",
            	errorMessage: ""
			},

            register: {
            	username: "",
            	password: "",
            	errorMessage: ""
            },
            loggedInUser: {}
        }
		this.service = new AuthService();
		this.service.loggedin().then(res=>{
			this.setState({loggedInUser:res});
		 });
    }

	handleLogin = e => {
    	e.preventDefault();
    	const {username, password } = this.state.login;
    	this.service.login(username, password)
        	.then( res => {
        		if(!res.message){
            		history.push("/tasks");
            	}            
				else{
					this.setState(prevState => ({
						login: {
							...prevState.login,
							errorMessage: res.message
						}
					}));
				}
        }).catch( err => console.log(err));
	}

	handleRegister = e => {
		e.preventDefault();
    	const {username, password } = this.state.register;
      	this.service.signup(username, password)
			.then( res => {
			
				if(!res.message){
					history.push("/tasks")
				}            
				else{
					this.setState(prevState => ({
						register: {
							...prevState.register,
							errorMessage: res.message
						}
					}))
				}

			}).catch( err => console.log(err));
	}
    
    handleChangeLogin = e => {
        const {name, value} = e.target;
        this.setState(prevState => ({
        	login: {
            	...prevState.login,
            	[name]: value
          	}
      	}));
    }
  
    handleChangeRegister = e => {
      const {name, value} = e.target;
      this.setState(prevState => ({
        register: {
            ...prevState.register,
            [name]: value
        }
    }));
  }

    render() {
  
    	if(!this.state.loggedInUser.username){
			return (
				<div>
					<h1>Welcome!</h1>
					<section> 
						<Form 
							type="Login"
							handleFormSubmit={this.handleLogin}
							handleChange={this.handleChangeLogin}
							username={this.state.login.username}
							password={this.state.login.password}
							errorMessage={this.state.login.errorMessage}
						/>
						<p className="bottom">Or</p>
						<Form 
							type="Register"
							handleFormSubmit={this.handleRegister}
							handleChange={this.handleChangeRegister}
							username={this.state.register.username}
							password={this.state.register.password}
							errorMessage={this.state.register.errorMessage}
						/>
					</section>
				</div>
    		);
   		}
		else {
			return(
				<div>
					<h1>You are home {this.state.loggedInUser.username}!</h1>
					<section>
						<button className="lined thick" onClick={() => history.push("/tasks")}>See tasks</button>
					</section>
				</div>
			);
		}
	}
}

export default Home;