RUTAS DISPONIBLES

 Método | Ruta                   Descripción                                      
----------------------------------------------------------------------------------
 GET     `/usuarios`           Listar todos los usuarios   Ejemplo Bash: curl http://localhost:3000/usuarios                     
 GET     `/usuarios/:id`        Obtener un usuario por su ID                     
 POST    `/usuarios`            Crear un nuevo usuario                           
 PUT     `/usuarios/:id`        Modificar un usuario existente                   
 DELETE  `/usuarios/:id`       Eliminar un usuario (si no tiene ventas asociadas) 

---
PRODUCTOS

 Método | Ruta                  | Descripción                     
-----------------------------------------------------------------
 GET     `/productos`           Listar todos los productos      
 POST    `/productos`           Crear un nuevo producto         

---
VENTAS

| Método | Ruta                  | Descripción                     
-----------------------------------------------------------------
 GET     `/ventas`             Listar todas las ventas         
 POST    `/ventas`             Crear una nueva venta           
