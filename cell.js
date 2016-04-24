function Cell(column, row) {
	this.possibleValue = [];
	this.value;
	if(row < 0 || row > 9 || column < 0 || column > 9)
		console.error('Próba utworzenia komórki spoza zakresu! - ['+column+', '+row+']');
	this.row = row;
	this.column = column;
	this.idn = "cell-"+column+"-"+row;

	//GAME.cell[this.idn] = this;

	this.getValue = function() {
		return parseInt(this.value);
	}

	this.setValue = function(value, force) {
		if(this.value > 0 && !force)
			return
		var val = parseInt(value);
		if(val>0 && val<10) {
			this.value = val;
			this.square.exist.push(""+val);
		}
		this.el.value = ""+val;
		//this.el.innerHTML = ""+val;
	}

	this.init = function(square, value) {
		this.square = (square) ? square : undefined;
		this.value = (value) ? value : "";
		var el = document.createElement('input');
		el.type = "text";
		el.id = this.idn;
		el.classList.add('komorka');
		el.innerHTML = this.value;

		el.onkeypress = function(ev) {
			var this_ = getCellByIdn(this.id);
			if(!this_)
				return;

			//TODO: Zapewnic aby w komórce były tylko pojedyńcze cyfry oraz podświetlić aktywną komorkę
			//TODO: Zaznaczać też na czerwono nie pasujace wprowadzone wartości, oraz legenda z boku z kolorami
			//TODO: w przyszlosci może jakis skrót klawiszowy który np. wyświetla możliwe wartości dla danej komórki
			var key = ev.keyCode;

			switch(key) {
				//up
				case 38:
					if(this_.row > 0) {
						getCell(this_.column, this_.row-1).el.focus();
					}
					break;
				//down
				case 40:
					if(this_.row < 8) {
						getCell(this_.column, this_.row+1).el.focus();
					}
					break;
				//left
				case 37:
					if(this_.column > 0) {
						getCell(this_.column-1, this_.row).el.focus();
					}
					break;
				//rigth
				case 39:
					if(this_.column < 8) {
						getCell(this_.column+1, this_.row).el.focus();
					}
					break;
				default:
					//console.log('inny nieobsługiwany: '+key);
	
			}

		}

		/*
		el.onclick = function(ev) {
			var val = prompt();
			val = parseInt(val);
			if(val > 0) {
				getCellByIdn(this.id).setValue(val, true);
			}
			//console.log('Kliknięto na komórke - narazie nic sie nie dzieje...');
		}
		*/
		
		this.el = el;
		GAME.cell[this.idn] = this;
		return el;
	}

	this.isPossibleValue = function(val) {
		var result = true;
		if(existInColumn(this.column, val) == true) result = false;
		if(existInRow(this.row, val) == true) result = false;
		if(this.square.existValue(val) == true) result = false;
		return result;
	}

	this.showPossibleValues = function() {
		var tab = [];
		if(this.getValue() > 0) {
			//console.warn("Pole ["+(this.column+1)+", "+(this.row+1)+"] ma juz wartość: "+this.getValue()+"!");
			return tab;
		}
		for(val = 1; val < 10; val++) {
			if(this.isPossibleValue(val))
				tab.push(val);
		}
		console.log("Możliwe wartości dla pola ["+(this.column+1)+", "+(this.row+1)+"] to: ", tab);
	}

	this.tryFill = function() {
		if(this.getValue() > 0)
			return
		var possibleValues = [];
		for(val = 1; val < 10; val++) {
			if(this.isPossibleValue(val) == true)
				possibleValues.push(val);
		}
		if(possibleValues.length == 1) {
			this.setValue(possibleValues[0]);
			this.el.classList.add('inserted');
			changedCount++;
			//console.log("Uzupełniono pole ["+(this.column+1)+", "+(this.row+1)+"] wartością: ", possibleValues[0]);
		} else {
			//console.log("Dla pola ["+(this.column+1)+", "+(this.row+1)+"] możliwe wartości: ", possibleValues);
			this.possibleValue = possibleValues;
		}
	}

}