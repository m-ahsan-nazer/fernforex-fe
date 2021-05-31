import Head from 'next/head';
import Link from 'next/link';
import Navbar from '/components/navbar';
import Footer from "/components/footer";

const AboutPage = ()=> {
    return(
        <>
        <Head>
            <title>About FernForex</title>
        </Head>
        <Navbar/>
        <div className="container min-vh-100 mt-5">
            <h1>Our company</h1>
            <p className="lead">
                We are a peer-to-peer currency exchange facilitator in New Zealand. Operating out of Christchurch 
                and serving all of Aotearoa.
            </p>
        </div>
        <Footer className=""/>
        </>
    )
}

export default AboutPage;