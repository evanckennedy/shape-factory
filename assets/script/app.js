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

const shapesArray = [];
let shapeCount = 0;
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Create Shape                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function createShape(shape, color) {
  if (shapeCount >= 24) {
    restartGame();
    message.innerHTML = `Limit reached! Click on 'Reset' button to play again!`;
    return;
  }

  if (shape === 'Select a shape' || color === 'Select a color') {
    message.innerHTML = 'Please select a shape and a color.';
    return false;
  }

  // Gets the text content of the of currently selected color in the dropdown
  const colorName = colorSelection.options[colorSelection.selectedIndex].text;
  const newShapeObj = new Shape(shape, colorName);
  shapesArray.push(newShapeObj);

  const newShapeDiv = document.createElement('div');
  newShapeDiv.classList.add('shape');
  newShapeDiv.style.backgroundColor = color;

  if (shape === 'square') {
    newShapeDiv.classList.add('square');
  }

  if (shape === 'circle') {
    newShapeDiv.classList.add('circle');
  }

  gridContainer.appendChild(newShapeDiv);
  shapeCount++;

  let currentUnit = shapeCount;

  attachListener(newShapeDiv, currentUnit, newShapeObj);
}

function attachListener (ele, unitNumber, obj) {
  utils.listen('click', ele, () => {
    message.innerHTML = 
      `Unit ${unitNumber}: ${obj.getInfo()}`;
  });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Restart Game                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function createRestartButton() {
  createButton.value = 'Reset';
  createButton.classList.add('restart-button');
  createButton.removeEventListener('click', createShape);
  utils.listen('click', createButton, () => location.reload());
}

function restartGame() {
  createRestartButton();
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Event listeners                                      */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
utils.listen('click', createButton, () => {
  const selectedShape = shapeSelection.value;
  const selectedColor = colorSelection.value;
  createShape(selectedShape, selectedColor);
});