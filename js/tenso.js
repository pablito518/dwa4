
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Inicializando as configurações do Firebase




var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('profile');
provider.addScope('email');

function autenticarComGoogle() {
  // Iniciar processo de autenticação com o Google
  auth.signInWithPopup(provider).then(function(result) {
      // Verificar se o domínio do e-mail é permitido
      var user = result.user;
      var dominioPermitido = 'aluno.ifsp.edu.br';

      if (user.email.endsWith('@' + dominioPermitido)) {
          // Usuário autenticado com sucesso, faça o que for necessário aqui
          console.log('Usuário autenticado com sucesso: ' + user.email + user.displayName);
          
          document.getElementById('campoNome').value = user.displayName;
          document.getElementById('campoEmail').value = user.email;
          return result;
      } else {
          // Desconectar o usuário e exibir uma mensagem de erro
          user.delete().then(function() {
              swal("Ocorreu um erro", "Apenas contas " + dominioPermitido + " são permitidas.", "error");
              console.error('Apenas contas "' + dominioPermitido + '" são permitidas.');
          }).catch(function(error) {
              console.error('Erro ao desconectar o usuário: ' + error.message);
          });
      }
  }).catch(function(error) {
      // Trata erros durante o processo de autenticação
      console.error('Erro ao autenticar com o Google: ' + error.message);
  });
}/*
  function cadastrar2(){
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /**  @type {firebase.auth.OAuthCredential} */
   /*     var credential = result.credential;
    
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
          // ...
          console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }*/
async function loginGoogle(){
  try{
      const user = await autenticarComGoogle();
      await (function () {console.log(user)
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // ...
            console.log("puta merda")
            window.location.href = "../bancoIF/home.html";
            }});
  }
  catch(exception){
      console.log(exception)
  }

  
  
}


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
// Existing and future Auth states are now persisted in the current
// session only. Closing the window would clear any existing state even if
// a user forgets to sign out.
});

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
/** 
* TODO: Modularizar (validation.js)
*/

//verificando se as duas checkbox estão marcadas
function checkboxValidate(){    
  Termo1 = document.getElementById('termo1');  
  Termo1.addEventListener("invalid",function(){
      this.setCustomValidity('Você precisa ler e aceitar os termos para prosseguir');
  });
 
  Termo1.reportValidity();
  Termo1.addEventListener('change',function(){
      this.setCustomValidity('');
  });
  if(Termo1.checkValidity()){
      checkboxValidate2();
  }
  
}

function checkboxValidate2(){
  Termo2 = document.getElementById('termo2');  
  Termo2.addEventListener("invalid",function(){
      this.setCustomValidity('Você precisa ler e aceitar os termos para prosseguir');
  });
  Termo2.reportValidity();
  Termo2.addEventListener('change',function(){
      this.setCustomValidity('');
  });
  if(Termo2.checkValidity()){
      getData();
  }
 
}

//verificando se todos os elementos do form estão preenchidos
function validate(){

  form = document.getElementById('novousuario');
  reportVal = form.reportValidity();
  if(reportVal == true){
     checkboxValidate();
  }
  else{
      return;
  }

}

//obtendo dados
function getData(){
  nome_completo = document.getElementById('campoNome').value;
  _Email = document.getElementById('campoEmail').value;
  _CPF = document.getElementById('campoCPF').value;
  _Telefone = document.getElementById('campoTelefone').value;
  _password = document.getElementById('campoSenha1').value;
  _Confirmpassword = document.getElementById('campoSenha2').value;
  
  Cadastrar(nome_completo, _Email , _Telefone, _CPF);    
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

