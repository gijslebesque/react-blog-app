import React, { Component } from 'react';
import AuthService from '../authenticate.js';
import history from '../History';

class Logout extends Component {
   
    constructor(props){
       super(props)
       this.state = {
            message:"",
            user:{}
       }
        this.service = new AuthService();
        this.service.loggedin().then(res=>{
            this.setState({user:res});
         });
    }

    handleLogout = e => {
      e.preventDefault();
        this.service.logout()
          .then( res => {
          this.setState({message:res.message});
        })
        .catch( err => console.log(err));
    }

    render() {
    
        if(this.state.message){
            return (
                <h1>{this.state.message}</h1>
            );
        }
        else if(!this.state.user.username){
            return (
                <div>
                    <h1>Would you like to login?</h1>     
                    <section>
                        <button className='lined thick' onClick={ () => history.push("/")}>Home</button>
                    </section>
               </div>
            ); 
        }

        else{
            return (
                <div>
                    <h1>Would you like to logout, {this.state.user.username}?</h1>     
                    <section>
                        <button className='lined thick' onClick={e => {this.handleLogout(e)}}>Logout</button>
                    </section>
               </div>
            );
        }
    }
}



export default Logout;