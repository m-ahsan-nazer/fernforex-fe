import Head from 'next/head';
import Link from 'next/link';
import Footer from "/components/footer";

const ContactusPage = ()=> {
    return(
        <>
        <Head>
            <title>Contact FernForex</title>
        </Head>
        <div className="container">
            <h1>Get in touch</h1>
            <p class="lead">
                Send us an email at fernforex@gmail.com
            </p>
        </div>
        <Footer/>
        </>
    )
}

export default ContactusPage;