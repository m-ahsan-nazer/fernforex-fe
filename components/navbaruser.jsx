import React from "react";
import Link from 'next/link';
import {useRouter} from 'next/router';
import 'font-awesome/css/font-awesome.min.css';

import User, {readUserInfoFromStorage, deleteUserInfoFromStorage} from "/beapi/users";

const NavBarUser = () => {
    const router = useRouter();

    const handleClick = async (e)=>{
      e.preventDefault();
      const {tokens} = readUserInfoFromStorage();
      const res = await User.logout(tokens.refresh.token);
      //delete user, tokens info
      deleteUserInfoFromStorage(); 
      router.push("/login");
    }
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link  href="/">
       <a className="navbar-brand pl-md-4 font-weight-bold text-primary">FernForex <i className="fa fa-home"></i></a>
      </Link>
        <ul className="navbar-nav ml-auto pr-md-4 ">
          <li className="nav-item active border border-dark p-0 rounded">
          <Link href="/login">
          <a className="nav-link p-0" >
    <div className="m-0 btn btn-info border border-dark " onClick={handleClick}
    ><span className="">Sign out</span>
    </div>
          </a>
          </Link>
          </li>
        </ul>
    </nav>
  );
};

export default NavBarUser;
