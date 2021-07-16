## GET

```
    $.get(url,data,success,dataType);
```

``` PARA CONFIGURAR EL LLAMADO HTTP USA sis.ajax ```

sis.get envia una peticion http en metodo get. data se unira automaticamente con la url para enviar los valores

```
  $.get("index.php",{h:"soy1",e:"Soy2"},function(){},"text"); // la url que se hara la peticion es ahora index.php?h=soy1&e=Soy2
```
