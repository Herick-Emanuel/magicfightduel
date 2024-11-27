import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaLogin from './Componentes/PaginaLogin';
import PaginaDecks from './Componentes/PaginaDecks';
import { NotificationProvider } from './Context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
  =        <Route path="/" element={<PaginaLogin />} />
          <Route path="/decks" element={<PaginaDecks />} />
        </Routes>
      </Router>
      </NotificationProvider>
  );
}

export default App;
