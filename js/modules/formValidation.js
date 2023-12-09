// formValidation.js

const formValidation = {
    validate: function() {
     const form = document.getElementById('novousuario');
     const reportVal = form.reportValidity();
      if(reportVal == true){
        return reportVal;
      }
      else{
          return;
      }
  
    }
  };
  
  // Exporte o módulo para uso em outros lugares
  export default formValidation;
  