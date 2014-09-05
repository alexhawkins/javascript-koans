var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var hasNoNutsorShrooms = _.filter(products, function(prod) {
        return prod.containsNuts === false && !_.some(prod.ingredients, function(ingred){
            return ingred === "mushrooms";
        });
      });

      _.each(hasNoNutsorShrooms, function(product) { productsICanEat.push(product) });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.chain(_.range(0,1000)) /* try chaining range() and reduce() */
      .reduce(function(memo, x){ return x % 3 === 0 || x % 5 === 0 ? memo + x : memo; })
      .value();   

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.chain(products)
      .map(function(product) { return product.ingredients; })
      .flatten()
      .reduce(function (ingredientCount, word) {
        ingredientCount[word] = (ingredientCount[word] || 0) + 1;
        return ingredientCount;
      }, {}) //empty object serves as an intial value to start our reduce
      .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    //prime factors implementation 1
    var largestPrime = function(num) {
      var largest = 0;
      for (var i = 2; i < num; i++) {
          //check to see if number is divisible
          if (num % i === 0) {
              checkPrime = true;
              //check to see if divisible number is prime
              for (var j = 2; j < i; j++) {
                  if (i % j === 0) checkPrime = false;
              }
              if (checkPrime) largest = i;
          }
      }
      return largest;
    };

    //alternate prime factors implementation, storing all factors in an array
    var largestPrime2 = function(num) {
        var primeFactors = [],
            i = 2;
        while (num > 1) {
            //check to see if number is divisible 
            while (num % i === 0) {
                //if it is and it's prime
                primeFactors.push(i);
                num /= i; //get the next divisible factor
            }
            i += 1;
        }
        return Math.max.apply(null, primeFactors);
    };

    expect(largestPrime2(13195)).toBe(29);
    expect(largestPrime(13195)).toBe(29);
    expect(largestPrime(100)).toBe(5);
    expect(largestPrime2(100)).toBe(5);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //should find the largest palindrome made from the product of two 3 digit numbers
    var largestPalindrome = function() {

        var max = 0,
            product = 0;
        for (var num1 = 999; num1 >= 100; num1--) {
            for (var num2 = 999; num2 >= 100; num2--) {
                product = num1 * num2;
                product > max && isPalindrome(product.toString()) ?  max = product : 0;
            }
        }
        return max;
    };

    //check to see if product is a palindrome
    var isPalindrome = function(product) {

        var palindromeCheck = true;
        for (var i = 0; i < product.length / 2; i++) {
            if (product[i] != product[product.length - i - 1])
                palindromeCheck = false;
        }
        return palindromeCheck;
       // or just do this:
       //return product === product.split("").reverse().join("");
    };

    expect(largestPalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums of number 1 through 10, and 1 through 100", function () {
    
    var sumOfSquares = function(numbers) {
      return _.reduce(numbers, function(memo, a) {
          return memo + (a * a);
      });
    };

    var squareOfSums = function(numbers) {
        var sum = _.reduce(numbers, function(memo, a) {
            return memo + a;
        });
        return sum * sum;
    };

    var nums1 = (_.range(1,11));
    var nums2 = (_.range(1,101));
    var difference1 = Math.abs(squareOfSums(nums1) - sumOfSquares(nums1));
    var difference2 = Math.abs(squareOfSums(nums2) - sumOfSquares(nums2));

    expect(difference1).toBe(2640);
    expect(difference2).toBe(25164150);
    
  });

  it("should find the 10001st prime", function () {

  });
});
