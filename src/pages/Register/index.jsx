import { Link, useNavigate } from 'react-router-dom';

import { auth, db } from 'firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

// Form
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Helmet
import { Helmet } from 'react-helmet';

const Register = () => {

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The username must be between 3 and 20 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 3 &&
                    val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val &&
                    val.toString().length >= 6 &&
                    val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const navigate = useNavigate();

    const formRegistration = (formValue) => {
        const { name, email, password } = formValue;

        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                addDoc(collection(db, "users"), {
                    id: user.uid,
                    name,
                    email,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err))

                navigate('/profile');
            })
            .catch(console.error)
    }

    return (
        <div className="p-10 bg-gradient-to-b from-indigo-500 to-white">
            <Helmet>
                <title> Register </title>
            </Helmet>

            <div className="bg-grey-lighter flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={formRegistration}
                        >
                            <Form>
                                <Field
                                    name="name"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Full Name"
                                    className="form-control block border-2 text-indigo-400 placeholder-indigo-400 border-indigo-400 w-full p-3 rounded-lg mb-2 outline-0"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-700 text-xs py-2"
                                />

                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    autocomplete="off"
                                    className="form-control block border-2 text-indigo-400 placeholder-indigo-400 border-indigo-400 w-full p-3 rounded-lg mb-2 outline-0"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-700 text-xs py-2"
                                />

                                <Field
                                    name="password"
                                    type="password"
                                    autocomplete="off"
                                    placeholder="Password"
                                    className="form-control block border-2 text-indigo-400 placeholder-indigo-400 border-indigo-400 w-full p-3 rounded-lg mb-2 outline-0"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-700 text-xs py-2"
                                />


                                <button
                                    type="submit"
                                    className="w-full text-center py-3 transition rounded rounded-lg bg-indigo-400 text-white hover:bg-indigo-700 focus:outline-none my-1"
                                >
                                    Create Account
                                </button>
                            </Form>
                        </Formik>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a>
                            <span> and </span>
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link to="/sign-in"
                              className="block text-center no-underline border-b border-blue text-blue">Login</Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;