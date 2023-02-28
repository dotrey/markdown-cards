# Roadmap for Markdown Cards

## 01 - Parsing Flashcard Files
__Reached:__ 2022-08-07

__Scope:__
- Load a flashcard file
- Parse a loaded flashcard file
    - Supported card features:
        - two sides
        - annotations for both sides
- Create a card set containing the flashcards from the parsed file

## 02 - Parse Library Index
__Reached:__ 2023-02-19

__Scope:__
- Parse the `index.md` file
- Create a card set library from it (with named card sets)

## 03 - Basic UI (MVP)
__Reached:__ -

__Scope:__
- UI shows card sets in the library
- UI allows to select a card set
- UI displays cards of selected card set
- UI allows to toggle between sides of a card
- UI allows to continue to the next card of a set and back to overview after last card

## 04 - Learning with System
__Reached:__ -

__Scope:__
- UI allows to mark card as "known" or "forgotten"
- Cards are shown in random order
- Implement a [Leitner System](https://en.wikipedia.org/wiki/Leitner_system) in the background:
    - 5 boxes, every card starts in the first box
    - a "known" card is moved to the next box
    - a "forgotten" card is moved to the first box
    - cards in lower-number boxes are shown more often
- Leitner boxes and cards are locally stored on the device
    - Import/export option via JSON file to move data between devices

## 05 - Ice Cream: Vanilla
__Reached:__ -

__Scope:__
- Final UI implemented with Vanilla JS 
    - Tap card to reveal other side
    - Swiping for cards:
        - to the right for known cards
        - to the left for forgotten cards
    - Smooth transitions for cards:
        - reducing blur when coming from the stack in the background
        - shrink to bottom left/right after swipe
    - Nice styling

## 06 - Ice Cream: Mint Chocolate Chip
__Reached:__ -

__Scope:__
- UI implemented with [Vue.js](https://vuejs.org/)
    - Should look and feel the same as vanilla JS

## 07 - Ice Cream: Strawberry Cheesecake
__Reached:__ -

__Scope:__
- UI implemented with [Svelte](https://svelte.dev/)
    - Should look and feel the same as vanilla JS

## 08 - Ice Cream: Atomic Blueberry
__Reached:__ -

__Scope:__
- UI implemented with [React](https://reactjs.org/)
    - Should look and feel the same as vanilla JS

## 09 - Ice Cream: Blue Moon
__Reached:__ -

__Scope:__
- UI implemented with [Lit](https://lit.dev/)
    - Should look and feel the same as vanilla JS

## 10 - Ice Cream: Raspberry Ripple
__Reached:__ -

__Scope:__
- UI implemented with [Angular](https://angular.io/)
    - Should look and feel the same as vanilla JS

## 11 - Ice Cream: Green Tea
__Reached:__ -

__Scope:__
- UI implemented with [Mithril](https://mithril.js.org/)
    - Should look and feel the same as vanilla JS