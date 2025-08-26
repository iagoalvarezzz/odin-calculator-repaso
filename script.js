function add (a,b){
  return a + b;
}

function substract(a,b){
  return a - b;
}

function multiply(a,b){
  return a * b;
}

function divide(a,b){
  return a / b;
}

function operate(a,b,operator){
  switch(operator){
    case "+":
      return add(a,b);
    case "-":
      return substract(a,b);
    case "*":
      return multiply(a,b);
    case "/":
      return divide(a,b);
  }
}

function assignNumber(button){
  if (operator !== ""){
    secondNumber += button.getAttribute("id");
  } else if (result){
    clear();
    firstNumber += button.getAttribute("id");
    result = false;
  } else{
    firstNumber += button.getAttribute("id");
  }
}

function assignOperator(button){
  if (firstNumber != "" && secondNumber === ""){
    operator = button.getAttribute("id");
  } else if (firstNumber !== "" && secondNumber !== ""){
    execute();
    operator = button.getAttribute("id");
  }
}

function execute(){
  if (firstNumber === "" || secondNumber === "" || operator === "") return;
  if (+secondNumber === 0 && operator === "/"){
    clear();
    return;
  }

  firstNumber = operate(+firstNumber,+secondNumber,operator);
  firstNumber = Math.round((firstNumber + Number.EPSILON) * 100) / 100;
  operator = "";
  secondNumber = "";
  result = true;
}

function clear(){
  firstNumber = "";
  operator = "";
  secondNumber = "";
}

function buttonClicked(event){
  const button = event.target;
  if (button.classList.contains("buttons")) return;
  if (button.parentElement.classList.contains("numbers")){
    assignNumber(button);
  } else if (button.parentElement.classList.contains("operators")){
    assignOperator(button);
  } else if (button.getAttribute("id") === "exe"){
    execute();
  } else if (button.getAttribute("id") === "clear"){
    clear(button);
  }

  display.textContent = `${firstNumber} ${operator} ${secondNumber}`;

}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = false;

const buttonsContainer = document.querySelector(".buttons");
const display = document.querySelector(".display");

buttonsContainer.addEventListener("click", buttonClicked);
