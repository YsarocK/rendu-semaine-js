const phrase = '8790: bonjour le monde:8987:7777:Hello World:    9007';

class Parser {
  constructor(char) {
    this.char = char;
    this.str = '';
  }

  parse(phrase) {
    const arr = this.splitString(phrase);

    arr.map((str) => {
      if (this.isNumber(str)) {
        this.str += this.removeSpaces(str) + ' ';
      }
    });

    return this.str;
  }

  splitString(phrase) {
    return phrase.split(this.char);
  }

  isNumber(str) {
    return !isNaN(str);
  }

  removeSpaces(str) {
    return str.replace(/ /g, '');
  }
}

const p = new Parser(':');
p.parse(phrase);

console.log(p.str);
