// firebaseAuth.js
const provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('profile');
provider.addScope('email');
const firebaseAuth = {
    
    autenticarComGoogle: async function() {
      // Iniciar processo de autenticação com o Google
    auth.signInWithPopup(provider).then(function(result) {
        // Verificar se o domínio do e-mail é permitido
        const user = result.user;
        const dominioPermitido = 'aluno.ifsp.edu.br';

        if (user.email.endsWith('@' + dominioPermitido)) {
            // Usuário autenticado com sucesso, faça o que for necessário aqui
            
            document.getElementById('infoAdicionais').style.display = 'block';
            document.getElementById('cadastrarGoogle').style.display = 'none';
            document.getElementById('campoNome').value = user.displayName;
            document.getElementById('campoEmail').value = user.email;
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
    },
    loginGoogle: async function() {
        try {
            await autenticarComGoogle();
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // Verificar se o e-mail do usuário pertence ao domínio permitido
                    const dominioPermitido = 'aluno.ifsp.edu.br';
    
                    if (user.email.endsWith('@' + dominioPermitido)) {
                        console.log(auth.currentUser);
                        const uid = user.uid;
                        console.log(uid)
    
                        // Usuário autenticado com sucesso e pertence ao domínio permitido
                        window.location.href = "../bancoIF/home.html";
                    } else {
                        // Desconectar o usuário e exibir uma mensagem de erro
                        user.delete().then(function() {
                            swal("Ocorreu um erro", "Apenas contas " + dominioPermitido + " são permitidas.", "error");
                            console.error('Apenas contas "' + dominioPermitido + '" são permitidas.');
                        }).catch(function(error) {
                            console.error('Erro ao desconectar o usuário: ' + error.message);
                        });
                    }
                } else {
                    // Usuário não autenticado
                }
            });
        } catch (exception) {
            console.log(exception);
        }
    },
    setPersistence: function() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even if
      // a user forgets to sign out.
    });
    },
    signInWithEmailAndPassword: function(email, password) {
      // Implementação da função
    }
  };
  
  export default firebaseAuth;
  