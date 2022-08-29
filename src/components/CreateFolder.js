import React, { useState } from 'react';
import { Document } from '../types/Document';
import { Folder } from '../types/Folder';
export default function CreateFile(props) {
  const root = props.root;
  const currFolder = props.currFolder;
  const [folderName, setFolderName] = useState('');
  const [isShared, setIsShared] = useState('true');

  const createFolderHandle = () => {
    var error = false;
    if (folderName == '') {
      alert('Please give your folder a name.');
      error = true;
    }
    currFolder.items.forEach(function (item) {
      if (item.name.toLowerCase() == folderName.toLowerCase()) {
        alert('Please give your folder a unique name.');
        error = true;
      }
    });
    if (!error) {
      const folder = new Folder(folderName, isShared);
      currFolder.items.push(folder);
      props.setRoot(Object.assign({}, root));
      setFolderName('');
      setIsShared('true');
    }
  };

  return (
    <>
      <div>
        <h2>Create a folder</h2>
        <label>Folder name:</label>
        <br />
        <input
          type='text'
          value={folderName}
          onChange={({ target }) => setFolderName(target.value)}
        />
        <br />
        <label>Is this a shared folder? </label>
        <select
          value={isShared}
          onChange={({ target }) => setIsShared(target.value)}
        >
          <option value='true'>yes</option>
          <option value='false'>no</option>
        </select>
        <br />
        <button onClick={createFolderHandle}>Submit</button>
      </div>
    </>
  );
}
