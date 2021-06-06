import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import router from 'next/router';
import NavBarUser from "/components/navbaruser";
import User, {readUserInfoFromStorage, saveUserInfoToStorage} from "/beapi/users";

// import AccountPage from "/pages/account";

export default function ManageOrderPage(){
    console.log("from props: ", router.query.orderId);
    const {user, tokens} = readUserInfoFromStorage();
    const me = new User(user, tokens);
    console.log("me again: ", me.user);

    async function findOrderMatches(orderId){
        const res = await me.findOrderMatches(orderId);
        if (res.status == 200){
            const resData = await res.json();
            console.log("possible matches: ", resData);
        }
    }

    findOrderMatches(router.query.orderId);
    return(
        <>
        <NavBarUser/>
        <div className="container mt-5 mb-5">
        <h2>Manage Order</h2>
        <div className="container bg-light mt-4 mb-4 p-2">
            <p>I am managing my order</p>
        <Link href="/account"><a>Click to return to account's page</a></Link>
        </div>
        </div>
        </>
    );
}