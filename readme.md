# Markdown Cards
Markdown Cards (MDC) is an easy to maintain, easy to use approach for flashcards. It uses Markdown files to store the cards in a simple format, and relies on GitHub for maintainability and GitHub Pages to actually use it.

## How it works
MDC uses [GitHub flavored Markdown](https://github.github.com/gfm/) files to store your flashcards. A single file can hold any number of flashcards (a set of flashcards), with the intention to use the files to group your flashcards.

The file uses headings to provide a topic for the flashcards in the file, and to define the flashcards as well:

```
# Genki I, Lesson 1
This file will contain flashcards for the vocabulary of Lesson 1 from the book Genki I.

## そうです
### That's right

## Flashcard Side A
### Flashcard Side B
```

The level 1 heading `#` is used to set the topic of the file. An optional abstract can also be provided, to help making it clearer what flashcards are contained in this file.

The level 2 heading `##` is used to define side A of a flashcard, the following level 3 heading `###` defines side B of the same flashcard.

You can also add some additional remarks on both sides of the flashcard by adding text after the respective headings:

```
## 日本語
にほんご
### Japanese language
Romaji: nihongo
```

And that's it for the flashcards! 

You can create and edit these files directly in GitHub or with any simple text editor. And since MDC uses GitHub as its base, it is very easy for multiple users to collaborate when creating and editing sets of cards.

> Note: whitespaces at the beginning and end of a flashcard's values will be removed.

## The Technical Part
You now know how to create and maintain your sets of cards, but how can you actually use them?

> This section is still work in progress and might change in the future.

Well, there are some things you absolutely need:

- the `index.html`, `style.css` and `mdc.js` files from this repository
- an `index.md` file

All files need to be placed in the same folder. There isn't much you need to do with the first three files, but the `index.md` is for you to edit.

### The Index
The `index.md` serves as a reference file that links to all the flashcard files. It allows MDC to actually find these files and also uses Markdown:

```
# My Japanese Flashcards

## Genki I
- [Lesson 1](/genki-1/lesson-1.md)
- [Lesson 2](/genki-1/lesson-2.md)
- ...

## Genki II
- [Lesson 1](/genki-2/lesson-1.md)
- ...
```

> Since GitHub automatically parses Markdown files, you can check the file's content in GitHub and actually click on the links, to see whether they are working.

Again, you can see the use of headings in the document. These will be used by MDC to group your flashcard sets inside MDC. Also, the captions given to the links will be displayed as captions inside MDC as well.

You don't have to structure it as a list, but it surely helps when looking at the file. MDC will simply use the links in the provided order.

> The example above also shows the usage of sub folders for the flashcard files. This can really help to structure your card files, so give it a try!

### The Repository
This and the next step are tailored towards GitHub and how to host your files. You could alternatively host them anywhere else, but this is outside the scope here (and you would miss out on the comfort GitHub provides us).

As a first step, you need to create your own repository on GitHub and store the files mentioned before inside.

### Setting Up GitHub Pages