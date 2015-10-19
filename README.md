<h1>Project-1: Tic-Tac-Toe</h1>
<h2>Overview</h2>
<p>This is a browser-based Tic-Tac-Toe game made by Jiangsha Meng. HTML and CSS are used to construct the wireframe and styling of the game. Javascript and jQuery are used to operate the basic logic and implement the DOM methods as well as envent handling, respectively. AJAX is utilized to connect to the back-end application for multiplayer mode and remote game data storage purpose. User stories are first created to guild the game building process. The concept of separation of concerns is applied at preparation stage of this project to ensure clean code and effecticient functionalities.  </p>

<h2>User Stories</h2>
<p>
As a player:
<ul>
  <li>I want the game UI to be simple and clean</li>
  <li>I want to play with a strong computer</li>
  <li>I want to be able to save my unfinished game remotely, and come back to it at later time</li>
  <li>I want to play the game with others</li>
  <li>I want to be able to switch truns between X and O</li>
  <li>I want to save play record (i.e., wins, loses, ties) locally</li>
</ul>
</p>

<h2>Game Wireframe</h2>
<p>
Wireframe design of the game is shown in the document <a href="https://github.com/kuramameng/project-1-ttt/blob/master/documents/ttt-wireframe.pdf">HERE</a>.
</p>

<h2>Separation of Concerns</h2>
<p>
According to the wireframe design, codes are separated into several sections to address functionalities individually. The code sections and their responsibilities are listed below:
<ul>
  <li><strong>style.css:</strong> style sheet for the game</li>
  <li><strong>app.js:</strong> main file, contains game logic and game display</li>
  <li><strong>api.js:</strong> AJAX file, provides methods for connecting to the game server</li>
  <li><strong>menu.js:</strong> event handler file, controls menu button activities</li>
  <li><strong>ai.js:</strong> AI file, holds computer algorithm for player vs. PC mode</li>
</ul>
</p>

<h2>Basic Game Logic</h2>
<p>
The object of Tic Tac Toe is to get three in a row. You play on a three by three game board. The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either oppent has three in a row or all nine squares are filled.
</p>
<p>
For the game logic, a 1-D array with 9 elements is first created to represent the nine squares. The letter "x" or "o" is then assigned to each element once it is clicked from the game board. All winning conditions are saved before hand to check if one of the players wins. If no winning conditions were met, then the game will return "tie". 
</p>

<h2>Computer Player Algorithm</h2>
<p>
The bot you are playing against is called "Deep Orange". It's thinking pattern is like this: 
It goes through all the empty blocks on the game board, and tries to assign its token to each cell to see if any pre-set conditions are met. If one of the conditions was satisfied, it will return certain weight value (i.e., higher the weight, better the move) to be associated with that block. After looping through the whole board, it will look back and make a move on the block with the highest weight.
</p>
<p>
It's pre-set conditions and their corresponding weight values are listed below:
<ul>
  <li><strong>Winning Move:</strong> Deep Orange wins by making a move here. weight = 1000.</li>
  <li><strong>Intercept Move:</strong> Deep Orange stops player from winning by moving there. Weight = 800.</li>
  <li><strong>Freestyle Move:</strong> Deep Orange makes move to a random block if no winning or intercept moves exist. Weight = 100 - 800</li>
  <li><strong>Handshake Move</strong> Deep Orange makes the move and the game is a tie. Weight = 100.</li>
</ul>
</p>

<h2>Current Game Features</h2>
<ul>
  <li>Game is published on github pages and can be accessed by multiple devices and locations</li>
  <li>Game board is rendered using HTML and CSS</li>
  <li>Inventive styling with effects like mouse hover</li>
  <li>Players can switch turns between X and O</li>
  <li>Score display (including wins, loses, and ties)</li>
  <li>Keep track of multiple game rounds with counter</li>
  <li>Player can join other's game remotely and play togeter</li>
  <li>Playing histories in multiplayer mode are saved on server</li>
  <li>Unfinished games can be resumed by entering specific Game IDs and retrieving data from the server</li>
</ul>

<h2>Unsolved Problems</h2>
<ul>
  <li>Turn counter has issue when users play game remotely</li>
  <li>tttapi.watchGame method has not been fully incorporated, therefore no live update of the game board in remote mode is currently available</li>
</ul>
