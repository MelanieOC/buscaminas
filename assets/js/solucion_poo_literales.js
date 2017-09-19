'use strict';
const buscaminas = {
    matriz: undefined,
    bombas: undefined,
    numero: undefined,
    nivelActual: undefined,
    celdas:undefined,
    click:undefined,
    matrizInicial: ()=> {
        buscaminas.matriz=[];
        for (let i = 0; i < buscaminas.numero; i++) {
            buscaminas.matriz[i] = [];
            for (let j = 0; j < buscaminas.numero; j++) {
                buscaminas.matriz[i][j] = 0;
            }
        }
    },
    getRandomInt:(min, max)=> {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    generarBombas:()=> {
        let fil = buscaminas.getRandomInt(0, buscaminas.matriz.length);
        let col = buscaminas.getRandomInt(0, buscaminas.matriz[0].length);
        for (let i = 0; i < buscaminas.bombas; i++) {
            while (buscaminas.matriz[fil][col] == '*') {
                fil = buscaminas.getRandomInt(0, buscaminas.matriz.length);
                col = buscaminas.getRandomInt(0, buscaminas.matriz[0].length);
            }
            buscaminas.matriz[fil][col]="*";
        }
    },
    reconocerMinas: ()=>{
        for ( let i = 0; i < buscaminas.matriz.length; i++ ){
            for ( let j = 0; j < buscaminas.matriz[i].length; j++ ){
                for ( let k = i == 0? i : i-1; k <= i+1 && k < buscaminas.matriz.length; k++ ){
                    for ( let l = j == 0? j : j-1; l <= j+1 && l < buscaminas.matriz[i].length; l++ ){
                        if (buscaminas.matriz[k][l]=='*'&& buscaminas.matriz[i][j]!='*') {
                            buscaminas.matriz[i][j]++;
                        }
                    }
                }
            }
        }
    },
    matrizNivel:()=>{
        buscaminas.click=true;
        switch (buscaminas.nivelActual) {
            case 1:
                buscaminas.numero=8;
                buscaminas.bombas=10;
                break;
            case 2:
                buscaminas.numero=14;
                buscaminas.bombas=35;
                break;
            case 3:
                buscaminas.numero=20;
                buscaminas.bombas=80;
                break;
        }
        buscaminas.matrizInicial();
        buscaminas.generarBombas();
        buscaminas.reconocerMinas();
    },
    dibujarTablero: ()=> {
        $('#tablero').empty();
        let tabla=$('<div>').addClass('buscaminas');
        if(buscaminas.nivelActual==1){
            tabla.addClass('facil');
        } else if(buscaminas.nivelActual==2){
            tabla.addClass('medio');
        } else{
            tabla.addClass('dificil');
        }
        buscaminas.celdas=[];
        for (let i = 0; i < buscaminas.matriz.length; i++) {
            buscaminas.celdas[i]=[];
            let fila = $('<div>').addClass('fila');
            for (let j = 0; j < buscaminas.matriz[i].length; j++) {
                let celda = $('<div>').addClass('text-center celda bloque').html(
                    `<div class="number${buscaminas.matriz[i][j]} oculto">${buscaminas.matriz[i][j]}</div>`
                );
                if(buscaminas.matriz[i][j]=='*'){
                    celda.html(`<div class="bomba oculto"><i class="fa fa-bomb"></i></div>`);
                } else if(buscaminas.matriz[i][j]==0){
                    celda.addClass('vacio').attr('id',`${i},${j}`).html('');
                }
                buscaminas.celdas[i][j]=celda;
                celda.appendTo(fila).click((e)=>buscaminas.mostrar(e.currentTarget)).bind('contextmenu',(e)=>buscaminas.bandera(e));
            }
            tabla.append(fila);
        }
        $('#tablero').append(tabla);
    },
    mostrar: (celda)=> {
        if (buscaminas.click) {
            let div = $(celda).find('.oculto');
            $(div).show();
            $(celda).removeClass('bloque').off('contextmenu');
            if($(div).hasClass('bomba')){
                $(celda).css('background-color','red');
                buscaminas.click=false;
                let t = setTimeout(()=>{
                    buscaminas.perdiste();
                }, 500);
            } else if ($(celda).hasClass('vacio')) {
                buscaminas.expandirese($(celda));
            }
        }
    },
    bandera:(event)=>{
        event.preventDefault();
        let div=event.target;
        if(buscaminas.click){
            if($(div).hasClass('text-danger')){
                $('.fa-flag').remove();
                $(div).removeClass('text-danger').click((e)=>buscaminas.mostrar(e.currentTarget));
            } else {
                $(div).addClass('text-danger').append('<i class="fa fa-flag"></i>').off('click');
            }
        }
    },
    perdiste:()=>{
        $('.bomba').parent().removeClass('bloque');
        if($('.bomba').parent().hasClass('text-danger')){
            $('.bomba').parent().removeClass('text-danger');
            $('.fa-flag').remove();
        };
        $('.bomba').show();
        $('#reiniciar').empty().html('<i class="fa fa-frown-o fa-3x"></i>');
    },
    expandirse:(div)=>{
        let coordenada = div.attr('id').split(',');
        let i=parseInt(coordenada[0]);
        let j=parseInt(coordenada[1]);
        for ( let k = i == 0? i : i-1 ; k <= (i+1) && k < buscaminas.celdas.length; k++ ){
            for (let l = j == 0? j : j-1; l <= (j+1) && l < buscaminas.celdas[0].length; l++ ){
                if (!buscaminas.celdas[k][l].find('.oculto').hasClass('bomba')&&!buscaminas.celdas[k][l].hasClass('text-danger')) {
                    buscaminas.celdas[k][l].removeClass('bloque').off('click').off('contextmenu');
                    buscaminas.celdas[k][l].find('.oculto').show();
                }
                if(buscaminas.celdas[k][l].hasClass('vacio')){
                    i=k;
                    j=l;
                }
            }
        } 
    }, 
    mostrarTablero:()=>{
        buscaminas.matrizNivel();
        buscaminas.dibujarTablero();
        $('#reiniciar').html('<i class="fa fa-smile-o fa-3x"></i>');
    },
    eventos:()=>{
        $('#facil').click(()=>{
            buscaminas.nivelActual=1;
            buscaminas.mostrarTablero();
        })
        $('#medio').click(()=>{
            buscaminas.nivelActual=2;
            buscaminas.mostrarTablero();
        })
        $('#dificil').click(()=>{
            buscaminas.nivelActual=3;
            buscaminas.mostrarTablero();
        })
        $('#reiniciar').click(buscaminas.mostrarTablero);
    },
    iniciar:()=>{
        buscaminas.eventos();
        buscaminas.nivelActual=1;
        buscaminas.mostrarTablero();
    }
}

$(document).ready(buscaminas.iniciar);

