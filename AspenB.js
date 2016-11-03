var loan_time = new Array();
loan_time["24"] = 24;
loan_time["36"] = 36;
loan_time["48"] = 48;
loan_time["60"] = 60;
loan_time["72"] = 72;

var total_Principal = 0;
var total_Interest = 0; 

function calc(){
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
interest_Rate = interest_Rate.toFixed(2);

var doos = loanLen();
getfinalPrincipal(loan,d_pay,tradeIn,rebates);



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

