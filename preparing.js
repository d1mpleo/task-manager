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





// closure

// function outer() {
//   let x = 10;

//   function getX() {
//     x = x + 20;
//   }

//   return function inner() {

//     return ++x;
//   };
// }

// const a = outer();
// const b = outer();

// console.log(a());
// console.log(a());
// console.log(b());
// console.log(a());
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
               //[1, 2]   // [6;10]
// function runLoop(arr, a){
//   console.log(a)
//   arr.forEach((inter) => { // [1, 2] // [1, 2], [6, 10] // 
//       if((a[0] >= inter[0] && a[0] <= inter[1]) && 
//       (a[1] >= inter[0] && a[1] <= inter[1])) return; // 
//       if(a[0] > inter[0] && a[0] < inter[1]) inter[1] = a[1]; runLoop(arr, a);
//       if(a[1] > inter[0] && a[1] < inter[1]) {inter[0] = a[0]; runLoop(arr, a); }
//       else {
//         arr.push(inter);

//         runLoop(arr, a.filter(num => num !== inter)); // arr = [1,2], [6;10]
//       }
//     });
// }

// function findUniqueIntervals(fullArr){

//   fullArr.forEach((el, index) => {   
//     if(index===0) return;
//     const smallArr = fullArr.slice(0, index);
//     smallArr.forEach((prevEl, i) => {
//       if(el[0] < prevEl[0] && el[1] > prevEl[1]) {
//         fullArr[i][0] = el[0];
//         fullArr[i][1] = el[1];
//         prevEl[0] = el[0];
//         prevEl[1] = el[1];
//       } else if(el[0] > prevEl[0] && el[1] < prevEl[1]) {
//         el[0] = prevEl[0];
//         el[1] = prevEl[1];
//       } else if(el[0] > prevEl[0] && el[0] < prevEl[1] && el[1] > prevEl[1]) {
//         el[0] = prevEl[0];
//         fullArr[i][0] = el[1];
//         prevEl[1] = el[1];
//       } else if(el[0] < prevEl[0] && el[1] > prevEl[0] && el[1] < prevEl[1]) {
//         el[1] = prevEl[1];
//         prevEl[0] = el[0];
//         fullArr[i][0] = el[0];
//       }
//     });
//   })

//   const res = [];
//   const seems = new Set();

//   fullArr.forEach((a) => {
//     const key = JSON.stringify(a);
//     if(!seems.has(key)){
//       seems.add(key);
//       res.push(a);
//     } 
//   })


//   return res;
// }


// function sumIntervals(intervals) {
//   if (!intervals || intervals.length === 0) return 0;

//   // 1. Сортуємо інтервали за початком
//   intervals.sort((a, b) => a[0] - b[0]);

//   let total = 0;
//   let currentStart = intervals[0][0];
//   let currentEnd = intervals[0][1];

//   // 2. Зливаємо перекриття
//   for (let i = 1; i < intervals.length; i++) {
//     const [start, end] = intervals[i];

//     if (start > currentEnd) {
//       // немає перекриття → додаємо довжину
//       total += currentEnd - currentStart;
//       currentStart = start;
//       currentEnd = end;
//     } else {
//       // є перекриття → розширюємо інтервал
//       currentEnd = Math.max(currentEnd, end);
//     }
//   }

//   // додаємо останній інтервал
//   total += currentEnd - currentStart;

//   return total;
// }


// const pam = [
//    [0, 20],
//    [-100000000, 10],
//    [30, 40]
// ]
// console.log(sumIntervals(pam));



/*
1) uI = [a[0]]
2) перебираємо a з 2: кожен el порівнюється з кожною попередньою парою: якщо ел розширює або el всередині, то el змінюється на дану пару
*/


const user = {
  name: "Misha",
  sayHi: function () {
    console.log(this.name);
  }
};

user.sayHi();