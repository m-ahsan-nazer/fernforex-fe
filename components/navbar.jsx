import React from "react";
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link  href="/">
       <a className="navbar-brand pl-md-4 font-weight-bold text-primary">FernForex</a>
      </Link>
        <ul className="navbar-nav ml-auto pr-md-4">
          <li className="nav-item active border border-dark p-1 rounded">
          <Link href="/login">
          <a className="nav-link " >
           Login
          </a>
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;
