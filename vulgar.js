var gcd = function(a, b) {
    if(b == 0) {
        return a;
    }

    return gcd(b, a % b);
};

var reduceFraction = function(fraction) {
    var reduction = gcd(fraction.numerator, fraction.denominator);

    // the new numerator and denominator
    var numerator = fraction.numerator / reduction;
    var denominator = fraction.denominator / reduction;

    var whole = 0;
    if(numerator > denominator) {
        whole = Math.floor(numerator / denominator);
        numerator = numerator % denominator;
    }

    return {
        whole: whole,
        numerator: numerator,
        denominator: denominator
    };
}

var fractionReplacements = {
    "1/4" : "¼",
    "1/2" : "½",
    "3/4" : "¾",
    "1/3" : "⅓",
    "2/3" : "⅔",
    "1/5" : "⅕",
    "2/5" : "⅖",
    "3/5" : "⅗",
    "4/5" : "⅘",
    "1/6" : "⅙",
    "5/6" : "⅚",
    "1/8" : "⅛",
    "3/8" : "⅜",
    "5/8" : "⅝",
    "7/8" : "⅞",
};

var cleanupFraction = function(singleFractionString) {
    var split = singleFractionString.split('/').map(function(element) {
        return Number(element.trim());
    }); 

    var cleanFraction = reduceFraction({ numerator: split[0], denominator: split[1] });
    var result = '';
    if(cleanFraction.whole != 0) {
        result += cleanFraction.whole + ' ';
    }

    var lookupKey = cleanFraction.numerator + '/' + cleanFraction.denominator;
    if(fractionReplacements[lookupKey] !== undefined) {
      result += fractionReplacements[lookupKey];
    } else {
      result += lookupKey;
    }
    return result;
}

var replaceFractions = function(node) {
    // If this is not a text node, keep recursing
    if(node.nodeType !== Node.TEXT_NODE) {
        Array.prototype.forEach.call(node.childNodes, replaceFractions);
        return;
    }

    node.textContent = node.textContent.replace(/\d+\s*\/\s*\d+/, cleanupFraction);
}
