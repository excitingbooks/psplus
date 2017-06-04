/******/
NodeList.prototype.forEach = function(fn){
    var list = this;
    for(var i = 0; i < list.length; i++){
        fn.call(list[i], list[i], i, list);
    }
};

HTMLCollection.prototype.forEach = NodeList.prototype.forEach;
/******/

