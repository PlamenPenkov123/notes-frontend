// index.tsx
/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import 'solid-devtools';

import App from './App';
import NotesPage from './pages/NotesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

const root = document.getElementById('root');

render(() => (
  <Router root={App}>
    {/* AuthProvider is removed from here. 
       It is now inside App.tsx 
    */}
    
    {/* Public routes */}
    <Route path="/" component={HomePage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />

    {/* Protected */}
    <Route path="/notes" component={NotesPage} />
    <Route path="/profile" component={ProfilePage}/>
  </Router>
), root!);