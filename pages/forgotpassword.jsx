import Head from 'next/head';
import Link from 'next/link';
import ForgotPasswordForm from '../components/forgotpasswordform';
import NavBarHomeOnly from '/components/navbarhomeonly';

const ForgotPasswordPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Forgot Password</title>
        </Head>
        <NavBarHomeOnly/>
        <div className="container mt-5">
        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
        <ForgotPasswordForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default ForgotPasswordPage;