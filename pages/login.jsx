import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../components/loginform';
import NavBarHomeOnly from '/components/navbarhomeonly';

const LoginPage = (props)=> {
    return(
        <>
        <Head>
            <title>Login</title>
        </Head>
        <NavBarHomeOnly/>
        <div className="container mt-5">

        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
        <LoginForm/>
        <div >
        <Link href="/forgot-password" className="">
          <a>Forgot password</a>
        </Link>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default LoginPage;