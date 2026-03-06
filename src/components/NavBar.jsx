import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

function Navbar() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + '/logout', {}, {withCredentials: true});
            dispatch(removeUser());
            return navigate('/login');
            
        }catch(err) {

        }
    }
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl text-white">DevTinder</Link>
            </div>
            {user && <div className="flex gap-2 items-center">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                    <div>Welcome, {user.firstName}</div>

                <div className="dropdown dropdown-end mx-5 flex">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user profile photo"
                                src={user?.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><Link to="/connections">Connections</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar
