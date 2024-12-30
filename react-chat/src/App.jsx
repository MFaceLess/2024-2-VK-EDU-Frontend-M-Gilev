import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'

//Импорт redux
import { Provider } from 'react-redux'
import store from './redux/store';

import Messenger from './pages/messenger';
import Chat from './pages/chat';
import ProfilePage from './pages/profile-page'
import AuthPage from './pages/auth-page'

import './App.css';
import { PrivateRoute } from './auth-wrappers/private-route';
import { PublicRoute } from './auth-wrappers/public-route';


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
          <div className='app'>
            <ToastContainer />

            <Routes>
              <Route path='/' element={             <PrivateRoute> <Messenger />    </PrivateRoute>} />
              <Route path='/chat/:id' element={     <PrivateRoute> <Chat />         </PrivateRoute>} />
              <Route path='/profile-page' element={ <PrivateRoute> <ProfilePage />  </PrivateRoute>} />
              
              <Route path='/auth' element={         <PublicRoute>  <AuthPage />     </PublicRoute> } />
            </Routes>
          </div>
      </HashRouter>
    </Provider>
  );
}

export default App;


