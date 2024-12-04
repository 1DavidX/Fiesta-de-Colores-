let tiempoRestante = 10;
const cronometroDiv = document.getElementById('cronometro');
const contadorDiv = document.getElementById('contador');

function actualizarCronometro() {
    cronometroDiv.innerHTML = `Tiempo restante: ${tiempoRestante} segundos`;
    if (tiempoRestante <= 0) {
        reiniciarFiesta();
        tiempoRestante = 10; 
    }
    tiempoRestante--;
}

setInterval(actualizarCronometro, 1000);

const colorCount = {};
const colorNames = {
    '#FF5733': 'Rojo',
    '#33FF57': 'Verde',
    '#3357FF': 'Azul',
    '#FFFF33': 'Amarillo',
    '#FF33FF': 'Rosa',
    '#33FFFF': 'Cian',
    '#FF8C00': 'Naranja',
    '#FFD700': 'Dorado',
    '#00FF00': 'Lima',
    '#FF1493': 'Fucsia',
};

function updateCounter() {
    const totalClicks = Object.values(colorCount).reduce((sum, count) => sum + count, 0);
    const countText = Object.entries(colorCount)
        .map(([color, count]) => {
            return `<span style="color: ${color}; font-weight: bold;">${colorNames[color]}: ${count} veces</span>`;
        })
        .join('<br>');

    contadorDiv.innerHTML = `<div><strong>Total de selecciones: ${totalClicks}</strong></div><br>${countText}`;
}

function reiniciarFiesta() {
    document.getElementById('colores').innerHTML = ''; 
    Object.keys(colorCount).forEach(color => colorCount[color] = 0); 
    updateCounter(); 

    // Reinicia el cronómetro
    tiempoRestante = 10;
    cronometroDiv.innerHTML = `Tiempo restante: ${tiempoRestante} segundos`;
}

document.getElementById('agregar-color').addEventListener('click', function () {
    const colorContainer = document.getElementById('colores');
    const colors = Object.keys(colorNames);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (!colorCount[randomColor]) colorCount[randomColor] = 0;
    colorCount[randomColor]++;

    const newColorBtn = document.createElement('button');
    newColorBtn.classList.add('color-btn');
    newColorBtn.style.backgroundColor = randomColor; 
    newColorBtn.title = colorNames[randomColor]; 

    newColorBtn.addEventListener('click', () => {
        colorCount[randomColor]++;
        updateCounter();
        document.getElementById('titulo').style.color = randomColor; 

        document.getElementById('sonido-seleccion').play();
    });

    colorContainer.appendChild(newColorBtn);
    updateCounter();

    document.getElementById('sonido-generacion').play();
});

document.getElementById('reiniciar').addEventListener('click', reiniciarFiesta);

updateCounter();
