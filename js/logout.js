   function fazerLogout() {
    auth.signOut().then(function() {
        // Logout bem-sucedido
        console.log('Usuário desconectado');
        window.location.href = "../index.html";
    }).catch(function(error) {
        // Trata erros durante o logout
        console.error('Erro ao desconectar o usuário: ' + error.message);
    });
}