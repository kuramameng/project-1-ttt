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
  <li>I want to save play record (i.e., wins, loses, ties) locally</li>
</ul>
</p>

<h2>Game Wireframe</h2>
Wireframe design of the game is shown in the document <a href="https://github.com/kuramameng/project-1-ttt/blob/master/documents/ttt-wireframe.pdf">HERE</a>.

<h2>Separation of Concerns</h2>
According to the wireframe design, codes are separated into several sections to address functionalities individually. The code sections and their responsibilities are listed below:
<ul>
  <li><strong>app.js:</strong> main file, contains game logic and game display</li>
  <li><strong>api.js:</strong> AJAX file, provides methods for connecting to the game server</li>
  <li><strong>menu.js:</strong> event handler file, controls menu button activities</li>
  <li><strong>ai.js:</strong> AI file, holds computer algorithm for player vs. PC mode</li>
</ul>
