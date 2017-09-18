function minesweeper(matrix) {
    for(i in matrix){
        matrix[i].push(false);
        matrix[i].unshift(false);
    }
    var ceros = [];
    var res = [];
    for(i in matrix){
        res.push(matrix[i].map(a=> (a==true)?1:0));
        for (j in matrix[i]){
            ceros[j]=0;
        }
    }
    res.push(ceros);
    res.unshift(ceros);
    var respuesta = []
    for(var i = 0; i < matrix.length;i++){
        respuesta[i]=[];
        for(var j = 0; j < matrix[i].length - 2;j++){
            respuesta[i][j]=res[i][j]+res[i][j+1]+res[i][j+2]+res[i+1][j]+res[i+1][j+2] + res[i+2][j] + res[i+2][j+1] + res[i+2][j+2];
        }
    }
    return respuesta; 
}

function minesweeper(matrix) {
    var result = matrix.map( v => v.map( vv => 0 ) );
    var height = result.length;
    var width = result[0].length;
    for ( var i = 0; i < height; i++ )
    {
        for ( var j = 0; j < width; j++ )
        {
            if ( matrix[i][j] )
            {
                for ( var k = i == 0? i : i-1; k <= i+1 && k < height; k++ )
                {
                    for ( var l = j == 0? j : j-1; l <= j+1 && l < width; l++ )
                    {
                        result[k][l]++;
                    }
                }
                result[i][j]--; // don't count ourselves
            }
        }
    }
    return result;
}
