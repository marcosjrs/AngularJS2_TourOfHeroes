Todo lo siguiente es sacado de https://angular.io/docs/ts/latest/tutorial/toh-pt1.html


Paso 1
------

- Creamos una carpeta llamada angular-tour-of-heroes y sequimos las instrucciones del QuickStart oficial de la página de Angular (https://angular.io/docs/ts/latest/quickstart.html), los pasos los pongo en el archivo readme_quickstart.md de este proyecto.
Para comprobar que todo está correcto y que se muestra un navegador con el saludo, ejecutamos:

```
npm start
```

Este navegador lo dejaremos abierto para ir viendo los cambios que realizaremos...


Paso 2 - Comenzando los cambios.
------

- Añadimos dos propieades a nuestro componente AppComponent, una para el nombre de la aplicación y otra para el nombre de heroe en cuestión.
Quedando así: 

```javascript
export class AppComponent {
  title = 'Tour of Heroes';
  hero = 'Windstorm';
}
```

- Tambien actualizamos su decorador, cambiando la template para que utilice las dos propiedades mencionadas.


```javascript
template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
```
Si todo va bien en este punto ya se tendría que ver el cambio en el navegador (si es que no lo cerramos...)



Paso 3 - Creando la clase Hero y mostrar su información
------

- Lo anterior sirvió como inicio, para mostrar información,.. pero necesitamos que no sea solo un string, porque más adelante le añadiremos más propiedades a nuestro heroe, así que pasaremos ese nombre anterior, a un objeto que lo contenga. Para ello añadiremos a app.component.ts, por ejemplo antes de la clase AppComponent (y de su decorador), lo siguiente:

```javascript
export class Hero {
  id: number;;
  name: string;
}
```
- Y Ahora en el AppComponente cambiaremos el hero, que antes era un string, por una instancia rellenada....

```javascript
hero: Hero = {
  id: 1,
  name: 'Windstorm'
};
```

- Ahora ya podremos cambiar el template para que coja el dato de esta nueva instancia creada.

```javascript
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2>'
```

Con esto se deberían ver los cambios correspondientes en el navegador.


- Ahora añadiremos más información, haciendo para ello un div donde se mostrará también el id. Y cambiaremos un poco la forma de mostrarlo, para ello, como la línea se haría muy larga, utilizaremos el ` para poder hacerlo multilínea, quedando así:

template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div><label>name: </label>{{hero.name}}</div>
  `
  (Probablemente no se vea, por el marcado del .md, pero el contenido está entre ` );


Paso 4 - Posibilidad de editar la información del heroe, desde el template. (Doble binding)
------

- Añadimos un input con un atributo, [(ngModel)], que "apuntase" a la propiedad name de la instancia de Hero, quedando algo como:

template:`
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  `

*Nota personal: Teniendo en cuenta que queremos un doble-binding y para las propiedades output sería entre () y para los input sería [], entiendo que el ngModel sería entre ambos, por ser doble binding*

- Pero no funcionará, para que funcione el "doble binding" o "two-way data binding", en el **app.module.ts**, tendremos que importar el FormsModule (por ejemplo debajo del import de BrowserModule).. e importarlo en el array imports del decorador NgModule, que son la lista de módulos externos usados por la aplicación. Quedando como sigue:

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

```

En este momento ya debería estar funcionando correctamente en el navegador.
