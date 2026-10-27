const depositAmountEl = document.getElementById("deposit-amount");
const amountPerLineEl = document.getElementById("amount-per-line");
const spinButtonEl = document.getElementById("spin");

const returnSymbolsEl = document.getElementById("return-div");
const returnSymbolsTwoEl = document.getElementById("return-div-two");
const returnSymbolsThreeEl = document.getElementById("return-div-three");
const returnSymbolsFourEl = document.getElementById("return-div-four");
const returnSymbolsFiveEl = document.getElementById("return-div-five");
const returnSymbolsSixEl = document.getElementById("return-div-six");

const amountWonEl = document.getElementById("amount-won");
const currentBalanceEl = document.getElementById("current-balance");
const playAgainButtonEl = document.getElementById("play-again");
const noPlayAgainButtonEl = document.getElementById("no-play");
const newDepositAmountEl = document.getElementById("new-deposit-amount")
const newDepositButtonEl = document.getElementById("new-deposit")



let currentBalance = 0;
let hasDeposited = false;

const spinWheel = () => {
    const answers = ["🍎", "🍒", "🍋", "🍇", "🍎", "🍒", "🍋", "🍇"];
    const getRandomAnswer = () => answers[Math.floor(Math.random() * answers.length)];

    returnSymbolsEl.innerText = getRandomAnswer();
    returnSymbolsTwoEl.innerText = getRandomAnswer();
    returnSymbolsThreeEl.innerText = getRandomAnswer();
    returnSymbolsFourEl.innerText = getRandomAnswer();
    returnSymbolsFiveEl.innerText = getRandomAnswer();
    returnSymbolsSixEl.innerText = getRandomAnswer();

    winnings();
    };


const winnings = () => {
    const depositValue = parseFloat(depositAmountEl.value) || 0;
    if (!hasDeposited && depositValue > 0) {
        currentBalance = depositValue;
        hasDeposited = true;
    } 

    const lineAmount = parseFloat(amountPerLineEl.value) || 0;

    const sym1 = returnSymbolsEl.innerText;
    const sym2 = returnSymbolsTwoEl.innerText;
    const sym3 = returnSymbolsThreeEl.innerText;
    const sym4 = returnSymbolsFourEl.innerText;
    const sym5 = returnSymbolsFiveEl.innerText;
    const sym6 = returnSymbolsSixEl.innerText;

    const isLineOneMatch = (sym1 === sym2 && sym2 === sym3);
    const isLineTwoMatch = (sym4 === sym5 && sym5 === sym6);

    let amountMade = 0;

    if (isLineOneMatch && isLineTwoMatch) {
        amountMade = 2 * lineAmount;
    } else if (isLineOneMatch || isLineTwoMatch) {
        amountMade = lineAmount;
    } else {
        amountMade = -(2 * lineAmount);
    }

    currentBalance += amountMade;

    amountWonEl.innerText = (amountMade >= 0 ? `+$${amountMade.toFixed(2)}` : `-$${Math.abs(amountMade).toFixed(2)}`);
    currentBalanceEl.innerText = `$${currentBalance.toFixed(2)}`;
    };


const playAgain = () => {
    if (currentBalance <= 0) {
        alert("Game Over! Please deposit more money");
    
    if (amountPerLineEl.tagName === 'INPUT' && depositAmountEl.tagName === 'INPUT') {
        amountPerLineEl.value = "$0";
        amountWonEl.innerText = "";
        returnSymbolsEl.innerText = "";
        returnSymbolsTwoEl.innerText = "";
        returnSymbolsThreeEl.innerText = "";
        returnSymbolsFourEl.innerText = "";
        returnSymbolsFiveEl.innerText = "";
        returnSymbolsSixEl.innerText = "";
        const newDeposit = parseFloat(newDepositAmountEl.value) || 0
        depositAmountEl.value = `${currentBalance.toFixed(2) + newDeposit}`;
        currentBalanceEl.innerText = `$${currentBalance.toFixed(2) + newDeposit}`;
    }
    } else {
        if (depositAmountEl.tagName === 'INPUT' && currentBalance >= 0) {
        depositAmountEl.value = currentBalance.toFixed(2);
        } else {
        depositAmountEl.innerText = `$${(Number(depositAmountEl.innerText.replace('$', '')) - currentBalance).toFixed(2)}`;
        }
    }
    if (amountPerLineEl.tagName === 'INPUT') {
        amountPerLineEl.value = "";
    }
    winnings();
    
};

const depositMoney = () => {
    const newDepositAmount = parseFloat(newDepositAmountEl.value) || 0;
    
    if (depositAmountEl.tagName === 'INPUT' && newDepositAmount >= 0) {
        
        depositAmountEl.value = `${(newDepositAmount) - (-1 * currentBalance.toFixed(2))}`;

    }
    newBetGame();
};
    


const newBetGame = () => {
    
    const newDepositAmount = parseFloat(newDepositAmountEl.value) || 0;

    // 2. Perform numeric addition first, then format with .toFixed(2)
    const updatedBalance = newDepositAmount + Number(currentBalance);
    currentBalance = updatedBalance; // Update your underlying balance variable

    // 3. Update the innerHTML safely
    currentBalanceEl.innerHTML = `$${updatedBalance.toFixed(2)}`;

    if (depositAmountEl.tagName === 'INPUT' && updatedBalance >= 0) {
        depositAmountEl.value = updatedBalance.toFixed(2);
    } else {
        // Parse current innerText cleanly to a number before subtracting
        const currentDepositNumber = Number(depositAmountEl.innerText.replace('$', '')) || 0;
        depositAmountEl.innerText = `$${(currentDepositNumber - updatedBalance).toFixed(2)}`;
    }

    if (amountPerLineEl.tagName === 'INPUT') {
        amountPerLineEl.value = "";
    }


    winnings();
};


const dontPlayAgain = () => {
    if (amountPerLineEl.tagName === 'INPUT' & depositAmountEl.tagName === 'INPUT') {
        amountPerLineEl.value = "";
        depositAmountEl.value = "";
        amountWonEl.innerText = "";
        currentBalanceEl.innerText = "";
        returnSymbolsEl.innerText = "";
        returnSymbolsTwoEl.innerText = "";
        returnSymbolsThreeEl.innerText = "";
        returnSymbolsFourEl.innerText = "";
        returnSymbolsFiveEl.innerText = "";
        returnSymbolsSixEl.innerText = "";
        newDepositAmountEl.value = "";
    } 
    alert ("Have a nice day!")
}

spinButtonEl.addEventListener("click", spinWheel);
playAgainButtonEl.addEventListener("click", playAgain);
noPlayAgainButtonEl.addEventListener("click", dontPlayAgain);
newDepositButtonEl.addEventListener("click", depositMoney);