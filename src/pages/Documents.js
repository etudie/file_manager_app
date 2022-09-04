import React, { useEffect, useState } from 'react';
import CreateFile from '../components/CreateFile';
import CreateFolder from '../components/CreateFolder';
import EditFile from '../components/EditFile';
import EditFolder from '../components/EditFolder';

export default function Documents(props) {
  const root = props.root;
  const setRoot = props.setRoot;
  const [back, setBack] = useState([]);
  const [currFile, setCurrFile] = useState('');
  const [currFolder, setCurrFolder] = useState('');
  const [folderEditShow, setFolderEditShow] = useState(false);
  const [createFileShow, setCreateFileShow] = useState(false);
  const [createFolderShow, setCreateFolderShow] = useState(false);
  const [fileEditShow, setFileEditShow] = useState(false);
  const createFileHandle = () => {};
  const folderHandle = (folder) => {
    setBack([...back, root]);
    setRoot(folder);
  };
  const backHandle = () => {
    setBack(back.slice(0, -1));
    setRoot(back[back.length - 1]);
  };
  const fileEditHandle = (item) => {
    setCurrFile(item);
    setFileEditShow(true);
  };
  const folderEditHandle = (item) => {
    setCurrFolder(item);
    setFolderEditShow(true);
  };
  useEffect(() => {}, [props]);

  return (
    <>
      <div>
        {back.length > 0 && <button onClick={backHandle}>Parent Folder</button>}
        <button
          onClick={() => {
            setCreateFileShow(true);
          }}
        >
          Create File
        </button>
        <button
          onClick={() => {
            setCreateFolderShow(true);
          }}
        >
          Create Folder
        </button>
        <h1>
          Current Folder: {root.name}{' '}
          <span onClick={() => folderEditHandle(root)}>✏️</span>
        </h1>
        {console.log(back)}
        <ul>
          {root.items.map((item, idx) => {
            {
              if (item.type == undefined) {
                return (
                  <li key={idx} onClick={() => folderHandle(item)}>
                    📁 {item.name}{' '}
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    📄 {item.name}.{item.type}{' '}
                    <span onClick={() => fileEditHandle(item)}>✏️</span>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
      {folderEditShow && (
        <EditFolder
          currFolder={currFolder}
          setCurrFolder={setCurrFolder}
          setFolderEditShow={setFolderEditShow}
        />
      )}
      {fileEditShow && (
        <EditFile
          currFile={currFile}
          setCurrFile={setCurrFile}
          setFileEditShow={setFileEditShow}
        />
      )}
      {createFileShow && (
        <CreateFile
          root={root}
          setRoot={setRoot}
          currFolder={root}
          setCreateFileShow={setCreateFileShow}
        />
      )}
      {createFolderShow && (
        <CreateFolder
          root={root}
          setRoot={setRoot}
          currFolder={root}
          setCreateFolderShow={setCreateFolderShow}
        />
      )}
    </>
  );
}
