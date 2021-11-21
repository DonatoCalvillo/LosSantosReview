# Equipo Los Santos

## 1937846		Edgar Donato Calvillo Lumbreras
## 1937840		Romelia Alejandra Gonzalez Soto
## 1825240		Luis Gerardo Becerra Jiménez
## 1814187 	Alberto Daniel Hernandez Villanueva

### Controllers
La carpeta de controladores como su nombre lo indica contiene todos los 
controladores de todas las tablas que existen. La conexión y el uso de datos 
de la misma data base, retornando la información en JSON’s, cubiertos por 
un TRY y CATCH para controlar los errores que puedan llegar a ocurrir y 
mostrarlos tanto en consola como en un archivo ubicado en ‘. /logs’.

### Database 
En esta carpeta encontramos un solo archivo que guarda la configuración 
de la base de datos. En caso de conexión fallida con la misma, se produce 
un error en la consola y en el archivo de logs.
Helpers / Middlewares
Nos ayudan con validaciones personalizadas en las rutas, para confirmar 
que la información que va a pasar al controlador sea la correcta o óptima, 
haciendo un filtrado por medio de las funciones que se encuentran en esas 
carpetas.

### Logs
En esta carpeta encontramos los archivos logs, que nos proporcionan 
información sobre cómo está yendo la API, información como si el sistema 
se levantó bien o en dado caso el inconveniente que tuvo para poder 
levantar el mismo, haciéndonoslo saber en el archivo o archivos, cada 
archivo tiene un peso máximo de 5mb y se reemplazan acumulando 5 
archivos máximo.

### Models
Aquí encontraremos el reflejo de las tablas que se encuentran en la base de 
datos, con sus respectivas características como si algún campo es requerido 
o no, cual puede ser su valor default, etc.
Node_modules
En esta carpeta se encuentra todo lo relacionado con los paquetes npm 
instalados para el correcto funcionamiento de la aplicación.

### Routes
Aquí se encuentran los “Endpoints” de cada uno de los modelos, con un 
middleware que nos ayudan a filtrar los datos de manera óptima para evitar 
errores. En cada archivo se cuenta con 4 verbos HTTP (get, post, put, delete).
