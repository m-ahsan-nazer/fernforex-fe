import Head from 'next/head';
import Link from 'next/link';
import ResetPasswordForm from '../components/resetpasswordform';
import NavBarHomeOnly from '/components/navbarhomeonly';

const ResetPasswordPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Reset Password</title>
        </Head>
        <NavBarHomeOnly/>
        <div className="container mt-5">

        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
        <ResetPasswordForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default ResetPasswordPage;