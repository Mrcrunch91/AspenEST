/*
Creator: Nathaniel McPhee
Parent Application: AspenEST
*/

var loan_time = new Array();

loan_time["24"] = 24;
loan_time["36"] = 36;
loan_time["48"] = 48;
loan_time["60"] = 60;
loan_time["72"] = 72;

var total_Principal = 0;
var total_Interest = 0; 

//Main function to begin generating data form user input.
function calc(){	

//Clears table for new data.
while(document.getElementById("createTable")){		
	firstDiv.removeChild(document.getElementById("createTable"));	
}

var loan = document.getElementById("loan").value;
var d_pay = document.getElementById("downpayment").value;
var tradeIn = document.getElementById("tradeIn").value;
var rebates = document.getElementById("rebates").value;
var interest_Rate = document.getElementById("interestRate").value;

loan = parseFloat(loan);
d_pay = parseFloat(d_pay);
tradeIn = parseFloat(tradeIn);
rebates = parseFloat(rebates);
interest_Rate = parseFloat(interest_Rate);
interest_Rate = interest_Rate.toFixed(3);




getfinalPrincipal(loan,d_pay,tradeIn,rebates);

var doos = loanLen();
var monthPay = monthlyPayment(total_Principal,doos,interest_Rate);
paidTotalInterest(monthPay,doos);

getTable(monthPay,doos);

}

//Gets loan duration from user
function loanLen(){	
	var loanDur = 0;
	//Reference to form ID = getVals
	var theForm = document.forms["getVals"];

	//selectLen is radio name;
	var selectItemLen = theForm.elements["selectLen"]; 

    //Select radio value
    for(var i = 0; i<selectItemLen.length;i++){
    	if(selectItemLen[i].checked){	
    		loanDur = loan_time[selectItemLen[i].value];
    		break;
    	}
    }	
    return loanDur;
}

//Calculates total principal for user after various subtractions.
function getfinalPrincipal(loan,downpay,trade,rebate){
	total_Principal = (loan - downpay - trade - rebate);
	return;
}

//Generates the estimates monthly payments to display.
function monthlyPayment(total_Principal,doos,interest_Rate){

	if(interest_Rate == 0 || interest_Rate < 0){
		return (total_Principal/doos).toFixed(2);
	}
	var i = (interest_Rate/12)/100;
	var topFum =  i * Math.pow((1+i),doos);
	var bottomFum = Math.pow((1+i),doos) - 1;
	var monthPay = total_Principal * (topFum/bottomFum);

	return monthPay.toFixed(2);
}

//Calculates total interest paid over the course of the loan.
function paidTotalInterest(monthPay,doos){
	total_Interest = ((monthPay*doos) - total_Principal).toFixed(2);	
}

//Builds table for data to be displayed. 
function getTable(monthPay,doos){	

	//creates a table element and added it to the div "first" in the html
	var createTable = document.createElement("table");
	createTable.id = "createTable";
	firstDiv.appendChild(createTable);

	var resultHead = createTable.createTHead();
	var headRow = resultHead.insertRow();

	//One header per input for proper data organization.
	var headercell0 = document.createElement("th");
	var headercell1 = document.createElement("th");
	var headercell2 = document.createElement("th");

	headercell0.innerHTML = "Total Principle";
	headRow.appendChild(headercell0);

	headercell1.innerHTML = "Total Interest";
	headRow.appendChild(headercell1);

	headercell2.innerHTML = "Monthly Payments";
	headRow.appendChild(headercell2);

	var resultTable = document.getElementById("createTable");
	var tableRow = resultTable.insertRow(1);

	var cell0 = tableRow.insertCell(0);
	var cell1 = tableRow.insertCell(1);
	var cell2 = tableRow.insertCell(2);

	//If the user enters 0 for the interest then the loan generates no interest.
	if(total_Interest<0){
		total_Interest = 0.00;		
	}

	cell0.innerHTML = "$ " + total_Principal;
	cell1.innerHTML = "$ " + total_Interest;
	cell2.innerHTML = "$" + monthPay + "/" + doos + " payments";
}

//Removes the table upon screen refresh or data reset. 
function clearTable(){		
	firstDiv.removeChild(document.getElementById("createTable"));
}



