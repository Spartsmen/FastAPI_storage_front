import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hoocs';
import { checkIsAuth, logout } from '../store/reduces/AuthSlice';
import { addDocs, getDocs, delDocs } from '../store/reduces/DocsSlice';

const Dashboard = () => { 
  const [id, setId] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const docs = useAppSelector((state) => state.docsSlice.document);
  const docId = useAppSelector((state) => state.docsSlice.docId); 
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
  const {status_add} = useAppSelector((state) => state.docsSlice);
  const {status_del} = useAppSelector((state) => state.docsSlice);
  
  const [name, setName] = useState<string>(''); 
  const [content, setContent] = useState<string>('');
  const [referrals, setReferrals] = useState<string>(''); 

  const [del_id, setDelId] = useState('');


  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);
    // get docs
  const handleGetDocs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      dispatch(getDocs(numericId));
      setIsSearched(true);
    } else {
        console.log('ID must be a number');
    }
    setId('');
  };

  // add docs
  const handleAddDocs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        addDocs({
          name,
          content,
          referrals
        })
      );
      setName('');
      setContent('');
      setReferrals('');
    } catch (e) {
    }
  };

  const handleDelDocs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericId = Number(del_id);
    if (!isNaN(numericId)) {
      try {
        dispatch(delDocs(numericId)); 
        setDelId('');
      } catch (e) {
      }
    } else {
      console.log('ID must be a number');
    }
  };


      const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="getDocs">

        <h1>Get document</h1>
        <form onSubmit={handleGetDocs}>
          <input 
            type="text" 
            placeholder="Document id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
         <button type="submit" className='get_docs_button'>Get</button>       
        </form>
        {isSearched && !docs && (
          <p>Document not found or does not exist.</p> 
        )}
        {docs && (
          <div>
            <h2>Document Details:</h2>
            <p>Document id: {docs.id}</p>
            <p>Owner id: {docs.owner_id}</p>
            <p>Name: {docs.name}</p>
            <p>Content: {docs.content}</p>
          </div>
        )}
      </div>
      <div className="addDocs">
        <h1>Add new document</h1>
        <form onSubmit={handleAddDocs}>
          <input 
            type="text" 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea 
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <textarea 
            placeholder="Referrals"
            value={referrals}
            onChange={(e) => setReferrals(e.target.value)}
            />
            <button type="submit" className='add_docs_button'>Add Document</button>
          </form>
         
          {status_add && <h2>{`Status: ${status_add}${docId ? `, Document ID: ${docId}` : ''}`}</h2>}
        </div>
        <div className="addDocs">
        <h1>Delete document</h1>
        <form onSubmit={handleDelDocs}>
          <input 
            type="text" 
            placeholder="Document Id"
            value={del_id}
            onChange={(e) => setDelId(e.target.value)}
          />
            <button type="submit" className='del_docs_button'>Delete</button>
          </form>
         
          {status_del && <h2>{`Status: ${status_del}`}</h2>}
        </div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  };
export default Dashboard;
