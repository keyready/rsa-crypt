function gcdBigInt(a, b) {
 while (b !== 0n) {
    let t = b;
    b = a % b;
    a = t;
 }
 return a;
}

function isPrime(n, k = 40) {
 if (n <= 1n || n == 4n) return false;
 if (n <= 3n) return true;
 let d = n - 1n;
 while (d % 2n == 0n) d /= 2n;
 for (let i = 0; i < k; i++) {
    if (!millerTest(d, n)) return false;
 }
 return true;
}

function millerTest(d, n) {
 const r = BigInt(Math.floor(Math.random() * 100_000))
 const y = r * (n - 2n) / 100_000n
 let a = 2n + y % (n - 4n);
 let x = power(a, d, n);
 if (x == 1n || x == n - 1n) return true;
 while (d != n - 1n) {
    x = (x * x) % n;
    d *= 2n;
    if (x == 1n) return false;
    if (x == n - 1n) return true;
 }
 return false;
}

function power(x, y, p) {
 let res = 1n;
 x = x % p;
 while (y > 0n) {
    if (y & 1n) res = (res * x) % p;
    y = y / 2n;
    x = (x * x) % p;
 }
 return res;
}

function findFirstInverse(n) {
 let phi = n;
 for (let i = 2n; i <= n; i++) {
    if (gcdBigInt(n, i) === 1n) {
      phi -= 1n;
    }
 }
 let firstInverse = phi + 1n;
 while (!isPrime(firstInverse)) {
    firstInverse += 1n;
 }
 return firstInverse;
}


const getPrimeNumber = (n) => {
    const firstInverse = findFirstInverse(n);
    return (firstInverse);
}

module.exports = getPrimeNumber