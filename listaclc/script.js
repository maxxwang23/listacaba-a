function toggleInfo(itemId) {
    const infoElement = document.getElementById(`info-${itemId}`);
    const arrowElement = document.getElementById(`arrow-${itemId}`);
    
    if (infoElement.style.display === "none" || infoElement.style.display === "") {
        infoElement.style.display = "block";
        arrowElement.innerHTML = "▼";
    } else {
        infoElement.style.display = "none";
        arrowElement.innerHTML = "▶";
    }
}

function verSeleccionados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Por favor selecciona al menos una sucursal');
        return;
    }

    let contenido = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Sucursales Seleccionadas</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; padding-bottom: 70px; }
                .sucursal { 
                    border: 1px solid #ccc; 
                    padding: 20px; 
                    margin: 10px 0; 
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                h2 { 
                    color: #333;
                    margin-top: 0;
                }
                .comentarios {
                    margin-top: 15px;
                    border-top: 1px solid #ddd;
                    padding-top: 15px;
                }
                textarea {
                    width: 100%;
                    min-height: 80px;
                    margin-top: 10px;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    resize: vertical;
                }
                .email-section {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 15px;
                    background: #f0f0f0;
                    border-top: 1px solid #ddd;
                    text-align: center;
                }
                .email-button {
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .email-button:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <h1>Información de Sucursales</h1>
    `;

    checkboxes.forEach(checkbox => {
        const id = checkbox.id.replace('item', '');
        const nombre = document.querySelector(`label[for="${checkbox.id}"]`) || 
                      checkbox.parentElement.querySelector('label');
        const info = document.getElementById(`info-${id}`);
        
        contenido += `
            <div class="sucursal">
                <h2>${nombre.textContent}</h2>
                ${info.innerHTML}
                <div class="comentarios">
                    <h3>Comentarios:</h3>
                    <textarea placeholder="Agregar comentarios para esta sucursal..."></textarea>
                </div>
            </div>
        `;
    });

    contenido += `
            <div class="email-section">
                <button onclick="enviarPorEmail()" class="email-button">Enviar por Gmail</button>
            </div>
            <script>
                function enviarPorEmail() {
                    let contenido = '';
                    const sucursales = document.querySelectorAll('.sucursal');
                    
                    sucursales.forEach(sucursal => {
                        const titulo = sucursal.querySelector('h2').textContent;
                        const info = Array.from(sucursal.querySelectorAll('p')).map(p => p.textContent).join('\\n');
                        const comentarios = sucursal.querySelector('textarea').value;
                        
                        contenido += '\\n' + titulo + '\\n';
                        contenido += info + '\\n';
                        if (comentarios) {
                            contenido += 'Comentarios: ' + comentarios + '\\n';
                        }
                        contenido += '-------------------\\n';
                    });
                    
                    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&body=' + 
                        encodeURIComponent(contenido) + 
                        '&su=' + encodeURIComponent('Información de Sucursales');
                    
                    window.open(gmailUrl, '_blank');
                }
            </script>
        </body>
        </html>
    `;

    const ventana = window.open('', '_blank');
    ventana.document.write(contenido);
    ventana.document.close();
}