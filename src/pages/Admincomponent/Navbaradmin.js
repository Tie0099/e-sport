import Link from "next/link"
import Image from "next/image"
import styles from '@/styles/Navbaradmin.module.css'
export default function Navbar() {
    return (
        <>
            <nav>
                <div className="logo">
                    <Link href="/Admincomponent/homeadmin">
                        <Image src="/logo.png" width={60} height={69} alt="logo" />
                    </Link>
                </div>
                <div className="profile">
                    <a href="/Loginadmin/login" className={styles.profiletext}>ออกจากระบบ</a>
                </div>

            </nav>
        </>
    )
}