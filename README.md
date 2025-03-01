# Backend programación avanzada

Esta librería constituye un backend para contruir una aplicación que ayuda a gestionar hábitos en las personas.

## Cómo utilizar esta librería

Para que esta librería funcione correctamente es necesario realizar los siguientes pasos:

1. Clonar la librería.
2. Abrir la carpeta donde se clonó el repositorio.
3. Abrir una terminal y ejecutar el comando _npm install_.
4. Abrir la librería con Visual Studio Code.
5. Crear un archivo .env según las indicaciones que se dan más abajo.
6. Crear una base de datos de mongoDB Atlas.
7. Conectar Express con la base de datos mongoDB Atlas.

## Cómo probar esta librería

Para probar esta librería se sugiere utilizar un software de pruebas de APIs como Postman, ejecutando solicitudes GET, POST y DELETE.

## Variables de entorno

El archivo .env debe contener dos variables de entorno. Para obtener el enlace que se asigna a la variable MONGO_URI mirar la documentación MongoDB. A la variable PORT se le debe asignar un puerto libre.

A continuación se muestra a modo de ejemplo el contenido del archivo .end, nótese que en el enlace se debe de sustituir el usuario, la contraseña y el nombre del cluster.

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.d03il.mongodb.net/habitosApp?retryWrites=true&w=majority&appName=<cluster> 
PORT=3001
```

## Cómo ejecutar la librería

Para ejecutar la librería se debe utilizar en la consola el siguiente comando:

_npm start_

