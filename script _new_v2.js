
console.log('Script2 loaded')

let finalSumVat;
//localStorage testing, must stringify(saving) and parse (retrieving)




ls_load();
updateJobs();
updateSummary();
updateCurrDate();
updateDueDate();


function ls_load() {
  console.log('LOAD');
  //Retrieving
  const storedUserDataString = localStorage.getItem("userData");
  const storedUserData = JSON.parse(storedUserDataString);

  let uName = document.getElementById("uName")
  let uEmail = document.getElementById("uEmail")
  let uPhone = document.getElementById("uPhone")

  

  
  uName.value = storedUserData.uName;
  uEmail.value = storedUserData.uEmail;
  uPhone.value = storedUserData.uPhone;

  console.log('after', uName.value)

 
 

  /*
  
   if(uName.value == undefined) uName.value = 'Förnamn Efternamn';
  if(uEmail.value == undefined) uEmail.value = 'E-post';
  if(uPhone.value == undefined) uPhone.value = '073XXXXX;XX';

  */
}

function ls_save() {
  console.log('SAVE');

  //Storing
localStorage.setItem("userData", JSON.stringify(gather()));
}



function gather() {
  console.log('..GATHERING')
  let uName = document.getElementById("uName").value;
  let uEmail = document.getElementById("uEmail").value;
  let uPhone = document.getElementById("uPhone").value;
  let dueDays = document.getElementById("dueDays").value;
  console.log(uName);
  console.log(uEmail);
  console.log(uPhone);
  console.log(dueDays);

  return {
    uName: uName,
    uEmail: uEmail,
    uPhone: uPhone,
  }
};



// Handler
document.addEventListener("keyup", handleEvent);
document.addEventListener("click", handleEvent);

function handleEvent (event) {
   updateJobs();
   updateSummary();
   updateDueDate();

   ls_save();


  if (event.ctrlKey && event.key === "i") {
    console.log('hideTools();')
  }
};

var newLastRow ;

/// felet är här den lägger till utanför thody
// function addRow
function addRow() {
  console.log("addRow pressed");
  updateJobs();

  // Get the reference to the table
  const tableJobs = document.getElementById("jobs");
  const tbody =  tableJobs.querySelector('tbody');
  const lastRow = tableJobs.rows[tableJobs.rows.length - 1];

  const newRow = lastRow.cloneNode(true);
 
  tbody.appendChild(newRow);

   newLastRow = tableJobs.rows[tableJobs.rows.length - 1];
   newLastRow.querySelector('td:nth-child(2)').querySelector('input').value = '---';
   newLastRow.querySelector('td:nth-child(3)').querySelector('input').value = '20YY-MM-DD';
   newLastRow.querySelector('td:nth-child(5)').querySelector('input').value = '1';
};



//function removeRow
function removeRow(button) {

  const tableJobs = document.getElementById("jobs");
  const lastRow = tableJobs.rows.length;
  
  if(lastRow > 2) {
      // Get the reference to the button's parent row
  const row = button.parentNode.parentNode;

  // Remove the row from the table
  row.parentNode.removeChild(row);
  }
}

function updateCurrDate() {
  
  let invoiceDate = document.getElementById("invoiceDate");
  const currentDate = new Date();
  invoiceDate.value = currentDate.toLocaleDateString("sv-SE"); //prints as string

}


//Get current year as string
function updateDueDate() {
  let invoiceDate = document.getElementById("invoiceDate");
  let dueDaysValue = document.getElementById("dueDays");
 
  // Get the current date and prints to fakturadatum
  const currentDate = new Date();





 //fixa
   //CURENT DAATE + 30
  // Add 30 days to the current date
  currentDate.setDate(currentDate.getDate() + Number(dueDaysValue.value));
  let todayPlus30 = currentDate;
  //console.log(todayPlus30);
 /*

 
 */


  dueDate = document.getElementById("dueDate");
  dueDate.value = todayPlus30.toLocaleDateString("sv-SE");

 
};








function switchMode() {
    console.log('switch mode')

    let x = document.getElementsByClassName("left");
    //console.log(x)

    // Get all div elements on the page
  const allDivs = document.querySelectorAll('div');

  // Loop through each div and set the background color to none
  allDivs.forEach( (div) => {
    div.style.backgroundColor = 'transparent';
  });

  const allElements = document.querySelectorAll('*');
  
  // Loop through each element and set the text color to black
  allElements.forEach(function(element) {
   element.style.color = 'black';

  });
  let hideables = document.getElementsByClassName('hideable')
  Array.from(hideables).forEach( (hideable) => {
    hideable.style.display = 'none'

  })


}


function updateJobs(){
let vatArary = [];
// Get all rows in the table
var rows = document.getElementById('jobs').querySelectorAll('tbody tr');
  let tax, quantity, unitPrice, sumExVat;
  
  // Iterate through the rows
  for (var i = 0; i < rows.length; i++) {
    //console.log('');
    //console.log('ROW', i);

    // Get all cells (td) within the current row
    var cells = rows[i].querySelectorAll('td');

    // Iterate through the cells
    for (var j = 1; j < cells.length; j++) {
      // Skip the first cell with the button
      var inputElement = cells[j].querySelector('input');

      // Access the value of the input element
      var inputValue = Number(inputElement.value);

      // Now you can work with the value of the input
      //console.log(`[${i}-${j}] ${inputValue}`);

      if(j === 3){     tax = inputValue/100;       /*  console.log('tax', tax)*/ }
      if(j === 4){     quantity = inputValue;       /*  console.log('quantity', quantity)*/ }
      if(j === 5){     unitPrice = inputValue;      /*  console.log('unitPrice', unitPrice)*/ }
      if(j === 6){     inputElement.value = quantity * unitPrice;        /* console.log('sumExVat', sumExVat) */}
      //console.log('quantity * unitPrice', quantity * unitPrice);
    } //j-loop

    vatArary.push( (quantity * unitPrice)*tax )
    //console.log(vatArary)
    finalSumVat = vatArary.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    //console.log( finalSumVat )


  }
  //console.log(rows)
}








function calcFinalSumExVat() {
  let sum = 0;
  let totalPriceNodeList = document.querySelectorAll("#totalJobPriceExVat");
  let totalPriceArray = Array.from(totalPriceNodeList); // Convert NodeList to array using Array.from
 //console.log(totalPriceArray)
  totalPriceArray.map((element) => {
    sum += Number(element.value);
  });
  
  return sum;
};


function calcFinalSumVat() {
  let sum = 0;
  let totalPriceNodeList = document.querySelectorAll("#totalJobPriceExVat");
  let totalPriceArray = Array.from(totalPriceNodeList); // Convert NodeList to array using Array.from
 //console.log(totalPriceArray)
  totalPriceArray.map((element) => {
    sum += Number(element.value);
  });
  //console.log(sum);
  return sum;
};





function updateSummary(){
  
  //Updates Final ext vat
  let finalExVat = document.getElementById('finalExVat');
  finalExVat.textContent = calcFinalSumExVat();


  //updates Final vat
  let finalVat = document.getElementById('finalVat');
  finalVat.textContent = finalSumVat;

   //updates Final to pay

   let finalPay = document.getElementById('finalPay');
   finalPay.textContent = finalSumVat + calcFinalSumExVat();

   let sumToPay = document.getElementById('sumToPay');
   sumToPay.value = finalSumVat + calcFinalSumExVat();

   

  
}





  





// Populate the final pay fields


