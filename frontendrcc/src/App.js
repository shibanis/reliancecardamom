import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/api/article/article1`);
      setArticleInfo(response.data);
      console.log("SHibani")
    }
    fetchData();

  }, [])
  return (
    <div className="App">
      Reliance Cardamom Company
      {
        articleInfo && articleInfo.name ? <>{articleInfo.name}</> : <>No Articlefound</>
      }
    </div>
  );
}

export default App;
