let click = true;
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


function initMatrix (n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
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
    $('#tablero').empty();
    let tabla=$('<div>');
    for (let i = 0; i < matriz.length; i++) {
        let fila = $('<div>').addClass('fila');
        for (let j = 0; j < matriz[i].length; j++) {
            let celda = $('<div>').addClass('text-center celda bloque').html(
                `<div class="number${matriz[i][j]} oculto">${matriz[i][j]}</div>`
            ).click(mostrar).appendTo(fila);
            if(matriz[i][j]=='*'){
                celda.html(`<div class="bomba oculto"><i class="fa fa-bomb"></i></div>`);
            } else if(matriz[i][j]==0){
                celda.html('');
            }
        }
        tabla.append(fila);
    }
    $('#tablero').append(tabla);
}

function mostrar() {
    if (click) {
        $(this).removeClass('bloque');
        let div =$(this).find('.oculto');
        $(div).show();
        if($(div).hasClass('bomba')){
            click=false;
            let t = setTimeout(()=>{
                //alert('perdiste');
                perdiste();
            }, 600);
        }
    }
}
function perdiste(){
    $('.oculto').parent().removeClass('bloque');
    $('.oculto').show();
}
function reiniciar(nivel) {
    let matriz;
    click=true;
    if (nivel == 1) {
        matriz = reconocerMinas(generarBombas(initMatrix(9),10))
    }
    else if (nivel == 2) {
        matriz = reconocerMinas(generarBombas(initMatrix(14),30))
    }
    else {
        matriz = reconocerMinas(generarBombas(initMatrix(19),70))
    }
    dibujarTablero(matriz);
}
function printMatrix (M){
    console.log ("___________________");
    for (let i = 0; i < M.length; i++)
        console.log (M[i]);   
    console.log ("___________________");
}
let nivelActual=1;
let facil = reconocerMinas(generarBombas(initMatrix(9),10));

$('#facil').click(()=>{
    nivelActual=1;
    reiniciar(nivelActual);
})
$('#medio').click(()=>{
    nivelActual=2;
    reiniciar(nivelActual);
})
$('#dificil').click(()=>{
    nivelActual=3;
    reiniciar(nivelActual);
})
$('#reiniciar').click(()=>reiniciar(nivelActual));


dibujarTablero(facil);
