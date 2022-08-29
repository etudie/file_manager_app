import React, { useState } from 'react';
import CreateFile from '../components/CreateFile';
import CreateFolder from '../components/CreateFolder';
export default function Documents(props) {
  const root = props.root;
  const setRoot = props.setRoot;
  const [prevFolder, setPrevFolder] = useState(root);
  const createFileHandle = () => {};
  const folderHandle = (folder) => {
    setPrevFolder(root);
    setRoot(folder);
  };
  const prevFolderHandle = () => {
    setRoot(prevFolder);
  };
  return (
    <>
      <div>
        <button onClick={prevFolderHandle}>Parent folder</button>
        <button onClick={createFileHandle}>Create File</button>
        <button>Create Folder</button>
        <h1>Current Folder: {root.name}</h1>
        <ul>
          {root.items.map((item, idx) => {
            {
              if (item.type == undefined) {
                return (
                  <li key={idx} onClick={() => folderHandle(item)}>
                    {item.name}
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    {item.name}.{item.type}
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
      <CreateFile root={root} setRoot={setRoot} currFolder={root} />
      <CreateFolder root={root} setRoot={setRoot} currFolder={root} />
    </>
  );
}
