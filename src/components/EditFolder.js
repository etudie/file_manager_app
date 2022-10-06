import React, { useState, useEffect } from 'react';
export default function EditFolder(props) {
  const currFolder = props.currFolder;
  const setCurrFolder = props.setCurrFolder;
  const setFolderEditShow = props.setFolderEditShow;
  const back = props.back;
  const setBack = props.setBack;
  const setRoot = props.setRoot;
  const [folderName, setFolderName] = useState(currFolder.name);
  const [folderIsShared, setFolderIsShared] = useState(currFolder.isShared);

  const editFolderHandle = () => {
    currFolder.name = folderName;
    currFolder.isShared = folderIsShared;
    setCurrFolder('');
    setFolderName('');
    setFolderEditShow(false);
  };

  const deleteFolderHandle = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this folder? YOU WILL DELETE ALL INCLUSIVE FILES AND FOLDERS.'
      )
    ) {
      var parentFolder = back[back.length - 1];
      console.log(parentFolder);
      var locatedFolderIdx = null;
      parentFolder.items.map((item, idx) => {
        if (item.name == currFolder.name) {
          locatedFolderIdx = idx;
          return;
        }
      });
      parentFolder.items.splice(locatedFolderIdx, 1);
      setBack(back.slice(0, -1));
      setRoot(back[back.length - 1]);
      setFolderEditShow(false);
    }
  };

  useEffect(() => {
    setFolderName(currFolder.name);
    setFolderIsShared(currFolder.isShared);
  }, [currFolder, setFolderEditShow]);
  return (
    <>
      <h2>Edit Folder</h2>
      <label>Folder name:</label>
      <br />
      <input
        value={folderName}
        onChange={({ target }) => setFolderName(target.value)}
      />
      <br />
      <label>Is this a shared file? </label>
      <select
        value={folderIsShared}
        onChange={({ target }) => setFolderIsShared(target.value)}
      >
        <option value='true'>yes</option>
        <option value='false'>no</option>
      </select>
      <br />
      <button onClick={editFolderHandle}>Submit</button>
      <button onClick={() => setFolderEditShow(false)}>Cancel</button>
      <br />
      <button className='delete' onClick={deleteFolderHandle}>
        Delete
      </button>
    </>
  );
}
