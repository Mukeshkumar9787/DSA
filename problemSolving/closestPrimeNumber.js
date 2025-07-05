/**
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var closestPrimes = function (left, right) {
    let prime = getPrimeNumbers(left, right);
    if (prime.length < 2) return [-1, -1];
    let out = [prime[prime.length - 2], prime[prime.length - 1]];
    for (let i = prime.length - 2; i > 0; i--) {
        if ((out[1] - out[0] ) >= (prime[i] - prime[i - 1])) {
            out[0] = prime[i - 1];
            out[1] = prime[i];
        }
    }
    return out;
};
function getPrimeNumbers(left, right) {
    let prime = Array.from({ length: right + 1 }).fill(true);
    for (let i = 2; i < prime.length; i++) {
        if(prime[i]){
            for (let j = i * i; j < prime.length ; j += i ) {
                prime[j] = false;
            }
        }
    }
    return prime.map((b, i) => b ? i : -1).filter(i => i >= 2 && i >= left);
}

console.log(closestPrimes(1,1000000))