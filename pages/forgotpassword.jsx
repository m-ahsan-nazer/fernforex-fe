import Head from 'next/head';
import Link from 'next/link';
import ForgotPasswordForm from '../components/forgotpasswordform';

const ForgotPasswordPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Forgot Password</title>
        </Head>
        <div className="container ">
        <div className="row justify-content-center mt-5">
        <div className="bg-light p-2 col- col-md-6">
        <ForgotPasswordForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default ForgotPasswordPage;