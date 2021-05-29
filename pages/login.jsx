import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../components/loginform';

const LoginPage = ()=> {
    const handleSubmit = (e) =>{
        console.log('Submitted', e);
    }
    return(
        <>
        <Head>
            <title>Login</title>
        </Head>
        <div className="container">

        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6">
        <LoginForm/>
        <div >
        <Link href="/forgotpassword" className="">
          <a>Forget password</a>
        </Link>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default LoginPage;