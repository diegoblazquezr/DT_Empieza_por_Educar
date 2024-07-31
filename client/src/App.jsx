import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  console.log('App rendering');

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
            <Main />
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
