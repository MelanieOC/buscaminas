function crearTablero(){
	for(let i=0; i<8;i++){
		$('<div>').attr('id',i+''+j).appendTo("#tablero").click(()=>{
			mostrarNumero(true)
		});
	}
}

let minas = inicializarMatriz();

function inicializarMatriz() {
	let tabla = [];
	for (let i = 0; i < 8; i++) {
		tabla[i]=[0,0,0,0,0,0,0,0];
		
	}
	return tabla;
}

function generarBombas(tablero) {
	let fil = 0;
	let col = 0;
	fil = Math.floor((Math.random()*7)+0);
	col = Math.floor((Math.random()*7)+0);

	for (let i = 0; i < 8; i++) {
		while (tablero[fil][col] == '*') {
			fil = Math.floor((Math.random()*7)+0);
			col = Math.floor((Math.random()*7)+0);
		}
		tablero[fil][col]="*";
	}
}

function bombasAlrededor(tablero) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			if (tablero[i][j]=="*") {
				if (i == 0 && j==0) {
					colocaNumeroBombas(i,j,i+1,j+1,tablero);
				} else if (i==0 && (j>0 && j<7)){
					colocaNumeroBombas(i,j-1,i+1,j+1,tablero);
				} else if (i==0 && j==7) {
					colocaNumeroBombas(i,j-1,i+1,j,tablero);
				} else if (j==7 && (i>0 && i<7)) {
					colocaNumeroBombas(i-1,j-1,i+1,j,tablero);
				} else if (i==7 && j==7) {
					colocaNumeroBombas(i-1,j-1,i,j,tablero);
				} else if (i==7 && (j>0 && j<7)) {
					colocaNumeroBombas(i-1,j-1,i,j+1,tablero);
				} else if (j==0 && (i>0 && i<7)) {
					colocaNumeroBombas(i-1,j,i+1,j+1,tablero);
				} else if (i==7 && j==0) {
					colocaNumeroBombas(i-1,j,i,j+0,tablero);
				} else {
					colocaNumeroBombas(i-1,j-1,i+1,j+1,tablero);
				}
			}
			
		}
		
	}
}
