import logo from './logo.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Documents from './pages/Documents';
import Login from './components/Login';
import { Document } from './types/Document';
import { Folder } from './types/Folder';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([
    { username: 'meow', password: 'meow' },
    { username: 'justin', password: 'justin' },
    { username: 'rawi', password: 'rawi' }
  ]);

  const [logUsername, setLogUsername] = useState('');

  const dt = new Folder('desktop', 'true', true);
  const file1 = new Document('file1', 'jpg', 'true');
  dt.items.push(file1);
  const folder1 = new Folder('subfolder', 'true');
  dt.items.push(folder1);

  const doc = new Folder('documents', 'true', true);

  const r = new Folder('recents', 'true', true);
  const [documents, setDocuments] = useState(doc);
  const [desktop, setDesktop] = useState(dt);
  const [recent, setRecent] = useState(r);

  const [root, setRoot] = useState(dt);

  return (
    <>
      {console.log(users)}
      {!isLoggedIn ? (
        <div className='login'>
          <Login
            logUsername={logUsername}
            setLogUsername={setLogUsername}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            users={users}
            setUsers={setUsers}
          />
        </div>
      ) : (
        ''
      )}
      {!isLoggedIn ? (
        ''
      ) : (
        <Documents
          recent={recent}
          desktop={desktop}
          documents={documents}
          logUsername={logUsername}
          root={root}
          setRoot={setRoot}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}

export default App;
