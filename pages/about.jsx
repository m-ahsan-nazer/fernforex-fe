import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '/components/navbar';
import Footer from "/components/footer";

const AboutPage = ()=> {
    return(
        <>
        <Head>
            <title>About FernForex</title>
        </Head>
        <Navbar/>
        <div className="container min-vh-100 mt-5 ">
            <div className="row vh-100">
                <div className="col col-md-5 d-none d-md-block">
         <Image 
         src="/images/fernforexlogo.png" alt="FernForex logo"
        //  width="700"
        //  height="1500"
         layout="fill"
         unoptimized="true"
         />
                </div>
                <div className="col col-md-7">
            <h1>Our company</h1>
            <p className="lead">
                We are a peer-to-peer currency exchange facilitator in New Zealand. Operating out of Christchurch 
                and serving all of Aotearoa.
            </p>
            <h2>Our logo</h2>
            <p>
                The logo is a 
                <Link href="https://en.wikipedia.org/wiki/Barnsley_fern">
                    <a> Barnsley Fern </a> 
                </Link>
                fractal. The self-similarity seen in the logo is a feature of fractals in general.   
            </p>
            </div>
            </div>
        </div>
        <Footer className=""/>
        </>
    )
}

export default AboutPage;