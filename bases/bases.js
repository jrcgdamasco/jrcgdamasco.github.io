// get the #table-container div
let container = document.getElementById("table-container");

/* multi-line comment
 */

/**
 * number input
 */
let input = document.getElementById("number-input");

/**
 * number we want to display
 */
let num = 100;

const min_base = 2;

const max_base = 36;

const num_tables = 3;

const rowsperTable = Math.floor(max_base / num_tables);

createTables(100);

//wire up input
input.addEventListener("input", () => {
	let value = parseInt(input.value);
	container.innerHTML = "";
	createTables(value);
});

function createTables(num) {
	for (let i = 0; i < num_tables; ++i) {
		// create table tag and append to table-container
		let table = document.createElement("table");
		container.appendChild(table);

		//table.setAttribute("class", "bases-table");
		table.classList.add("bases-table");

		// create <tbody> tag and append to table
		let tbody = document.createElement("tbody");
		table.appendChild(tbody);

		for (let j = 0; j < rowsperTable; ++j) {
			let base = min_base + i * rowsperTable + j;

			if (base > max_base) {
				break;
			}

			// create tr element and append to table body
			let row = document.createElement("tr");
			tbody.appendChild(row);

			//create cells displaying base
			let baseCell = document.createElement("td");
			baseCell.appendChild(document.createTextNode(base));
			row.appendChild(baseCell);

			//cells displaying number in base
			let resultCell = document.createElement("td");
			resultCell.appendChild(document.createTextNode(num.toString(base)));
			row.appendChild(resultCell);
		}
	}
}

/*
// create h1 element
let h1 = document.createElement("h1");

// add h1 to container
container.appendChild(h1);

// add text to h1
let text = document.createTextNode("Hello world!");
h1.appendChild(text);
//Ctrl-Shift-R
*/
