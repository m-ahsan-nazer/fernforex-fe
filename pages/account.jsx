
import { INSPECT_MAX_BYTES } from 'joi-browser';
import React, {useEffect, useState} from 'react';
import NavBarUser from "/components/navbaruser";
import User from "/beapi/users";

function getTableRow(order, key){
    return  (<tr key={key}> 
    <td className="bg-primary">{order.have}</td>
    <td className="bg-primary">{order.haveAmount}</td>
    <td className="bg-secondary">{order.want}</td>
    <td className="bg-secondary">{order.wantAmount}</td>
    <td className="bg-info">{order.id}</td>
    </tr>)
}

async function getOrderTable(orders, tableName){
        let i=0;
        const ordersTable = orders.map(order => {
            i+=1;
            return getTableRow(order, i)
        });
        return(<table className="table table-hover table-sm" key={tableName}>
            <thead><tr key="headRow">
            <th className="bg-primary">have</th>
            <th className="bg-primary">Amount</th>
            <th className="bg-secondary">want</th>
            <th className="bg-secondary">Amount</th>
            <th className="bg-info">Order id</th>
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
export default function AccountPage(props){
    // console.log("props: ", props);
    // console.log("props.router: ", props.router);
    // const ruser = JSON.parse(props.query.user);
    // const rtokens= JSON.parse(props.query.tokens);
    // console.log("props.user: ", ruser);
    // console.log("props.tokens: ", rtokens);
    async function getMyOrders(user){
        const res = await user.getUserOrders();
        const resData = await res.json();
        return resData;
    }
    const tokens = JSON.parse(sessionStorage.getItem('tokens'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    const me = new User(user, tokens);
    const [myOrders, setMyOrders] = useState('');
    const [myCancelledOrders, setMyCancelledOrders] = useState('');
    const [myPastOrders, setMyPastOrders] = useState('');
    const [displayedOrders, setDisplayedOrders] = useState('myOrders');
    const allOrders = {myOrders, myCancelledOrders, myPastOrders};

    useEffect(async ()=> {
        const {orders} = await getMyOrders(me);
        setMyOrders(await getOrderTable(orders.pendingOrders, "pending"));
        setMyCancelledOrders(await getOrderTable(orders.cancelledOrders, "cancelled"));
        setMyPastOrders(await getOrderTable(orders.pastOrders, "past"));
    },
    []
    );

    async function paginate(){
        return(<nav key="orderStatusPages"><ul className="pagination">
               <li className="page-item"><a className="page-link" href="#">Pending Orders</a></li>
               <li className="page-item"><a className="page-link" href="#">Cancelled Orders</a></li>
               <li className="page-item"><a className="page-link" href="#">Past Orders</a></li>
            </ul></nav>)
    }

    const curList = "NZD,AUD,EUR,USD,CAD,CNY,KRW".split(",");
    const [buyCur, setBuyCur] = useState(curList);
    const [buyValue, setBuyValue] = useState('AUD')
    const [sellCur, setSellCur] = useState(curList);
    const [sellValue, setSellValue] = useState('NZD');
    const [buyAmount, setBuyAmount] = useState(100);
    const [sellAmount, setSellAmount] = useState(100);

    return(
        <>
        <NavBarUser/>
        <div className="container mt-5 mb-5">
        <h2>Profile</h2>
        <div className="container bg-light mt-4 mb-4 p-2">
        <p>My username is {user.name}</p>
        <p>My email is {user.email}</p>
        <p>My rating is ...</p>
        </div>
        <h2>Create a new order</h2>
        <div className="container mb-4" id="newOrder">
            {user.isEmailVerified == false && 
            <div className="alert alert-danger m-2">An email has been dispatched to your email account. 
                You can not transact until you have verified your email account. 
            </div>
            }
            <div className="card-body col col-md-6 bg-light border rounded border-dark mb-4">
                <div className="card-title"><h5>I want </h5></div>
                <div className="input-group">
                <input value={buyAmount} 
                onChange={e=> setBuyAmount(e.currentTarget.value)} 
                className="form-control m-2"
                />
            <select
                disabled={!user.isEmailVerified}
                value={buyValue}
                onChange={ e=> setBuyValue(e.currentTarget.value)}
                className="form-select m-2"
            >
                {buyCur.map( curr=> (
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
            <div className="card-body col col-md-6 bg-light border rounded border-dark">
                <div className="card-title"><h5>I have</h5></div>
                <div className="input-group">
                 <input value={sellAmount} 
                onChange={e=> setSellAmount(e.currentTarget.value)} 
                className="form-control m-2"
                />
            <select
                disabled={!user.isEmailVerified}
                value={sellValue}
                onChange={ e=> setSellValue(e.currentTarget.value)}
                className="form-select m-2"
            >
                {sellCur.map( curr=> (
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
        {/* <div id="pendingOrders"> <h4>Pending Orders</h4> { myOrders } </div> */}
        {/* <div id="cancelledOrders"> <h4>Cancelled Orders</h4> { myCancelledOrders } </div> */}
        {/* <div id="pastOrders"><h4>Past Orders</h4>{ myPastOrders } </div> */}
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