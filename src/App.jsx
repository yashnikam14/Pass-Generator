import { useCallback, useEffect, useState, useRef, useReducer } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);

  const [num, setNum] = useState(false);

  const [chars, setChars] = useState(false);

  const [password, setPassword] = useState("");

  //useRef
  const passwordRef = useRef(null);

  const passGen = useCallback(()=>{

    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(num) str += "0123456789";

    if(chars) str += "@#$&()<>";

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
      
    }

    setPassword(pass);
  },
    [length,num,chars,setPassword]);


    // copy to clipboard 
    const copyPassToClipBoard = useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,5)
      window.navigator.clipboard.writeText(password)
    },[password])



    useEffect(() => {
      passGen()
    },[length,num,chars,passGen]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-md px-4 py-3 my-8 bg-gray-800 text-orange-500'>

      <h1 className='text-white text-center font-bold'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mt-3 mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-2 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}/>
        <button onClick={copyPassToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}}/>
          <label>Length {length}</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          value={num}
          id='numInput'
          className='cursor-pointer' 
          onChange={() => {setNum((prev) => !prev)}}/>
          <label>Numbers</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          value={chars}
          id='charInput'
          className='cursor-pointer' 
          onChange={() => {setChars((prev) => !prev)}}/>
          <label>Characters</label>

        </div>
      </div>
      </div>
    </>
  )
}

export default App
