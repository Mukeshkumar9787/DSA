
abstract class Car {
    protected description!: string;
    
    public getDescription(): string {
        return this.description;
    }

    public abstract cost():number;
}

class ModelS extends Car{

    constructor(){
        super();
        this.description = "Model S";
    }

    public cost():number {
        return 80000;
    }

}

class ModelX extends Car{

    constructor(){
        super();
        this.description = "Model X";
    }

    public cost():number {
        return 80000;
    }

}

abstract class CarOptions extends Car{
    protected decoratedCar!: Car;

    constructor(car: Car){
        super();
        this.decoratedCar = car;
    }

    public abstract getDescription(): string;
    public abstract cost(): number;
}

class EnhancedAutoPilot extends CarOptions {
    constructor(car: Car){
        super(car);
    }

    public getDescription(): string {
        return this.decoratedCar.getDescription() + ", Enhanced AutoPilot";
    }
    public cost(): number {
        return this.decoratedCar.cost() + 5000;
    }   
}

class MotionSensor extends CarOptions {
    constructor(car: Car){
        super(car);
    }

    public getDescription(): string {
        return this.decoratedCar.getDescription() + ", Motion Sensor";
    }
    public cost(): number {
        return this.decoratedCar.cost() + 4500;
    }   
}

let myCar = new ModelS();

myCar = new EnhancedAutoPilot(myCar);
// myCar = new MotionSensor(myCar);
console.log(myCar.getDescription(), myCar.cost());