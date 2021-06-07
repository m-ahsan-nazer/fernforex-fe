import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import router from 'next/router';
import NavBarUser from "/components/navbaruser";
import User, {readUserInfoFromStorage, saveUserInfoToStorage} from "/beapi/users";

async function cancelOrder(orderId, user){
    console.log("Cancelling order");
    // const orderBody = {status: -1, have: order.have, haveAmount: order.haveAmount,
    // want: order.want, wantAmount: order.wantAmount};
    const orderBody = {status: -1};
    const res = await user.updateUserOrder(orderId, orderBody);
    console.log("res: ", res);
    if (res.status == 200){
        const resData = await res.json();
        console.log(<div className="alert alert-danger">Your order with id={orderId} was cancelled</div>);
        // setTimeout(
        // setOrderCreationMessage(""), 3000
        // )
    console.log(`Order was cancelled: `, resData);
    }
};

async function pairOrder(orderId, user, setMatchedOrder){
    console.log("pairOrder: ", orderId, user);
    const res = await user.findOrderMatches(orderId);
    if (res.status == 200){
        const resData = await res.json();
        console.log("possible matches: ", resData);
        const {order, matchedOrder} = {...resData};
        setMatchedOrder(matchedOrder);
    }
    return
}

const cancelOrderButton = (orderId, user)=>{
    return(
    <div key="cancel">
        <button className="btn btn-danger border border-dark m-2" 
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await cancelOrder(orderId, user)}
                    }>
                Cancel Order
        </button>
    </div>);
}

const pairOrderButton = (orderId, user, setMatchedOrder)=>{
    // console.log("pairOrderButton: ", orderId, user);
    return(
    <div key="match">
        <button className="btn btn-info border border-dark m-2" 
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await pairOrder(orderId, user, setMatchedOrder)}
                    }>
                Match Order  
        </button>
    </div>);
}

const acceptOrderButton = (orderId, user)=>{
    // console.log("pairOrderButton: ", orderId, user);
    return(
    <div key="accept">
        <button className="btn btn-success border border-dark m-2" 
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await acceptOrder(orderId, user)}
                    }>
                Accept Match
        </button>
    </div>);
}

const rejectOrderButton = (orderId, user)=>{
    // console.log("pairOrderButton: ", orderId, user);
    return(
    <div key="reject">
        <button className="btn btn-warning border border-dark m-2" 
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await rejectOrder(orderId, user)}
                    }>
                Reject Match
        </button>
    </div>);
}

function getTableRow(order, buttons ){
    return  (<tr key={order.id}> 
    <td className="">{order.have}</td>
    <td className="">{order.haveAmount}</td>
    <td className="">{order.want}</td>
    <td className="">{order.wantAmount}</td>
    <td className="">{buttons}</td>
    </tr>)
}

async function getOrderTable(order, tableName, buttons ){
        let i=0;
        const orderTable = getTableRow(order, buttons );
        return(<table className="table table-hover table-sm" key={tableName}>
            <thead><tr key="headRow">
            <th className="">have</th>
            <th className="">Amount</th>
            <th className="">want</th>
            <th className="">Amount</th>
            <th className="">Action</th>
            </tr></thead>
            <tbody>{orderTable}</tbody> 
            </table>
        )
}
export default function ManageOrderPage(){
    console.log("from props: ", router.query);
    const {user, tokens} = readUserInfoFromStorage();
    const me = new User(user, tokens);
    const orderId = router.query.id;
    console.log("me again: ", me.user);
    const myOrder = {...router.query};
    const [myOrderTable, setMyOrderTable] = useState('');
    const [matchOrderTable, setMatchOrderTable] = useState('');
    const [matchedOrder, setMatchedOrder] = useState('');
    console.log("initial: ", matchedOrder)
    const manageButtons =[
            cancelOrderButton(orderId, me), 
            pairOrderButton(orderId, me, setMatchedOrder)
        ];
    const acceptRejectButtons = [
        acceptOrderButton(orderId, me),
        rejectOrderButton(orderId, me)
    ];

    useEffect(async()=>{
        setMyOrderTable(await getOrderTable(myOrder, "manageTable", manageButtons ));
        if (matchedOrder !== null){
            setMatchOrderTable(await getOrderTable(matchedOrder, "acceptRejectTable", acceptRejectButtons));
        }else if (matchedOrder === null){
            setMatchOrderTable(<p>No matches found at this time. Try again later!</p>);
        }
    },
    [matchedOrder]);


    return(
        <>
        <Head>
            <title>Manage Order</title>
        </Head>
        <NavBarUser/>
        <div className="container mt-5 mb-5">
        <h2>Manage Order</h2>
        <div className="container bg-light mt-4 mb-4 p-2">
            <p className="mt-2">
                <Link href="/account"><a className="border border-primary rounded p-2 ">return to Account</a></Link>
            </p>
        <div>
        <h3>Your order</h3>
        {myOrderTable}
        </div>
        <div>
        <h3>A match for your order</h3>
        {matchedOrder === ''? matchedOrder: matchOrderTable}
        </div>
        </div>
        </div>
        </>
    );
}