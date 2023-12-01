import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hoocs';
import { checkIsAuth, logout } from '../store/reduces/AuthSlice';
import { getDocs } from '../store/reduces/DocsSlice';

const Dashboard = () => { 
  const [id, setId] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const docs = useAppSelector((state) => state.docsSlice.document); // Убедитесь, что путь до state.docsSlice.document правильный
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
  

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]); // Добавлены зависимости в useEffect

  const handleGetDocs = () => {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      dispatch(getDocs(numericId));
      setIsSearched(true);
    } else {
        console.log('ID must be a number');
    }
    setId('');
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="getDocs">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Get document</h1>
        <input 
          type="text" 
          placeholder="Document id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleGetDocs} className='get_docs_button'>Get</button>        
      </form>
      {isSearched && !docs && (
        <p>Document not found or does not exist.</p> 
      )}
      {docs && (
        <div>
          <h2>Document Details:</h2>
          <p>ID: {docs.id}</p>
          <p>Owner ID: {docs.owner_id}</p>
          <p>Name: {docs.name}</p>
          <p>Content: {docs.content}</p>
        </div>
      )}
      <button onClick={handleLogout}> Log out</button>
    </div>
  );
};

export default Dashboard;
