import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import LandingPage from "/components/landingpage";

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="">
      <LandingPage/>
    </div>
  )
}
