/*1,1,1    1,3,2    
  1,1,2    2,3,1    
           2,1,1       
  1,2,1    2,1,2     
  1,2,2    2,1,3       
  1,2,3    2,2,1        
                */

function max_num() {

    var number1 = prompt("Please enter number 1");
    var number2 = prompt("Please enter number 2");
    var number3 = prompt("Please enter number 3");
    var num1 = parseFloat(number1);
    var num2 = parseFloat(number2);
    var num3 = parseFloat(number3);

    if (num1 == num2 && num1 == num3) {
        alert("All the number are same");
        document.write("All the number are same");
        return
    } else if (num1 > num2 && num1 > num3) {
        alert("Number 1 is the biggest number") ;
        document.write("Number 1 is the biggest number," + " it's " + num1);
        return
    } else if (num2 > num1 && num2 > num3) {
        document.write(num2 + " is the biggest number");
        return
    } else if (num3 > num1 && num3 > num2) {
        document.write(num3 + " is the biggest number");
        return
    } else if (num1 == num2) {
        document.write("Number 1 and Number 2 are the biggest number, they are same");
        alert("Number 1 and Number 2 are the biggest number");
        return
    } else if (num1 == num3) {
        alert("Number 1 and Number 3 are the biggest number");
        document.write("Number 1 and Number 3 are the biggest number, they are same");
        return
    } else if (num2 == num3) {
        alert("Number 2 and Number 3 are the biggest number");
        document.write("Number 2 and Number 3 are the biggest number, they are same");
        return
    } else if ("undefined" != typeof num1 && "undefined" != typeof num2 && "undefined" != typeof num3) {
        alert("Please enter number")
        /*while("undefined" == typeof num1){
      num1 = 0
    }
    while("undefined" == typeof num2){
      num2 = 0
    }
    while("undefined" == typeof num3){
      num3 = 0
    }*/
        (max_num());
        return
    }
};

(max_num());
