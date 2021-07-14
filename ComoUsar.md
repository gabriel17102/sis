# Como usar
```
  var span = $("span");
```  
a la variable span se le añade unas nuevas funciones pero las mas utilizadas las de cambio de texto
##  como usar text y html
las dos funciones cambia el texto a mostrar. 
La diferencia entre text y html es que text solo puedes insertar texto.
pero html tambien se puede poner etiquetas html
```
  var span = $("span");
  span.text("nuevo texto");
  span.html("<script>alert('hola')</script>");
```
pero si en las funciones no les pones valores te retornaran el texto o las etiquetas dependiendo de cual estas usando
```
<span><script>alert("hola")</script>hola</span>
<script>
  var span = $("span");
  console.log(span.text()); // muestra hola
  console.log(span.html()); // muentra <script>alert('hola')</script>hola
</script>
```
