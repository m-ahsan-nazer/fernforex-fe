import React from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';

const NavBarUser = () => {
    const router = useRouter();

    const handleClick = async (e)=>{
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
        router.push("/login");
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link  href="/">
       <a className="navbar-brand pl-md-4 font-weight-bold text-primary">FernForex</a>
      </Link>
        <ul className="navbar-nav ml-auto pr-md-4 ">
          <li className="nav-item active border border-dark p-0 rounded">
          <Link href="/login">
          <a className="nav-link p-0" >
    <div className="m-0 btn btn-info border border-dark " onClick={handleClick}
    ><span className="h2">Logout</span>
    </div>
          </a>
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBarUser;
