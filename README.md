# Patterns-JS

###1.Decorator
###2.Factory
###3.Memoization
###4.Singleton
###5.Mediator
###6.Observer
##All examples in index.html and js/patterns.js .
###1.Decorator

  This pattern is useful for adding some new properties for the object, which are not existing in native constructor.

  In my example there is 
    
    `var bear = new animal("Misha", "bear");
    
    bear.battleAction(); //Misha attacks

    var normalBear = new animalWithClaws(bear);

    normalBear.battleAction();`//Misha attacks with claws
    
    we added claws to our misha and native 'animal' does not know about this property
    
###2.Factory

  The main aim is the opportunity to create few types of object by returning from the factory methods.
  
  In my example there is
    
    var zoo = new makeAnimal("Simba", "lion"); // factory
    
    var lion1 = zoo.makeSimpleAnimal();  // make simple animal
    
    var lion2 = zoo.makeAnimalWithClaws(); // make animal with claws

    console.log(lion1 instanceof animal); //true
    console.log(lion2 instanceof animalWithClaws); //true
###3.Memoization 
    It Mostly used for some calculation. We use some memory dump to save already calculated result.
    exactly calculations must be the same at the same variable
    
    In my example there is function(x,y) that calculates x+y 10000000000 times 
    and add to the caltuclated values  - 'sum.already[key]' , where key = x.toString() + "-" + y.toString();
    we use additional memory but there is 'super time' result
    
    var time1 = new Date();
    var value1 = sum(1,1);
    var time2 = new Date();
    console.log( "value1 : "  + value1);
    console.log( "value1 time calc " + (time2.getTime() - time1.getTime()) /1000 + " sec "); //~ 17 sec

    var time1 = new Date();
    var value2 = sum(1,1);
    var time2 = new Date();
    console.log( "value2 : "  + value2);
    console.log( "value2 time calc " + (time2.getTime() - time1.getTime()) /1000 + " sec "); // ~ 0 sec
###4.Singleton

  The purpose is creating the only object
  
  Usage in my example: 
    
    var SingleObj = (function(obj){  //creates the only object from "lion1"
    var object;

    function create(obj) {
        return obj;
    }
    return {
        getObj : function() {
            if ( object ) {
                return object;
            }
            object = create(obj);
            return create(obj);
        }
    }

    })(lion1);

    var obj1 = SingleObj.getObj();
    var obj2 = SingleObj.getObj();
    var obj3 = SingleObj.getObj();
    console.log(obj1 === obj2 && obj2 === obj3); //true               
    
it means that obj1 , obj2, obj3 have the same links

###5.Mediator 
   Pattern puts connection(behaviour) between some different object types
   
   in my example there are meadow, lion and rabbit. Meadow has logs where rabbit can hide 
   and it cannot be eaten until logs existing. Lion tries to catch rabbit and break 1 log if rabbit inside
   
   so We create meadow:
   
     var meadow = {
        lion : new Lion(),
        rabbit : new Rabbit(),
        log : 2
    }

    while (meadow.lion.getRabbit()); //till rabbit will be eaten
    
  colnsole :
    Lion : I'll eat you!
    
    Rabbit: can't get! i'm in log 
    
    *Lion breaks log*
    
    Lion : I'll eat you!
    
    Rabbit: can't get! i'm in log 
    
    *Lion breaks log*
    
    Lion : I'll eat you!
    
    there is no place to hide, Rabbit was eaten R-R-R-R!!11!!1
    
###Observer
  The name tells about itself. We add subscriber to some events and react on it when it fires.
   
  in my case there is an Event and a few observers:
   
     newEvent.addObserver(function(data) { //callBack
        if ( data ) {
        console.log(this.name + " worked with data " + data);
    } else { 
        console.log(this.name + " worked without data")}
    }, "observer1"); // name
    

    var SomeObject = {
        something : "something",
        callb : function(data) { 
            if ( data ) {
        console.log(this.name + " worked with data " + data + "\nInside :" + SomeObject.something);
    } else { 
        console.log(this.name + " worked without data" + "\nInside :" + SomeObject.something)}
        }
    };

    newEvent.addObserver(SomeObject.callb , "observer2"); //callback name
    newEvent.act("test1"); //act with data
    newEvent.act(); //act without data
    
    console result:
    observer1 worked with data test1
    observer2 worked with data test1
    Inside :something
    observer1 worked without data
    observer2 worked without data
    Inside :something
