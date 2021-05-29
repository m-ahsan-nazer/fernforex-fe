import Head from 'next/head';
import Link from 'next/link';
import RegisterForm from '../components/registerform';

const SignupPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Signup </title>
        </Head>
        <div className="container">
        <h1>Sign up to start using FernForex</h1>
        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6">
        <RegisterForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default SignupPage;