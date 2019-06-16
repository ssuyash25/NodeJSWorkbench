var rect = require("./rectangle")

function solveRect(l, b){
    rect(l,b,(err, rectangle) => {
    if(err){
        console.log("wrong input" + err.message);
    }
    else{
        console.log("area =" + rectangle.area())
        console.log("perimeter =" + rectangle.perimeter())
    }
});
}

solveRect(2,3);
solveRect(4,5);