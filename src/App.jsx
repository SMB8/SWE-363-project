import { useState } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Header from './codeParts/Header';
import CreatingEvent from './codeParts/CreatingEvent';
import CheckEvent from './codeParts/CheckEvent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CheckEvent/>
    </>
  )
}
 
export default App
