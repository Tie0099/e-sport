import React from 'react'
// import Login from './Login';
// import SignUp from './SignUp';
import styles from "@/styles/homeadmin.module.css"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Navbar from '@/pages/Admincomponent/Navbaradmin'

export default function homeadmin() {
  return (
    <>
      <Head>
        <title>E-sport</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.managedata}>
          <a href='/Admincomponent/ManageAccess' className={styles.data}>จัดการข้อมูลผู้ดูแลระบบ</a>
          <a href='' className={styles.data}>จัดการข้อมูลสมาชิก</a>
          <a href='' className={styles.data}>จัดการข้อมูลประชาสัมพันธ์</a>
          <a href='' className={styles.data}>จัดการข้อมูลการแข่งขัน</a>
        </div>
      </div>
    </>
  )
}