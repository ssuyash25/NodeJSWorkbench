module.exports = (x,y,callback) => {
    if(x<=0 || y<=0){
        setTimeout(() => 
            callback(new Error("Wrong i/p"), null)
        ,2000)
    }
    else{
        setTimeout(() => 
            callback(null, {
                area : () => (x*y),
                perimeter : () => (2* (x+y))
            })
        ,2000)
    }
}

