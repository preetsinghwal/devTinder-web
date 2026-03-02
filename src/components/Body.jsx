import axios from 'axios';
import Footer from './Footer'
import Navbar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

function Body() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store)=> store.user);

    const fetchUser = async () => {
        if(userData) return
        
        try {
            const res = await axios.get(BASE_URL + '/profile/view', {withCredentials: true});
            dispatch(addUser(res.data));

        } catch(err) {
            if(err.status === 401) {
                navigate('/login');
            }
            console.error(err);
        }

    }

    useEffect(()=> {
        fetchUser();
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
