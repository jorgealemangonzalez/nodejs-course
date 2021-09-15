/*
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.
*/
function updateInventory(arr1, arr2) {    
    const inventoryItems = arr1.map(([amount, name]) => ({[name]: amount})).reduce((p, n)=> ({...p, ...n}))
    for ( b in arr2 ) {
        const entry = arr2[b]
        if(inventoryItems[entry[1]] === undefined) {
            inventoryItems[entry[1]] = entry[0]
        } else {
            inventoryItems[entry[1]] = entry[0] + inventoryItems[entry[1]]
        }
    }

    const result = Object.keys(inventoryItems).map(k => [inventoryItems[k], k]);
    return [...result];
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);