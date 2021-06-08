import {useEffect, useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavBarHomeOnly from '/components/navbarhomeonly';
import User  from "/beapi/users";

export default function verifyEmailPage(){
    const router = useRouter();
    const token = router.query.token;
    const [message, setMessage] = useState("");
    
    useEffect(async()=>{
        if (message === "" &&  typeof(token) !== 'undefined' ){
            await verifyEmail(token);
        }
    });

    async function verifyEmail(token){
        try{
            const res = await User.verifyEmail(token);
            if (res.status === 204){
                setMessage(
                <div className="alert alert-success m-2">
                    You have verified your email!
                </div>
                );
            }else if (res.status === 401){
                const error = await res.json();
                setMessage(
                <div className="alert alert-danger m-2">
                    {error.message}
                </div>
                );
            }
        }catch(err){
            console.log("Caught in the wide net errors: ", err);
        }
    }

    return(
        <>
        <Head>
            <title>Verify Email</title>
        </Head>
        <NavBarHomeOnly/>
        <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
            {/* {errors.message && <div className="alert alert-danger m-2">{errors.message}</div> } */}
            {/* {success.message && <div className="alert alert-success m-2">{success.message}</div> } */}
            {message}
        </div>
        </div>
        </div>
        </>
    )
}