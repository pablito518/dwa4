import formValidation from './modules/formValidation.js';
import firebaseAuth from './modules/firebase-auth.js';

// Use os métodos e classes conforme necessário
document.getElementById('enviar').addEventListener('click', function() {
    // Coloque aqui o código que deseja executar quando o elemento for clicado
    const result = formValidation.validate();
    if(result){
        CriarUsuario();
    }
    // Exemplo: chamar uma função
});

document.getElementById('cadastrar').addEventListener('click', function(){
    firebaseAuth.autenticarComGoogle();
})

document.getElementById('entrar').addEventListener('click', function(){
    firebaseAuth.signInWithEmailAndPassword();
})




function CriarUsuario(){
   let Email = document.getElementById('campoEmail').value;
   let password = document.getElementById('campoSenha1').value;
    

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
