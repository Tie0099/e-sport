import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Loginadmin.module.css'


export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email.endsWith('@lru.ac.th')) {
      

    } else {
      alert('กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง');
    }
    if (password.length === 10) {

      router.push('/Admincomponent/homeadmin');
    } else {
      alert('กรุณากรอกรหัสผ่านให้ถูกต้อง');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.h2}><h2>เข้าสู่ระบบ</h2></div>
          <div className={styles['input-container']}>
            <input
              placeholder="ชื่อผู้ใช้"
              className={styles['input-field']}
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className={styles['input-label']}>ชื่อผู้ใช้</label>
            <span className={styles['input-highlight']}></span>
          </div>
          <div className={styles['input-container']}>
            <input
              placeholder="รหัสผ่าน"
              className={styles['input-field']}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className={styles['input-label']}>รหัสผ่าน</label>

            <span className={styles['input-highlight']}></span>

          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </>
  );
}