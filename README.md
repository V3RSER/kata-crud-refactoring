# [Problema]

Pueden ver los siguientes videos para poder comprender la base del código fuente dentro de este repositorio. 

https://www.youtube.com/watch?v=vqWvGgx_iXY&list=PL0IrPQPrkqoEUDXn1nsjzxSX2zflWtJW-

## KATA Full Stack

En el siguiente proyecto se presenta algunos conceptos de Full Stack, trabajando con Spring Boot + ReactJS.

### Caso de Uso

Se tiene presente un formulario donde se registra unas tareas basadas en una lista por hacer. Esta lista se crea para poder tener una grupos de items donde se pueda gestionar un CRUD. Se tiene un diseño muy básico pero totalmente funcional. 

#### Demo

![alt text]( ./docs/demo.gif "Demo funcional del ToDo")
 
### Instalación

![alt text]( ./docs/start.gif "Instalación y puesta en marcha")

### Perspectiva Front-end
Se tiene un archivo con toda la lógica, se presentan algunas malas prácticas en la codificación del mismo. Se debe refactorizar en donde se separe los componentes en archivos y se representen una mejor estructura. 

Aplicar las mejores prácticas y buscar el mejor diseño para presentar los datos.


### Perspectiva Back-end

Dentro del back-end no se tiene una base de datos basada en servidor. Se debe aplicar un buen diseño de modelo entidad relación y aplicar una base de datos como servidor, ejemplo MySQL. Representar un objeto de trasporte de datos (DTO) en vez de usar la misma entidad para responder. 

### Issues

- <s>Resolver el diseño gráfico<s>
- <s>Separar bien los elementos gráficos como componentes, store, reducer y providers.<s>
- <s>La base de datos debe esta en un servidor como MySQL.</s>
- <s>Aplicar reglas para no guardar elementos vácios.</s>
- <s>Validar carácteres y demás para guardar las entidades de los TO-DO.</s>
- <s>Trabajar con un objeto de trasporte de datos o un objeto plano para representa los datos ante la API.</s>

## Reto

Hacer un fork en su propio namespace y presentar la solución más valida para ser discutida, argumentar los aspectos de mejora y aplicar algunas técnicas de refactorización. Resolverlo de forma individual, aplicar los commit para cada paso que se realice en la refactorización. 

Realizar la siguiente representación donde se tiene TO-Do List agrupado en listas.

![alt text]( ./docs/todo-list-kata.gif "Demo funcional del ToDo List")

# [Solución]

## Base de datos

Se propone el siguiente modelo de una base de datos en MySQL:

![alt text]( ./docs/model-db.jpeg "Modelo entidad relación")

## Diseño gráfico

![alt text]( ./docs/design.JPG "Diseño gráfico")


