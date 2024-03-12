import Link from "next/link"
import Image from "next/image"
export default function Navbar(){
    return(
        <>
        <nav>
            <div className="logo">
                <Link href="/">
                   <Image src="/logo.png" width={60} height={69} alt="logo"/>
                </Link>
            </div>
            <div className="link">
            <Link  href="/" >หน้าเเรก</Link>
            <Link className="login" href="/login">เข้าสู่ระบบ</Link>
            </div>
            <div className="profile">
            <Link  href="/profile">โปรไฟล์</Link>
            </div>
        </nav>
        </>
    )
}
