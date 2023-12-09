// passwordRecovery.js

const passwordRecovery = {
    recuperarSenha: function () {
      const auth = firebase.auth();
      const emailAdress = document.getElementById('campousuarioRecuperar').value;
  
      auth.sendPasswordResetEmail(emailAdress)
        .then(() => {
          this.alertaRecuperarSenha();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  
    alertaRecuperarSenha: function () {
      swal({
        title: "Sucesso!",
        text: "Um email para redefinição de senha foi enviado!",
        icon: "success",
        timer: 5500
      });
      setTimeout(this.redirecionar, 5500);
    },
  
    redirecionar: function () {
      window.location.href = "login.html";
    }
  };
  
  export default passwordRecovery;
  