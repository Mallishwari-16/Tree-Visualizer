let input;

function reset() {
  d3.selectAll('svg').remove();
}

function treeAndArray() {
  reset();
  let inputText = document.getElementById("array-input")
  document.querySelector('#visual-title').innerHTML = "Binary Tree And Array";
  document.querySelector('#instructions').innerHTML = "Click a value in the binary tree or array to highlight its corresponding location in the data structure.";
  if (inputText.value !== '') {
      input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
      createBinaryTreeAndArr(input)
  }
}

function heapify() {
  reset();
  let inputText = document.getElementById("array-input")
  if (inputText.value !== '') {
    input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
    makeHeap(input, input.length);
    createBinaryTreeAndArr(input);
    document.getElementById('instructions').innerHTML = "<p> Parent's value is always greater than or equal to the values of its children.</p>";
    document.getElementById('visual-title').innerHTML = "Max-Heap Binary Tree And Array";
  }
}

function createBinaryTreeAndArr(arr) {
  arrayContainer = createContainer("array-visual", arr, arr.length * 60, 100);
  let tree = new Tree()
  tree.createBinaryTree(input)
  createArray(arr, 2, 30, 50, 50);
}

function createBinarySearchTree() {
  let inputText = document.getElementById("array-input")
  if (inputText.value !== '') {
    reset();
    input = inputText.value.trim().split(/\s+|\,+/g).map((num) => parseInt(num));
    input.sort((a, b) => a - b);
    document.querySelector('#visual-title').innerHTML = "Binary Search Tree";
    document.querySelector('#instructions').innerHTML = "The input data sorted and arranged into a Binary Search Tree.";
    let tree = new Tree();
    tree.createBinarySearchTree(input)
  }
}

let zoomLevel = 1;

// Zoom Controls
function zoomIn() {
  zoomLevel += 0.1;
  d3.selectAll('svg').attr("transform", `scale(${zoomLevel})`);
}

function zoomOut() {
  zoomLevel = Math.max(0.1, zoomLevel - 0.1); // Prevent zoom out beyond 10%
  d3.selectAll('svg').attr("transform", `scale(${zoomLevel})`);
}

// Real-time Input and Update
document.getElementById('array-input').addEventListener('input', (e) => {
  const inputVal = e.target.value.trim();
  if (inputVal !== '') {
    const inputArray = inputVal.split(/\s+|\,+/g).map((num) => parseInt(num));
    createBinaryTreeAndArr(inputArray);
  }
});

// Data Export
function exportToPNG() {
  const svgNode = d3.select('svg').node();
  const svgString = new XMLSerializer().serializeToString(svgNode);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const image = new Image();
  image.src = 'data:image/svg+xml;base64,' + btoa(svgString);

  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    const link = document.createElement('a');
    link.download = 'tree_visualization.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
}

// Clear Tree
function clearTree() {
  reset();
  document.getElementById("array-input").value = '';
  document.getElementById('visual-title').innerHTML = '';
  document.getElementById('instructions').innerHTML = '';
}

// Smooth Animation for Adding Nodes
function smoothAddNode(node) {
  d3.selectAll('circle')
    .transition()
    .duration(500)
    .attr("cx", node.cx)
    .attr("cy", node.cy)
    .attr("r", node.radius);
}

function smoothAddText(node) {
  d3.selectAll('text')
    .transition()
    .duration(500)
    .attr("x", node.cx - (node.value.toString().length * 4))
    .attr("y", node.cy + 5);
}


//default values
input = [10, 20, 60, 30, 70, 40, 50];
let inputTest = document.getElementById("array-input")
inputTest.value = input;
createBinaryTreeAndArr(input);
