/*
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:

Smallest Common Multiple
*/


function smallestCommons(arr) {
    var smallerNumber = arr[0] > arr[1] ? arr[1] : arr[0];
    var largerNumber = smallerNumber === arr[0] ? arr[1] : arr[0];
    var index = smallerNumber;
    var output = 0;

    while (index > largerNumber) {
        output = index * index + 1;
        index++;
    }

    output = output / 2;

    console.log(output);

    return output;
}

smallestCommons([1, 5]) // should return 60.
smallestCommons([5, 1]) // should return 60.
smallestCommons([1, 13]) // should return 360360.
smallestCommons([23, 18]) // should return 6056820.