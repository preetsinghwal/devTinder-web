import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

function Login() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleLogin = async () => {
        try {
            const result = await axios.post(BASE_URL + '/login', {
                emailId,
                password
            }, { withCredentials: true })
            dispatch(addUser(result.data));
            return navigate('/');
        } catch (err) {
            setError(err.response.data || 'Something went wrong');
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className='flex justify-center align-center items-center login-card-wrapper'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                            </>
                        )}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input type="email" placeholder="mail@site.com" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                            </label>
                            <div className="validator-hint hidden">Enter valid email address</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Please Enter your Password here" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </fieldset>

                    </div>
                    <p className='text-red-700'>{error}</p>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-primary w-30" disabled={!emailId || !password} onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p
                        className="m-auto cursor-pointer py-2"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New User? Signup Here"
                            : "Existing User? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
