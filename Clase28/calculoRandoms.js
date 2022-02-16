const generarRandoms = (cantidad) => {
    let array = [];
  
    for (let i = 0; i < cantidad; i++) {
      array.push(Math.floor(Math.random() * (1000 - 1)) + 1)
    }
    return array;
  };
  
  
  calcular = (cantidad = 100000000) => {
    let x = generarRandoms(cantidad);
    var indices = new Array(x.length)
    let resultados = [];
    indices.fill(0);
    for (var i = 0; i < indices.length; i++) {
  
      for (var j = 0; j < x.length; j++) {
        if (i == x[j]) {
          indices[i] = indices[i] + 1;
        }
  
      }
      resultados.push({cantidad:indices[i],numero:x[i]})
    }
    
    return resultados;
  }
  
  
  process.on('message', (msg) => {
    if (msg.mensaje == 'start') {
      console.log('Start calculo');
      const res = calcular(msg.cantidad);
  
      if (process && process.send) {
        process.send(res);
      }
    }
  });