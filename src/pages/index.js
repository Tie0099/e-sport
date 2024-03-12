import React from 'react'
// import Login from './Login';
// import SignUp from './SignUp';
import styles from "@/styles/Home.module.css"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Navbar from './component/Navbar'
export default function Home() {
  return (
    <>

      <Head>
        <title>E-sport</title>
      </Head>
      <Navbar />
      <div className={styles.details}>
        <Link href="/register">
          <Image className={styles.pv} src="/pv.png" width={500} height={200} alt="รูปประกอบ" />
        </Link>
      </div>

    </>
  )
}