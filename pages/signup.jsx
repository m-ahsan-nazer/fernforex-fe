import Head from 'next/head';
import Link from 'next/link';
import RegisterForm from '../components/registerform';
import NavBarHomeOnly from '/components/navbarhomeonly';

const SignupPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Sign up with FernForex </title>
        </Head>
        <NavBarHomeOnly/>
        <div className="container mt-5">
        <h1>Sign up to start using FernForex</h1>
        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
        <RegisterForm/>
        </div>
        </div>
        </div>
        </>
    )
}

export default SignupPage;