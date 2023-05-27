import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, db } from 'firebase-config'
import { onAuthStateChanged } from 'firebase/auth';
import {
    query,
    getDocs,
    collection,
    where
} from 'firebase/firestore'

// Helmet
import {Helmet} from 'react-helmet';


const Profile = () => {
    const navigate = useNavigate();

    const [emailVal, setEmailVal] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const [isLoaded, setIsLoaded] = useState(false);

    const fetchUserName = async (user) => {
        try {
            const q = query(collection(db, "users"), where("id", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();

            setName(data.name);
            setEmailVal(data.email);
            setId(data.id);

            setIsLoaded(true)
        } catch (err) {
            console.error(err);
        }
    };

    onAuthStateChanged(auth, authUser => {
        if(!authUser) return navigate("/");

        fetchUserName(authUser)
            .then(() => {})
            .catch((err) => console.log(err));
    });

    const userInfoCard = (
        <div className="flex space-x-4">
            <div className="flex-1 space-y-3">
                <div className="text-purple-700">
                    Your name: {name}
                </div>
                <div className="text-purple-700">
                    Your email: {emailVal}
                </div>
                <div className="text-purple-700">
                    Your id: {id}
                </div>
            </div>
        </div>
    )

    const skeletonCard = (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
            </div>
        </div>
    )

    return (
        <div>
            <Helmet>
                <title> Profile </title>
            </Helmet>

            <div className="flex flex-col items-center justify-center text-1xl text-black mb-4 font-medium bg-gradient-to-b from-indigo-500 to-white h-[500px] py-20">
                <div className="title-font sm:text-4xl text-3xl text-white"> Welcome!!! </div>

                <div className="border border-purple-500 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-5">
                    {isLoaded ? userInfoCard : skeletonCard}
                </div>
            </div>
        </div>
    )
};

export default Profile;