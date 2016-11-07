var theDiv = document.getElementById("firstDiv");

var loan_time = new Array();
loan_time["24"] = 24;
loan_time["36"] = 36;
loan_time["48"] = 48;
loan_time["60"] = 60;
loan_time["72"] = 72;

var total_Principal = 0;
var total_Interest = 0; 

function calc(){
	alert("in function");

while(document.getElementById("createTable") != null){
	var removeTable = document.getElementById("createTable");
	theDiv.removeChild(removeTable);	
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

var theDiv = document.getElementById("firstDiv");

var doos = loanLen();
getfinalPrincipal(loan,d_pay,tradeIn,rebates);
var monthPay = monthlyPayment(total_Principal,doos,interest_Rate);
paidTotalInterest(monthPay,doos);
getTable(monthPay);
}

function loanLen(){	
	var loanDur = 0;
	//Reference to form ID = getVals
	var theForm = document.forms["getVals"];
	var selectItemLen = theForm.elements["selectLen"]; //selectLen is radio name;
    //Select radio value
	for(var i = 0; i<selectItemLen.length;i++){
		if(selectItemLen[i].checked){	
			loanDur = loan_time[selectItemLen[i].value];
			break;
		}
	}	
	return loanDur;
}

function getfinalPrincipal(loan,downpay,trade,rebate){
	 total_Principal = (loan - downpay - trade - rebate);
	return;
}

function monthlyPayment(total_Principal,doos,interest_Rate){
	var i = (interest_Rate/12)/100;
	var topFum =  i * Math.pow((1+i),doos);
	var bottomFum = Math.pow((1+i),doos) - 1;
	var monthPay = total_Principal * (topFum/bottomFum);

	return monthPay.toFixed(2);
}

function paidTotalInterest(monthPay,doos){
	total_Interest = ((monthPay*doos) - total_Principal).toFixed(2);	
}

function getTable(monthPay){

	var createTable = document.createElement("table");
	createTable.id = "createTable";
	firstDiv.appendChild(createTable);

	var resultHead = createTable.createTHead();
	var headRow = resultHead.insertRow();

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

	cell0.innerHTML = "$ " + total_Principal;
	cell1.innerHTML = "$ " + total_Interest;
	cell2.innerHTML = "$" + monthPay;
}

function clearTable(){
	if(document.getElementById("createTable")){
		var removeTable = document.getElementById("createTable");
		theDiv.removeChild(removeTable);
	}
}



