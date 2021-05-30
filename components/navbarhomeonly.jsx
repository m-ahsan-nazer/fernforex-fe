import React from "react";
import Link from 'next/link';
import 'font-awesome/css/font-awesome.min.css';

const NavBarHomeOnly = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link  href="/">
       <a className="navbar-brand pl-md-4 font-weight-bold text-primary">FernForex <i className="fa fa-home"></i></a>
      </Link>
    </nav>
  );
};

export default NavBarHomeOnly;
