import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { auth } from 'firebase-config'
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, authUser => {
            if(!authUser) return setIsLogged(false)
            return setIsLogged(true)
        });
    }, [isLogged])

    const handleLogout = () => {
        signOut(auth).then(() => console.log('User is Logged Out'));
    }

    return (
        <>
            <header className="text-gray-600 body-font bg-indigo-500">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round"
                             strokeLinejoin="round" strokeWidth="2"
                             className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl text-white">React Firebase Auth Project</span>
                    </Link>

                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {!isLogged ? (
                            <>
                                <Link to="/sign-up" className="mr-5 text-white hover:text-gray-200">Sign up</Link>
                                <Link to="/sign-in" className="mr-5 text-white hover:text-gray-200">Sign in</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="mr-5 text-white hover:text-gray-200" onClick={handleLogout}>Log out</Link>
                                <Link to="/profile" className="mr-5 text-white hover:text-gray-200">Profile</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;