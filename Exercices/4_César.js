class Cesar {
  constructor(message, key = 9) {
    this.message = message;
    this.key = key;
    this.cryptedMessage = '';
  }

  encrypt(message = this.message, key = this.key) {
    let result = '';

    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);

      if (char >= 65 && char <= 90) {
        // A-Z
        result += String.fromCharCode(((char - 65 + key) % 26) + 65); // 65 = A, 90 = Z, 26 = number of letters in the alphabet
      } else if (char >= 97 && char <= 122) {
        // a-z
        result += String.fromCharCode(((char - 97 + key) % 26) + 97); // 97 = a, 122 = z, 26 = number of letters in the alphabet
      } else {
        // other
        result += message.charAt(i);
      }
    }

    this.cryptedMessage = result;

    return this.cryptedMessage;
  }

  decrypt(message = this.cryptedMessage, key = this.key) {
    return this.encrypt(message, 26 - key); // 26 = number of letters in the alphabet
  }
}

const cesar = new Cesar('Hello World', 5);
console.log(cesar.encrypt());
console.log(cesar.decrypt());
