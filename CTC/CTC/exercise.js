function addNumberToList1(event) {
  event.preventDefault();

  let numberInput = document.getElementById("NumberCalc");
  let number = numberInput.value.trim();
  let list = document.getElementById("myList1");
  let minimumInput = document.getElementById("minimum");
  let maximumInput = document.getElementById("maximum");
  let minimum = Number(minimumInput.value);
  let maximum = Number(maximumInput.value);

  if (number === "") {
    return false;
  }

  if (minimumInput.value === "" || maximumInput.value === "" || minimum > maximum) {
    alert("Please enter a valid minimum and maximum.");
    return false;
  }

  let numberValue = Number(number);
  if (Number.isNaN(numberValue) || numberValue < minimum || numberValue > maximum) {
    alert("The input must be a number.");
    return false;
  }

  let row = list.insertRow(list.rows.length);
  row.insertCell(0).textContent = number;
  updateStatistics();
  numberInput.value = "";
  numberInput.focus();
  return false;
}

function updateStatistics() {
  let rows = document.getElementById("myList1").rows;
  let numbers = Array.from(rows, function (row) {
    return Number(row.cells[0].textContent);
  });

  let total = numbers.reduce(function (sum, number) {
    return sum + number;
  }, 0);
  let sortedNumbers = numbers.slice().sort(function (a, b) {
    return a - b;
  });
  let middle = Math.floor(sortedNumbers.length / 2);
  let median = sortedNumbers.length % 2 === 0
    ? (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2
    : sortedNumbers[middle];
  let frequencies = {};
  let highestFrequency = 0;

  numbers.forEach(function (number) {
    frequencies[number] = (frequencies[number] || 0) + 1;
    highestFrequency = Math.max(highestFrequency, frequencies[number]);
  });

  let modes = Object.keys(frequencies).filter(function (number) {
    return frequencies[number] === highestFrequency;
  });

  document.getElementById("mean").textContent = (total / numbers.length).toFixed(2);
  document.getElementById("median").textContent = median;
  document.getElementById("mode").textContent = highestFrequency === 1 ? "No mode" : modes.join(", ");
}

function clearList1() {
  // clear the table of all rows
  var tableRef = document.getElementById("myList1");
  tableRef.innerHTML = " ";
  document.getElementById("mean").textContent = "-";
  document.getElementById("median").textContent = "-";
  document.getElementById("mode").textContent = "-";
}
