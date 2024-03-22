'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';
import Shape from './Shape.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selectors, Declarations                              */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const shapeSelection = utils.select('.shape-select')
const colorSelection = utils.select('.color-select')
const createButton = utils.select('.selection-container input')
const gridContainer = utils.select('.grid-container');
const message = utils.select('.message p');

let shapeCount = 0;
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Create Shape                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function createShape(shape, color) {
  if (shapeCount >= 24) {
    createButton.disabled = true;
    message.innerHTML = 'The maximum number of shapes have been added';
    return;
  }

  const shapeDiv = document.createElement('div');
  shapeDiv.classList.add('shape');
  shapeDiv.style.backgroundColor = color;

  if (shape === 'square') {
    shapeDiv.classList.add('square');
  }

  if (shape === 'circle') {
    shapeDiv.classList.add('circle');
  }

  gridContainer.appendChild(shapeDiv);
  shapeCount++;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('click', createButton, () => {
  const selectedShape = shapeSelection.value;
  const selectedColor = colorSelection.value;
  createShape(selectedShape, selectedColor);
});