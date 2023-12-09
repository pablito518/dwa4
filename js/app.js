
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// No seu arquivo principal

import formValidation from './modules/formValidation.js'
import firebaseAuth from './modules/firebase-auth.js';

// Use os métodos e classes conforme necessário
document.getElementById('enviar').addEventListener('click', function() {
    // Coloque aqui o código que deseja executar quando o elemento for clicado
    const result = formValidation.validate();
    if(result){
        getData();
    }
    // Exemplo: chamar uma função
});

document.getElementById('cadastrar').addEventListener('click', function(){
    firebaseAuth.autenticarComGoogle();
})

// Exemplo de criação de um objeto User a partir do formulário
//const user = User.fromForm(document.getElementById('novousuario'));

// Exemplo de cadastro de usuário
//Cadastro.cadastrarUsuario(user);

//Inicializando as configurações do Firebase


  function Login(){
    let userEmail = document.getElementById('campousuario').value;
    let userPassword = document.getElementById('camposenha').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword
    ).then(response => { 
        window.location.href = "../../poupaIF/bancoIF/home.html";
    }).catch(error => 
        {  if(error.code == "auth/wrong-password"){
            alertaUsuario();
        }
        else if(error.code == "auth/invalid-email"){
            alertaUsuario2();
        }
        else if(error.code == "auth/user-not-found"){
            alertaUsuario3();
        }
        else if(error.code == "auth/too-many-requests"){
            alertaUsuario4();
        }   
    });
}
 //verificando se todos os elementos do form estão preenchidos

//obtendo dados
function getData(){
   let _nome_completo = document.getElementById('campoNome').value;
   let _Email = document.getElementById('campoEmail').value;
   let _CPF = document.getElementById('campoCPF').value;
   let _Telefone = document.getElementById('campoTelefone').value;
   // _password = document.getElementById('campoSenha1').value;
   // _Confirmpassword = document.getElementById('campoSenha2').value;
    Cadastrar(_nome_completo, _Email , _Telefone, _CPF);    
}


function Cadastrar(nome_completo, _Email ,_Telefone, _CPF,){
  db.collection(USUARIOS).add({
        Nome: nome_completo,
        Email: _Email,
        Telefone: _Telefone,
        CPF: _CPF,
})
CriarUsuario();   
}

function CriarUsuario(){
    Email = document.getElementById('campoEmail').value;
    password = document.getElementById('campoSenha1').value;
    confirm_password = document.getElementById('campoSenha2').value;
    

auth.createUserWithEmailAndPassword(Email,password).then(user=>{
    console.log(user);
    limpar();
    window.location.href = "welcome.html";
}).catch(error =>{
    console.log(error);
    if(error.code == "auth/email-already-in-use"){
        alertaEmail();
    }
    else if(error.code == "auth"){

    }
})
}

function alertaEmail(){
    swal("Ocorreu um erro", "Esse email já foi cadastrado!", "error");
}

function limpar(){
   document.getElementById('campoNome').value = "";
   document.getElementById('campoEmail').value = "";
   document.getElementById('campoCPF').value = "";
   document.getElementById('campoTelefone').value = "";
   document.getElementById('campoSenha1').value = "";
   document.getElementById('campoSenha2').value = "";
}


function alertaUsuario(){
    swal("Usuário ou senha inválida", "Insira um usuário e senha válida e tente novamente", "error");
}
function alertaUsuario2(){
    swal("Endereço de email inválido", "Insira um endereço de email válido e tente novamente", "error");
}
function alertaUsuario3(){
    swal("Usuário não cadastrado", "Gostaria de se registrar?", "error");
}

function alertaUsuario4(){
    swal("Muitas tentativas", "Aguarde alguns minutos e tente novamente", "error");
}

/** 
 * TODO: Modularizar (passwordRecovery.js)
*/
function recuperarSenha(){
var auth = firebase.auth();
var emailAdress = document.getElementById('campousuarioRecuperar').value;

auth.sendPasswordResetEmail(emailAdress).then(()=>{
alertaRecuperarSenha();
}).catch(error=>{
    console.log(error);
})
}

function alertaRecuperarSenha(){
    swal({
        title: "Sucesso!",
        text: "Um email para redefinição de senha foi enviado!",
        icon: "success",
        timer: 5500
        });
        setTimeout(redirecionar, 5500);
    }
function redirecionar() {
    window.location.href = "login.html";
}
