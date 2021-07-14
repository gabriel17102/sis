# AJAX
``` sis.ajax(options) ```
ajax es una forma de obtener informacion de una url sin tener que recargar la pagina completa.

## Parametros
  ``` OPTIONS ```
    tiene que ser un objeto con los parametros: url,type,data,success,error,progress,complete,dataType
    ```
      sis.ajax({
        url:"index.html", // url del archivo a obtener informacion
        type:"GET", // metodo HTTP a user (GET O POST)
        data:"", // DATOS A ENVIAR AL ARCHIVO
        dataType:"text", // Tipos de datos a resivir
        success:()=>{}, // si se obtines la informacion correctamente
        complete:()=>{}, // si se completa el ajax
        error:function(){}, // si hubo un error en el ajax
        progress:()=>{} // progreso de el ajax
      })
    ```
