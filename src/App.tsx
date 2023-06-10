import { useState } from 'react';
import './App.css';
import Login from './Components/Login';

export default function App() {
  const [APIKey, setAPIKey] = useState('');

  return (
    <div className='App'>
      <Login setAPIKey={setAPIKey} />
      {APIKey} APIKey
      <header className='App-header'>
        <img src='Octocat.png' className='App-logo' alt='logo' />
        <p>
          GitHub Codespaces <span className='heart'>♥️</span> React
        </p>
        <p className='small'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}
