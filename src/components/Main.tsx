import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { searchDocs } from '../store/reduces/DocsSlice';

const MainPage = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(''); 
  const [depth, setDepth] = useState<string>('');
  const [limit, setLimit] = useState<string>('');

  const {status_search,result_search} = useAppSelector((state) => state.docsSlice);


  const handleDocsSearch = () => {
    try {
      const depthValue = depth !== '' ? depth : '3';
      const limitValue = limit !== '' ? limit : '10';
  
      dispatch(
        searchDocs({
          name,
          depth: depthValue,
          limit: limitValue,
        })
      );
      setName('');
      setDepth('');
      setLimit('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Search</h1>
        <input 
          type="text"
          placeholder="Document name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Depth of search"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />
      <input 
          type="text"
          placeholder="Search limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
            <button onClick={handleDocsSearch} className='search_button'>Search</button>
        
      </form>
        {status_search && <h2>{`Status: ${status_search} Result: ${JSON.stringify(result_search)}`}</h2>}
    </div>
  );
  
};




export default MainPage