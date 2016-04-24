function Rect(column, row) {
	this.lines = [];
	this.row = row;
	this.column = column;
	this.exist = [];


	this.init = function(cfg) {
		var el = document.createElement('div');
		el.classList.add('kwadracik');

		//tworzymy po koleii linie
		for(i=0; i<3; i++) {
			var line = document.createElement('div');
			line.classList.add('wiersz');
			for(j=0; j<3; j++) {
				(this.column * 3) + i, (this.row * 3) + j
				var cell = new Cell((this.column * 3) + j, (this.row * 3) + i);
				var cellEl = cell.init(this);
				line.appendChild(cellEl);
			}
			this.lines.push(line);
			el.appendChild(line);
		}
		return el;
		//document.body.appendChild(el);
	}

	this.existValue = function(val) {
		var result = false;
		for(row = 0; row < 3; row++) {
			for(col = 0; col < 3; col++) {
				if(getCell((this.column * 3) + col, (this.row * 3) + row).getValue() == val) {
					result = true;
				}
			}
		}
		return result;
	}
}