import React from "react";
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" href="/">
       <a>FernForex</a>
      </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
          <Link href="/login">
          <a className="nav-link" >
           Login
          </a>
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBar;
