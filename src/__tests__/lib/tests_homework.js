function fizzBuzz(i) {
    let result = '';
    if (i % 3 === 0) {
      result += 'Fizz';
    }
    if (i % 5 === 0) {
      result += 'Buzz';
    }
    return result || i;
}

function fib(x) {
    return x <= 1 ? x : fib(x-2) + fib(x-1)
}

function xxx(str) {
    return str.split("").reduce((xyz, abc)=> abc + xyz, '');
}

describe("fizzBuzz", () => {
    test("returns 'fizz' for 3", () => {
        expect(fizzBuzz(3)).toEqual('Fizz');
    });
    test("returns 'buzz' for 5", () => {
        expect(fizzBuzz(5)).toEqual('Buzz');
    });
    test("returns 4 for 4", () => {
        expect(fizzBuzz(4)).toEqual(4);
    });
});