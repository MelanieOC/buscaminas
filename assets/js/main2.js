
function reconocerMinas(matrix) {
    for ( var i = 0; i < matrix.length; i++ )
    {
        for ( var j = 0; j < matrix[i].length; j++ )
        {
            for ( var k = i == 0? i : i-1; k <= i+1 && k < matrix.length; k++ )
            {
                for ( var l = j == 0? j : j-1; l <= j+1 && l < matrix[i].length; l++ )
                {
                    if (matrix[k][l]=='*'&& matrix[i][j]!='*') {
                        matrix[i][j]++;
                    }
                }
            }
        }
    }
    return matrix;
}

let prueba = [['*', 0, 0, 0, '*'],
             [0, '*',0, '*', 0],
             [0, 0, '*', 0, '*'],
             ['*', 0, '*', 0, 0],
             [0, 0, 0, 0, '*']];
let prueba2 = generarBombas(initMatrix(5,5),6);
function initMatrix (n,m) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        matrix[i] = [];
        for (var j = 0; j < m; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generarBombas(matrix, bombas) {
	let fil = 0;
	let col = 0;
	fil = getRandomInt(0, matrix.length);
	col = getRandomInt(0, matrix[0].length);

	for (let i = 0; i < bombas; i++) {
		while (matrix[fil][col] == '*') {
			fil = getRandomInt(0, matrix.length);
            col = getRandomInt(0, matrix[0].length);
		}
		matrix[fil][col]="*";
    }
    return matrix;
}
function printMatrix (M){
    console.log ("___________________");
    for (var i = 0; i < M.length; i++)
        console.log (M[i]);   
    console.log ("___________________");
}
let lol = prueba.map( v => v.map( vv => 0 ) );

console.log(printMatrix(initMatrix (5,5)));
console.log(printMatrix(prueba2));
console.log(printMatrix(reconocerMinas(prueba2)));
