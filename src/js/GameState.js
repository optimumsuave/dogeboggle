'use strict';

import $ 					from 'jquery';
import Constants			from 'Constants';

class GameState {
	constructor(name) {
		console.log("GameState Mounted");
		this.state = this.createGameState();
	}
	getState(){
		return this.state;
	}
	getBox(x, y){
		if(x >= 0 && y >= 0 && x < 4 && y < 4) {
			try {
				return this.state[y][x];
			} catch (e){
				console.log("Error nothing at", x, y);
			}
		}
		return 0;
	}
	createGameState(){
		//create multidimensional array of random chars
		var state = [];
		for(var i=0;i<4;i++){
			var row = [];
			for(var j=0;j<4;j++){
				row.push({character: this.getRandomCharacter(), active: false, x: j, y: i});
			}
			state.push(row);
		}
		this.state = state;
		return this.state;
	}
	getStateOfBox(x,y){
		//return the box
		return this.getBox(x, y);
		//if off the board return 0 for nothing
	}
	getStateSurrounding(x, y){
		//based on the current location, iterate around and return other list of
		return [
			[this.getStateOfBox(x-1,y-1), this.getStateOfBox(x,y-1), this.getStateOfBox(x+1,y-1)],
			[this.getStateOfBox(x-1,y), 0, this.getStateOfBox(x+1,y)],
			[this.getStateOfBox(x-1,y+1), this.getStateOfBox(x,y+1), this.getStateOfBox(x+1,y+1)],
		];
	}
	
	getRandomCharacter(){
		//generate random 0-25 character
		var num = Math.floor(Math.random()*26);
		return Constants.ALPHABET_CHARS[num];
	}
}

export default GameState;