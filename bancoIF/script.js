const btnAdicionar = document.getElementById("adc");
const divParaAdicionar = document.getElementById("paraAdicionar");
const enviado = document.getElementById('enviar')

btnAdicionar.addEventListener("click", function() {
  divParaAdicionar.style.display = "block";
});

enviado.addEventListener("click", function() {
    divParaAdicionar.style.display = "none";
  });