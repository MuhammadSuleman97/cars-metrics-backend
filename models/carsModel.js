class Car {
    constructor(car) {
      this.id = car.id;
      this.name = car.name;
      this.mpg = car.mpg;
      this.cylinders = car.cylinders;
      this.displacement = car.displacement;
      this.horsepower = car.horsepower;
      this.weight = car.weight;
      this.acceleration = car.acceleration;
      this.model_year = car.model_year;
      this.origin = car.origin;
    }
  
    // Static method to validate car data
    static validate(car) {
      return (
        typeof car.name === 'string' &&
        typeof car.mpg === 'number' &&
        typeof car.cylinders === 'number' &&
        typeof car.displacement === 'number' &&
        typeof car.horsepower === 'number' &&
        typeof car.weight === 'number' &&
        typeof car.acceleration === 'number' &&
        typeof car.model_year === 'number' &&
        typeof car.origin === 'string'
      );
    }
  }
  
  export default Car;
  