import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import 'font-awesome/css/font-awesome.min.css';

const NavBar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-sm navbar-light bg-light  border-bottom ">
      <Link  href="/">
       {/* <a className="navbar-brand pl-md-4 font-weight-bold text-primary"  */}
       {/* >FernForex</a> */}
       <a className="navbar-brand pl-md-4 font-weight-bold text-primary">FernForex <i className="fa fa-home"></i></a>
        {/* style={{backgroundImage: 'url(/favicon.png)'}}>FernForex</a> */}
      </Link>
        <ul className="navbar-nav ml-auto pr-md-4">
          <li className="nav-item active border border-dark rounded">
          <Link href="/login" passHref>
          <a className="btn btn-light nav-link" >
           Login
          </a>
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;
