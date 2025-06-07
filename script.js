const array = document.getElementById('array-size');
const add_array = document.getElementById('add-btn');
const Sort = document.getElementById('start-sort-btn');
let arr_status = document.getElementById('status');
let color = []; // Default color for unsorted elements

let arr = [];

add_array.addEventListener('click', fnAddarray);
Sort.addEventListener('click', fnSortArray);


function fnAddarray() {
    const size = parseInt(array.value);
    if (isNaN(size) || size <= 0) return;
    arr.push(size);
    array.value = '';
    color.push('rgb(255, 113, 113)');
    color.forEach((_, i) => { color[i] = 'rgb(255, 113, 113)'; });
    fnGenerateArray();
}

function fnGenerateArray() {
    arr_status.innerHTML = '';
    arr.forEach((value, index) => {
        arr_status.insertAdjacentHTML('beforeend', `
            <div class="array-box" style="background-color: ${color[index]};" data-index="${index}">${value}</div>
        `);
    });
}

async function fnSortArray() {
    if (arr.length <= 1) return;

    for (let j = 0; j < arr.length - 1; j++) {
        for (let i = 0; i < arr.length - 1 - j; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            await animateSortingWithRaf(i, i + 1);
            fnGenerateArray();
            await sleep(100);
        }
    }
        // Change color of sorted elements
        color[arr.length - 1 - j] = 'rgb(113, 255, 113)'; // Green for sorted elements
        if (j == arr.length - 2) color[0] = 'rgb(113, 255, 113)';
        fnGenerateArray();
    }
}

function animateSortingWithRaf(index1, index2) {
    return new Promise(resolve => {
        const boxes = document.querySelectorAll('.array-box');
        const box1 = boxes[index1];
        const box2 = boxes[index2];

        const distance = box1.offsetWidth + 10; // box width + margin
        let progress = 0;
        const step = 2; // speed (px/frame)

        function animate() {
            if (progress < distance) {
                progress += step;
                box1.style.transform = `translateX(${progress}px)`;
                box2.style.transform = `translateX(${-progress}px)`;
                requestAnimationFrame(animate);
            } else {
                // Reset transform and update layout
                box1.style.transform = '';
                box2.style.transform = '';
                resolve();
            }
        }

        requestAnimationFrame(animate);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}