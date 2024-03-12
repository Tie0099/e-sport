import React from 'react';
import styles from '@/styles/Loginuser.module.css';

const Login = () => {
  return (
    <div className={styles['login-box']}>
    <p>Login</p>
    <form>
      <div className={styles['user-box']}>
        <input required type="text" name="" />
        <label>Email</label>
      </div>
      <div className={styles['user-box']}>
        <input required type="password" name="" />
        <label>Password</label>
      </div>
      <a href="/profile">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        เข้าสู่ระบบ
      </a>
    </form>
    <p>Don't have an account? <a href="" className={styles.a2}>ลงทะเบียน</a></p>
  </div>
  );
};

export default Login;
