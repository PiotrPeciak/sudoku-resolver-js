var GAME = {};
GAME.body = document.getElementById('game-place');
GAME.cell = {};

var createGame = function() {
	var el = document.createElement('div');
	el.id = "sudokuSquare";

	for(ki=0; ki<3; ki++) {
		var line = document.createElement('div');
		line.classList.add('wierszD');
		for(kj=0; kj<3; kj++) {
			//console.log('tworze kwadrat ['+ki+', '+kj+']');
			var square = new Rect(kj, ki);
			var htmlSquare = square.init();
			line.appendChild(htmlSquare);
		}
		el.appendChild(line);
	}
	document.body.appendChild(el);
}

var getCell = function(x, y) {
	var idn = "cell-"+x+"-"+y;
	return getCellByIdn(idn);
}

var getCellByIdn = function(idn) {
	return GAME.cell[idn];
}

var existInRow = function(row, value) {
	var result = false;
	for(column = 0; column<9; column++) {
		var cell = getCell(column, row);
		if(cell && cell.getValue() == value)
			result = true;
	}
	return result;
}

var existInColumn = function(column, value) {
	var result = false;
	for(row = 0; row<9; row++) {
		var cell = getCell(column, row);
		if(cell && cell.getValue() == value)
			result = true;
	}
	return result;
}

var getPossibleColumnsForValueInRow = function(rowSearch, val) {
	if(!val)
		return;
	if(existInRow(rowSearch, val)) {
		//console.warn("W wierszu "+ (rowSearch+1) +" jest już wartość: "+val);
		return;
	}

	var possibleColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	if(getCell(0, rowSearch).square.existValue(val)) {
		//usuwanie kolumny 1
		var columnIdx = possibleColumns.indexOf(0);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(1);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(2);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);
	}

	if(getCell(3, rowSearch).square.existValue(val)) {
		//usuwanie kolumny 1
		var columnIdx = possibleColumns.indexOf(3);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(4);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(5);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);
	}

	if(getCell(6, rowSearch).square.existValue(val)) {
		//usuwanie kolumny 1
		var columnIdx = possibleColumns.indexOf(6);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(7);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);

		columnIdx = possibleColumns.indexOf(8);
		if(columnIdx>-1)
			possibleColumns.splice(columnIdx, 1);
	}

	//sprawdzamy czy w którejś z kolumn już występuje
	for(colSearch = 0; colSearch < 9; colSearch++) {
		var columnIdx;
		if(existInColumn(colSearch, val) == true) {
			columnIdx = possibleColumns.indexOf(colSearch);
			if(columnIdx>-1)
				possibleColumns.splice(columnIdx, 1);
		}

		if(getCell(colSearch, rowSearch).getValue() > 0) {
			columnIdx = possibleColumns.indexOf(colSearch);
			if(columnIdx>-1)
				possibleColumns.splice(columnIdx, 1);
		}
	}
	//console.log('Ostatecznie mozliwe kolumny w wierszu '+(rowSearch+1)+': ',possibleColumns);
	return possibleColumns
}

var getPossibleRowsForValueInColumn = function(colSearch, val) {
	if(!val)
		return;
	if(existInColumn(colSearch, val)) {
		//console.warn("W kolumnie "+ (colSearch+1) +" jest już wartość: "+val);
		return;
	}

	var possibleRows = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	if(getCell(colSearch, 0).square.existValue(val)) {
		//usuwanie wieszy 1
		var rowIdx = possibleRows.indexOf(0);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(1);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(2);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);
	}

	if(getCell(colSearch, 3).square.existValue(val)) {
		//usuwanie kolumny 1
		var rowIdx = possibleRows.indexOf(3);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(4);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(5);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);
	}

	if(getCell(colSearch, 6).square.existValue(val)) {
		//usuwanie kolumny 1
		var rowIdx = possibleRows.indexOf(6);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(7);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);

		rowIdx = possibleRows.indexOf(8);
		if(rowIdx>-1)
			possibleRows.splice(rowIdx, 1);
	}

	//sprawdzamy czy w którejś z kolumn już występuje
	for(rowSearch = 0; rowSearch < 9; rowSearch++) {
		var rowIdx;
		if(existInRow(rowSearch, val) == true) {
			rowIdx = possibleRows.indexOf(rowSearch);
			if(rowIdx>-1)
				possibleRows.splice(rowIdx, 1);
		}

		if(getCell(colSearch, rowSearch).getValue() > 0) {
			rowIdx = possibleRows.indexOf(rowSearch);
			if(rowIdx>-1)
				possibleRows.splice(rowIdx, 1);
		}
	}
	//console.log('Ostatecznie mozliwe kolumny w wierszu '+(rowSearch+1)+': ',possibleRows);
	return possibleRows
}

var showPossilbeColumnsInRowsByValue = function(val) {
	for(var rowCount = 0; rowCount < 9; rowCount++) {
		console.log("Wartość "+val+" może wystąpić w wierszu "+rowCount+" w kolumnach: ", getPossibleColumnsForValueInRow(rowCount, val));
	}
}

var showPossilbeRowsInColumnsByValue = function(val) {
	for(var colCount = 0; colCount < 9; colCount++) {
		console.log("Wartość "+val+" może wystąpić w kolumnie "+colCount+" w wierszach: ", getPossibleRowsForValueInColumn(colCount, val));
	}
}

var tryFillInRowsByValue = function(val) {
	for(var rowCount = 0; rowCount < 9; rowCount++) {
		var posVal = getPossibleColumnsForValueInRow(rowCount, val);
		if(posVal && posVal.length == 1) {
			var cell = getCell(posVal[0], rowCount);
			if(cell) {
				cell.setValue(val);
				cell.el.classList.add('inserted');
				changedCount++;
			}
		}
	}
}

var tryFillInColumnsByValue = function(val) {
	for(var colCount = 0; colCount < 9; colCount++) {
		var posVal = getPossibleRowsForValueInColumn(colCount, val);
		if(posVal && posVal.length == 1) {
			var cell = getCell(colCount, posVal[0]);
			if(cell) {
				cell.setValue(val);
				cell.el.classList.add('inserted');
				changedCount++;
			}
		}
	}
}

var tryFillInLinesByValue = function(val) {
	tryFillInRowsByValue(val);
	tryFillInColumnsByValue(val);
}

var tryFillByValues = function() {
	changedCount = 0;
	for(valCount = 1; valCount < 10; valCount++) {
		tryFillInLinesByValue(valCount);
	}
	//console.log('fillByValues - zmieniono '+changedCount+' pól');
	if(changedCount<1)
		notSuccess++;
}

var tryFillByCell = function() {
	changedCount = 0;
	for(x = 0; x<9; x++) {
		for(y=0; y<9; y++) {
			getCell(x, y).tryFill();
		}
	}

	//console.log('fillByCell - zmieniono '+changedCount+' pól');
	if(changedCount<1)
		notSuccess++;
}


var tryShoot = function() {
	for(var xa = 0; xa < 9; xa++)
		for(var ya = 0; ya < 9; ya++) {
			var cellToShoot = getCell(xa, ya);
			if(!cellToShoot.getValue() && cellToShoot.possibleValue.length == 2) {
				console.log('Probuje z polem ['+xa+', '+ya+'] - possibleValue: ', cellToShoot.possibleValue);
				cellToShoot.setValue(cellToShoot.possibleValue[0]);
				cellToShoot.el.classList.add('inserted');
				return;
			}
		}
}

var changedCount = 0;
var notSuccess = 0;

var tryFill = function() {
	while(notSuccess<4) {
		notSuccess = 0;
		tryFillByCell();
		tryFillByValues();
		if(notSuccess>1) {
			tryShoot();
			tryFillByCell();
			tryFillByValues();
		}
	}
}

$(document).ready(function() {
	createGame();

	exampleGame1();
});

var exampleGame1 = function() {

	getCell(0, 1).setValue(3);

	getCell(3, 0).setValue(8);
	getCell(5, 0).setValue(3);
	getCell(4, 1).setValue(1);
	getCell(5, 1).setValue(5);
	getCell(3, 2).setValue(2);
	getCell(5, 2).setValue(7);

	getCell(7, 0).setValue(9);
	getCell(8, 0).setValue(6);
	getCell(8, 1).setValue(8);
	getCell(8, 2).setValue(3);

	getCell(0, 3).setValue(4);
	getCell(0, 4).setValue(9);
	getCell(1, 4).setValue(1);
	getCell(2, 5).setValue(5);

	getCell(6, 3).setValue(7);
	getCell(7, 4).setValue(8);
	getCell(8, 4).setValue(2);
	getCell(8, 5).setValue(1);

	getCell(0, 6).setValue(6);
	getCell(0, 7).setValue(8);
	getCell(0, 8).setValue(1);
	getCell(1, 8).setValue(2);
	

	getCell(3, 6).setValue(9);
	getCell(3, 7).setValue(7);
	getCell(3, 8).setValue(4);
	getCell(4, 7).setValue(5);
	getCell(5, 6).setValue(2);
	getCell(5, 8).setValue(6);

	getCell(8, 7).setValue(4);
}


















/*
var tryFillByRowsTest = function(val) {
	for(rowSearch = 0; rowSearch < 9; rowSearch++) {
		if(existInRow(rowSearch, val) == false) {
			//wybraliśmy sobie wiersz i wiemy juz ze nie ma wartosci szukanej
			var possibleColumns = [];
			for(colSearch = 0; colSearch < 9; colSearch++) {
				if(existInColumn(colSearch, val) == false)
					possibleColumns.push(colSearch);
			}
			if(possibleColumns.length == 1) {
				var cell = getCell(possibleColumns[0], rowSearch);
				if(cell.isPossibleValue(val)) {
					cell.setValue(val);
					cell.el.classList.add('inserted');
					console.log('wstawilem wartosc '+val+' w kolumnie '+possibleColumns[0]+' i wierszu '+rowSearch);
				} else {
					console.log('jednak wartosci '+val+ 'nie moge wstawic w kolumnie '+possibleColumns[0]+' i wierszu '+rowSearch);
				}
			} else {
				console.log('mozliwe wartosci liczby '+val+' dla kolumny '+rowSearch+' to: ',possibleColumns);
			}
		} else {
			console.log('wartosc '+val+' istnieje juz w kolumnie '+ rowSearch);
		}
	}
}


var tryFillByRows = function() {
	for(val = 1; val < 10; val++) {
		for(rowSearch = 0; rowSearch < 9; rowSearch++) {
			if(existInRow(rowSearch, val) == false) {
				//wybraliśmy sobie wiersz i wiemy juz ze nie ma wartosci szukanej
				var possibleColumns = [];
				for(colSearch = 0; colSearch < 9; colSearch++) {
					if(existInColumn(colSearch, val) == false)
						possibleColumns.push(colSearch);
				}
				if(possibleColumns.length == 1) {
					var cell = getCell(possibleColumns[0], rowSearch);
					if(cell.isPossibleValue(val)) {
						cell.setValue(val);
						cell.el.classList.add('inserted');
						console.log('wstawilem wartosc '+val+' w kolumnie '+possibleColumns[0]+' i wierszu '+rowSearch);
					} else {
						console.log('jednak wartosci '+val+ 'nie moge wstawic w kolumnie '+possibleColumns[0]+' i wierszu '+rowSearch);
					}
				} else {
					console.log('mozliwe wartosci liczby '+val+' dla kolumny '+rowSearch+' to: ',possibleColumns);
				}
			}
		}
	}	
}

var possibleByRow = function(row, val) {
	if(!val)
		return;
	for(rowSearch = 0; rowSearch < 9; rowSearch++) {
		if(existInRow(rowSearch, val) == false) {
			var possibleColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8];

			if(getCell(0, rowSearch).square.existValue(val)) {
				//usuwanie kolumny 1
				var columnIdx = possibleColumns.indexOf(0);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(1);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(2);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);
			}

			if(getCell(3, rowSearch).square.existValue(val)) {
				//usuwanie kolumny 1
				var columnIdx = possibleColumns.indexOf(3);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(4);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(5);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);
			}

			if(getCell(6, rowSearch).square.existValue(val)) {
				//usuwanie kolumny 1
				var columnIdx = possibleColumns.indexOf(6);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(7);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);

				columnIdx = possibleColumns.indexOf(8);
				if(columnIdx>-1)
					possibleColumns.splice(columnIdx, 1);
			}

			//console.log('Po sprawdzeniu kwadratów w lini mozliwe kolumny: ',possibleColumns);

			//wybraliśmy sobie wiersz i wiemy juz ze nie ma wartosci szukanej
			for(colSearch = 0; colSearch < 9; colSearch++) {
				if(existInColumn(colSearch, val) == true) {
					var columnIdx = possibleColumns.indexOf(colSearch);
					if(columnIdx>-1)
						possibleColumns.splice(columnIdx, 1);
				}
			}

			console.log('Ostatecznie mozliwe kolumny w wierszu '+(rowSearch+1)+': ',possibleColumns);

		}
	}
}

var tryFillByColumns = function() {
	for(val = 1; val < 10; val++) {
		for(colSearch = 0; colSearch < 9; colSearch++) {
			if(existInColumn(colSearch, val) == false) {
				//wybraliśmy sobie wiersz i wiemy juz ze nie ma wartosci szukanej
				var possibleRows = [];
				for(rowSearch = 0; rowSearch < 9; rowSearch++) {
					if(existInRow(rowSearch, val) == false)
						possibleRows.push(rowSearch);
				}
				if(possibleRows.length == 1) {
					console.log('');
					var cell = getCell(colSearch, possibleRows[0]);
					if(cell.isPossibleValue(val)) {
						cell.setValue(val);
						cell.el.classList.add('inserted');
						console.log('wstawilem wartosc '+val+' w kolumnie '+colSearch+' i wierszu '+possibleRows[0]);
					} else {
						console.log('jednak wartosci '+val+ 'nie moge wstawic w kolumnie '+colSearch+' i wierszu '+possibleRows[0]);
					}
					
				} else {
					console.log('mozliwe wartosci liczby '+val+' dla kolumny '+colSearch+' to: ',possibleRows);
				}
			}
		}
	}	
}


*/