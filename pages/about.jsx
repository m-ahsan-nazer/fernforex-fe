import Head from 'next/head';
import Link from 'next/link';
import Footer from "/components/footer";
const AboutPage = ()=> {
    return(
        <>
        <Head>
            <title>About FernForex</title>
        </Head>
        <div className="container">
            <h1>Our company</h1>
            <p class="lead">
                We a peer-to-peer currency exchange facilitator in New Zealand.
            </p>
        </div>
        <Footer/>
        </>
    )
}

export default AboutPage;