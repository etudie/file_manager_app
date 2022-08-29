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
    { username: 'justin', password: 'justin' }
  ]);

  const main = new Folder('main', true);
  const file1 = new Document('file1', 'jpg', true);
  main.items.push(file1);
  const folder1 = new Folder('subfolder', true);
  main.items.push(folder1);
  const [root, setRoot] = useState(main);

  return (
    <>
      {console.log(users)}
      {!isLoggedIn ? (
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          users={users}
          setUsers={setUsers}
        />
      ) : (
        ''
      )}
      {!isLoggedIn ? '' : <Documents root={root} setRoot={setRoot} />}
    </>
  );
}

export default App;
