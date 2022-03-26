import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

import { SearchSpace } from './components/SearchSpace';

function App() {
  return (
    <div className="App">
      <title>Giveaway Tweets Search Engine</title>
      <meta name="description" content="Giveaway Tweets Search Engine" />
      <meta property="og:type" content="website" />
      <meta name="robots" content="follow, index" />

      <meta property="og:title" content="Giveaway Tweets Search Engine" />
      <meta property="og:image" content="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
        <NavBar />
        {/* <SearchSpace baseURL="http://localhost:8000/"/> */}
        <SearchSpace baseURL="https://giveaway-tweets-search.herokuapp.com/"/>
    </div>
  );
}

export default App;
