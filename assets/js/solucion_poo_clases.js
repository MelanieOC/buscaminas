class buscaminas {
    constructor(nivel){
        this.nivelActual= nivel;
        this.matriz= undefined;
        this.bombas= undefined;
        this.numero= undefined;
        this.celdas=undefined;
        this.click=undefined;
        this.puntaje=undefined;
        this.contar=0;
    }
    
    matrizInicial(){
        this.matriz=[];
        for (let i = 0; i < this.numero; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < this.numero; j++) {
                this.matriz[i][j] = 0;
            }
        }
    }
    random(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    generarBombas(){
        let fil = this.random(0, this.matriz.length);
        let col = this.random(0, this.matriz[0].length);
        for (let i = 0; i < this.bombas; i++) {
            while (this.matriz[fil][col] == '*') {
                fil = this.random(0, this.matriz.length);
                col = this.random(0, this.matriz[0].length);
            }
            this.matriz[fil][col]="*";
        }
    }
    reconocerMinas(){
        for ( let i = 0; i < this.matriz.length; i++ ){
            for ( let j = 0; j < this.matriz[i].length; j++ ){
                for ( let k = i == 0? i : i-1; k <= i+1 && k < this.matriz.length; k++ ){
                    for ( let l = j == 0? j : j-1; l <= j+1 && l < this.matriz[i].length; l++ ){
                        if (this.matriz[k][l]=='*'&& this.matriz[i][j]!='*') {
                            this.matriz[i][j]++;
                        }
                    }
                }
            }
        }
    }
    matrizNivel(){
        this.click=true;
        this.contar=0;
        switch (this.nivelActual) {
            case 1:
                this.numero=8;
                this.bombas=10;
                this.puntaje=54;
                break;
            case 2:
                this.numero=14;
                this.bombas=35;
                this.puntaje=161;
                break;
            case 3:
                this.numero=20;
                this.bombas=80;
                this.puntaje=320;
                break;
        }
        this.matrizInicial();
        this.generarBombas();
        this.reconocerMinas();
    }
    dibujarTablero(){
        $('#tablero').empty();
        let tabla=$('<div>').addClass('buscaminas');
        if(this.nivelActual==1){
            tabla.addClass('facil');
        } else if(this.nivelActual==2){
            tabla.addClass('medio');
        } else{
            tabla.addClass('dificil');
        }
        this.celdas=[];
        for (let i = 0; i < this.matriz.length; i++) {
            this.celdas[i]=[];
            let fila = $('<div>').addClass('fila');
            for (let j = 0; j < this.matriz[i].length; j++) {
                let celda = $('<div>').addClass('text-center celda bloque').html(
                    `<div class="number${this.matriz[i][j]} oculto">${this.matriz[i][j]}</div>`
                );
                if(this.matriz[i][j]=='*'){
                    celda.html(`<div class="bomba oculto"><i class="fa fa-bomb"></i></div>`);
                } else if(this.matriz[i][j]==0){
                    celda.addClass('vacio').attr('id',`${i},${j}`).html('');
                }
                this.celdas[i][j]=celda;
                celda.appendTo(fila).click((e)=>this.mostrar(e.currentTarget)).bind('contextmenu',(e)=>this.bandera(e));
            }
            tabla.append(fila);
        }
        $('#tablero').append(tabla);
    }
    mostrar(celda){
        if (this.click) {
            let div = $(celda).find('.oculto');
            $(div).show();
            $(celda).removeClass('bloque').off('contextmenu');
            this.ganaste();
            if($(div).hasClass('bomba')){
                $(celda).css('background-color','red');
                this.click=false;
                let t = setTimeout(()=>{
                    this.perdiste();
                }, 500);
            } else if ($(celda).hasClass('vacio')) {
                this.expandirse($(celda));
            }
        }
    }
    bandera(event){
        event.preventDefault();
        let div=event.currentTarget;
        if(this.click){
            if($(div).hasClass('text-danger')){
                $('.fa-flag').remove();
                $(div).removeClass('text-danger').click((e)=>this.mostrar(e.currentTarget));
            } else {
                $(div).addClass('text-danger').append('<i class="fa fa-flag"></i>').off('click');
            }
        }
    }
    perdiste(){
        $('.bomba').parent().removeClass('bloque');
        if($('.bomba').parent().hasClass('text-danger')){
            $('.bomba').parent().removeClass('text-danger');
            $('.fa-flag').remove();
        };
        $('.bomba').show();
        $('#reiniciar').empty().html('<i class="fa fa-frown-o fa-3x"></i>');
    }
    ganaste(){
        this.contar++;
        if(this.contar==this.puntaje){
            this.click=false;
            console.log('ganaste');
        }
    }
    expandirse(div){
        let coordenada = div.attr('id').split(',');
        let i=parseInt(coordenada[0]);
        let j=parseInt(coordenada[1]);
        for ( let k = i == 0? i : i-1 ; k <= (i+1) && k < this.celdas.length; k++ ){
            for (let l = j == 0? j : j-1; l <= (j+1) && l < this.celdas[0].length; l++ ){
                if (!this.celdas[k][l].find('.oculto').hasClass('bomba')&&!this.celdas[k][l].hasClass('text-danger')&& this.celdas[k][l].hasClass('bloque')) {
                    this.celdas[k][l].removeClass('bloque').off('click').off('contextmenu');
                    this.ganaste();
                    this.celdas[k][l].find('.oculto').show();
                    if(this.celdas[k][l].hasClass('vacio')){
                        this.expandirse(this.celdas[k][l]);
                    }
                }
                
            }
        } 
    } 
    mostrarTablero(){
        this.matrizNivel();
        this.dibujarTablero();
        $('#reiniciar').html('<i class="fa fa-smile-o fa-3x"></i>');
    }
    eventos(){
        $('#facil').click(()=>{
            this.nivelActual=1;
            this.mostrarTablero();
        })
        $('#medio').click(()=>{
            this.nivelActual=2;
            this.mostrarTablero();
        })
        $('#dificil').click(()=>{
            this.nivelActual=3;
            this.mostrarTablero();
        })
        $('#reiniciar').click(()=>this.mostrarTablero());
    }
    iniciar(){
        this.eventos();
        this.mostrarTablero();
    }
}

$(document).ready(()=>{
    let jugar = new buscaminas(1);
    jugar.iniciar();
})