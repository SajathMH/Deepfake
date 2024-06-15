import React, { useState } from 'react';
import axios from 'axios';

function Frontend() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const detectDeepfake = async () => {
    let formData = null;

    if (selectedFile) {
      formData = new FormData();
      formData.append('file', selectedFile);
    } else if (url) {
      // Modify the API call here if your backend supports URL detection
      formData = new FormData(); // Assuming backend accepts URL in FormData
      formData.append('url', url); // Example usage, modify as needed based on backend API
    }

    if (!formData) {
      setError('Please choose a file or enter a video URL');
      return;a
    }

    try {
      const response = await axios.post('http://localhost:5000/detect', formData, {
        headers: {
          'Content-Type': formData ? 'multipart/form-data' : 'application/json', // Set Content-Type based on data type
        }
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error detecting deepfake:', error);
      setError('Error detecting deepfake. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .title {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .table {
            display: table;
            width: 25%;

    }

    .table-row {
      display: table-row;
    }

    .table-cell {
      display: table-cell;
      padding: 1rem;
      text-align: center;
      vertical-align: middle;
    }

    .file-input,
    .search-button {
      margin-bottom: 1rem;
    }

    .error-message {
      color: red;
      margin-bottom: 1rem;
    }

    .result {
      margin-top: 1rem;
    }
    body {
  background-image: url("./background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  margin: 50px;
  
}
  `}
</style>

      <h1 className="title">DEEPFAKE DETECTION</h1>
      <div className="container">
        <table className="table">
          <tr className="table-row">
            <td className="table-cell">
              <input type="file" onChange={handleFileChange} />
              
              {/*<label>Choose file</label>*/}
              
            </td>
            <td className="table-cell">
              <input type="text" value={url} onChange={handleUrlChange} placeholder="Paste the video URL" />
            
         
        <br />
        <button className="search-button" onClick={detectDeepfake}>
          Search
        </button>
        {error && <div className="error-message">{error}</div>}
        <div className="result">{result}</div>
        </td>
        </tr>
        </table>
      </div>
      
    </>
  );
}

export default Frontend;
