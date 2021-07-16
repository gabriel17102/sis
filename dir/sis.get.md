## GET

```
    $.get(url,data,success,dataType);
```

``` PARA CONFIGURAR EL LLAMADO HTTP USA sis.ajax ```

sis.get envia una peticion http en metodo get. data se unira automaticamente con la url para enviar los valores

```
  $.get("index.php",{h:"soy1",e:"Soy2"},function(){},"text"); // la url que se hara la peticion es ahora index.php?h=soy1&e=Soy2
```
# PARAMETROS
    ``` url ```
        es la url a hacer la peticion HTTP.
    ``` DATA ```
        puede enviar objeto o string a enviar al archivo.
    ``` success ```
        funcion que se ejecuta cuando se ejecuta la peticion correctamente.
    ``` dataType ```
        tipo de dato al resivir.
