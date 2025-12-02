import { createResource, createSignal, type Component } from 'solid-js';
import { Route, Navigate } from '@solidjs/router'
import NotesList from './components/notes/NotesList';
import { RemoteRepository } from './domain/repository/RemoteRepository';
import Header from './components/general/Header';
import CreateNoteModal from './components/notes/CreateNoteModal';
import Footer from './components/general/Footer';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const remoteRepository = new RemoteRepository;

const App: Component = (props: any) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
          {props.children}
        <Footer />
      </ToastProvider>
    </AuthProvider>
  )
};

export default App;
