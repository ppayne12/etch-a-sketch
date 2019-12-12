'use strict';
let currentSize = 25;//default grid
createGrid(currentSize);

addGridListeners();

const clearButton = document.querySelector(".control#left");
clearButton.addEventListener('click', clearScreen);

const resizeButton = document.querySelector(".control#right");
resizeButton.addEventListener('click', resize);

function createGrid(xSize) {
    const screenDiv = document.querySelector(".screen");
    screenDiv.innerHTML = '';
    screenDiv.style.cssText = `grid-template-columns: ${buildGridString(xSize)}`;
    for (let i = 1; i <= (xSize * xSize); i++) {
        let gridDiv = document.createElement('div');
        gridDiv.classList.add("grid-item");
        if (i % xSize != 0) { //not end line
            gridDiv.style.borderRight = "dotted";
            gridDiv.style.borderColor = "rgba(36, 35, 35, 0.05)";
        }
        if (i <= xSize * (xSize - 1)) {//not a bottom row
            gridDiv.style.borderBottom = "dotted";
            gridDiv.style.borderColor = "rgba(36, 35, 35, 0.05)";


        }
        if (i === 1) {
            gridDiv.style.borderTopLeftRadius = "25px"
        } else if (i === xSize) {
            gridDiv.style.borderTopRightRadius = "25px"
        } else if (i === (xSize * (xSize - 1) + 1)) {
            gridDiv.style.borderBottomLeftRadius = "25px"
        } else if (i === (xSize * xSize)) {
            gridDiv.style.borderBottomRightRadius = "25px"
        }


        gridDiv.setAttribute("id", i);
        gridDiv.style.border;
        screenDiv.appendChild(gridDiv);
    }
}

function addGridListeners() {
    let isDrawing = false;
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item) => {
        item.addEventListener('mousedown', (e) => {
            e.currentTarget.classList.add("clicked");
            isDrawing = true;
        }
        );
    });

    gridItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                e.currentTarget.classList.add("clicked");
            }
        }
        );
    });

    gridItems.forEach((item) => {
        item.addEventListener('mouseup', (e) => {
            if (isDrawing) {
                e.currentTarget.classList.add("clicked");
                isDrawing = false;
            }
        }
        );
    });


}

function clearScreen() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.remove("clicked");
    })
}

function resize() {
    let size = +prompt("Enter new grid width (between 1-64)", `${currentSize}`);
    if (size > 64 || size < 1) {
        alert("Invalid input");
    }
    createGrid(size);
    addGridListeners();
    currentSize = size;

}

function buildGridString(columns) {
    let result = '';
    for (let i = 0; i < columns; i++) {
        result += "auto ";
    }

    return result;
}