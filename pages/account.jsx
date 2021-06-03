
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
    useEffect(async ()=> {
        const orders = await getMyOrders(me);
        let i=0;
        const ordersTable = orders.map(order => {
            i+=1;
            // return <div key={i}>{order.haveAmount}</div>
            return getTableRow(order, i)
        });
        setMyOrders(<table className="table table-hover table-sm">
            <thead><tr key="headRow">
            <th className="bg-primary">have</th>
            <th className="bg-primary">Amount</th>
            <th className="bg-secondary">want</th>
            <th className="bg-secondary">Amount</th>
            <th className="bg-info">Order id</th>
            </tr></thead>
            <tbody>{ordersTable}</tbody> 
            </table>);
    },
    []
    );
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
        <h1>Profile</h1>
        <div className="container bg-light mt-4 mb-4 p-2">
        <p>My name is {user.name}</p>
        <p>My email is {user.email}</p>
        <p>My rating is ...</p>
        </div>
        <h2>Create a new order</h2>
        <div>
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
        <h3>My transactions</h3>
        { 
        myOrders 
        }
        </div>
        </>
    )
}