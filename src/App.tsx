import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "./extend.css"
import React, { useState, useEffect } from 'react';
import { Stat } from './pages/Stats';
import { Race } from './pages/Races';
import { Informations } from './pages/Informations';
import { Class } from './pages/Classes';
import { Character_t } from './types/Character_t';
import { Ability_t } from './types/Ability_t';
import { Skill_t } from './types/Skill_t';
import { Race_t } from './types/Race_t';
import { Class_t } from './types/Class_t';

const Menu = ["Race", "Class", "Stats", "Attacks", "Infos"]

function App() {
  // Number to represent the menu display
  const [menu_index, set_menu_index] = useState<number>(0);


  // List of data
  const [abilities, set_abilities] = useState<Ability_t[]>([]);
  const [skills, set_skills] = useState<Skill_t[]>([]);
  const [savings, set_savings] = useState<Skill_t[]>([]);
  const [races, set_races] = useState<string[]>([]);
  const [raceSelected, set_raceSelected] = useState<string>("");
  const [raceInfo, set_raceInfo] = useState<Race_t>({ name: "name", description: "description" })
  const [classes, set_classes] = useState<string[]>([]);
  const [classSelected, set_ClassSelected] = useState<string>("");
  const [classInfo, set_classInfo] = useState<Class_t>({ name: "name", description: "description" })

  // Initialize all the data from the dnd5e api
  useEffect(() => {

    // Fetch list of abilities
    fetch("https://www.dnd5eapi.co/api/ability-scores/")
      .then((data: any) => data.json())
      .then((data: any) => {
        let temp: Ability_t[] = [];
        data.results.forEach((ability: any) => {
          temp.push({ type: ability.name, value: 10, modificator: 0 });
        });
        set_abilities(temp);

        let skill_temp = temp.map(ability => {
          return {
            name: ability.type + "_saving_throw",
            ability: ability.type,
            proefficient: false,
            coeff: 0,
          }
        }
        )
        set_savings(skill_temp)
      })

    //fetch list of skills
    fetch("https://www.dnd5eapi.co/api/skills")
      .then((data: any) => data.json())
      .then((data: any) => {
        let skillPromises = data.results.map((skill: any) =>

          // to get the associate ability, we need another request
          fetch("https://www.dnd5eapi.co/api/skills/" + skill.name.replace(/ /g, "-").toLowerCase())
            .then((data: any) => data.json())
            .then((data: any) => ({
              name: skill.name,
              ability: data.ability_score.name,
              proefficient: false,
              coeff: 0,
            }))
        );
        return Promise.all(skillPromises)
      })
      .then((skills: Skill_t[]) => {
        set_skills(skills)
      })

    let temp: string[];
    fetch("https://www.dnd5eapi.co/api/races")
      .then((data: any) => data.json())
      .then((data: any) => {
        temp = data.results.map((races: any) => races.index)
        set_races(temp)
      })

    temp = [];
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((data: any) => data.json())
      .then((data: any) => {
        temp = data.results.map((races: any) => races.index)
        set_classes(temp)
      })
  }, [])

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/races/${raceSelected}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        console.log(data);
        set_raceInfo({ name: raceSelected, description: `${data.alignment} ${data.language_desc} ${data.size_description}` })
      })
  }, [raceSelected])

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/classes/${classSelected}`)
      .then((data: any) => data.json())
      .then((data: any) => {
        set_classInfo({ name: classSelected, description: `${data.proficiencies?.map((el: any) => `${el.name} `)}` })
      })
  }, [classSelected])



  // Function to represent the menu
  const MenuDisplay = () => <div className='d-flex row'>
    {Menu.map((el, index) => <button className='btn btn-primary m-auto' onClick={
      () => { set_menu_index(index) }
    }>{el}</button>)}
  </div>

  // React Element to display
  return (
    <div className="App" >
      <div className='d-flex mx-2'>
        <MenuDisplay />
        <div className='d-flex row w-75 ms-5'>
          {menu_index === 0 && <Race raceInfo={raceInfo} set_raceInfo={set_raceInfo} set_raceSelected={set_raceSelected} raceSelected='' races={races} />}
          {menu_index === 1 && <Class classes={classes} classInfo={classInfo} classSelected={classSelected} set_ClassSelected={set_ClassSelected} set_classInfo={set_classInfo} set_classes={set_classes} />}
          {menu_index === 2 && <Stat abilities={abilities} set_abilities={set_abilities} skills={skills} set_skills={set_skills} />}
          {menu_index === 4 && <Informations />}
        </div>

      </div>
      <button onClick={
        () => {
          let ch: Character_t = new Character_t(1);
          ch.Abilities = abilities
          ch.Skills = skills
          ch.Race = raceInfo
          let channelId = 0, PlayerID = 0

          // TODO FETCH HERE
          fetch(`https://localhost:7145/Character/CreateCharacter?idPlayer=${channelId}&idGame=${PlayerID}`,
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(ch)
            });
        }}> Valider Personnage </button>
    </div>
  );
}

export default App;
