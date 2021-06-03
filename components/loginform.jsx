import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';
import {withRouter} from 'next/router';
import Form from "./form";
import Input from "./input";
import {be} from "/config/config.js";

class LoginForm extends Form{
    constructor(){
        super();
        this.state.data = {email: "", password: "", };
        this.state.errors = {};
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }),
            password: Joi.string().min(2).max(30).required(),
        };
        this.schema = schema;
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        const body = { 
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        const res = await fetch(
            be.auth.login,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        if (res.status === 200){
            const userObj = await res.json();
            this.setState({errors: {}});
            sessionStorage.setItem('user', JSON.stringify(userObj.user));
            sessionStorage.setItem('tokens', JSON.stringify(userObj.tokens));
            this.props.router.push({
                pathname: "/account", 
                query: {
                    ding: "dong",
                    user: JSON.stringify(userObj.user),
                    tokens: JSON.stringify(userObj.tokens)
                }
            });
        }else{
            const error = await res.json();
            this.setState({errors: error});
        }

    }

    render() {
        return(
            <div>
                <h5>Login Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={true}
                           error={this.state.errors.email}/>
                    <Input value={this.state.data.password} onChange={this.handleChange} name="password" label={"Password"} type="password"
                           error={this.state.errors.password}/>
                    {this.submit("Sign in")}
                    {this.state.errors.message && <div className="alert alert-danger m-2">{this.state.errors.message}</div> }
                </form>
            </div>
        );
    }
}

// export default LoginForm;
export default withRouter(LoginForm);

