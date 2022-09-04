import React, { useState, useEffect } from 'react';
export default function EditFile(props) {
  const currFile = props.currFile;
  const setCurrFile = props.setCurrFile;
  const setFileEditShow = props.setFileEditShow;
  const [fileName, setFileName] = useState(currFile.name);
  const [fileType, setFileType] = useState(currFile.type);
  const [fileIsShared, setFileIsShared] = useState(currFile.isShared);

  const editFileHandle = () => {
    currFile.name = fileName;
    currFile.type = fileType;
    currFile.isShared = fileIsShared;
    setCurrFile('');
    setFileName('');
    setFileType('txt');
    setFileEditShow(false);
  };

  useEffect(() => {
    setFileName(currFile.name);
    setFileType(currFile.type);
    setFileIsShared(currFile.isShared);
  }, [currFile, setFileEditShow]);
  return (
    <>
      <h2>Edit File</h2>
      <label>File name and type:</label>
      <br />
      <input
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
        value={fileIsShared}
        onChange={({ target }) => setFileIsShared(target.value)}
      >
        <option value='true'>yes</option>
        <option value='false'>no</option>
      </select>
      <br />
      <button onClick={editFileHandle}>Submit</button>
      <button onClick={() => setFileEditShow(false)}>Cancel</button>
    </>
  );
}
