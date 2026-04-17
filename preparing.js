const cars = [
  { id: 1, name: "BMW", status: "online", mileage: 12000, ownerId: 1 },
  { id: 7, name: "Audi", status: "offline", mileage: 8000, ownerId: 2 },
  { id: 3, name: "Tesla", status: "online", mileage: 5000, ownerId: 1 },
  { id: 4, name: "Volvo", status: "offline", mileage: 20000, ownerId: 3 },
  { id: 2, name: "Toyota", status: "online", mileage: 15000, ownerId: 2 },
  { id: 9, name: "Toyota", status: "online", mileage: 15000, ownerId: 2 }
];

const onlineCars = cars.filter((car) => car.status === "online");
const oldCars = cars.filter((car) => car.mileage >= 10000);

const nameCars = cars.map((car) => car.name);

const sortedCars = cars.sort((a, b) => b.mileage - a.mileage);

const car = cars.find((car) => car.ownerId === 2)



console.log(car);