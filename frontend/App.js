import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import TextEditor from './components/TextEditor';
import { v4 as uuidV4 } from 'uuid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/doc/${uuidV4()}`} />} />
        <Route path="/doc/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
