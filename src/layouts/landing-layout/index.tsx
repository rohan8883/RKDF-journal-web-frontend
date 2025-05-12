import Navbar from "../../pages/Journal/guest/navbar"
import Footer from "../../pages/Journal/guest/footer"
import { Outlet } from "react-router-dom"

export default function LandingLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>



    )
}


