import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import router, { useRouter } from 'next/router';
import NavBarUser from "/components/navbaruser";
import User, {readUserInfoFromStorage} from "/beapi/users";

async function cancelOrder(orderId, user, setActionMessage, setDisabledButtons){
    const orderBody = {status: -1};
    const res = await user.updateUserOrder(orderId, orderBody);
    if (res.status == 200){
        const resData = await res.json();
        setActionMessage(<div className="alert alert-danger">Your order with id={orderId} was cancelled.</div>);
        setDisabledButtons({"cancelButton": true, "matchButton": true, "acceptButton": true, "rejectButton": true});
    }
};

const cancelOrderButton = (orderId, user, setActionMessage, disabledButtons, setDisabledButtons)=>{
    return(
    <div key="cancel">
        <button className="btn btn-danger border border-dark m-2"  disabled={disabledButtons.cancelButton}
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await cancelOrder(orderId, user, setActionMessage, setDisabledButtons)}
                    }>
                Cancel Order
        </button>
    </div>);
}

async function pairOrder(orderId, user, setMatchedOrder, disabledButtons, setDisabledButtons){
    const res = await user.findOrderMatches(orderId);
    if (res.status == 200){
        const resData = await res.json();
        const {order, matchedOrder} = {...resData};
        setMatchedOrder(matchedOrder);
        let disabledButtonsUpdated = {...disabledButtons};
        disabledButtonsUpdated.acceptButton = false;
        disabledButtonsUpdated.rejectButton = false;
        setDisabledButtons(disabledButtonsUpdated);
    }else if( res.status == 400){
        const resData = await res.json();
    }
    return
}

const pairOrderButton = (orderId, user, setMatchedOrder, disabledButtons, setDisabledButtons)=>{
    return(
    <div key="match">
        <button className="btn btn-info border border-dark m-2" disabled={disabledButtons.matchButton}
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await pairOrder(orderId, user, setMatchedOrder, disabledButtons, setDisabledButtons)}
                    }>
                Match Order  
        </button>
    </div>);
}

async function acceptOrder(orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons){
    const orderBody = {status: 1, details: {accepted: true, userId: matchedOrder.userId.id, orderId: matchedOrder.id }};
    const res = await user.updateUserOrder(orderId, orderBody);
    if (res.status == 200){
        const resData = await res.json();
        setActionMessage(<div className="alert alert-success">
            <p>Your have accepted order id={matchedOrder.id}</p> 
            <p>You can now contact {matchedOrder.userId.name} </p>
            <p>Email: {matchedOrder.userId.email} </p>
            </div>);
        setDisabledButtons({"cancelButton": true, "matchButton": true, "acceptButton": true, "rejectButton": true});
    }
};

const acceptOrderButton = (orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons)=>{
    return(
    <div key="accept">
        <button className="btn btn-success border border-dark m-2" disabled={disabledButtons.acceptButton}
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await acceptOrder(orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons)}
                    }>
                Accept Match
        </button>
    </div>);
}

async function rejectOrder(orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons){
    
    const orderBody = {rejects: [matchedOrder.id]};
    const res = await user.updateUserOrder(orderId, orderBody);
    if (res.status == 200){
        const resData = await res.json();
        setActionMessage(<div className="alert alert-warning">id={matchedOrder.id} has been added to your rejected matches</div>);
        let disabledButtonsUpdated = {...disabledButtons};
        disabledButtonsUpdated.matchButton = false;
        disabledButtonsUpdated.cancelButton = false;
        disabledButtonsUpdated.acceptButton = true;
        disabledButtonsUpdated.rejectButton = true;
        setDisabledButtons(disabledButtonsUpdated);
    }else if (res.status == 400){
        const resData = await res.json();
        setActionMessage(<div className="alert alert-warning">You can at most reject three matched orders</div>);
        let disabledButtonsUpdated = {...disabledButtons};
        disabledButtonsUpdated.matchButton = true;
        disabledButtonsUpdated.cancelButton = false;
        disabledButtonsUpdated.acceptButton = false;
        disabledButtonsUpdated.rejectButton = true;
        setDisabledButtons(disabledButtonsUpdated);
    }
};

const rejectOrderButton = (orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons)=>{
    return(
    <div key="reject">
        <button className="btn btn-warning border border-dark m-2" disabled={disabledButtons.rejectButton}
                onClick={async (e)=>{
                    e.preventDefault(); 
                    await rejectOrder(orderId, user, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons)}
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
// export default function ManageOrderPage(){
function ManageOrderPage(){
    const {user, tokens} = readUserInfoFromStorage();
    const me = new User(user, tokens);
    const orderId = router.query.id;
    const [myOrderTable, setMyOrderTable] = useState('');
    const [matchOrderTable, setMatchOrderTable] = useState('');
    const [matchedOrder, setMatchedOrder] = useState('');
    const [actionMessage, setActionMessage] = useState('');
    const [disabledButtons, setDisabledButtons] = useState('');
    const manageButtons =[
            cancelOrderButton(orderId, me, setActionMessage, disabledButtons, setDisabledButtons), 
            pairOrderButton(orderId, me, setMatchedOrder, disabledButtons, setDisabledButtons)
        ];
    const acceptRejectButtons = [
        acceptOrderButton(orderId, me, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons),
        rejectOrderButton(orderId, me, matchedOrder, setActionMessage, disabledButtons, setDisabledButtons)
    ];

    useEffect(async()=>{
        if (orderId){
            //if orderId is defined get the order
            const myOrderRes = await me.getUserOrder(orderId);
            if (myOrderRes.status === 200){
                const myOrder = await myOrderRes.json();
                if (myOrder.status === 0){
                    setMyOrderTable(await getOrderTable(myOrder, "manageTable", manageButtons ));
                }
                else{
                    setMyOrderTable(<p>Order has already been cancelled/accepted/rejected. Nothing to manage!</p>);
                }
            }else{
                const error = await myOrderRes.json();
                setMyOrderTable(<p className="alert alert-danger">{error.message}</p>);
            }
        }
         
        if (matchedOrder !== null){
            setMatchOrderTable(await getOrderTable(matchedOrder, "acceptRejectTable", acceptRejectButtons));
        }else if (matchedOrder === null){
            setMatchOrderTable(<p>No matches found at this time. Try again later!</p>);
        }
    },
    [matchedOrder, actionMessage, disabledButtons, orderId]);
    // [matchOrderTable, actionMessage, disabledButtons, orderId]);


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
            {actionMessage}
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


export default dynamic(()=> Promise.resolve(ManageOrderPage), {ssr: false});