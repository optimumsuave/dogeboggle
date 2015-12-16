'use strict';

import $ 				from 'jquery/dist/jquery';
import Game 			from 'Game';

$(document).ready(function(){
	var game = new Game();
	game.startNewGame();
	console.log("Mounted");
});