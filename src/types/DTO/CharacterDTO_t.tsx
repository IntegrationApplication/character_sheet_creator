import { Ability_t } from "../Ability_t";
import { Attack_t } from "../Attack_t";
import { Character_t } from "../Character_t";
import { AttackDTO_t } from "./AttackDTO_t";

export class CharacterDTO_t {
    id: number = 0;
    idGame: number = 0;
    idPlayer: number = 0;
    name: string = "";
    className: string = "";
    raceName: string = "";
    level: number = 0;
    ac: number = 0;
    spellSaveDC: number = 0;
    spellCastAbility: number = 0;
    initiative: number = 0;
    hp: number = 0;
    hpMax: number = 0;
    hitDiceNumber: number = 0;
    hitDiceValue: number = 0;
    stats: Array<number> = [];
    skills: Array<number> = [];
    proefficiencies: Array<boolean> = [];
    attacks: Array<AttackDTO_t> = [];
    proefficiencyBonus: number = 0;
    passivePerception: number = 0;

    fromCharacter(this: CharacterDTO_t, character: Character_t) {
        this.id = character.Id; // note: useless ?
        this.name = character.Name;
        this.className = character.Class.name;
        this.raceName = character.Race.name;
        this.level = character.Level;
        this.ac = character.Ac;
        this.spellSaveDC = character.SpellSaveDC;
        this.spellCastAbility = character.SpellCastAbility;
        this.initiative = character.Initiative;
        this.hp = character.Hp;
        this.hpMax = character.HpMax;
        this.hitDiceNumber = character.hitdice[0];
        this.hitDiceValue = character.hitdice[1];
        character.Abilities.forEach((ability) => {
            this.stats.push(ability.value);
            this.proefficiencies.push(ability.proefficient);
        });
        character.Skills.forEach((skill) => {
            this.skills.push(skill.coeff);
            this.proefficiencies.push(skill.proefficient);
        });
        character.Attacks.forEach(attack => this.attacks.push(new
                    AttackDTO_t(attack)));
        this.proefficiencyBonus = character.ProefficiencyBunus;
        // Peut être enlever ça dans le back, je sais pas si c'est vraiement
        // utile, ça sert à rien
        // this.passivePerception = 10 + character.Abilities[5].value;
    }
}
