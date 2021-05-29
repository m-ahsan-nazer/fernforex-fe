import Head from 'next/head';
import Link from 'next/link';
import ResetPasswordForm from '../components/resetpasswordform';

const ResetPasswordPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Reset Password</title>
        </Head>
        <div className="container">

        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6">
        <ResetPasswordForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default ResetPasswordPage;