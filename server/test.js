let unorderedItem = { "parsnip": 300, "parsnipSeed": 10, "cauliflower": 100, "cauliflowerSeed": 5, "strawberry": 500, "strawberrySeed": 50, "seeds": 20, "icecream": 150, "survivalHamburger": 80, "friedEgg": 50, "cheeseCauliflower": 30 };

const items = Object.values(unorderedItem)
    .sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
    });

let arr = [];

for(let x in unorderedItem){
    arr.push([x, unorderedItem[x]]);
}

arr.sort((x, y) => {
    return x[1] - y[1];
});

unorderedItem = Object.fromEntries(arr);


console.log(unorderedItem);