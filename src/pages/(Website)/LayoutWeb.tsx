
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';


const LayoutWeb = () => {
    return (
        <>
         
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
       
        </>
    )
}

export default LayoutWeb