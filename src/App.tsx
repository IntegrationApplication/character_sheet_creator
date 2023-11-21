import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "./extend.css"
import { Character_t } from "./types/Character_t"
import React, { useState } from 'react';
import { Stat } from './pages/Stats';
import { Race } from './pages/Races';
import { Informations } from './pages/Informations';
import { Class } from './pages/Classes';
const Menu = ["Race", "Class", "Stats", "Attacks", "Infos"]

function App() {
  // Number to represent the menu display
  const [menu_index, set_menu_index] = useState<number>(0);
  // TODO: find a real id
  const [character, setCharacter] = useState<Character_t>(new Character_t(1));

  // Function to represent the menu
  const MenuDisplay = () => <div className='d-flex row'>
    {Menu.map((el, index) => <button className='btn btn-primary m-auto' key={"menuBtn"+index} onClick={
      () => { set_menu_index(index) }
    }>{el}</button>)}
  </div>

  // React Element to display
  return (
    <div className="App" >
      <div className='d-flex mx-2'>
        <MenuDisplay />
        <div className='d-flex row w-75 ms-5'>
          {menu_index === 0 && <Race/>}
          {menu_index === 1 && <Class/>}
          {menu_index === 2 && <Stat />}
          {menu_index === 4 && <Informations character={character} setCharacter={setCharacter}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
