import React, { Component } from 'react';
import Joi from '../node_modules/joi-browser';
import {withRouter} from 'next/router';
import Form from "./form";
import Input from "./input";
import User from "/beapi/users";

class ResetPasswordForm extends Form{
    constructor(){
        super();
        this.state.data = {password: "",  passwordConfirmation: "" };
        this.state.errors = {};
        this.state.success= false;
        const schema = {
            password: Joi.string().min(8).max(30).required(),
            passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
        };
        this.schema = schema;
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await User.resetPassword(
            e.currentTarget.password.value,
            this.props.router.query.token
        ) 
        try{
            if (res.status === 204){
                this.setState({errors: {}, success: true});
            }else{
                const error = await res.json();
                this.setState({errors: error, success: false});
            }
        }catch(err){
            console.log("catching all left over errors: ", err);
        }
    }

    render() {
        return(
            <div>
                <h5>Reset Password Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <Input value={this.state.data.password} onChange={this.handleChange} name="password" label={"Password"} type="password"
                           error={this.state.errors.password}/>
                    <Input value={this.state.data.passwordConfirmation} onChange={this.handleChange} 
                    name="passwordConfirmation"
                           label={"Confirm Password"} type="password"
                           error={this.state.data.password === this.state.data.passwordConfirmation?
                           "": "Passwords don't match"}/>
                    {this.submit("Reset password")}
                    {this.state.errors.message && 
                    <div className="alert alert-danger m-2">{this.state.errors.message}</div> 
                    }
                    {
                    this.state.success && 
                    <div className="alert alert-success m-2">
                        Your password has been reset!
                    </div>
                    }
 
                </form>
            </div>
        );
    }
}

export default withRouter(ResetPasswordForm);

