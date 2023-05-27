import { Outlet } from 'react-router-dom';

// Components
import { Header, Footer } from '../../../components'

const Layouts = () => {

    return (
        <>
            <Header />

            <main className="min-h-[calc(100vh_-_172.5px)]">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Layouts;
