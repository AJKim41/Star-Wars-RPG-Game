/* require { ALL_CHARACTERS } from ("./constants/character.constants");
require { createCharactersObject } from ("./utility"); */

const OBIWAN_KENOBI = {
  key: "obiwan",
  name: "Obi-Wan Kenobi",
  health: 140,
  attackPower: 6,
  counterPower: 13,
  charImage:
    "https://archive.nerdist.com/wp-content/uploads/2017/09/Obi1Header.jpg"
};
const LUKE_SKYWALKER = {
  key: "luke",
  name: "Luke Skywalker",
  health: 110,
  attackPower: 9,
  counterPower: 15,
  charImage:
    "https://www.syfy.com/sites/syfy/files/styles/1200x680/public/2019/02/skywalker.jpg?timestamp=1549417950"
};
const DARTH_SEDIOUS = {
  key: "sedious",
  name: "Darth Sedious",
  health: 125,
  attackPower: 7,
  counterPower: 14,
  charImage:
    "https://sleeplessthought.files.wordpress.com/2015/12/darth_sidious__hunt_you_down_by_electricboa-d6fbqln.png?w=1024&h=576&crop=1"
};
const DARTH_MAUL = {
  key: "maul",
  name: "Darth Maul",
  health: 130,
  attackPower: 6,
  counterPower: 15,
  charImage:
    "https://i.kinja-img.com/gawker-media/image/upload/s--acH5OuNr--/c_scale,f_auto,fl_progressive,q_80,w_800/vknd9yf3bcohbisb6xmb.jpg"
};

const ALL_CHARACTERS = [
  OBIWAN_KENOBI,
  LUKE_SKYWALKER,
  DARTH_SEDIOUS,
  DARTH_MAUL
];

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

  setActiveCharacter(characterKey) {
    if (this.activeCharacter === null) {
      this.activeCharacter = this.characters[characterKey];
      this.activeCharacterBasePower = this.activeCharacter.attackPower;
    }
  }

  setOpposingCharacters() {
    this.opposingCharacters = [];
    for (var character in this.characters) {
      if (this.characters[character] !== this.activeCharacter)
        this.opposingCharacters.push(character);
    }
  }

  setDefendingCharacter(characterKey) {
    if (this.defendingCharacter === null) {
      this.defendingCharacter = this.characters[characterKey];
      this.defendingCharacterKey = characterKey;
    }
  }

  setDefeatedCharacter() {
    if (this.activeCharacter.health <= 0) {
      initiateGame();
      $("#opposition").empty();
      setTimeout(() => alert("You Lose!"), 0);
    } else if (
      this.defendingCharacter.health <= 0 &&
      this.opposingCharacters.length !== 0
    ) {
      var remove = this.opposingCharacters.indexOf(this.defendingCharacterKey);
      this.opposingCharacters.splice(remove, 1);
      this.defendingCharacter = null;
      this.defendingCharacterKey = null;
      this.populateDefendingCharacter();
      this.populateOpposingCharactersList();
      if (
        this.activeCharacter.health > 0 &&
        this.opposingCharacters.length === 0
      ) {
        initiateGame();
        setTimeout(() => alert("You Win!"), 0);
      } else {
        setTimeout(() => alert("Pick another opponent!"), 0);
      }
    }
  }

  populateCharacterList() {
    $("#availableChar").empty();
    for (var character in this.characters) {
      if (this.activeCharacter !== this.characters[character]) {
        $("#availableChar")
          .append(`<div class='col-md-3 character-selection' style='border: 1px solid black; margin-right:10px;' id='${character}'>
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
      .append(`<div class='col-md-3' style='border: 1px solid black; padding-top: 10px;'>
      <p class="justify-content-center d-flex">${this.activeCharacter.name.toString()}</p>
      <img src='${this.activeCharacter.charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.activeCharacter.health.toString()}</p>
      </div>`);
  }

  populateDefendingCharacter() {
    $("#yourChar").empty();
    $("#fightSection").empty();
    $("#defender").empty();
    $("#fightSection")
      .append(`<div class='col-md-3' style='border: 1px solid black; padding-top: 10px;' id='${this.activeCharacter.name.toString()}'>
      <p class="justify-content-center d-flex">${this.activeCharacter.name.toString()}</p>
      <img src='${this.activeCharacter.charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.activeCharacter.health.toString()}</p>
      </div>`);

    if (this.defendingCharacterKey !== null) {
      $("#defender")
        .append(`<div class='col-md-3 defender-character' style='border: 1px solid black; padding-top: 10px; margin-bottom: 20px;' id='${
        this.defendingCharacter.name
      }'>
      <p class="justify-content-center d-flex">${this.defendingCharacter.name.toString()}</p>
      <img src='${this.defendingCharacter.charImage.toString()}' class='img-fluid'>
      <p class="justify-content-center d-flex">${this.defendingCharacter.health.toString()}</p>
      </div>`);
    }
  }

  populateOpposingCharactersList() {
    $("#availableChar").empty();
    $("#opposition").empty();
    for (var opposition in this.opposingCharacters) {
      if (this.defendingCharacterKey !== this.opposingCharacters[opposition]) {
        $("#opposition")
          .append(`<div class='col-md-3 defender-selection' style='border: 1px solid black; margin-right:10px; padding-top: 10px;' id='${
          this.opposingCharacters[opposition]
        }'>
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
    this.upgradePower();
    this.setDefeatedCharacter();
  }

  counterAttack() {
    if (
      this.defendingCharacter !== null &&
      this.defendingCharacter.health > 0
    ) {
      this.activeCharacter.health -= this.defendingCharacter.counterPower;
      this.setDefeatedCharacter();
    }
  }

  upgradePower() {
    this.activeCharacter.attackPower += this.activeCharacterBasePower;
  }
}

function initiateGame() {
  window.myGame = new Game(ALL_CHARACTERS);
  myGame.populateCharacterList();
  $(".character-selection").click(function(event) {
    myGame.setActiveCharacter(event.currentTarget.id);
    myGame.populateActiveCharacterList();
    myGame.setOpposingCharacters();
    myGame.populateOpposingCharactersList();

    $(".defender-selection").click(function(event) {
      myGame.setDefendingCharacter(event.currentTarget.id);
      myGame.populateDefendingCharacter();
      myGame.populateOpposingCharactersList();
      myGame.setOpposingCharacters();
    });
  });

  $("#attack").click(function() {
    myGame.attack();
    myGame.counterAttack();
    myGame.populateDefendingCharacter();
    $(".defender-selection").click(function(event) {
      myGame.setDefendingCharacter(event.currentTarget.id);
      myGame.populateDefendingCharacter();
      myGame.populateOpposingCharactersList();
    });
  });

  var styleTag = $(
    "<style>* { color: #fff; } #attack {color:#000 !important;}</style>"
  );
  $("html > head").append(styleTag);
}

$(document).ready(function() {
  window.myGame = new Game(ALL_CHARACTERS);
  initiateGame();
});
