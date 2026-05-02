const cars = [
  { id: 1, name: "BMW", status: "online", mileage: 12000, ownerId: 1 },
  { id: 7, name: "Audi", status: "offline", mileage: 8000, ownerId: 2 },
  { id: 3, name: "Tesla", status: "online", mileage: 5000, ownerId: 1 },
  { id: 4, name: "Volvo", status: "offline", mileage: 20000, ownerId: 3 },
  { id: 2, name: "Toyota", status: "online", mileage: 15000, ownerId: 2 },
  { id: 9, name: "Toyota", status: "online", mileage: 15000, ownerId: 2 }
];

// const onlineCars = cars.filter((car) => car.status === "online");
const oldCars = cars.filter((car) => car.mileage >= 10000);

const nameCars = cars.map((car) => car.name);

const sortedCars = cars.sort((a, b) => b.mileage - a.mileage);

const car = cars.find((car) => car.ownerId === 2);

const countOnlineCars = cars.filter((a) => a.status === "online").length;

const totalMileage = cars.reduce((acc, curValue) => acc + curValue.mileage);

const oldestCar = cars.reduce((a, b) => {
  return b.mileage > a.mileage ? b : a;
})

// function createCounter() {
//   var count = 0;
//   return function() {
//     count++;
//     return count;
//   };
// }

// const counter = createCounter();
// const counter2 = createCounter();

// console.log(counter());
// console.log(counter());
// console.log(counter2());







// function outer() {
//   let x = 10;

//   return function inner() {

//     return ++x;
//   };
// }

// const a = outer();
// const b = outer();

// console.log(a());
// console.log(a());
// console.log(b());
// console.log(b());



// for (var i = 0; i < 3; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }


// for (var i = 0; i < 3; i++) {
//   (function(i) {
//     setTimeout(() => console.log(i), 0);
//   })(i);
// }

// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 0);
// }


// console.log('start');

// setTimeout(() => {
//   console.log('timeout');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('promise');
// });

// process.nextTick(() => {
//   console.log('nextTick');
// });

// console.log('end');
// const totalMileage = cars.reduce((acc, curValue) => acc + curValue.mileage);

// const oldestCar = cars.reduce((a, b) => {
//   return b.mileage > a.mileage ? b : a;
// })

// function countNumber(matrix, num) {
//     const res = matrix.reduce((acc, curValue) => {
//       return binarySearch(curValue, num) ? ++acc : acc;
//     }, 0)
//     return res;
// }

// function binarySearch(arr, el, left=0, right = arr.length-1){
  
//   const mI = Math.floor((right-left+1) / 2) // 2
//   console.log(left, right, mI)
//   if(right === left) return el === arr[left];
//   if( el < arr[mI+left]){
//     return binarySearch(arr, el, left, right - (mI)) // 0 2
//   }else if(el > arr[mI+left]){
//     return binarySearch(arr, el, left+mI, right) // 2, 3
//   }else{
//     return true;
//   }
// }
// console.log(binarySearch([1, 3, 5, 7], 3))
// const arr = [
//     [1, 3, 5, 7],
//     [2, 4, 7, 8],
//     [3, 5, 9, 10]];

//console.log(countNumber(arr, 7))



// function pigIt(str){
//   const words = str.split(" ");
//   console.log(words);
//   let res = words.reduce((acc, a) => {
    
//     const letters = a.split("");

//     if(!isLetter(a) && letters.length===1) return acc + letters[0] + " ";
//     const firstLetter = letters[0];
//     const res = letters.slice(1);
//     res.push(firstLetter);
//     const word = res.reduce((ac, curValue) => ac + curValue, '') + "ay ";

//     return acc + word;
//   }, '');
//   return res.slice(0, -1);
// }
// function isLetter(ch) {
//   return /^[a-zA-Z]$/.test(ch);
// }


// console.log(pigIt("This is my string !"))