
function reconocerMinas(matrix) {
    for ( let i = 0; i < matrix.length; i++ ){
        for ( let j = 0; j < matrix[i].length; j++ ){
            for ( let k = i == 0? i : i-1; k <= i+1 && k < matrix.length; k++ ){
                for ( let l = j == 0? j : j-1; l <= j+1 && l < matrix[i].length; l++ ){
                    if (matrix[k][l]=='*'&& matrix[i][j]!='*') {
                        matrix[i][j]++;
                    }
                }
            }
        }
    }
    return matrix;
}


function initMatrix (n,m) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < m; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generarBombas(matrix, bombas) {
	let fil = getRandomInt(0, matrix.length);
	let col = getRandomInt(0, matrix[0].length);
	for (let i = 0; i < bombas; i++) {
		while (matrix[fil][col] == '*') {
			fil = getRandomInt(0, matrix.length);
            col = getRandomInt(0, matrix[0].length);
		}
		matrix[fil][col]="*";
    }
    return matrix;
}

function dibujarTablero(matriz) {
    let tabla=$('<table>').attr('cellspacing','0');
    for (let i = 0; i < matriz.length; i++) {
        let fila = $('<tr>');
        for (let j = 0; j < matriz[i].length; j++) {
            let celda = $('<td>').addClass('text-center').html(matriz[i][j]).click(mostrar).appendTo(fila);
            if(matriz[i][j]=='*'){
                celda.html(`<i class="fa fa-bomb"></i>`);
            } else if(matriz[i][j]==0){
                celda.html('');
            }
        }
        tabla.append(fila);
    }
    $('#tablero').append(tabla);
}

function mostrar() {
    console.log($(this).html());
    $(this).css('color','black');
}
function printMatrix (M){
    console.log ("___________________");
    for (let i = 0; i < M.length; i++)
        console.log (M[i]);   
    console.log ("___________________");
}



let prueba2 = generarBombas(initMatrix(5,5),6);
let lol = reconocerMinas(prueba2);
console.log(printMatrix(initMatrix (5,5)));
console.log(printMatrix(prueba2));
console.log(printMatrix(lol));

dibujarTablero(lol);
