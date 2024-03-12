import Navbar from "./component/Navbar"
import Head from "next/head"
export default function Profile(){
    return(
        <>
        <Head>
            <title>โปรไฟล์</title>
        </Head>
        <Navbar/>
        <div>
            <h1 className="profile">โปรไฟล์</h1>
        </div>
        </>
    )
}