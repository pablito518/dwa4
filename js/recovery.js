import passwordRecovery from './modules/passwordRecovery.js';

document.getElementById('recuperarSenha').addEventListener('click', function(){
    passwordRecovery.recuperarSenha();
})