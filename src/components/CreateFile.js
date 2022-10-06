import React, { useState } from 'react';
import { Document } from '../types/Document';
import { Folder } from '../types/Folder';

export default function CreateFile(props) {
  const root = props.root;
  const currFolder = props.currFolder;
  const setCreateFileShow = props.setCreateFileShow;
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('txt');
  const [isShared, setIsShared] = useState('true');
  const createFileHandle = () => {
    var error = false;
    if (fileName == '') {
      alert('Please give your file a name.');
      error = true;
    }
    currFolder.items.forEach(function (item) {
      if (
        item.name.toLowerCase() == fileName.toLowerCase() &&
        item.type == fileType
      ) {
        alert('Please give your file a unique name.');
        error = true;
      }
    });
    if (!error) {
      const file = new Document(
        fileName,
        fileType,
        isShared,
        props.logUsername
      );
      currFolder.items.push(file);
      props.setRoot(Object.assign({}, root));
      setFileName('');
      setFileType('txt');
      setIsShared('true');
      setCreateFileShow(false);
    }
  };

  return (
    <>
      <div>
        <h2>Create a file</h2>
        <label>File name and type:</label>
        <br />
        <input
          type='text'
          value={fileName}
          onChange={({ target }) => setFileName(target.value)}
        />
        .
        <select
          value={fileType}
          onChange={({ target }) => setFileType(target.value)}
        >
          <option value='txt'>txt</option>
          <option value='docx'>docx</option>
          <option value='jpg'>jpg</option>
          <option value='png'>png</option>
          <option value='mp3'>mp3</option>
          <option value='mp4'>mp4</option>
        </select>
        <br />
        <label>Is this a shared file? </label>
        <select
          value={isShared}
          onChange={({ target }) => setIsShared(target.value)}
        >
          <option value='true'>yes</option>
          <option value='false'>no</option>
        </select>
        <br />
        <button onClick={createFileHandle}>Submit</button>
        <button onClick={() => setCreateFileShow(false)}>Cancel</button>
      </div>
    </>
  );
}
