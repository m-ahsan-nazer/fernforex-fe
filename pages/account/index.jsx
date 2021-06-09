import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'font-awesome/css/font-awesome.min.css';
import NavBarUser from "/components/navbaruser";
import User, {readUserInfoFromStorage } from "/beapi/users";

function getTableRow(order, key, wrapInButton ){
    let id = order.id;
    if (wrapInButton){
        id =  [
                <div key="manageOrder">
                 <Link href={{pathname: "/account/manageorder",
                              query: {...order}
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
    const [myCancelledOrders, setMyCancelledOrders] = useState('');
    const [myPastOrders, setMyPastOrders] = useState('');
    const [displayedOrders, setDisplayedOrders] = useState('myOrders');
    const allOrders = {myOrders, myCancelledOrders, myPastOrders};

    const curList = "NZD,AUD,EUR,USD,CAD,CNY,KRW".split(",");
    const [haveCurList, setHaveCurList] = useState(curList);
    const [haveCur, setHaveCur] = useState('NZD')
    const [haveAmount, setHaveAmount] = useState(100);
    const [wantCurList, setWantCurList] = useState(curList);
    const [wantCur, setWantCur] = useState('AUD')
    const [wantAmount, setWantAmount] = useState(100);
    const [orderCreationMessage, setOrderCreationMessage ] = useState('');

    useEffect(async ()=> {
        const {orders} = await getMyOrders(me);
        setMyOrders(await getOrderTable(orders.pendingOrders, "pending", true ));
        setMyCancelledOrders(await getOrderTable(orders.cancelledOrders, "cancelled"));
        setMyPastOrders(await getOrderTable(orders.pastOrders, "past"));

        if (orderCreationMessage !== ''){
            setTimeout( ()=>setOrderCreationMessage(""), 4000);
        }
    },
    [orderCreationMessage]
    );

    async function paginate(){
        return(<nav key="orderStatusPages"><ul className="pagination">
               <li className="page-item"><a className="page-link" href="#">Pending Orders</a></li>
               <li className="page-item"><a className="page-link" href="#">Cancelled Orders</a></li>
               <li className="page-item"><a className="page-link" href="#">Past Orders</a></li>
            </ul></nav>)
    }

    function getNewOrderForm(){
        const haveCard = <div className="card-body  bg-light border rounded border-secondary mb-4 " key="haveCard">
            <div className="card-title"><h5>I have</h5></div>
            <div className="input-group">
                <input value={haveAmount} 
                onChange={e=> setHaveAmount(e.currentTarget.value)} 
                className="form-control m-2"
                />
            <select 
            disabled={!user.isEmailVerified}
            value={haveCur}
            onChange={ e=> setHaveCur(e.currentTarget.value)}
            className="form-select m-2"
            >
                {haveCurList.map( curr=> (
                <option
                key = {curr}
                value={curr}
                >
                    {curr}
                </option>
                ))}
            </select>
            </div>
            </div>
        const wantCard = <div className="card-body bg-light border rounded border-secondary mb-4" key="wantCard">
            <div className="card-title"><h5>I want </h5></div>
            <div className="input-group">
                <input value={wantAmount} 
                onChange={e=> setWantAmount(e.currentTarget.value)} 
                className="form-control m-2"
                />
            <select 
            disabled={!user.isEmailVerified}
            value={wantCur}
            onChange={ e=> setWantCur(e.currentTarget.value)}
            className="form-select m-2"
            >
                {wantCurList.map( curr=> (
                <option
                key = {curr}
                value={curr}
                >
                    {curr}
                </option>
                ))}
            </select>
            </div>
            </div>
        return(<div key="newOrderForm" className="bg-white border border-dark rounded m-2 p-2 col col-md-6 ">
            {haveCard}
            {wantCard}
            <div><button className="btn btn-info border border-dark"  disabled={!user.isEmailVerified }
            onClick={(e)=>{
                e.preventDefault();
                createOrder(haveCur, haveAmount, wantCur, wantAmount);
                }}>Create Order
            </button></div>
            {orderCreationMessage}
        </div>)
    }
    
    async function createOrder(haveCur, haveAmount, wantCur, wantAmount){
        const orderBody = {have: haveCur.toLowerCase(), haveAmount, want: wantCur.toLowerCase(), wantAmount};
        console.log("order details: ", haveAmount)
        const res = await me.createUserOrder(orderBody);
        if (res.status == 201){
            const resData = await res.json();
            setOrderCreationMessage(<div className="alert alert-danger mt-2 ">Your order was created</div>
            );
        console.log("Order creation was: ", resData);
        }
    }

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
            {getNewOrderForm()}
        </div>
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