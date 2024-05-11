const getPrimeNumber = require('./prime.js')

const calculateFunction = (p, q) => {
    return (p - 1n) * (q - 1n)
}

const pow = (a, b) => {
    return BigInt(a) ** BigInt(b);
}

const calculateD = (e, n) => {
    for (let i = 0n; i < 100000000n; i += 1n) {
        if (BigInt(i) * BigInt(e) % n === 1n) return i
    }
}

const alphabet = '_АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSRUVWXYZабвгдежзиклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz 123456789,.!?:;@#$%^&*()+=-';
const createCodes = (str) => {
    const chars = str.split('');
    return chars.map(char => {
        let number = 0n;
        for (let i = 0; i < char.length; i++) {
            const index = BigInt(alphabet.indexOf(char[i]));
            number = number * BigInt(alphabet.length) + index;
        }
        return number;
    });
}

const createChars = (nums) => {
    return nums.map(number => {
        let chars = '';
        let remainder = number;
        while (remainder > 0n) {
            const index = remainder % BigInt(alphabet.length);
            chars = alphabet[Number(index)] + chars;
            remainder = remainder / BigInt(alphabet.length);
        }
        return chars;
    });
}

const message = 'Задача'
const p = 443
const q = 709

const bigP = BigInt(p)
const bigQ = BigInt(q)
const bigN = bigQ * bigP
const bigFunction = calculateFunction(bigQ, bigP)
const bigE = getPrimeNumber(bigFunction)
const bigD = calculateD(bigE, bigFunction)

console.log(`Открытый ключ - { ${bigE}, ${bigN} }`);
console.log(`Закрытый ключ - { ${bigD}, ${bigN} }`);

const messageCodes = createCodes(message)

const startEncryptTime = new Date().getTime()
const codes = []
for(let i = 0; i < messageCodes.length; i += 1) {
    codes.push(pow(messageCodes[i], bigE) % bigN)
}
const finishEncryptTime = new Date().getTime()

const encryptedMessage = createChars(codes)
console.log(`Зашифрованное сообщение -\t"${encryptedMessage.join('')}"`);
console.log(`Время шифрования сообщения длиной ${message.length} символов:\t${finishEncryptTime - startEncryptTime} мс`);

const startDecryptTime = new Date().getTime()
const descryptedCodes = []
for(let i = 0; i < codes.length; i += 1) {
    descryptedCodes.push(pow(codes[i], bigD) % bigN)
}
const finishDecryptTime = new Date().getTime()
console.log(`Расшифрованное сообщение -\t"${createChars(descryptedCodes).join('')}"`);
console.log(`Время дешифрования сообщения длиной ${message.length} символов:\t${finishDecryptTime - startDecryptTime} мс`);