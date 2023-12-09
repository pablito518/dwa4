// formValidation.js

const formValidation = {
    checkboxValidate: function() {
      // Implemente sua lógica de validação de checkbox aqui
      const Termo1 = document.getElementById('termo1');  
      Termo1.addEventListener("invalid",function(){
          this.setCustomValidity('Você precisa ler e aceitar os termos para prosseguir');
      });
      Termo1.reportValidity();
      Termo1.addEventListener('change',function(){
          this.setCustomValidity('');
      });
    },
    validate: function() {
      // Implemente sua lógica de validação do formulário aqui

     const form = document.getElementById('novousuario');
     const reportVal = form.reportValidity();
      if(reportVal == true){
        return reportVal;
         this.checkboxValidate();
      }
      else{
          return;
      }
  
    }
  };
  
  // Exporte o módulo para uso em outros lugares
  export default formValidation;
  