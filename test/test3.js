function* hello(){
    yield "hello";
    yield "world";
    return "!";
}

var h = hello();

var s1 = h.next();
console.log(s1);
var s2 = h.next();
console.log(s2);
var s3 = h.next();
console.log(s3);


function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}
function* generator(i){
    yield i;
    yield* anotherGenerator(i);
    yield i + 10;
}
var gen = generator(10);
console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20