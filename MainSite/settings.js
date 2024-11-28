// Grabs input elements in settings menu
var useHashTable = document.getElementById("use-hashtable");
var useMinHeap = document.getElementById("use-minheap");

// Toggles MinHeap to be opposite state of HashTable
useHashTable.addEventListener("click", function (e) {
    useMinHeap.checked = !useHashTable.checked;
});

// Togles HashTable to be opposite state of MinHeap
useMinHeap.addEventListener("click", function (e) {
    useHashTable.checked = !useMinHeap.checked;
});