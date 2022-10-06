import React, { useEffect, useState } from 'react';
import CreateFile from '../components/CreateFile';
import CreateFolder from '../components/CreateFolder';
import EditFile from '../components/EditFile';
import EditFolder from '../components/EditFolder';

export default function Documents(props) {
  const root = props.root;
  const setRoot = props.setRoot;
  const [back, setBack] = useState([]);
  const setRecent = props.setRecent;
  const [currFile, setCurrFile] = useState('');
  const [currFolder, setCurrFolder] = useState('');
  const [folderEditShow, setFolderEditShow] = useState(false);
  const [createFileShow, setCreateFileShow] = useState(false);
  const [createFolderShow, setCreateFolderShow] = useState(false);
  const [fileEditShow, setFileEditShow] = useState(false);

  const folderHandle = (folder) => {
    props.recent.items.push(folder);
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
  const logoutHandle = () => {
    setRoot(back[0]);
    props.setIsLoggedIn(false);
  };

  const documentHandle = () => {
    setBack([]);
    setRoot(props.documents);
  };
  const desktopHandle = () => {
    setBack([]);
    setRoot(props.desktop);
  };
  const recentHandle = () => {
    setRoot(props.recent);
  };
  useEffect(() => {}, [props]);

  return (
    <>
      <div className='main'>
        <div className='action-buttons'>
          {back.length > 0 && (
            <button className='parent' onClick={backHandle}>
              Parent Folder
            </button>
          )}
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
          <br />
          Logged in as: {props.logUsername}
          <button className='logout' onClick={logoutHandle}>
            Logout
          </button>
        </div>
        <div className='tabs'>
          <button className='tab' onClick={recentHandle}>
            Recent
          </button>
          <button className='tab' onClick={desktopHandle}>
            Desktop
          </button>
          <button className='tab' onClick={documentHandle}>
            Documents
          </button>
        </div>
        <h1>
          Current Folder:{' '}
          <span title={'Shared: ' + root.isShared + '\nOwner: ' + root.owner}>
            {root.name}{' '}
          </span>
          {!root.main && <span onClick={() => folderEditHandle(root)}>✏️</span>}
        </h1>
        <i>
          Current path: {back.map((item) => '' + item.name + ' > ')} {root.name}
        </i>
        {console.log(back)}
        <ul>
          {root.items.map((item, idx) => {
            {
              if (
                item.type == undefined &&
                (item.isShared == 'true' || item.owner == props.logUsername)
              ) {
                return (
                  <li
                    key={idx}
                    onClick={() => folderHandle(item)}
                    title={
                      'Shared: ' + item.isShared + '\nOwner: ' + item.owner
                    }
                  >
                    📁 {item.name}{' '}
                  </li>
                );
              } else {
                if (
                  item.isShared == 'true' ||
                  item.owner == props.logUsername
                ) {
                  return (
                    <li
                      key={idx}
                      title={
                        'Shared: ' + item.isShared + '\nOwner: ' + item.owner
                      }
                    >
                      📄 {item.name}.{item.type}{' '}
                      <span onClick={() => fileEditHandle(item)}>✏️</span>
                    </li>
                  );
                }
              }
            }
          })}
        </ul>
        <div className='action'>
          {folderEditShow && (
            <EditFolder
              setRoot={setRoot}
              back={back}
              setBack={setBack}
              currFolder={currFolder}
              setCurrFolder={setCurrFolder}
              setFolderEditShow={setFolderEditShow}
            />
          )}
          {fileEditShow && (
            <EditFile
              currFolder={root}
              setCurrFolder={setCurrFolder}
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
              logUsername={props.logUsername}
            />
          )}
          {createFolderShow && (
            <CreateFolder
              root={root}
              setRoot={setRoot}
              currFolder={root}
              setCreateFolderShow={setCreateFolderShow}
              logUsername={props.logUsername}
            />
          )}
        </div>
      </div>
    </>
  );
}
