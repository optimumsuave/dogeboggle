'use strict';

var $ 				= require('jquery');
var Board 			= require('Board');

class Game {
	constructor(name) {
		console.log("Game Mounted");
		this.$game = $(".game");
		this.board = new Board();
	}
	createGameBoard(){
		let board = this.board.buildGameBoardHTML();
		board.appendTo(this.$game);
	}
	startNewGame(){

	}
	scoreGame(){

	}
}	

module.exports = Game;