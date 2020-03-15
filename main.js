var solved = false;
function isValid(matrix, num, row, col) {
  for (var i = 0; i < matrix.length; i++) {
    if (matrix[i][col] == num) {
      return false;
    }
    if (matrix[row][i] == num) {
      return false;
    }
  }

  var centersRow = [1, 1, 1, 4, 4, 4, 7, 7, 7];
  var centersCol = [1, 4, 7, 1, 4, 7, 1, 4, 7];

  var minDist = 10;
  var cRow = 0;
  var cCol = 0;
  for (var i = 0; i < centersRow.length; i++) {
    var dist = Math.abs(row - centersRow[i]) + Math.abs(col - centersCol[i]);

    if (dist < minDist) {
      minDist = dist;
      cRow = centersRow[i];
      cCol = centersCol[i];
    }
  }

  var rowDisp = [-1, 0, 1, -1, 1, -1, 0, 1, 0];
  var colDisp = [-1, -1, -1, 0, 0, 1, 1, 1, 0];
  for (var i = 0; i < rowDisp.length; i++) {
    if (matrix[cRow + rowDisp[i]][cCol + colDisp[i]] == num) {
      return false;
    }
  }

  return true;
}

function output(matrix) {

    var outputs = document.querySelectorAll(".nums");
    var counter = 0;
    for (var row = 0; row < matrix.length; row++) {
      for (var col = 0; col < matrix[0].length; col++) {
        outputs[counter].value = matrix[row][col];
        counter++;
      }
    }
}

function solve(matrix) {
  for (var row = 0; row < matrix.length; row++) {
    for (var col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] == 0) {
        for (var i = 1; i <= 9; i++) {
          if (isValid(matrix, i, row, col)) {
            matrix[row][col] = i;
            solve(matrix);
            if (solved) {
              return;
            }
            matrix[row][col] = 0;
          }
        }

        return;
      }
    }
  }

  console.log("hi");
  solved = true;
}

function loadData() {
  var inputs = document.querySelectorAll(".nums");
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix[i] = new Array(9);
  }

  var row = 0;
  var col = 0;
  for (var i = 0; i < inputs.length; i++) {
    matrix[row][col] = inputs[i].value;
    col++;

    if (col > 8) {
      row++;
      col = 0;
    }
  }

  solved = false;
  solve(matrix);

  output(matrix);
}

var btn = document.getElementById("solve");
btn.addEventListener("click", loadData)
