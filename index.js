const R = require('ramda');

// The result of the following code is [46, 15, 0]
R.reduce((acc,x) => R.compose(R.flip(R.prepend)(acc), R.sum,R.map(R.add(1)))([x,...acc]), [0])([13, 28]);

/*

########################################
Detailed results of R.reduced iterations
########################################

Initial Array
[13, 18]

Start
acc = [0]

First iteration
x = 13
acc = [0]
[13, 0] // Construct the array [x,...acc]
[14, 1] // Add 1 to every element of the array - R.map(R.add(1))
15 // Sum the elements of the previous array - R.sum
[15, 0] // Prepend 15 to acc
        // R.prepend would prepend [0] to 15 but with R.flip the two arguments flip
        // and 15 is prepended to [0]
acc = [15, 0]

Second iteration
x = 28
acc = [15, 0]
[28, 15, 0] // Construct the array [x,...acc]
[29, 16, 1] // Add 1 to every element of the array - R.map(R.add(1))
46 // Sum the elements of the previous array - R.sum
[46, 15, 0] // Prepend 46 to acc
            // R.prepend would prepend [15, 0] to 46 but with R.flip the two arguments flip
            // and 46 is prepended to [15, 0]
acc = [46, 15, 0]

Result
[46, 15, 0]



##############################################
Explanation of the different parts of the code
##############################################

--------
R.reduce
--------

R.reduce will go through each item ('x') of the array [13, 28].

'acc' is the accumulator of R.reduce and is initially set to [0]

For each item ('x'), R.reduce will call the iterator function:
	(acc,x) => R.compose(R.flip(R.prepend)(acc), R.sum,R.map(R.add(1)))([x,...acc])
and return an updated value of 'acc'.


---------
R.compose
---------

For each iteration of R.reduce, R.compose performs a composition of the three functions specified,
from right to left. The three functions will be computed according to the following order:

	1. R.map
	2. R.sum
	3. R.flip


-----
R.map
-----

For each iteration of R.reduce, R.map adds 1 (R.add(1)) to all the elements of [x,...acc].
[x,...acc] is an array whose first element is 'x' and the remaining elements are the current elements of 'acc'.


-----
R.sum
-----

For each iteration of R.reduce, R.sum sums all the elements of the array return by R.map


------
R.flip
------

For each iteration of R.reduce, R.flip takes the value returned by R.sum (below designated as 'sum') and
prepends it to the current value of 'acc'.
Actually, R.prepend would prepend 'acc' to 'sum'. But R.flip, forces the two arguments of R.prepend
to reverse order and, therefore, 'sum' will be prepended to 'acc'.

*/