# Default Definitions
## Ending the program with an error
This function is called when someone says "End the program with an error because *x*", where *x* is the input value.
The input value is called *reason*.
Run the javascript `throw new Error(reason);`.

## Print on console
This function is called when someone says "write *x* to the console", where *x* is the input value.
There is one element in *input values*.
The 1st input value is called *content*.
Run the javascript `console.log(content);`.

## Checking whether two values are unequal
This function is called when someone says "whether *a* is not equal to *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "*a* is not equal to *b*", where *a* is the 1st input value and *b* is the 2nd input value.
The 1st input value is called *a*. The 2nd input value is called *b*.
The result is the javascript `a !== b`.

## Checking whether two values are equal
This function is called when someone says "whether *a* is equal to *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "*a* is equal to *b*", where *a* is the 1st input value and *b* is the 2nd input value.
The 1st input value is called *a*. The 2nd input value is called *b*.
The result is the javascript `a === b`.

## Finding out the amount of values in a list
This function is called when someone says "The amount of values in *x*", where *x* is the input value.
The input value is called *list*. *list* is a list.
The result is the javascript `list.length`.

## Making sure that a list contains the correct amount of values
This function is called when someone says "There are *a* *b*", where *a* is the 1st input value and *b* is the 2nd input value.
The 1st input value is called *the given amount of values*. The 2nd input value is called *the list*.
If the amount of values in *the list* is not equal to *the given amount of values*, then end the program with an error because the amount of values in the list is not the given amount of values.

## Making sure that a list contains exactly one value
This function is called when someone says "There is one element in *x*", where *x* is the input value.
The 1st input value is called *the list*.
If the amount of values in *the list* is not equal to 1, then end the program with an error because the amount of values in the list is not the given amount of values.

## Making sure that a value is a number
This function is called when someone says "*a* is a number", where *a* is the input value.
The input value is called *variable*.
The result is the javascript `typeof variable === 'number'`.

## Making sure that a value is a list
This function is called when someone says "*a* is a list", where *a* is the input value.
The input value is called *variable*.
The result is the javascript `Array.isArray(variable)`.

## Parsing integers
This function is called when someone says "the parsed integer of *a*", where *a* is the input value.
There is one element in *input values*.
The 1st input value is called *unparsed string*.
The result is the javascript `parseInt(unparsed_string)`.

## Less than
This function is called when someone says "whether *a* is less than *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "*a* is less than *b*", where *a* is the input value.
There are 2 *input values*.
The 1st input value is called *smaller*. *smaller* is a number.
The 2nd input value is called *greater*. *greater* is a number.
The result is the javascript `smaller < greater`.

## Division
This function is called when someone says "divide *a* by *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "*a* divided by *b*", where *a* is the 1st input value and *b* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *numerator*. *numerator* is a number.
The 2nd input value is called *denominator*. *denominator* is a number.
The result is the javascript `numerator / denominator`.

## Multiplication
This function is called when someone says "multiply *a* by *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "*a* multiplied by *b*", where *a* is the 1st input value and *b* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *factor one*. *factor one* is a number.
The 2nd input value is called *factor two*. *factor two* is a number.
The result is the javascript `factor_one * factor_two`.

## Addition
This function is called when someone says "add *a* and *b*", where *a* is the 1st input value and *b* is the 2nd input value.
This function is called when someone says "the sum of *a* and *b*", where *a* is the 1st input value and *b* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *term one*. *term one* is a number.
The 2nd input value is called *term two*. *term two* is a number.
The result is the javascript `term_one + term_two`.

## Subtraction
This function is called when someone says "subtract *a* from *b*", where *a* is the 2nd input value and *b* is the 1st input value.
This function is called when someone says "subtraction of *a* from *b*", where *a* is the 1st input value and *b* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *minuend*. *minuend* is a number.
The 2nd input value is called *subtrahend*. *subtrahend* is a number.
The result is the javascript `minuend - subtrahend`.

## Empty list
This function is called when someone says "the empty list", where nothing is the input value.
The result is the javascript `[]`.

## Value List concatenation
This function is called when someone says "the list consisting of the value *x* and the entries of *y*", where *x* is the 1st input value and *y* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *entry one*. The 2nd input value is called *entry two*.
The result is the javascript `[entry_one].concat(entry_two)`.

## List List concatenation
This function is called when someone says "the list consisting of the entries of *x* and *y*", where *x* is the 1st input value and *y* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *entry one*. The 2nd input value is called *entry two*.
The result is the javascript `entry_one.concat(entry_two)`.

## Inline list notation
This function is called when someone says "the *x*, *y* list", where *x* is the 1st input value and *y* is the 2nd input value.
There are 2 *input values*.
The 1st input value is called *entry one*. The 2nd input value is called *entry two*.
The result is the javascript `[entry_one, entry_two]`.

## Fibonacci
This function is called when someone says "the Fibonacci sequence up to *x*", where *x* is the input value.
There is one element in *input values*.
The 1st input value is called *the maximum*.
The result is the list consisting of the entries of the 0, 1 list and the fibonacci sequence starting after 0 and 1 up to *the maximum*.

## Fibonacci calculating values from two previous values
This function is called when someone says "The fibonacci sequence starting after *a* and *b* up to *c*", where *a* is the 1st input value and *b* is the 2nd input value and *c* is the 3rd input value.
The 1st input value is called *one*. The 2nd input value is called *two*. The 3rd input value is called *the maximum*.
The sum of *one* and *two* is called *the next value*. If *the maximum* is equal to *the next value*, then the result is the empty list.
The result is the list consisting of the value *the next value* and the entries of the fibonacci sequence starting after *two* and *the next value* up to *the maximum*.


## Main
The result is the fibonacci sequence up to 8.
