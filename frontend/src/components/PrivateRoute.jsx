import { Navigate,Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usersApi } from '../axiosApi/axiosInstance';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const PrivateRoute = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const {userInfo} = useSelector((state)=>state.auth);
    useEffect(()=>{
        const fetchUser = async()=>{
            let res = await usersApi.get(`/user-profile/${userInfo._id}`)
            if(res.data.blocked){
                await logoutApiCall().unwrap();
                dispatch(logout());
                navigate('/');
            }
        }
        if(userInfo){
            fetchUser();
        }
    },[userInfo, dispatch, logoutApiCall, navigate])
    return userInfo ? <Outlet/> : <Navigate to='/' replace />
};

export default PrivateRoute;