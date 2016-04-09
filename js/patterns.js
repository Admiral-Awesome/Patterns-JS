//decorator

function animal( name, type ) {
    this.name = name;
    this.type = type;

}


animal.prototype = {
    constructor : animal,
    battleAction : function() {
        console.log(this.name + " attacks ");
    }
}

function animalWithClaws(animal) {
    this.animal = animal;
}
    
animalWithClaws.prototype = {
    constructor : animalWithClaws,
    battleAction : function() {
        this.animal.battleAction();
        console.log( "with paws");
    }
}

//factory

function makeAnimal(name, type) {
    this.name = name;
    this.type = type;
}

makeAnimal.prototype = {
    constructor : makeAnimal,
    makeSimpleAnimal : function() { return new animal(this.name, this.type)},
    makeAnimalWithClaws : function () { return new animalWithClaws(this.makeSimpleAnimal())}
}

// memoization

function sum(x, y) {
    var key = x.toString() + "-" + y.toString();

    if ( sum.already[key] ) return sum.already[key];
    var tmp = 0;
    for ( var i = 0; i < 10000000000; i++, tmp += x + y); 
    sum.already[key] = tmp;
    console.log(sum.already[key] = tmp);
    return sum.already[key]; 
}

sum.already = {};


//mediator

function Rabbit() {
    this.isAlive = true;

}

Rabbit.prototype = {
    constructor : Rabbit,
    hide : function() {
        if ( meadow.log ) {
            console.log("Rabbit: can't get! i'm in log ");
            meadow.lion.breakLog();
            return true;
        } 
        console.log("there is no place to hide, Rabbit was eaten R-R-R-R!!11!!1");
        this.isAlive = false;
        return false;

    }
}

function Lion() {
}

Lion.prototype = {
    constructor : Lion,
    getRabbit : function() {
        console.log("Lion : I'll eat you!");
        return meadow.rabbit.hide();
    },
    breakLog : function() {
        console.log("*Lion breaks log*");
        meadow.log -= 1;
    }
}

var meadow = {
    lion : new Lion(),
    rabbit : new Rabbit(),
    log : 2
}

while (meadow.lion.getRabbit());

//observer 

var Event = function() {
    this.observers = [];
}

Event.prototype = {
    act : function (data ) {
        for ( var i in this.observers ) {
            var item = this.observers[i];
            item.observer( data); 
        }
    }, addObserver : function (observer1, name) {
        this.observers.push({observer : observer1, name : name});
    }, removeOvserver : function (observer) {
        for ( var i in this.observers) {
            if (this.observers[i].observer == observer) delete this.observers[i];
        }
    }
}

var newEvent = new Event();
    
    newEvent.addObserver(function(data) {
        if ( data ) {
        console.log(this.name + " worked with data " + data);
    } else { 
        console.log(this.name + " worked without data")}
    }, "observer1");
    

    var SomeObject = {
        something : "something",
        callb : function(data) {
            if ( data ) {
        console.log(this.name + " worked with data " + data + "\nInside :" + SomeObject.something);
    } else { 
        console.log(this.name + " worked without data" + "\nInside :" + SomeObject.something)}
        }
    };

    newEvent.addObserver(SomeObject.callb , "observer2");
    newEvent.act("test1");
    newEvent.act();
    