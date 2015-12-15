'use strict';

import $ 				from 'jquery/dist/jquery';
import Game 			from 'Game';

$(document).ready(function(){
	let game = new Game();
	game.createGameBoard();
	console.log("Mounted");
});