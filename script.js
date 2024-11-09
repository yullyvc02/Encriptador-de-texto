const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const btnCopiar = document.querySelector(".btn-copiar");
const initialMessage = document.querySelector(".initial-message");
const resultSection = document.querySelector(".result-section");

// Función para reiniciar la pantalla después de un tiempo
function reiniciarPantalla(delay = 8000) {
    setTimeout(() => {
        limpiarPantalla();
    }, delay);
}

function btnEncriptar() {
    try {
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        textArea.value = "";
        hideInitialMessage();
        showResult();
        reiniciarPantalla(); // Agregamos el reinicio automático
    } catch (error) {
        console.error('Error al encriptar:', error);
    }
}

function btnDesencriptar() {
    try {
        const textoDesencriptado = desencriptar(textArea.value);
        mensaje.value = textoDesencriptado;
        textArea.value = "";
        hideInitialMessage();
        showResult();
        reiniciarPantalla(); // Agregamos el reinicio automático
    } catch (error) {
        console.error('Error al desencriptar:', error);
    }
}


function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function copiar() {
    mensaje.select();
    navigator.clipboard.writeText(mensaje.value)
        .then(() => {
            const botonCopiar = document.querySelector(".btn-copiar");
            const textoOriginal = botonCopiar.textContent;
            botonCopiar.textContent = "Copiado!";
            setTimeout(() => {
                botonCopiar.textContent = textoOriginal;
            }, 1500);
        })
        .catch(err => {
            console.error('Error al copiar el texto:', err);
        });
}

function hideInitialMessage() {
    initialMessage.style.display = "none";
    resultSection.style.backgroundImage = "none";
}

function showInitialMessage() {
    initialMessage.style.display = "block";
    resultSection.style.backgroundImage = ""; // Restaura la imagen de fondo
    mensaje.style.display = "none";
    btnCopiar.style.display = "none";
}

function showResult() {
    mensaje.style.display = "block";
    btnCopiar.style.display = "block";
}

function limpiarPantalla() {
    textArea.value = "";
    mensaje.value = "";
    showInitialMessage();
}

document.querySelector(".btn-encriptar").addEventListener("click", btnEncriptar);
document.querySelector(".btn-desencriptar").addEventListener("click", btnDesencriptar);
document.querySelector(".btn-copiar").addEventListener("click", copiar);

