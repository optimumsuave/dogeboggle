'use strict';

var $ = require('jquery');

class Board {
	constructor(name) {
		console.log("Board Mounted");
	}
	buildGameBoardHTML(){
		console.log("Building game board");
		var board = $("<div class='game-board'></div>");
		for(var i=0;i<4;i++){
			var row = $("<div class='game-row'></div>");
			for(var j=0;j<4;j++){
				$("<div class='game-box'></div>").appendTo(row);
			}
			row.appendTo(board);
		}
		return board;
	}
}	

module.exports = Board;