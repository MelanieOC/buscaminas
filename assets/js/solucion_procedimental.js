'use strict';
$(document).ready(iniciar);

let click = true;
let puntaje=null;
let contar= 0;
let nivelActual=1;
let celdas = [];

function iniciar (){
    mostrarTablero();
    eventos();
}

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


function matrizInicial (n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generarBombas(matrix, bombas) {
	let fil = random(0, matrix.length);
	let col = random(0, matrix[0].length);
	for (let i = 0; i < bombas; i++) {
		while (matrix[fil][col] == '*') {
			fil = random(0, matrix.length);
            col = random(0, matrix[0].length);
		}
		matrix[fil][col]="*";
    }
    return matrix;
}
function matrizNivel(nivel){
    let matriz;
    click=true;
    if (nivel == 1) {
        puntaje=54;
        matriz = reconocerMinas(generarBombas(matrizInicial(8),10))
    }
    else if (nivel == 2) {
        puntaje=161;
        matriz = reconocerMinas(generarBombas(matrizInicial(14),35))
    }
    else {
        puntaje=320;
        matriz = reconocerMinas(generarBombas(matrizInicial(20),80))
    }
    return matriz;
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
            celda.appendTo(fila).click((e)=>mostrar(e.currentTarget)).bind('contextmenu',(e)=>bandera(e));
        }
        tabla.append(fila);
    }
    $('#tablero').append(tabla);
}

function bandera(event){
    event.preventDefault();
    if(click){
        let div=event.currentTarget;
        if($(div).hasClass('text-danger')){
            $(div).find('.fa-flag').remove();
            $(div).removeClass('text-danger').click((e)=>mostrar(e.currentTarget));
        } else {
            $(div).addClass('text-danger').append('<i class="fa fa-flag"></i>').off('click');
        }
    }
}
function mostrarTablero(){
    let matriz = matrizNivel(nivelActual);
    contar=0;
    $('#reiniciar').empty().html('<i class="fa fa-smile-o fa-3x"></i>');
    dibujarTablero(matriz);
}
function mostrar(celda) {
    if (click) {
        let div = $(celda).find('.oculto');
        $(div).show();
        $(celda).removeClass('bloque').off('contextmenu').off('click');
        ganaste();
        if($(div).hasClass('bomba')){
            $(celda).css('background-color','red');
            click=false;
            let t = setTimeout(()=>{
                perdiste();
            }, 500);
        } else if ($(celda).hasClass('vacio')) {
            expandirse($(celda));
        }
    }
}
function perdiste(){
    $('.bomba').parent().removeClass('bloque');
    if($('.bomba').parent().hasClass('text-danger')){
        $('.bomba').parent().removeClass('text-danger');
        $('.fa-flag').remove();
    };
    $('.bomba').show();
    $('#reiniciar').empty().html('<i class="fa fa-frown-o fa-3x"></i>');
}

function expandirse(div){
    let coordenada = div.attr('id').split(',');
    let i=parseInt(coordenada[0]);
    let j=parseInt(coordenada[1]);
    for ( let k = i == 0? i : i-1 ; k <= (i+1) && k < celdas.length; k++ ){
        for (let l = j == 0? j : j-1; l <= (j+1) && l < celdas[0].length; l++ ){
            if (!celdas[k][l].find('.oculto').hasClass('bomba')&&!celdas[k][l].hasClass('text-danger')&& celdas[k][l].hasClass('bloque')) {
                celdas[k][l].removeClass('bloque').off('click').off('contextmenu');
                ganaste();
                celdas[k][l].find('.oculto').show();
                if(celdas[k][l].hasClass('vacio')){
                    expandirse(celdas[k][l]);
                }
            }   
        }
    }   
} 

function ganaste() {
    contar++;
    if(contar==puntaje){
        click=false;
        console.log('ganaste');
    }
}

function eventos(){
    $('#facil').click(()=>{
        nivelActual=1;
        mostrarTablero();
    })
    $('#medio').click(()=>{
        nivelActual=2;
        mostrarTablero();
    })
    $('#dificil').click(()=>{
        nivelActual=3;
        mostrarTablero();
    })
    $('#reiniciar').click(mostrarTablero);
}

