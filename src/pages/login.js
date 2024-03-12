import React from 'react'
import styles from '@/styles/login.module.css'
import Link from 'next/link'

export default function login() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.user}>โค้ช
                    <p className={styles.textUser}>สำหรับหรับโค้ช</p>
                    <Link href='Loginuser/login'>
                        <button className={styles.buttonUser}>เข้าสู่ระบบ</button>
                    </Link>
                </div>
                <div className={styles.admin}>เเอดมิน
                    <p className={styles.textAdmin}>สำหรับเเอดมิน</p>
                    <Link href='/Loginadmin/login'>
                        <button className={styles.buttonAdmin}>เข้าสู่ระบบ</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
