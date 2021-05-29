import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component{
    render(){
    return(
        <>
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
    </>
    )
    }
    
}

export default Footer;