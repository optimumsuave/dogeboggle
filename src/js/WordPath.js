'use strict';

import $ 					from 'jquery';

class WordPath {
	constructor(state, value) {
		this.path = [];
		this.value = value.toLowerCase();
		this.gameState = state;
		this.state = state.getState();
	}
	getStartingPoints(){
		var startingPoints = [];

		//if the string isn't empty
		if(this.value.length){
			var firstLetter = this.value[0];

			//find all starting points with the letter
			for(var i=0;i<4;i++){
				for(var j=0;j<4;j++){
					var point = this.state[i][j];
					// if the letter matches on the board, add it to the start list
					if(point.character == firstLetter){
						startingPoints.push(point);
					}
				}
			}
			if(startingPoints.length){
				//there is a letter on the board which matches
				return startingPoints;
			} else {
				return null;
			}
		}
	}
	hasCharacterAdjacent(point, pos, blacklist){
		var _this = this;

		//get the surrounding states from this point
		var surrounding = this.gameState.getStateSurrounding(point.x, point.y);
		var adjacent = [];

		//find if there are any adjacent
		for(var i=0;i<surrounding.length;i++){
			var row = surrounding[i];
			row.forEach(function(r, i){
				if(r.character == _this.value[pos]){
					adjacent.push(r);
				}
			});
		}

		if(adjacent.length){
			//there is an adjacent letter
			var blackListedAdjacent = [];
			
			for(var k=0;k<adjacent.length;k++){
				var a = adjacent[k];

				//find which adjacent are not allowed to travel again through
				blackListedAdjacent = blacklist.filter(function(b){return (b.x == a.x && b.y == a.y)});

				if(this.value.length == pos){
					//word is done
					//word length achieved and no previous letters used
					if(blackListedAdjacent.length == 0){
						blacklist.push({x: a.x, y: a.y});
						return blacklist;
					} else {
						return false;
					}
				} else {
					//word is not finished
					//continuing to find letters
					if(blackListedAdjacent.length == 0){
						blacklist.push({x: a.x, y: a.y});
						var check = this.hasCharacterAdjacent(a, pos+1, blacklist);
						if(check){
							return blacklist;
						} else {
							blacklist.pop();
							if(k == adjacent.length){
								return false;
							}
						}
					}
				}
			}
		} else {
			return false;
		}
	}
	validate(){
		var validPaths = [];
		//if there is more than one word on the page you have to validate from its starting point until you pick the right one
		var startingPoints = this.getStartingPoints();

		if(startingPoints != null){
			//validate each path from each start point
			for(var i=0;i<startingPoints.length;i++){
				var point = startingPoints[i];
				var path = this.hasCharacterAdjacent(point, 1, [{x: point.x, y: point.y}]);
				if(path != false && typeof path != "undefined"){
					validPaths.push(path);
				}
			}

			if(validPaths.length){
				//highlight up first valid path with green active classes
				validPaths[0].forEach(function(b){
					$(".game-row").eq(b.y).find(".game-box").eq(b.x).addClass("active");
				});
			}
			return validPaths.length > 0;
		} else {
			return false;
		}
	}
}

export default WordPath;