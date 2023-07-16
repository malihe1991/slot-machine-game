# slot-machine-game

## Project instructions

When a player starts a game, they are allocated 10 credits.
Pulling the machine lever (rolling the slots) costs 1 credit.
The game screen has 1 row with 3 blocks.
For player to win the roll, they have to get the same symbol in each block.
There are 4 possible symbols: cherry (10 credits reward), lemon (20 credits reward), orange (30 credits
reward), and watermelon (40 credits reward).
If the player keeps winning, they can play forever, but the house has something to say about that...
There is CASH OUT button on the screen, but there's a twist there as well.

## Project structure

- ### src/components

  The project starts with the main.js file where the Playground.vue component is used, this is the base component.
  The logoSVG.vue component work is, showing SVG files.

- ### src/constants

  The Constants of the project are defined here.

- ### tests/unit

  Here is some test code for the logic of the Playground.vue component methods.

## Project setup

```
npm install --force
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run test files

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Github repository

```
https://github.com/malihe1991/slot-machine-game.git
```
