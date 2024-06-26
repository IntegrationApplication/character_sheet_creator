import { abilitiesNames, Character_t } from "../types/Character_t";
import { Attack_t } from "../types/Attack_t";
import React, { useState } from 'react';
import { DropdownList } from "react-widgets/cjs";
import "react-widgets/styles.css";

interface AttackFormType {
    index: number;
    character: Character_t;
}
const AttackForm: React.FC<AttackFormType> = ({ index, character }) => {
    const [name, setName] = useState<string>(character.Attacks[index].name);
    const [linkedAbility, setLinkedAbility] = useState<string>(character.Attacks[index].linkedAbility);
    const [damageType, setDamageType] = useState<string>(character.Attacks[index].damageType);
    const [nbDices, setNbDices] = useState<number>(character.Attacks[index].nbDices);
    const [dicesFaces, setDicesFaces] = useState<number>(character.Attacks[index].dicesFaces);
    // note: we could compute the damage bonus automatically
    const [damageBonus, setDamageBonus] = useState<number>(character.Attacks[index].damageBonus);

    // note: la combobox est buguée
    return (
        <>
            <h3 className="mt-5">Weapon {index}:</h3>
            <label className="row mt-3">
                <div className="col">name:</div>
                <input className="col" type="string" key="name" value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        character.Attacks[index].name = e.target.value;
                    }}
                    required>
                </input>
            </label>
            <label className="row mt-3">
                <div className="col">stat name:</div>
                <DropdownList
                    data={abilitiesNames}
                    value={linkedAbility}
                    onChange={ (value:any) => {
                        setLinkedAbility(value);
                        character.Attacks[index].linkedAbility = value;
                    }} />
            </label>
            <label className="row mt-3">
                <div className="col">damage type:</div>
                <input className="col" type="string" key="damageType" value={damageType}
                    onChange={(e) => {
                        setDamageType(e.target.value);
                        character.Attacks[index].damageType = e.target.value;
                    }}
                    required>
                </input>
            </label>
            <label className="row mt-3">
                <div className="col">dice number:</div>
                <input className="col" type="number" key="nbDices" value={nbDices}
                    onChange={(e) => {
                        setNbDices(+e.target.value);
                        character.Attacks[index].nbDices = +e.target.value;
                    }}
                    required>
                </input>
            </label>
            <label className="row mt-3">
                <div className="col">dice faces:</div>
                <input className="col" type="number" key="dicesFaces" value={dicesFaces}
                    onChange={(e) => {
                        setDicesFaces(+e.target.value);
                        character.Attacks[index].dicesFaces = +e.target.value;
                    }}
                    required>
                </input>
            </label>
            <label className="row mt-3">
                <div className="col">bonus:</div>
                <input className="col" type="number" key="damageBonus" value={damageBonus}
                    onChange={(e) => {
                        setDamageBonus(+e.target.value);
                        character.Attacks[index].damageBonus = +e.target.value;
                    }}
                    required>
                </input>
            </label>
        </>
    );
}

/******************************************************************************/
/*                                  attacks                                   */
/******************************************************************************/

interface AttacksType {
    character: Character_t;
    setCharacter: React.Dispatch<React.SetStateAction<Character_t>>;
}
export function Attacks({ character, setCharacter }: AttacksType) {
    const [ nbAttacks, setNbAttacks ] = useState<number>(character.Attacks.length);

    const AttacksDisplay = () => {
        let idx = -1;
        return (
                <>
                {
                    character.Attacks.map(elt => {
                        idx++;
                        return (
                            <AttackForm index={idx} key={`attackForm${idx}`} character={character} />
                        );
                    })
                }
                </>
            )
    }

    // todo: create a table to describe each input
    return (
        <div>
            <h2>Character's Attacks</h2>

            <AttacksDisplay />

            <button onClick={() => {
                let attack = new Attack_t();
                character.Attacks.push(attack);
                setNbAttacks(nbAttacks + 1);
            }}>new weapon</button>
        </div>
    );
}
