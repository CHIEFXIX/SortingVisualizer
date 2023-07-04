// Function to generate random array
function generateArray() {
    const barsContainer = document.querySelector('.bars-container');
    barsContainer.innerHTML = '';

    const arraySize = 60;
    const array = [];

    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 300) + 5);
    }

    for (let i = 0; i < array.length; i++) {
        const arrayBar = document.createElement('div');
        arrayBar.classList.add('array-bar');
        arrayBar.style.height = `${array[i]}px`;
        barsContainer.appendChild(arrayBar);
    }
}

// Bubble sort algorithm
async function bubbleSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars).map((element) => parseInt(element.style.height));

    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(arrayBars, j, j + 1);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        updateBars(arrayBars, array); // Update bars after each pass
    }
    updateBars(arrayBars, array); // Update bars after sorting is complete
}

// Insertion sort algorithm
async function insertionSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars).map((element) => parseInt(element.style.height));

    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        const key = array[i];

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            await delay(10);
            updateBars(arrayBars, array);
            j--;
        }

        array[j + 1] = key;
        await delay(10);
        updateBars(arrayBars, array);
    }
}

// Merge sort algorithm
async function mergeSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars).map((element) => parseInt(element.style.height));

    await mergeSortHelper(array, 0, array.length - 1, arrayBars);
}

async function mergeSortHelper(array, start, end, arrayBars) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(array, start, mid, arrayBars);
        await mergeSortHelper(array, mid + 1, end, arrayBars);
        await merge(array, start, mid, end, arrayBars);
    }
}

async function merge(array, start, mid, end, arrayBars) {
    const sortedArray = [];
    let i = start;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        if (array[i] <= array[j]) {
            sortedArray.push(array[i]);
            i++;
        } else {
            sortedArray.push(array[j]);
            j++;
        }
    }

    while (i <= mid) {
        sortedArray.push(array[i]);
        i++;
    }

    while (j <= end) {
        sortedArray.push(array[j]);
        j++;
    }

    for (let k = start; k <= end; k++) {
        array[k] = sortedArray[k - start];
        await delay(10);
        updateBars(arrayBars, array);
    }
}

// Quick sort algorithm
async function quickSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars).map((element) => parseInt(element.style.height));

    await quickSortHelper(array, 0, array.length - 1, arrayBars);
    updateBars(arrayBars, array); // Update bars after sorting is complete
}

async function quickSortHelper(array, low, high, arrayBars) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high, arrayBars);
        await quickSortHelper(array, low, pivotIndex - 1, arrayBars);
        await quickSortHelper(array, pivotIndex + 1, high, arrayBars);
    }
}

async function partition(array, low, high, arrayBars) {
    const pivot = array[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            await swap(arrayBars, i, j);
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }

    await swap(arrayBars, i, high);
    [array[i], array[high]] = [array[high], array[i]];
    return i;
}

// Selection sort algorithm
async function selectionSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars).map((element) => parseInt(element.style.height));

    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        await swap(arrayBars, i, minIndex);
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        updateBars(arrayBars, array); // Update bars after each pass
    }
    updateBars(arrayBars, array); // Update bars after sorting is complete
}

// Helper function to swap two elements in the array
async function swap(arrayBars, i, j) {
    const temp = arrayBars[i].style.height;
    arrayBars[i].style.height = arrayBars[j].style.height;
    arrayBars[j].style.height = temp;
    await delay(10);
}

// Helper function to update the bars' height
function updateBars(arrayBars, array) {
    for (let i = 0; i < array.length; i++) {
        arrayBars[i].style.height = `${array[i]}px`;
    }
}

// Helper function for delay
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Event listeners
document.getElementById('bubble-sort').addEventListener('click', bubbleSort);
document.getElementById('insertion-sort').addEventListener('click', insertionSort);
document.getElementById('merge-sort').addEventListener('click', mergeSort);
document.getElementById('quick-sort').addEventListener('click', quickSort);
document.getElementById('selection-sort').addEventListener('click', selectionSort);
document.getElementById('reset').addEventListener('click', generateArray);

// Generate random array on page load
window.addEventListener('DOMContentLoaded', generateArray);
