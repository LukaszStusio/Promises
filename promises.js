console.log('I\'s alive!!!');

function makePizza(toppings = []) {
    const amountOfTimeToBake = 500 + (toppings.length * 200);
    return new Promise(function(resolve, reject){
        // wait 1 sec for a pizza to bake:
        setTimeout(function(){

            // when you are ready you can resolve this promise
            resolve(`Here\'s your pizza with ${toppings.join(' + ')}!`);
        }, amountOfTimeToBake);


        // if something went wrong you can reject this Promise
    });
}


const pepperoniPromise = makePizza(['Pepperoni']);
const canadianPromise = makePizza(['Pepperoni', 'Mushrooms', 'Onions']);

console.log(pepperoniPromise, canadianPromise);

// canadianPromise.then(function(pizza){
//     console.log('Ahh at last!');
//     console.log(pizza);
// })


// chaining with .then() method:
// console.log('Chaining with .then() method:');

makePizza(['Pepperoni'])
    .then(function (pizza) {
        console.log(pizza);
        return makePizza(['Ham', 'Cheese']);
    })
    .then(function (pizza) {
        console.log(pizza);
        return makePizza(['Hot Peppers', 'Onions', 'Salami', 'Extra cheese']);
    })
    .then(pizza => {
        console.log(pizza)
        console.log('All done. Here is your last pizza.')
    });

    // Run them concurrently:
    const pizzaPromiseOne = makePizza(['Ham', 'Cheese']);
    const pizzaPromiseTwo = makePizza(['Hot Peppers', 'Onions', 'Salami', 'Extra cheese']);
    const pizzaPromiseThree = makePizza(['Pepperoni', 'Mushrooms', 'Onions']);

    // static method
    const megaPromise = Promise.all([pizzaPromiseOne, pizzaPromiseTwo, pizzaPromiseThree]);

    megaPromise.then(pizzas => {
        console.log('Running concurrently makePizza() using static method that takes an array of promises as argument:')
        console.log(pizzas);
    })

    // Method that waits for the first element in array:
    const firstPizzaPromise = Promise.race([pizzaPromiseOne, pizzaPromiseTwo, pizzaPromiseThree]);

    firstPizzaPromise.then(pizza => {
        console.log('You must be very hungry so take it and wait for the rest.')
        console.log(pizza);
    })