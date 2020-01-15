import React, { Component } from 'react'
import Order from '../../../../lib/order';
import CheckoutProperties from './checkoutProperties';
import CheckoutState from './checkoutState';
import Toast from 'react-bootstrap/Toast';
import Router, { withRouter, RouteComponentProps } from 'react-router';

class Checkout extends Component<RouteComponentProps &CheckoutProperties,CheckoutState> {
    emailRef:any;
    firstnameRef:any;
    lastnameRef:any;
    order:Order;


    constructor(props:any){
        super(props);
        this.emailRef = React.createRef();
        this.firstnameRef = React.createRef();
        this.lastnameRef = React.createRef();
        this.order = new Order();
        this.state = {buttonDisabled: true,toastMessage: "", showToast:false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handleInputChange() {
        var order = new Order();
        order.firstname = this.firstnameRef.current.value;
        order.lastname = this.lastnameRef.current.value;
        order.email = this.emailRef.current.value;

        if(order.isValid()){
            this.setState({buttonDisabled:false});
            this.order = order;
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitData}>
                    <label htmlFor="firstname">Firstname</label>
                    <input 
                        onKeyUp={this.handleInputChange}
                        ref={this.firstnameRef}
                        placeholder="Firstname"
                        name="firstname"
                        type="text"
                        id="firstname"/>
                    <label htmlFor="lastname">Lastname</label>
                    <input 
                        onKeyUp={this.handleInputChange}
                        ref={this.lastnameRef} 
                        placeholder="Lastname"
                        name="lastname" 
                        type="text" 
                        id="lastname"/>
                    <label htmlFor="emailAddress">E-Mail</label>
                    <input 
                        onKeyUp={this.handleInputChange}
                        ref={this.emailRef}
                        pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" 
                        name="email" 
                        type="email" 
                        id="emailAddress"
                    />
                    <input disabled={this.state.buttonDisabled} type="submit" ></input>
                </form>
                <Toast show={this.state.showToast} onClose={() =>{return this.setState({showToast:false})} } autohide={true} delay={3000} animation={false}>
                    <Toast.Body>{this.state.toastMessage}</Toast.Body>
                </Toast>
            </div>
        )
    }

    async submitData(event:any){
        event.preventDefault();
        var order:Order = this.order;
        await fetch('/api/shoppingCart/checkout', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(async res =>{
            if(res.ok){
                await this.props.onCartChange();
                this.props.history.push('');
                
            }else if(res.status == 400){
                this.setState({showToast: true,toastMessage: await res.text()})
            }else{
                this.setState({showToast: true, toastMessage:""})
            }
        }).catch(err =>{
                this.setState({showToast: true, toastMessage:"There was a problem submitting your data. Please try again in a moment."});
                console.error(err);
        })
    }


}

export default withRouter(Checkout);