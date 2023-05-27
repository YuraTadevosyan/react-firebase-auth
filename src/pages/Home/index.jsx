// Helmet
import { Helmet } from 'react-helmet';

// Images
import hero from '../../assets/images/home/hero.svg'

const Home = () => {

    return (
        <div>
            <Helmet>
                <title> Home </title>
            </Helmet>

            <section className="text-gray-600 body-font bg-gradient-to-b from-indigo-500 to-white">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                        <img src={hero} alt="React Firebase logo" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                            Firebase + React App
                        </h1>
                        <p className="mb-8 leading-relaxed text-white">
                            React App Authentication with Firebase
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;