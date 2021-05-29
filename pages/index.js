import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import NavBar from '../components/navbar';

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="container-fluid ">
      <Head>
        <title>Peer-to-Peer Currency Exchange | FernForex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <NavBar/>
          <div className="jumbotron container-fluid  bg-light text-center">
              <h1 className="display-3">
                Exchange currency with a peer through <span class="text-primary d-block"> FernForex</span>
              </h1>
          <div class="lead mt-4 mb-2 ">
         Want to swap your New Zealand dollars to a foreign currency or vice versa? We will match 
         you with the right person who wants the opposite.
          </div>
          <Link  href="/signup">
  <a >
    <div className="btn btn-xl btn-info border border-dark "><span className="h2">Sign up</span>
    </div></a>
    </Link>
    </div>
    <div className="container text-center mb-4 pb-4"> 
    <h2 className="display-4">Fix your own currency exchange rate</h2>
    <p className="lead">When you get matched to a peer you can set your own exchange rate. 
    Your can agree on an exchange rate that suits you. </p>
    </div>
    <div className="container text-center">
      <div className="row">
        <div className="col my-auto">
          <h3 className="font-weight-bold">Say no to exchange fees</h3>
          <p className="mt-4 text-secondary">
            Foreign exchange dealers charge you a fee when you buy or sell a currency. 
            When you exchange your currency with a peer you are skipping the middleman.
          </p>
        </div>
        <div className="col my-auto">
         <Image 
         src="/images/feature.svg" alt="First feature alt text"
         width="100%"
         height="100%"
         layout="responsive"
         />
        </div>
      </div>
    </div>


    <div className="container text-center">
      <div className="row">
        <div className="col my-auto">
         <Image 
         src="/images/feature2.svg" alt="Second feature alt text"
         width="100%"
         height="100%"
         layout="responsive"
         />
        </div>
        <div className="col my-auto">
          <h3 className="font-weight-bold">Say no to exchange margins</h3>
          <p className="mt-4 text-secondary">
            Foreign exchange dealers also profit from a margin on exchange rates. The 
            exchange rate will be lower when you are selling and higher when you are buying 
            than the market rate. When you exchange currency with a peer you can use the true 
            market rate.
          </p>
        </div>
      </div>
    </div>

    <div className="container text-center">
      <div className="row">
        <div className="col my-auto">
          <h3 className="font-weight-bold">Pick up your exchanged currency at the airport</h3>
          <p className="mt-4 text-secondary">
            We can arrange to collect your exchanged currency on your behalf 
            and then deliver it to you at the airport. 
            This way you can collect your Kiwi dollars when you arrive in New Zealand or you 
            can collect your foreign currency just as you are leaving New Zealand.
          </p>
        </div>
        <div className="col my-auto">
         <Image 
         src="/images/feature3.svg" alt="Third feature alt text"
         width="100%"
         height="100%"
         layout="responsive"
         />
        </div>
      </div>
    </div>


    <div className="container bg-light mb-4 pt-4 pb-4 border border-secondary rounded"> 
    <div className="row">
      <div className="col-9 my-auto">
        <h4 className="font-weight-bold">Participate in democratising currency exchange</h4>
        <p className="text-info">Start exchanging currency through FernForex.</p>
      </div>
      <div className="col-3 my-auto">
        <Link href="/signup">
          <a>
        <div className="btn btn-xl btn-info border border-dark ">
          Get Started
        </div>
        </a>
        </Link>
      </div>
    </div>
    </div>

    <footer className="pt-5  border-top bg-dark text-center container-fluid">
      <div className="row">
        <div className="col">
          <Link href="/about">
            <a className="text-light">
              <h5>About</h5>
            </a>
          </Link>
        </div>
        <div className="col">
          <Link href="/contact-us">
            <a className="text-light">
              <h5>Contact us</h5>
            </a>
          </Link>
        </div>

        <div className="col">
          <Link href="/">
            <a className="text-light">
              <h5>Home</h5>
            </a>
          </Link>
        </div>

      </div>
      <div className="row pt-2 pb-2" style={{"backgroundColor": "rgba(0, 0, 0, 0.2)"}}>
        <div className="col text-light">
        <span>&copy; 2018 - 2021 | FernForex Limited</span>
        </div>
      </div>
    </footer>

    </div>
  )
}
