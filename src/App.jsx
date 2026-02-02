import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Get from './componets/Get';
import Post from './componets/Post';
import Update from './componets/Update';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Get/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="/update/:id" element={<Update/>} />
      </Routes>
    </Router>
  );
};

export default App;
