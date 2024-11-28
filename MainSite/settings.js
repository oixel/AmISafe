// Grabs input elements in settings menu
var useHashTable = document.getElementById("use-hashtable");
var useMinHeap = document.getElementById("use-minheap");
var radiusSlider = document.getElementById("radius-slider");

// Toggles MinHeap to be opposite state of HashTable
useHashTable.addEventListener("click", function (e) {
    useMinHeap.checked = !useHashTable.checked;
});

// Togles HashTable to be opposite state of MinHeap
useMinHeap.addEventListener("click", function (e) {
    useHashTable.checked = !useMinHeap.checked;
});

// Updates text next to radius slider to show current slider value
radiusSlider.addEventListener("input", function (e) {
    document.getElementById("radius-text").textContent = `${radiusSlider.value} miles`;
});