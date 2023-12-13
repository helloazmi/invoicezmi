// Summerizes everuting into the bottom
const getFinalSumExVat = () => {
  let sum = 0;
  let totalPriceNodeList = document.querySelectorAll("#totalJobPriceExVat");
  let totalPriceArray = Array.from(totalPriceNodeList); // Convert NodeList to array using Array.from

  totalPriceArray.map((element) => {
    sum += Number(element.value);
  });
  //console.log(sum);
  return sum;
};

const updateFinalPay = () => {
  console.log(getFinalSumExVat());
  document.querySelectorAll("#totalSumToPayExVat")[0].textContent =
    getFinalSumExVat();
  document.querySelectorAll("#vatSum")[0].textContent = getFinaSumVat();
  document.querySelectorAll("#totalSumToPay")[0].textContent = getFinalToPay();
  document.querySelectorAll("#sumToPay")[0].value = getFinalToPay();
};

// Calculates Final Sum For Vat
const getFinaSumVat = () => {
  return 0.25 * getFinalSumExVat();
};

// Calculates Final Sum To Pay
const getFinalToPay = () => {
  return 1.25 * getFinalSumExVat();
};
settingsModeActive = true;
const handleEvent = (event) => {
  updateFinalPay();

  if (event.ctrlKey && event.key === "i") {
    console.log("Pressed i");
    if (settingsModeActive) {
      settingsModeActive = false;
      console.log("settingsModeActive to", settingsModeActive);

      changeClass(".var", "_var");
      changeClass(".dynamic", "_dynamic");
      changeClass(".showing", "hiding");
    } else {
      settingsModeActive = true;
      console.log("settingsModeActive to", settingsModeActive);
      changeClass("._var", "var");
      changeClass("._dynamic", "dynamic");
      changeClass(".hiding", "showing");
    }
  }
};

document.addEventListener("keydown", handleEvent);
document.addEventListener("click", handleEvent);

const changeClass = (from, to) => {
  // Select all elements with class name "var"
  var elements = document.querySelectorAll(from);
  console.log(elements);
  // Loop through each element and change its content to "string"
  elements.forEach(function (element) {
    element.className = to;
  });
};

const addRow = () => {
  console.log("addRow pressed");

  // Get the reference to the table
  const table = document.getElementById("table");

  const lastRow = table.rows[table.rows.length - 1];

  const newRow = lastRow.cloneNode(true);

  const cells = newRow.getElementsByTagName("td");

  cells.innerHTML = `
    <tr>
        <td>x</td><td><input class='var' id='jobName' value='Testuppdrag-1' /></td>
        <span>x</span><td><input class='var' id='unit' value='1'/></td>
        <td><input class='var' id='varValue' value='25%'/></td>
        <td><input class='var' id='unitPrice' value='400'/></td>
        <td><input class='var' id='totalJobPriceExVat' value='400'/></td>
   </tr>`;

  table.appendChild(newRow);
};

updateFinalPay();
