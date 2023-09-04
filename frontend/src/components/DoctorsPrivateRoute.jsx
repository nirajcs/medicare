import { Navigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DoctorsPrivateRoute = () => {
    const {doctorInfo} = useSelector((state)=>state.docAuth);
    return doctorInfo ? <Outlet/> : <Navigate to='/doctors' replace />
}

export default DoctorsPrivateRoute