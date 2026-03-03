import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

function Login() {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const result = await axios.post(BASE_URL + '/login', {
                emailId,
                password
            }, {withCredentials: true})
            dispatch(addUser(result.data));
            return navigate('/feed');
        }catch(err) {
            setError('Something went wrong');
            console.error(err);
        }
    }

    return (
        <div className='flex justify-center align-center items-center login-card-wrapper'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
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
                    <p className='text-red'>{error}</p>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-primary w-30" disabled={!emailId || !password} onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
