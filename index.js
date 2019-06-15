var rect = {
    perimeter : (a,b) => (2*(a+b)),
    area : (a,b) => (a*b)
}

function solveRect(l, b){
    if(l<=0 || b<=0){
        console.log("wrong input");
    }
    else{
        console.log("area =" + rect.area(l,b))
        console.log("perimeter =" + rect.perimeter(l,b))
    }
}

solveRect(2,3);
solveRect(4,5);