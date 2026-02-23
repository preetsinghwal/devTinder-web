import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

function Body() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
