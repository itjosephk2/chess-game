
# Chess Game

![Chess Game mockup images](assets/readme-files/image.png)

This is a local two-player chess game with basic rule enforcement to prevent most illegal moves. A built-in rules modal offers a quick overview of how each piece moves and the objective of the game.

### Current Limitations
- Castling is not yet supported  
- En passant is not implemented  

### Planned Features
- Full rule support  
- Computer opponents  
- A more interactive experience for new players with dots to show legal moves


Visit the deployed website [here](https://itjosephk2.github.io/chess-game/)

## Table of Contents

1. [User Experience (UX)](#user-experience-ux)
    1. [Project Goals](#project-goals)
    2. [User Requirements](#user-requirements)
    3. [Color Scheme](#color-scheme)
    4. [Typography](#typography)
    5. [Wireframes](#wireframes)
2. [Features](#features)
    1. [General](#general)
    3. [Game Board](#game-board)
 3. [Technologies Used](#technologies-used)
    1. [Languages Used](#languages-used)
    2. [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)
4. [Testing](#testing)
    1. [Testing User Stories](#testing-user-stories)
    2. [Code Validation](#code-validation)
    3. [Accessibility](#accessibility)
    4. [Tools Testing](#tools-testing)
    5. [Browser compatibility](#browser-compatibility)
5. [Finished Product](#finished-product)
6. [Deployment](#deployment)
    1. [GitHub Pages](#github-pages)
7. [Credits](#credits)
    1. [Content](#content)
    2. [Media](#media)
    3. [Code](#code)
8. [Acknowledgements](#acknowledgements)

***

## User Experience (UX)

### Project Goals

* The website should allow users to move chess pieces and play a full game of chess.

* Ideally the rules and legal moves will be built into the game.

* Supply the user with a link to learn how to play the game.

* Allow the user to change the theme of the chessboard.

### User Requirements

* As a user, I want to be able to navigate the website intuitively and be able to play chess.

* As a user, I want to play chess locally with another person.

* As a user, I want to see the notation of my game on screen

* As a user, I want to be dissalowed from making illegal moves.


### Color Scheme
The colors used in this site are primarily based on the black and white of a chessboard.

### Typography

The main font used in the site is The site uses Roboto as the primary font, with Arial and sans-serif as fallbacks. 

### Wireframes

Wire frames were drawn by hand to form a rough structural shape of the site and then each section was designed with pen and paper and mocked up with html and css befor implementation.



[Back to top ⇧](#Chess-Game)


## Features

### General

* Chess game for playing with two people

### index.html

### Game Board
![Game Board Image](assets/readme-files/game-board.png)

* chess Board

  - The chessboard allows players to move pieces using click events.
       

### Notation Board
![Notation image](assets/readme-files/notation-bar.png)

* Notation Board

  - This updates with the moves of the game in order they occur.

  - It dissapears on smaller viewports
 
[Back to top ⇧](#Chess-Game)

## Technologies Used

### Languages Used
* [HTML5](https://en.wikipedia.org/wiki/HTML5)
* [CSS3](https://en.wikipedia.org/wiki/CSS)
* [JS](https://en.wikipedia.org/wiki/JavaScript)

### Frameworks, Libraries and Programs Used

* [Google Fonts](https://fonts.google.com/)
    - Google Fonts – For Roboto font

* [Font Awesome](https://fontawesome.com/)
     - Font Awesome was used throughout all pages to add icons in order to create a better visual experience for UX purposes.

* [GitHub](https://github.com/)
     - GitHub was used to store the project after pushing.

* [Am I Responsive?](http://ami.responsivedesign.is/#)
    - Am I Responsive was used in order to create the mockup image.

* [Firefox Dev edition](https://www.mozilla.org/en-US/firefox/developer/)
    - Firefox dev tools was used for everything. Checking the website as I developed it. Learning the exact implications of css properties and how it effected the layout and design of an element. Checking for responsivity throughout the design to ensure it worked on all sized devices.
 
* [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools/)
    - Google Developer tools was used for generating the lighthouse report and further reccomended documentation was utilised to increase the score.

* [W3C Markup Validator](https://validator.w3.org/)
    - W3C Markup Validator was used to validate the HTML code.

* [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
    - W3C CSS Validator was used to validate the CSS code.

[Back to top ⇧](#Chess-Game)


## Testing

### Testing User Requirements

* As a user, I want to be able to navigate the website intuitively and be able to play chess.
  
    - The website offers a intuitive structure for the user to start playing chess immediately.

* As a user, I want to be able to play chess localy with anothr person.

    - The website offers the ability to control both the white and black pieces allowing for two player game locally.

* As a user, I want to be dissalowed from making illegal moves.
    
    - Illegal moves are blocked, although en passant and castling are not yet implemented.

* As a user, I want to see the notation of my game on screen

    - If the viewport is large enough the user can see their game notation.


### Code Validation

* The [W3C Markup Validator](https://validator.w3.org/) and [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and [JSHint](https://jshint.com/) services were used to validate all pages of the project in order to ensure there were no syntax errors.


### Accessibility

* Lighthouse reports

    * Landing Page Desktop
    
        - ![Lighthouse report for landing page Desktop image](assets/readme-files/desktop-lighthouse.png)
   
    * Landing Page mobile
     
        - ![Lighthouse report for landing page Mobile image](assets/readme-files/mobile-lighthouse.png)

### Tools Testing

* [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)

    - Firefox dev tools was used during the development process to test, explore and modify HTML elements and CSS styles used in the project.

* Responsiveness

    - [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) was used to check responsivity throughout the project.
 
* Accesibility
    - [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools/) was used for generating the lighthouse report and further reccomended documentation was utilised to increase the score.


### Browser Compatibility


* Goolgle Chrome

    - No appearance, responsiveness nor functionality issues.

* Safari

    - No appearance, responsiveness nor functionality issues.

* Mozilla Firefox

    - No responsiveness nor functionality issues.

* Microsoft Edge

    - Footer titles were white on a white background and thus invisible. Not a microsoft edge issue due to a general h2 test I did else where.

### Device compatibility

* MacBook Pro 13.3"

    No appearance, responsiveness nor functionality issues.

* Dell P2417Hc 24″ Monitor

    No appearance, responsiveness nor functionality issues.

* Xiaomi Redmi 9

    Audio element is too small. Will create my own with javascript in the future.

* Samsung A3

    Audio element is too small. Will create my own with javascript in the future.

* Samsung A54

    Audio element is too small. Will create my own with javascript in the future.

* Steam Deck

    No appearance, responsiveness nor functionality issues.

* Imac

    No appearance, responsiveness nor functionality issues.


### Common Elements Testing

* Index Page
          
    * Chess Board

        - Allows the user to move chess pieces
        - Highlights the appropriate piece.
        - deselects a piece if move is illegal allowing users to change the piece they wanted to move withought clicking off the screen.
        - Pieces have restricted movement to their move set.
        - Unfortunately due to time constraints, I was unable to implement castling and en passant.
     
    * Notation Board

        - Displays the move made on the screen in the order it happens
  
          

[Back to top ⇧](#Chess-Game)


## Finished Product

![Finished Site](assets/readme-files/image.png)

[Back to top ⇧](#Chess-Game)


## Deployment

* This website was developed using VSCODE and then pushed to github. Deployed using github pages.

### GitHub Pages

* Here are the steps to deploy this website to GitHub Pages from its GitHub repository:

    1. Log in to GitHub and locate the [GitHub Repository](https://github.com/).

    2. At the top of the Repository, locate the Settings button on the menu.

    3. Scroll down the Settings page until you locate the Pages section.

    4. Under Source, click the dropdown called None and select Master Branch.

    5. The page will refresh automatically and generate a link to your website. 

[Back to top ⇧](#Chess-Game)


## Credits



### Code

* [Youtube](https://youtube.com/) and [W3Schools](https://www.w3schools.com/) were consulted on a regular basis for inspiration and sometimes to be able to better understand the code being implement.

[Back to top ⇧](#Chess-Game)


## Acknowledgements

* Marcel, my mentor, for his constant encouragement and practical guidance and invaluable support and guidance. Truly would not have done it without him.

* My friends, for their valuable opinions and and critic during the design and development process.

* Code Institute and its amazing Slack community for their support and providing me with the necessary knowledge to complete this project.

[Back to top ⇧](#Chess-Game)
