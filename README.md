# TFG-Matematicas 

- Título: Implementación de programas distribuidos sobre navegadores web 
- Autor: Luis Miguel Barbero Juvera
- Director: Fernando Rubio Diez 
- Trabajo de Fin de Grado
- Grado en Matemáticas
- Universidad Complutense de Madrid

## Descripción 

- Aplicación distribuida para resolver el problema del viajante mediante algoritmos genéticos. 
- Los problemas utilizados se pueden encontrar en [TSPLIB] (http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/). 
- La aplicación presenta una estructura cliente-servidor. Está escrita en JavaScript. El servidor se ejecuta mediante Node.js, mientras que el cliente lo hace a través de navegadores web. 

## Ejecución local 

- Previamente, instalar [Node.js] (https://nodejs.org/en/download/) 
- Descargar los archivos 
- Situarnos en el directorio en el que se encuentran y ejecutar:

``` 
$ git clone https://github.com/Luismi2426/TFG-Matematicas.git 
$ cd TFG-Matematicas 
$ npm install 
$ node server.js 
``` 
- La aplicación se ejecuta en el puerto 5000

## Ejecución mediante Heroku

Para subir el archivo a la nube, se han seguido los siguientes recursos:
- [Scotch.io] (https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku)
- [Heroku] (https://devcenter.heroku.com/articles/deploying-nodejs)
- [How to Node] (https://howtonode.org/deploy-blog-to-heroku)

Las implementaciones se pueden ver en:
- [a280] (https://tfg16luismi280.herokuapp.com)
- [d657] (https://tfg16luismi657.herokuapp.com)
- [d1291] (https://tfg16luismi1291.herokuapp.com)

## Ejecución mediante Cloud9

Por las características de las cuentas gratuitas de Cloud9, es posible que al pulsar sobre los enlaces las páginas no se muestren. Esto se debe a que tras un periodo de inactividad, el servidor se para y necesita ser relanzado manualmente por el propietario de la cuenta: [Cloud9 inactve Workspace] (https://docs.c9.io/docs/inactive-workspaces)

El proceso seguido para subir los archivos y ejecutar los se encuentra en: [Cloud9] (https://docs.c9.io/docs/getting-started)

Las implementaciones se pueden ver en:
- [a280] (https://tfg16luismi280-luismi2426.c9users.io/)
- [d657] (https://tfg16luismi657-luismi2426.c9users.io/)
- [d1291] (https://tfg16luismi1291-luismi2426.c9users.io/)

## Soluciones

Las mejores soluciones encontradas para los problemas que se vayan resolviendo de la librería TSPLIB se encontrarán en el archivo soluciones.txt.

## Recursos

- [J.J. Merelo] (https://github.com/JJ/IDC-keynote)
- [Chaoyu Yang (parano)] (https://github.com/parano/GeneticAlgorithm-TSP)
- [Node.js] (https://nodejs.org/en/)
- [Express] (http://expressjs.com/)
- [Heroku] (https://www.heroku.com/)
- [Cloud9] (https://docs.c9.io/)
