function crearMatrices() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);
  
    const matricesDiv = document.getElementById('matrices');
    matricesDiv.innerHTML = '';
  
    const matriz1Div = document.createElement('div');
    matriz1Div.innerHTML = '<h2>Matriz 1</h2>';
    matricesDiv.appendChild(matriz1Div);
  
    const matriz2Div = document.createElement('div');
    matriz2Div.innerHTML = '<h2>Matriz 2</h2>';
    matricesDiv.appendChild(matriz2Div);
  
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        const inputMatriz1 = document.createElement('input');
        inputMatriz1.type = 'number';
        inputMatriz1.id = `matriz1_${i}_${j}`;
        matriz1Div.appendChild(inputMatriz1);
  
        const inputMatriz2 = document.createElement('input');
        inputMatriz2.type = 'number';
        inputMatriz2.id = `matriz2_${i}_${j}`;
        matriz2Div.appendChild(inputMatriz2);
      }
      matriz1Div.appendChild(document.createElement('br'));
      matriz2Div.appendChild(document.createElement('br'));
    }
  }
  
  function sumarMatrices() {
    const filas = parseInt(document.getElementById('filas').value);
    const columnas = parseInt(document.getElementById('columnas').value);
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
  
    const matriz1 = [];
    const matriz2 = [];
  
    for (let i = 0; i < filas; i++) {
      const fila1 = [];
      const fila2 = [];
      for (let j = 0; j < columnas; j++) {
        fila1.push(parseInt(document.getElementById(`matriz1_${i}_${j}`).value));
        fila2.push(parseInt(document.getElementById(`matriz2_${i}_${j}`).value));
      }
      matriz1.push(fila1);
      matriz2.push(fila2);
    }
  
    fetch('/sumar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matriz1, matriz2 }),
    })
    .then(response => response.json())
    .then(resultado => {
      const resultadoMatrizDiv = document.createElement('div');
      resultadoMatrizDiv.innerHTML = '<h2>Matriz Resultante</h2>';
      resultadoDiv.appendChild(resultadoMatrizDiv);
  
      const tabla = document.createElement('table');
      for (let i = 0; i < filas; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < columnas; j++) {
          const celda = document.createElement('td');
          celda.textContent = resultado[i][j];
          fila.appendChild(celda);
        }
        tabla.appendChild(fila);
      }
      resultadoMatrizDiv.appendChild(tabla);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
