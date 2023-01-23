import { useFilePicker } from 'use-file-picker';
import React from 'react';

export default function Filepicker() {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: 'image/*',
    multiple: 'false',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFileSelector()}>Select image</button>
      <br />
      {filesContent.map((file, index) => (
        <div>
          <h2>{file.name}</h2>
          {/* <div key={index}>{file.content}</div> */}
          <br />
        </div>
      ))}
    </div>
  );
}