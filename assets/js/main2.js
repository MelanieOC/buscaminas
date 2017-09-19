let click = true;
let nivelActual=1;
let facil = matrizNivel(nivelActual);
let celdas = [];

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
    let tabla=$('<div>').addClass('buscaminas');
    if(nivelActual==1){
        tabla.addClass('facil');
    } else if(nivelActual==2){
        tabla.addClass('medio');
    } else{
        tabla.addClass('dificil');
    }
    for (let i = 0; i < matriz.length; i++) {
        celdas[i]=[];
        let fila = $('<div>').addClass('fila');
        for (let j = 0; j < matriz[i].length; j++) {
            let celda = $('<div>').addClass('text-center celda bloque').html(
                `<div class="number${matriz[i][j]} oculto">${matriz[i][j]}</div>`
            );
            if(matriz[i][j]=='*'){
                celda.html(`<div class="bomba oculto"><i class="fa fa-bomb"></i></div>`);
            } else if(matriz[i][j]==0){
                celda.addClass('vacio').attr('id',`${i},${j}`).html('');
            }
            celdas[i][j]=celda;
            celda.click(mostrar).appendTo(fila);
        }
        tabla.append(fila);
    }
    $('#tablero').append(tabla);
}

function mostrar() {
    if (click) {
        let div =$(this).find('.oculto');
        $(div).show();
        $(this).removeClass('bloque').off('click');
        if($(div).hasClass('bomba')){
            $(this).css('background-color','red');
            click=false;
            let t = setTimeout(()=>{
                perdiste();
            }, 600);
        } else if ($(this).hasClass('vacio')) {
            abrirAlrededor($(this));
        }
    }
}
function perdiste(){
    $('.bomba').parent().removeClass('bloque');
    $('.bomba').show();
}

function abrirAlrededor(div){
    let coordenada = div.attr('id').split(',');
    let i=parseInt(coordenada[0]);
    let j=parseInt(coordenada[1]);
    for ( let k = i == 0? i : i-1 ; k <= (i+1) && k < celdas.length; k++ ){
        for (let l = j == 0? j : j-1; l <= (j+1) && l < celdas[0].length; l++ ){
            if (!celdas[k][l].find('.oculto').hasClass('bomba')) {
                celdas[k][l].removeClass('bloque').off('click');
                celdas[k][l].find('.oculto').show();
            }
            if(celdas[k][l].hasClass('vacio')){
                i=k;
                j=l;
            }
        }
    }
    
} 
function matrizNivel(nivel){
    let matriz;
    click=true;
    if (nivel == 1) {
        matriz = reconocerMinas(generarBombas(initMatrix(8),10))
    }
    else if (nivel == 2) {
        matriz = reconocerMinas(generarBombas(initMatrix(14),35))
    }
    else {
        matriz = reconocerMinas(generarBombas(initMatrix(20),80))
    }
    return matriz;
}
function reiniciar() {
    let matriz = matrizNivel(nivelActual);
    dibujarTablero(matriz);
}
function printMatrix (M){
    console.log ("___________________");
    for (let i = 0; i < M.length; i++)
        console.log (M[i]);   
    console.log ("___________________");
}


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
