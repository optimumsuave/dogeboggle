'use strict';

import $ 					from 'jquery';
import Board 				from 'Board';
import WordPath				from 'WordPath';
import GameState			from 'GameState';
import Constants			from 'Constants';

class Game {
	constructor(name) {
		console.log("Game Mounted");
		this.$game = $(".game");
		this.$input = $(".words-input");
		this.words = [];
		this.$wordheader = $(".words-header"); 
		this.$wordlabel = $(".words-header label"); 
		this.$wordbox = $(".words-box"); 
		this.board = new Board();
		this.state = new GameState();
		this.initX = null;
		this.initY = null;
		$(window).on("keydown", this.handleKey.bind(this));
	}
	handleKey(event){
		//enter keycode is 13
		if(event.keyCode == 13){
			this.handleSubmit();			
		}
	}
	createGameBoard(){
		var _this = this;
		//create the html for the 4x4 grid
		this.$game.empty();
		let board = this.board.buildGameBoardHTML();
		board.appendTo(this.$game);

		//fill the grid with the state
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				var box = $(".game-row").eq(j).find(".game-box").eq(i);
				box.html(this.state.getBox(i, j).character);
				box.click(this.handleClick.bind(this, i, j));
				box.on("touchstart", this.handleTouchStart.bind(i, j, this));
				box.on("touchmove", this.handleTouchMove.bind(i, j, this));
				box.on("touchend", this.handleTouchEnd.bind(i, j, this));
			}
		}
	}
	handleTouchStart(x, y, event){
		event.preventDefault();
		var touch = event.originalEvent.touches[0];
		this.initX = touch.pageX;
		this.initY = touch.pageY;
	}
	handleTouchMove(x, y, event){
		var touch = event.originalEvent.touches[0];
		event.preventDefault();
		console.log("touchMove", event.originalEvent.touches);
	}
	handleTouchEnd(x, y, event){
		event.preventDefault();
		console.log("touchEnd", event.originalEvent.touches);
	}
	handleClick(x, y){

		// var surrounding = this.getStateSurrounding(x, y);
		// console.log(surrounding);
	}

	handleSubmit(){
		//reset the box highlighting
		$(".game-box").removeClass("active");
		this.$wordlabel.removeClass("success error");

		//get the value and create a wordpath
		var value = this.$input.val();
		var word = new WordPath(this.state, value);
		
		//if their are more than one valid path
		if(word.validate() > 0){

			
			//push word to current list of words to score
			//if word exists, don't push it...
			var exists = this.words.indexOf(value.toLowerCase());
			if(exists == -1){

				//word doesn't exist yet, so push it
				this.words.push(value.toLowerCase());

				//notify user
				this.$wordlabel.html("WORD ADDED FROM BOARD").addClass("success");
			
				//add the word to the box
				var w = $("<div class='word-tag'></div>");
				w.html(value);
				w.appendTo(this.$wordbox);

				//turn off the highlighted boxes after 1.5s
				setTimeout(function(){
					$(".game-box").removeClass("active");
				}, 1500);

			} else {
				//notify user it already exists
				this.$wordlabel.html("WORD ALREADY ADDED").addClass("error");

				//flash the user the word
				$(".word-tag").eq(exists).addClass("exists");

				//turn off the highlighted boxes after 1.5s
				setTimeout(function(){
					$(".word-tag").eq(exists).removeClass("exists");
					$(".game-box").removeClass("active");
				}, 1500);
			}



			//make doge talk
			this.changeDogeMessage(true);
		} else {

			//No word path found on board
			this.$wordlabel.html("NO WORD FOUND ON BOARD").addClass("error");
			this.changeDogeMessage(false);
		}
		this.$input.val("");
	}
	changeDogeMessage(positiveFeedback){
		if(positiveFeedback){
			var c = Math.floor(Math.random()*Constants.DOGE_MESSAGES_POSITIVE.length);
			var msg = Constants.DOGE_MESSAGES_POSITIVE[c];
			$(".doge-message").html(msg);
		} else {
			var c = Math.floor(Math.random()*Constants.DOGE_MESSAGES_NEGATIVE.length);
			var msg = Constants.DOGE_MESSAGES_NEGATIVE[c];
			$(".doge-message").html(msg);
		}
	}

	startNewGame(){

	}
	scoreGame(){

	}
}	

module.exports = Game;