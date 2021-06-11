import React, {Component} from 'react';
import Joi from '../node_modules/joi-browser';
import Form from "./form";
import Input from "./input";
import TextArea from "./textarea";
import User from "/beapi/users";


class ContactForm extends Form{
    constructor(){
        super();
        this.state.data = {email: "", lastName: "lastname", message: "", messageTitle: "", name: ""};
        this.state.errors = {};
        this.state.messageSent = false;
        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            lastName: Joi.string().max(10),
            message: Joi.string().min(30).max(500).required(),
            messageTitle: Joi.string().regex(/^[a-zA-Z]/).min(3).max(50).required(),
            name: Joi.string().regex(/^[a-zA-Z]/).min(3).max(50).required(),
        };
        this.schema = schema;
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await User.contact(
            e.currentTarget.email.value,
            e.currentTarget.message.value,
            e.currentTarget.messageTitle.value,
            e.currentTarget.name.value,
        ) 
        try{
            if (res.status === 204){
                this.setState({errors: {}, messageSent: true});
            }else{
                const error = await res.json();
                this.setState({errors: error});
            }
        }catch(err){
            console.log("catching all left over errors: ", err);
        }
    }

    render() {
        return(
            <div>
                <h5>Contact Form</h5>
                <form onSubmit={this.handleSubmit}>
                    <div className="d-none">
                    <Input value={this.state.data.lastName} onChange={this.handleChange} name="lastName" label={"lastName"} autoFocus={false}
                           error={this.state.errors.lastName}/>
                    </div>
                    <Input value={this.state.data.name} onChange={this.handleChange} name="name" label={"Name"} autoFocus={true}
                           error={this.state.errors.name}/>
                    <Input value={this.state.data.email} onChange={this.handleChange} name="email" label={"Email"} autoFocus={false}
                           error={this.state.errors.email}/>
                    <Input value={this.state.data.messageTitle} onChange={this.handleChange} name="messageTitle" label={"Message Title"} autoFocus={false}
                           error={this.state.errors.messageTitle}/>
                    <TextArea value={this.state.data.message} onChange={this.handleChange} name="message" label={"Your Message"} autoFocus={false}
                           error={this.state.errors.message} rows={5}/>
                    {this.submit("Submit")}
                    {
                    this.state.errors.message && 
                    <div className="alert alert-danger m-2">{this.state.errors.message}</div> 
                    }
                    {
                    this.state.messageSent && 
                    <div className="alert alert-success m-2">
                        Your message was successfully sent! We will be in touch.
                    </div>
                    }
                </form>
            </div>
        );
    }
}

export default ContactForm;
