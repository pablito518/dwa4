// Obtendo referência ao elemento do valor
const valorElemento = document.getElementById("valor");

// Variável para armazenar o saldo localmente
let saldo = 0;

// Obtendo referência ao botão de adicionar
const btnAdicionar = document.getElementById("adc");
const divParaAdicionar = document.getElementById("paraAdicionar");
const depositar = document.getElementById('enviar');
const sacar = document.getElementById('enviar2');

// Adicionando listener ao botão de adicionar
btnAdicionar.addEventListener("click", function() {
    divParaAdicionar.style.display = "block";
});

// Adicionando listener ao botão de enviar
depositar.addEventListener("click", function() {
    // Obtendo o valor digitado
    const valorAdicionar = parseFloat(document.getElementById("valorAdicionar").value);

    // Atualizando a variável de saldo
    saldo += valorAdicionar;

    // Atualizando o valor na página
    valorElemento.innerText = saldo.toFixed(2);

    // Ocultando a seção de adicionar dinheiro
    divParaAdicionar.style.display = "none";
});

// Adicionando listener ao botão de enviar
sacar.addEventListener("click", function() {
  // Obtendo o valor digitado
  const valorRemover = parseFloat(document.getElementById("valorRemover").value);

  // Atualizando a variável de saldo
  saldo -= valorRemover;

  // Atualizando o valor na página
  valorElemento.innerText = saldo.toFixed(2);

  // Ocultando a seção de adicionar dinheiro
  divParaAdicionar.style.display = "none";
});