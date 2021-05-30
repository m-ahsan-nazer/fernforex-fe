import Head from 'next/head';
import Link from 'next/link';
import NavBar from "/components/navbar";
import Footer from "/components/footer";
import ContactForm from "/components/contactform";

const ContactusPage = ()=> {
    return(
        <>
        <Head>
            <title>Contact FernForex</title>
        </Head>
        <NavBar/>
        <div className="container mt-5 mb-5 min-vh-100">
            <h1>Get in touch</h1>
            <p class="lead">
                Send us an email at fernforex.nz@gmail.com or use the contact form below.
            </p>
        <div className="row justify-content-center">
        <div className="bg-light p-2 col- col-md-6 m-2">
            <ContactForm/>
        </div>
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default ContactusPage;