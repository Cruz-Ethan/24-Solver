const parenthesees = ["(((axb)xc)xd)","((ax(bxc))xd)","(ax((bxc)xd))","(ax(bx(cxd)))","((axb)x(cxd))"];
const operations = ["+", "-", "*", "/", "^"];

const a = document.getElementById("num1");
const b = document.getElementById("num2");
const c = document.getElementById("num3");
const d = document.getElementById("num4");
const goal = document.getElementById("target");

const form = document.getElementById("form");
const solutions = document.getElementById("solutions");

let combinations = [];

for(let parenthesis of parenthesees) {
    for(let operation1 of operations) {
        for(let operation2 of operations) {
            for(let operation3 of operations) {
                combinations.push(parenthesis.replace("x", operation1).replace("x", operation2).replace("x", operation3));
            }
        }
    }
}

function evaluate(expression) {
    let numbers = [];
    let operators = [];

    for(let curr of expression) {
        if(curr == '0') {
            numbers.push(10);
        }
        else if(!isNaN(curr)) {
            numbers.push(parseInt(curr));
        }
        else if(operations.includes(curr)) {
            operators.push(curr);
        }
        else if(curr == ')') {
            let operator = operators.pop();
            let first;
            switch(operator) {
                case "+":
                    numbers.push(numbers.pop() + numbers.pop());
                    break;
                case "-":
                    first = numbers.pop();
                    numbers.push(numbers.pop() - first);
                    break;
                case "*":
                    numbers.push(numbers.pop() * numbers.pop());
                    break;
                case "/":
                    first = numbers.pop();
                    numbers.push(numbers.pop() / first);
                    break;
                case "^":
                    first = numbers.pop();
                    numbers.push(numbers.pop() ** first);
                    break;
            }
        }
    }

    return numbers.pop();
}

form.addEventListener("submit", function findSolutions() {
    solutions.innerHTML = "";
    let num1 = a.value % 10;
    let num2 = b.value % 10;
    let num3 = c.value % 10;
    let num4 = d.value % 10;
    let target = goal.value;

    let nums = [
        [num1, num2, num3, num4],
        [num1, num2, num4, num3],
        [num1, num3, num2, num4],
        [num1, num3, num4, num2],
        [num1, num4, num2, num3],
        [num1, num4, num3, num2],
        [num2, num1, num3, num4],
        [num2, num1, num4, num3],
        [num2, num3, num1, num4],
        [num2, num3, num4, num1],
        [num2, num4, num1, num3],
        [num2, num4, num3, num1],
        [num3, num1, num2, num4],
        [num3, num1, num4, num2],
        [num3, num2, num1, num4],
        [num3, num2, num4, num1],
        [num3, num4, num1, num2],
        [num3, num4, num2, num1],
        [num4, num1, num2, num3],
        [num4, num1, num3, num2],
        [num4, num2, num1, num3],
        [num4, num2, num3, num1],
        [num4, num3, num1, num2],
        [num4, num3, num2, num1],
    ];

    let answers = [];
    for(let combination of combinations) {
        for(let permutation of nums) {
            let expression = combination.replace("a", permutation[0]).replace("b", permutation[1]).replace("c", permutation[2]).replace("d", permutation[3]);
            let solution = evaluate(expression);
            expression = expression.replaceAll("0", "10");

            if(solution < target * 1 + 0.000001 && solution > target - 0.000001 && !answers.includes(expression)) {
                answers.push(expression);
                solutions.innerHTML += `<li>${expression}</li>`
            }
        }
    }

    event.preventDefault();
})