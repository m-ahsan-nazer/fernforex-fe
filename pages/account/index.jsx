import React, {useEffect, useState, Component} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'font-awesome/css/font-awesome.min.css';
import NavBarUser from "/components/navbaruser";
import User, {readUserInfoFromStorage } from "/beapi/users";

const orderCard = (amount, cardKey, currency, currencies, disabled, 
    inputName, label, onInputChange, onSelectChange, selectName
    )=>{
    return (
        <div className="card-body  bg-light border rounded border-secondary mb-4 " key={cardKey}>
            <label htmlFor={inputName} className="form-label"><h5>{label}</h5></label>
            <div className="input-group">
                <input
                    className="form-control m-2"
                    disabled={disabled}
                    id={inputName}
                    name={inputName}
                    onChange={onInputChange}
                    type="text"
                    value={amount} 
                />
                <select
                    className="form-select m-2"
                    disabled={disabled}
                    name={selectName}
                    value={currency}
                    onChange={onSelectChange}
                >
                    {currencies.map(currency=>(
                        <option
                            key ={currency}
                            value={currency}
                        >
                            {currency}
                        </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}

class CreateOrderForm extends Component{
    constructor(props){
        super();
        this.state = {
            haveAmount: 100,
            haveCurrency: 'NZD',
            wantAmount: 95,
            wantCurrency: 'AUD',
            currencies:  "NZD,AUD,EUR,USD,CAD,CNY,KRW".split(","),
            orderCreationMessage: "",
        }
    }
    async createOrder(haveCur, haveAmount, wantCur, wantAmount){
        try{
            const orderBody = {have: haveCur.toLowerCase(), haveAmount, want: wantCur.toLowerCase(), wantAmount};
            const res = await this.props.user.createUserOrder(orderBody);
            if (res.status == 201){
                //returns order body
                // const resData = await res.json();
                this.props.setOrderCreationMessage(<div className="alert alert-success mt-2 ">Your order was created</div>);
                this.setState({orderCreationMessage: <div className="alert alert-success mt-2 ">Your order was created</div>});
            }
        }
        catch(err){
            console.log("(Bad stuff) catching all else!");
        }
    }
    handleInputChange = (e)=>{
        e.preventDefault();
        const inputName = e.currentTarget.name;
        const value = e.currentTarget.value;
        this.setState({[inputName]: value});
    }
    handleSelectChange = (e)=>{
        e.preventDefault();
        const selectName = e.currentTarget.name;
        const option = e.currentTarget.value;
        this.setState({[selectName]: option});
    }
    handleClick = (e)=>{
        e.preventDefault();
        const {haveCurrency, haveAmount, wantCurrency, wantAmount} = {...this.state};
        this.createOrder(haveCurrency, haveAmount, wantCurrency, wantAmount);
    }
    componentDidUpdate(){
        if (this.state.orderCreationMessage !== ''){
            setTimeout( ()=>this.setState({orderCreationMessage: ""}), 4000);
        }
    }
    render(){
        const disabled = !this.props.user.user.isEmailVerified;
        return(
        <div key="newOrderForm" className="bg-white border border-dark rounded m-2 p-2 col col-md-6 ">
            {
            orderCard(
            this.state.haveAmount, 'haveAmount', this.state.haveCurrency, this.state.currencies, disabled, 
            'haveAmount', 'I have', this.handleInputChange, this.handleSelectChange, 'haveCurrency')
            }
            {
            orderCard(
            this.state.wantAmount, 'wantAmount', this.state.wantCurrency, this.state.currencies, disabled, 
            'wantAmount', 'I want', this.handleInputChange, this.handleSelectChange, 'wantCurrency')
            }
            <div><button className="btn btn-info border border-dark"  disabled={disabled}
            onClick={this.handleClick}>Create Order
            </button></div>
            {this.state.orderCreationMessage}
        </div>)
            }
}

function getTableRow(order, key, wrapInButton ){
    let id = order.id;
    if (wrapInButton){
        id =  [
                <div key="manageOrder">
                 <Link href={{pathname: "/account/manageorder",
                              query: {id: order.id}
                                }}>
                 <a>Manage Order</a>
                 </Link> 
                 </div>
  ]

    }
    return  (<tr key={key}> 
    <td className="">{order.have}</td>
    <td className="">{order.haveAmount}</td>
    <td className="">{order.want}</td>
    <td className="">{order.wantAmount}</td>
    <td className="">{id}</td>
    </tr>)
}

async function getOrderTable(orders, tableName, wrapInButton ){
        let i=0;
        const ordersTable = orders.map(order => {
            i+=1;
            return getTableRow(order, i, wrapInButton )
        });
        return(<table className="table table-hover table-sm" key={tableName}>
            <thead><tr key="headRow">
            <th className="">have</th>
            <th className="">Amount</th>
            <th className="">want</th>
            <th className="">Amount</th>
            <th className="">Order (id)</th>
            </tr></thead>
            <tbody>{ordersTable}</tbody> 
            </table>
        )
}

function setOrdersHeading(displayedOrders){
    switch(displayedOrders){
                case 'myOrders':
                    return <h4>Pending Orders</h4>
                case 'myCancelledOrders':
                    return <h4>Cancelled Orders</h4>
                case 'myPastOrders':
                    return <h4>Past Orders</h4>
            }
}

// export default function AccountPage(){
function AccountPage(){
    async function getMyOrders(user){
        const res = await user.getUserOrders();
        const resData = await res.json();
        return resData;
    }

    const {user, tokens} = readUserInfoFromStorage();
    const me = new User(user, tokens);
    const [myOrders, setMyOrders] = useState('');
    const [orderCreationMessage, setOrderCreationMessage] = useState('');
    const [myCancelledOrders, setMyCancelledOrders] = useState('');
    const [myPastOrders, setMyPastOrders] = useState('');
    const [displayedOrders, setDisplayedOrders] = useState('myOrders');
    const allOrders = {myOrders, myCancelledOrders, myPastOrders};

    useEffect(async ()=> {
        const {orders} = await getMyOrders(me);
        setMyOrders(await getOrderTable(orders.pendingOrders, "pending", true ));
        setMyCancelledOrders(await getOrderTable(orders.cancelledOrders, "cancelled"));
        setMyPastOrders(await getOrderTable(orders.pastOrders, "past"));

    },
    [orderCreationMessage]
    );

    return(
        <>
        <Head>
            <title>Account</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <NavBarUser/>
        <div className="container mt-5 mb-5">
        <h2>Profile</h2>
        <div className="container bg-light mt-4 mb-4 p-2">
        <p><b>User name</b>: {user.name}</p>
        <p><b>Email</b>: {user.email}</p>
        <p><b>Rating</b>:  
            &nbsp;<i className="fa fa-smile-o fa-lg text-success"  aria-hidden="true"> 0 </i>
            &nbsp;<i className="fa fa-meh-o fa-lg text-primary"  aria-hidden="true"> 0 </i>
            &nbsp;<i className="fa fa-frown-o fa-lg text-danger"  aria-hidden="true"> 0</i>
        </p>
        </div>
        <h2>Create a new order</h2>
        <div className="container mb-4" id="newOrder">
            {user.isEmailVerified == false && 
            <div className="alert alert-danger m-2">An email has been dispatched to your email account. 
                You can not transact until you have verified your email account. 
            </div>
            }
        </div>
        <CreateOrderForm user={me} setOrderCreationMessage={setOrderCreationMessage}/>
        <h2>My transactions</h2>
        <div className="container mb-4" id="transactions">
        <nav key="orderStatusPages"><ul className="pagination">
               <li className="page-item"><a className="page-link " href="#" onClick={(e)=>{e.preventDefault();setDisplayedOrders("myOrders"); 
               }}>Pending Orders</a></li>
               <li className="page-item"><a className="page-link" href="#" onClick={(e)=>{e.preventDefault(); setDisplayedOrders("myCancelledOrders");
               }}>Cancelled Orders</a></li>
               <li className="page-item"><a className="page-link" href="#" onClick={(e)=>{e.preventDefault(); setDisplayedOrders("myPastOrders");
               }}>Past Orders</a></li>
        </ul></nav>
        <div id="displayedOrders">
            {setOrdersHeading(displayedOrders)}
            {allOrders[displayedOrders]}
        </div>
        </div>
        <div>
        </div>
        
        </div>
        </>
    )
}

export default dynamic(()=> Promise.resolve(AccountPage), {ssr: false});