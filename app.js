/* require { ALL_CHARACTERS } from ("./constants/character.constants");
require { createCharactersObject } from ("./utility"); */

const OBIWAN_KENOBI = {
  key: "obiwan",
  name: "Obi-Wan Kenobi",
  health: 140,
  attackPower: 30,
  counterPower: 15,
  charImage:
    "https://archive.nerdist.com/wp-content/uploads/2017/09/Obi1Header.jpg"
};
const LUKE_SKYWALKER = {
  key: "luke",
  name: "Luke Skywalker",
  health: 110,
  attackPower: 15,
  counterPower: 10,
  charImage:
    "https://www.syfy.com/sites/syfy/files/styles/1200x680/public/2019/02/skywalker.jpg?timestamp=1549417950"
};
const DARTH_SEDIOUS = {
  key: "sedious",
  name: "Darth Sedious",
  health: 125,
  attackPower: 20,
  counterPower: 15,
  charImage:
    "https://sleeplessthought.files.wordpress.com/2015/12/darth_sidious__hunt_you_down_by_electricboa-d6fbqln.png?w=1024&h=576&crop=1"
};
const DARTH_MAUL = {
  key: "maul",
  name: "Darth Maul",
  health: 130,
  attackPower: 30,
  counterPower: 20,
  charImage:
    "https://i.kinja-img.com/gawker-media/image/upload/s--acH5OuNr--/c_scale,f_auto,fl_progressive,q_80,w_800/vknd9yf3bcohbisb6xmb.jpg"
};

const ALL_CHARACTERS = [
  OBIWAN_KENOBI,
  LUKE_SKYWALKER,
  DARTH_SEDIOUS,
  DARTH_MAUL
];

// Create a character object from character array by using reduce.
// Then clone variables to this new object and return object.
const createCharactersObject = characters =>
  characters.reduce(
    (result, { key, ...otherCharacterValues }) => ({
      ...result,
      [key]: {
        ...otherCharacterValues
      }
    }),
    {}
  );

class Game {
  constructor(characters) {
    this.characters = createCharactersObject(characters);
    this.activeCharacter = null;
    this.opposingCharacters = [];
    this.defendingCharacter = null;
    this.activeCharacterBasePower = null;
  }

  // Set characters 'status' from the character object by using the key property.
  setActiveCharacter(characterKey) {
    if (this.activeCharacter === null) {
      this.activeCharacter = this.characters[characterKey];
      this.activeCharacterBasePower = this.characters[characterKey].attackPower;
    }
  }

  // for each character that is not the active character add the character to opposingCharacters
  setOpposingCharacters() {
    for (var character in this.characters) {
      if (this.characters[character] !== this.activeCharacter)
        this.opposingCharacters.push(character);
    }
  }

  // set the characters key to true
  setDefendingCharacter(characterKey) {
    if (this.defendingCharacter === null) {
      this.defendingCharacter = characterKey;
    }
  }

  setDefeatedCharacter() {
    for (var character in this.characters) {
      if (this.activeCharacter.health === 0) {
        console.log("you lose");
      } else if (
        character.health === 0 &&
        !this.activeCharacter &&
        this.opposingCharacters !== []
      ) {
        var removeCharacter = this.opposingCharacters.findIndex(character.key);
        this.opposingCharacters.splice(removeCharacter, 1);
        this.defendingCharacter === null;
      } else {
        console.log("you win");
      }
    }
  }

  populateCharacterList() {
    $("#availableChar").empty();
    for (var character in this.characters) {
      if (this.activeCharacter !== this.characters[character]) {
        $("#availableChar")
          .append(`<div class='col-md-3' style='border: 1px solid black; margin-right:10px;'>
      <p class="justify-content-center d-flex">${this.characters[
        character
      ].name.toString()}</p>
      <img src='${this.characters[
        character
      ].charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.characters[
        character
      ].health.toString()}</p>
      </div>`);
      }
    }
  }

  populateActiveCharacterList() {
    $("#yourChar")
      .append(`<div class='col-md-3' style='border: 1px solid black;'>
      <p class="justify-content-center d-flex">${this.activeCharacter.name.toString()}</p>
      <img src='${this.activeCharacter.charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.activeCharacter.health.toString()}</p>
      </div>`);
  }

  populateFightingCharcters() {}

  populateDefendingCharacter() {
    $("#yourChar").empty();
    $("#defender").empty();
    $("#defender")
      .append(`<div class='col-md-3' style='border: 1px solid black;'>
      <p class="justify-content-center d-flex">${this.characters[
        this.defendingCharacter
      ].name.toString()}</p>
      <img src='${this.characters[
        this.defendingCharacter
      ].charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.characters[
        this.defendingCharacter
      ].health.toString()}</p>
      </div>`);
    $("#fightSection")
      .append(`<div class='col-md-3' style='border: 1px solid black;'>
      <p class="justify-content-center d-flex">${this.activeCharacter.name.toString()}</p>
      <img src='${this.activeCharacter.charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.activeCharacter.health.toString()}</p>
      </div>`);
  }

  populateOpposingCharactersList() {
    $("#availableChar").empty();
    $("#opposition").empty();
    for (var opposition in this.opposingCharacters) {
      if (this.defendingCharacter !== this.opposingCharacters[opposition]) {
        $("#opposition")
          .append(`<div class='col-md-3' style='border: 1px solid black; margin-right:10px;'>
      <p class="justify-content-center d-flex">${this.characters[
        this.opposingCharacters[opposition]
      ].name.toString()}</p>
      <img src='${this.characters[
        this.opposingCharacters[opposition]
      ].charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.characters[
        this.opposingCharacters[opposition]
      ].health.toString()}</p>
      </div>`);
      }
    }
  }

  attack() {
    this.defendingCharacter.health -= this.activeCharacter.attackPower;
  }

  counterAttack() {
    this.activeCharacter.health -= this.defendingCharacter.counterPower;
  }

  upgradePower() {
    console.log(this.activeCharacter);
    this.activeCharacter.attackPower += this.activeCharacterBasePower;
    console.log(this.activeCharacter);
  }
}

$(document).ready(function() {
  const myGame = new Game(ALL_CHARACTERS);
  myGame.populateCharacterList();
  myGame.setActiveCharacter("obiwan");
  myGame.populateCharacterList();
  myGame.populateActiveCharacterList();
  myGame.setOpposingCharacters();
  myGame.populateOpposingCharactersList();
  myGame.upgradePower();
  myGame.setDefendingCharacter("maul");
  myGame.populateDefendingCharacter();
  myGame.populateOpposingCharactersList();
  console.log(myGame.opposingCharacters);
  console.log(myGame.activeCharacter);
  console.log(myGame);
});
