const _ = require('lodash');

module.exports = {

  sum: function (numbers) {
    return _.reduce(numbers, (sum, num) => sum + num);
  },

  randomID: function (length) {
    var text = "";
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  isValidEmail: function (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },

  cleanDecimal: function (num, power) {
    var MUL_DIV = 100;
    if (power) {
        MUL_DIV = 10**power;
    }
    return (Math.floor(Number(num) * MUL_DIV) / MUL_DIV);
  },

  // convert long hashed address to 0xB4...bb6d
  cleanAddress: function (address) {
    return address.slice(0,4) + "..." + address.slice(-4);
  }

}
