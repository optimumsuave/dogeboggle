'use strict';

import $ 					from 'jquery';
import Board 				from 'Board';
import Constants			from 'Constants';

class Game {
	constructor(name) {
		console.log("Game Mounted");
		this.$game = $(".game");
		this.board = new Board();
		this.state = this.createGameState();
	}
	createGameBoard(){
		let board = this.board.buildGameBoardHTML();
		board.appendTo(this.$game);
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				$(".game-row").eq(i).find(".game-box").eq(j).html(this.state[i][j]);
			}
		}
	}
	createGameState(){
		var state = [];
		for(var i=0;i<4;i++){
			var row = [];
			for(var j=0;j<4;j++){
				row.push(this.getRandomCharacter());
			}
			state.push(row);
		}
		this.state = state;
		return this.state;
	}
	getRandomCharacter(){
		var num = Math.floor(Math.random()*26);
		console.log(num);
		return Constants.ALPHABET_CHARS[num];
	}

	startNewGame(){

	}
	scoreGame(){

	}
}	

module.exports = Game;