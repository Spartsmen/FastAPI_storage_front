import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { searchDocs } from '../store/reduces/DocsSlice';
import Graph from 'react-graph-vis';
import '../styles/main.css'


const MainPage = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [limit, setLimit] = useState<string>('');
  const {status_search, result_search} = useAppSelector((state) => state.docsSlice);
  const [graph, setGraph] = useState<{ nodes: any[], edges: any[] }>({ nodes: [], edges: [] });

  useEffect(() => {
    if (result_search && typeof result_search === 'object') {
      const nodesMap = new Map();
      let isFirstDocument = true;
      result_search.matching_documents.forEach(doc => {
        nodesMap.set(doc.id, {
          id: doc.id,
          label: isFirstDocument ? `Name: ${doc.name}, id: ${doc.id}` : `Document id ${doc.id}`,
          title: `${doc.name}, id: ${doc.id}`,
          color: "#00ff00" 
        });
        isFirstDocument = false;
      });
  
      result_search.references.forEach(ref => {
        if (!nodesMap.has(ref.target_id)) {
          nodesMap.set(ref.target_id, {
            id: ref.target_id,
            label: `Document id: ${ref.target_id}`,
            title: `Document id - ${ref.target_id}`,
            color: "#00ff00"
          });
        }
      });
  
      const nodes = Array.from(nodesMap.values());
  
      const edges = result_search.references.map(ref => ({
        from: ref.id,
        to: ref.target_id
      }));
  
      setGraph({ nodes, edges });
    }
  }, [result_search]);

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
    //   setName('');
    //   setDepth('');
    //   setLimit('');
    } catch (e) {
      console.log(e);
    }
  };

  const options = {
    layout: {
      hierarchical: false,
      improvedLayout: true
    },
    edges: {
      color: "#000000"
    },
    nodes: {
      shape: 'dot',
      size: 20
    },
    physics: {
      stabilization: false,
      barnesHut: {
        gravitationalConstant: -20000,
        springConstant: 0.04,
        springLength: 200
      }
    },
    interaction: {
      dragNodes: true,
      dragView: true,
      zoomView: true
    },
    height: "600px", 
    width: "100%" 
  };

  const events = {
    select: function(event: { nodes: number[], edges: any[] }) {
      console.log("Selected nodes:");
      console.log(event.nodes);
      console.log("Selected edges:");
      console.log(event.edges);
    }
  };

  return (
    <div className="main">
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
          placeholder="Depth of search (3)"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Search limit (10)"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
        <button onClick={handleDocsSearch} className='search_button'>Search</button>
      </form>
      {status_search && <h2>{`Status: ${status_search}`}</h2>}
      <Graph
        graph={graph}
        options={options}
        events={events}
      />
    </div>
  );
};

export default MainPage;
