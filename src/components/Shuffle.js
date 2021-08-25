import React from 'react'


function Dealer(Cards) {
    /*const rndInt = Math.floor(Math.random() * 55) + 1;
    Shuffle.log(rndInt);    */
    Shuffle(Cards);
    console.log(Cards)


}

export function Shuffle(a) {
    var j, x, i;
    console.log("a.length", a.length);
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


