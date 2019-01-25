function cleanDecimal(num, power) {
    var MUL_DIV = 100;
    if (power) {
        MUL_DIV = 10**power;
    }
    return (Math.floor(Number(num) * MUL_DIV) / MUL_DIV);
}