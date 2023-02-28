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

## 05 - Ice Cream: Mint Chocolate Chip
__Reached:__ -

__Scope:__
- UI implemented with [Vue.js](https://vuejs.org/)
    - Tap card to reveal other side
    - Swiping for cards:
        - to the right for known cards
        - to the left for forgotten cards
    - Smooth transitions for cards:
        - reducing blur when coming from the stack in the background
        - shrink to bottom left/right after swipe
    - Nice styling