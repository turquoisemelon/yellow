import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';



const getData = () => {
  return fetch(`https://api.spotify.com/v1/artists?ids=0oSGxfWSnnOXhD2fKuz2Gy,3dBVyJ7JuOMt4GE9607Qin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accesToken}`
    }
  })
  .then(response => response.json())
}

function App() {
  const [artistData, updateArtistData] = useState([])
  const [value, updateInputValue] = useState("")
  
  const handleClick = () => {
    getData().then(({artists}) => {updateArtistData(artists)})
  }

  const handleChange = (e) => {
    updateInputValue(e.target.value)
    const filteredData = artistData.filter(data => data.name.includes(e.target.value))
    updateArtistData(filteredData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Spotify artist data
        </p>
      </header>
      <button onClick={handleClick}>Get Spotigy Data</button>
      <ul>
        {
          artistData ? artistData.map(item => <li key={item.name}>{item.name}</li>) : null
        }
      </ul>
      <input type="text" value={value} onChange={(e) => handleChange(e)} placeholder="search"/>
    </div>
  );
}

export default App;
