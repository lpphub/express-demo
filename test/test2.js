'user strict'
var s = [1,2,3,4,5,6];
s.map(x => console.log(x));
for (i of s) {
    console.log("test:"+i);
}
