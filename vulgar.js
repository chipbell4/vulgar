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

var cleanupFraction = function(singleFractionString) {
    var split = singleFractionString.split('/').map(function(element) {
        return Number(element.trim());
    }); 

    var cleanFraction = reduceFraction({ numerator: split[0], denominator: split[1] });
    var result = '';
    if(cleanFraction.whole != 0) {
        result += cleanFraction.whole + ' ';
    }

    // TODO: Make this use the HTML entity map
    result += cleanFraction.numerator + '/' + cleanFraction.denominator;
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
