import { createResource, createSignal, type Component } from 'solid-js';
import { Route, Navigate } from '@solidjs/router'
import NotesList from './components/notes/NotesList';
import { RemoteRepository } from './domain/repository/RemoteRepository';
import Header from './components/general/Header';
import CreateNoteModal from './components/notes/CreateNoteModal';
import Footer from './components/general/Footer';

const remoteRepository = new RemoteRepository;

const App: Component = (props: any) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
};

export default App;
