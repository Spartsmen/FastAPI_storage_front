import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hoocs';
import {checkIsAuth, logout} from '../store/reduces/AuthSlice';
import { getDocs } from '../store/reduces/DocsSlice';
import 

const Dashboard = () => {

  const [id, setId] = useState<string>(''); 

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const docs = useAppSelector((state) => state.docsSlice.document);
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));

  useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    },[])

const handleGetDocs = () => { 
    try {
        dispatch(
          getDocs({
            id
          })
        );
        setId('')
      } catch (e) {
        console.log(e);
      }
  }

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="getDocs">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Get document </h1>
      <input 
          type="id"
          placeholder="Document id"
          value={id}
          onChange={(e) => handleGetDocs(e.target.value)
        <button onClick={} className='get_docs_button'>Get</button>        
      </form>
    </div>
  );
  
};
 

export default Dashboard;
