function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let masOperand = [],
        masPriority =[],
        masNums = [],
        koeff = 1,
        pointer = 0;
    for(var i = 0; i < expr.length; i++)
    {
        switch(expr[i]) {
            case " ": break;
            case "(":{koeff += 2; break;}
            case ")":{koeff -= 2; break;}
            case '+': {
                masPriority[pointer] = koeff; masOperand[pointer] = "+";
                pointer++;
                break;}
            case '-': {
                masPriority[pointer] = koeff; masOperand[pointer] = "-";
                pointer++;
                break;}
            case '*':   {
                masPriority[pointer] = koeff + 1; masOperand[pointer] = "*";
                pointer++;
                break;}
            case '/': {
                masPriority[pointer] = koeff + 1; masOperand[pointer] = "/";
                pointer++;
                break;}
            default: {
                var startOfNum = '';
                while(!isNaN(+expr[i])){
                    startOfNum += expr[i++];
                }
                i--;
                masNums.push(+startOfNum);
            }
        }

    }

    if(koeff !== 1)
        throw new Error('ExpressionError: Brackets must be paired');

    while(masPriority.length){
        var num = masPriority.indexOf(Math.max.apply(null, masPriority));

        if( masNums[num + 1] === 0 && masOperand[num] === "/")
            throw new Error('TypeError: Division by zero.');

        masNums[num] = calculating(masOperand[num], masNums[num], masNums[num + 1]);


        masNums.splice(num + 1, 1);
        masPriority.splice(num, 1);
        masOperand.splice(num, 1);
    }
    return masNums[0];
}


function calculating(operand, firstNum, secNum) {
    switch(operand){
        case "+": return firstNum + secNum;
        case "-": return firstNum - secNum;
        case "*": return firstNum * secNum;
        case "/": return firstNum / secNum;
    }
}

module.exports = {
    expressionCalculator
}