# EACH
  recorre todos los elementos obtenidos del dom
  ```
    <span>hola</span>
    <span>adios</span>
    <script>
      var span = $("span");
      span.each(function(){
        alert($(this).text())
      })
    </script>
  ```
  al llamar span obtine los dos span y al usar each recorre los dos.
  
  pero si unos elementos carga despues de hacer el each la funcion no lo detecta.
  
  ```
    <span>hola</span>
    <span>adios</span>
    <script>
      var span = $("span");
      span.each(e=>{
        console.log(e); // solo muestras los dos
      })
    </script>
    <span>ajam</span>
  ```
