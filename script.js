//localStorage testing, must stringify(saving) and parse (retrieving)
const userData = {};

//Storing
localStorage.setItem("userData", JSON.stringify(userData));

//Retrieving
const storedUserDataString = localStorage.getItem("userData");
const storedUserData = JSON.parse(storedUserDataString);

//Collect
const gather = () => {
  let uName = document.getElementById("uName").value;
  let uEmail = document.getElementById("uEmail").value;
  let uPhone = document.getElementById("uPhone").value;
  let dueDays = document.getElementById("dueDays").value;
  console.log(uName);
  console.log(uEmail);
  console.log(uPhone);
  console.log(dueDays);
};

//Get current year as string
const updateCurrDateAndDueDate = () => {
  let invoiceDate = document.getElementById("invoiceDate");
  let dueDaysValue = document.getElementById("dueDays");
  // Get the current date
  const currentDate = new Date();
  invoiceDate.value = currentDate.toLocaleDateString("sv-SE"); //prints as string

  // Add 30 days to the current date
  currentDate.setDate(currentDate.getDate() + Number(dueDaysValue.value));
  let todayPlus30 = currentDate;
  //console.log(todayPlus30);

  dueDate = document.getElementById("dueDate");
  dueDate.value = todayPlus30.toLocaleDateString("sv-SE");
};

// Summerizes everything to the bottom
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
  //console.log(getFinalSumExVat());
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

//function not done but set display to none
const setAllClassToHide = () => {};

//current
const hideTools = () => {
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
};

// Calculates Final Sum To Pay
const getFinalToPay = () => {
  return 1.25 * getFinalSumExVat();
};
settingsModeActive = true;
const handleEvent = (event) => {
  updateFinalPay();
  updateCurrDateAndDueDate();
  //console.log(event)

  if (event.ctrlKey && event.key === "i") {
    hideTools();
  }
};

document.addEventListener("keyup", handleEvent);
document.addEventListener("click", handleEvent);

const changeClass = (from, to) => {
  // Select all elements with class name "var"
  var elements = document.querySelectorAll(from);
  //console.log(elements);
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

function removeRow(button) {
  // Get the reference to the button's parent row
  const row = button.parentNode.parentNode;

  // Remove the row from the table
  row.parentNode.removeChild(row);
}

updateFinalPay();
updateCurrDateAndDueDate();
