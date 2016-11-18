
**PARTE 1**  
=========
https://angular.io/docs/ts/latest/tutorial/toh-pt1.html

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
Si todo va bien en este punto ya se tendría que ver el cambio en el navegador (si es que no lo cerramos... ,si es así podremos volver a ejercutar npm start  ;)  ).




Paso 3 - Creando la clase Hero y mostrar su información
------

- Lo anterior sirvió como inicio, para mostrar información,.. pero necesitamos que no sea solo un string, porque más adelante le añadiremos más propiedades a nuestro heroe, así que pasaremos ese nombre anterior, a un objeto que lo contenga. Para ello añadiremos a app.component.ts, por ejemplo antes de la clase AppComponent (y de su decorador), lo siguiente:

```javascript
export class Hero {
  id: number;
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

```javascript
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


**PARTE 2** 
=========
https://angular.io/docs/ts/latest/tutorial/toh-pt2.html

Paso 1 - Creando heroes
----------
- Mostraremos una lista de heroes, que por el momento serán estáticos, para ello primero debemos de tener esos heroes en algún sitio, para ello crearemos una constante, que será un array de tipo Hero en app.component.ts

```javascript
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```
- A continuación, **dentro de AppComponent**, crearemos una propiedad que apunte a este nuevo array

```javascript
heroes = HEROES; //En el futuro se recogerá de un service.
```

Paso 2 - Creando la vista para la lista de heroes
-----------

- En app.components.ts, a la template se le añade:
```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```
> El prefijo * de ngFor indica que se repite el li por cada iteración del for, dicho de otro modo el li es parte la template de cada hijo de la colección iterada.
> "let" antes de hero indentifica a hero como una variable "input" del template, mencionada antes. Gracias a la cual, podremos acceder a sus atributos dentro de la template, como se puede apreciar en el contenido.

Paso 3 - Aplicando estilos
----------
- Para añadir algunos estilos al componente, nos dirigimos al @Component de app.component.ts y le adjuntamos:

```javascript
styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
```

>Cuando asignamos estilos a un componente, estos estilos no influyen en el resto, solo serán aplicables al mismo.


Paso 4 - Mostrando los datos del heroe seleccionado
-----------

- Primero debemos poder seleccionar un elemento de la lista. Para ello añadimos (click)="onSelect(hero)" en el li.

```javascript
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
```
- Y ahora trabajamos con el hero seleccionado en el componente (de app.component.ts). Para ello debemos crear la función mencionada, y que digimos que iba a responder a tal selección, onSelect. Nuestra intención es que dentro de ese onSelect, al que se le pasa el heroe seleccionado, lo guarde en nuestro componente, por tanto crearemos una instancia de Hero en el componente, llamada selectedHero.

```javascript
selectedHero: Hero;
```
y ahora haremos lo mencionado, tambien dentro del componente:

```javascript
onSelect(hero: Hero): void {
  this.selectedHero = hero;
}
```
- Ahora que ya tenemos el heroe que se ha seleccionado guardado en el componente, podemos cambiar la template utilizada, de forma que en lugar de mostrar los datos del atributo "hero" del componente, muestre el de "selectHero"
```html
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
</div>
```
- El problema es que inicialmente no dispone de valor, por lo que puede dar error, para solucionarlo lo que haremos será englobarlo en un  div con  *ngIf="selectedHero" , quedando todo:

```html
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
```
- Para que se pueda ver como "seleccionado" el elemento pulsado, en el "li" le añadiremos el código [class.selected]="hero === selectedHero" de esta forma cuando la condición "hero === selectedHero" se dea, se le añadirá un class="selected" al "li" pulsado. El "li" quedará de la siguiente forma:

```html
<li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
```

**PARTE 3** 
===========
https://angular.io/docs/ts/latest/tutorial/toh-pt3.html

Paso 1 - Inicio de separación de funcionalidad y visualización de detalle de Hero
--------
- La intención es separar lo hecho hasta ahora, empezando por el apartado correspondiente a la muestra de información del heroe; por lo que haremos un componente para guardar, manejar y mostrar dicha información, eliminando este apartado del otro componente. Inicialmente, en la carpeta app, crearemos un hero-detail.component.ts con el siguiente contenido:

```javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-hero-detail',
  template: `
  <div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
  </div>
</div>`
})
export class HeroDetailComponent {
  hero:Hero;
}
```

>Con selector: 'my-hero-detail', estamos diciendo que la forma de instanciarlo en el html será con un tag < my-hero-detail > 


- En este punto tendríamos un error en HeroDetailComponent, porque no encontrará la clase Hero, que es el tipo del atributo hero, que le hemos creado. Por tanto ahora crearemos la clase externa Hero (para luego utilizarla donde sea necesario). Creamos un hero.ts en la carpeta app con el siguiente contenido:

```javascript
export class Hero {
  id: number;
  name: string;
}
```
y ahora ya lo podemos importar en hero-detail.component.ts

```javascript
import { Hero } from './hero';
```
- Aprovechando, recordamos que en app.component.ts teniamos una clase interna Hero, que debemos borrar e importar la nueva, como hemos hecho para hero-detail.component.ts


Paso 2 - Propiedad de entrada "hero" en el nuevo componente. 
-------
. El nuevo componente de detalles de hero (HeroDetailComponent), necesita que se le pase el hero a mostrar en los detalles, para ello se le añade una propiedad "input" en su clase (para eso se le pone @Input encima de la propiedad de su propiedad "hero", que ya tenía); 

```javascript
  @Input()
  hero: Hero;
```
A la vez que en html tendrá reflejado ese parametro de entrada, para lo cual se añadirá  [hero]="UnaInstanciaDeHeroValida" en el componente en el momento que lo instanciemos, que será más adelante... quedaría algo así:

```html
<my-hero-detail [hero]="UnaInstanciaDeHeroValida"></my-hero-detail>
```



Paso 3 - Refrescando AppComponent y AppModule
---------

- Ahora que tenemos un nuevo componente al que poder pasarle una instancia de hero, ya podemos utilizarlo en el AppComponent en lugar de lo anterior.... por tanto, en app.component.ts, el valor de su atributo template sería :

```javascript
template: `
  <h1>{{title}}</h1>
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li *ngFor="let hero of heroes"
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  <my-hero-detail [hero]="selectedHero"></my-hero-detail>
`
```
>Como vemos (en [hero]="selectedHero" ) el AppComponent le pasará como instancia de hero, el selectHero contenido.

- Ahora para que todo funcione, debemos importar el hero-detail.component en AppModule (que es la principal) y añadirlo al atributo declarations del NgModule, que es donde se deben añadir todos los componentes utilizado en el modulo principal. Por tanto en AppModule añadimos el import: 

```javascript
import { HeroDetailComponent } from './hero-detail.component';
```

y modificamos el @NgModule, quedando:

```javascript
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**PARTE 4**
=========== 
https://angular.io/docs/ts/latest/tutorial/toh-pt4.html

En esta parte crearemos un servicio que alimentará la aplicación, injectandola como dependencia.

Paso 1 Crear la clase/servicio
------

- En la carpeta app, crearemos el archivo hero.service.ts donde crearemos el servicio HeroService (por convención, Sevice para a ser .service y el resto se separarían con guiones, por ejemplo, si crearamos SuperHeroService el archivo sería super-hero.service.ts). El contenido de hero.service.ts :

```javascript
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
}
```

- Ahora le añadiremos el metodo getHeroes en la clase, quedando:

```javascript
export class HeroService {
   getHeroes(): void {} // Esta función será la que en un futuro obtendrá los datos... cuando sea, se cambiará el objeto a devolver...
}
```

Paso 2 - Aislando el mock de Heroes
------
Hasta ahora la constante HEROES se encontraba en app.component.js ahora crearemos un archivo para él; que será el utilizado por el Servicio creado anteriormente.

- Dentro de la carpeta app, creamos un archivo llamado mock-heroes.ts, a donde moveremos el array constante HEROES de app.component.ts, debido a que el array es de objetos Hero, en el archivo creado debemos tambien importar la clase. El contenido de mock-heroes.ts, quedaría:

```javascript
import { Hero } from './hero';
export const HEROES: Hero[] = [
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'},
  {id: 15, name: 'Magneta'},
  {id: 16, name: 'RubberMan'},
  {id: 17, name: 'Dynama'},
  {id: 18, name: 'Dr IQ'},
  {id: 19, name: 'Magma'},
  {id: 20, name: 'Tornado'}
];

```

- En este punto en app.component.ts no debería estar la constante anterior, por tanto dará un error, ya que tenermos que modificar la variable "heroes" de AppComponent, quedando 

```javascript
heroes: Hero[]; //en lugar de heroes = HEROES;
```

Paso 3 - Cambiando hero.service para que devuelva los Heroes 
------

- Cambiamos hero.service.ts importando hero (porque getHeroes devolverá un array de este tipo) y el mock-heroes (porque será lo que devuelva). Quedando:

```javascript
import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes(): Hero[] {
    return HEROES; 
  }
}
```

Paso 4 - Uso del nuevo servicio en app.component
--------

- En app.component podemos importar el servicio, de la siguiente forma...

```javascript
import { HeroService } from './hero.service';
```

- Para injectarlo en el constructor

```javascript
constructor(private heroService: HeroService) { }
```

- Para que el componente sepa que se trata de un servicio, debe añadirse como provider en @Component, por tanto dentro del decorador mencionado, se añade:

```javascript
providers: [HeroService]
```

- En el Appcomponent, a modo de la evolución en el aprendizaje, añadimos un método de como obtendríamos los datos.

```javascript
 getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
```

- Angular permite hooks en el ciclo de vida de la aplicación, que se ejecutan al iniciar, al modificarse o al destruir la aplicación.... En nuestro caso vamos a servirnos del OnInit para llamar al método creado anteriormente (getHeroes). Para ello debemos primero importarlo y luego implementar ya que se tratan de interfaces. Quedaría...


```javascript
import { OnInit } from '@angular/core';

export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getHeroes();
  }
  //.....
}

```

Paso 5 - Cambiando de sincrono a asíncrono (Promesas)
--------

Por el momento tenemos un servicio que es sincrono, dispone de los datos directamente, y por tanto "no" hay esperas; hay que contar que en algún momento será un servicio real que está alojado en algún servidor remoto... (por el momento no se vió llamadas http, pero en breve haremos el cambio...) Por lo que vamos a cambiar el código para que sea asincrónico, utilizando "promesas". (Una promesa sirve para que nos llame cuando el resultado esté listo http://exploringjs.com/es6/ch_promises.html )

- Abrimos hero.service.ts y actualizamos el metodo getHeroes (que seguirá utilizando el mook, por tanto será superápido, pero ahora con la promesa...)

```javascript

getHeroes(): Promise<Hero[]> {
  return Promise.resolve(HEROES);
}

```

Si quisieramos simular, que tarda dos segundos, podríamos poner un timeout por el medio en la devolución de la promesa, algo como: 
  return new Promise<Hero[]>(resolve => setTimeout(resolve, 2000)) 
                            .then(() => this.getHeroes());

- Al hacer el cambio anterior, tambien tendremos que actualizar donde se hace uso de este método, ya que ahora ya no devuelve un array, sino una promesa y por tanto el array se obtendrá a través de dicha promersa. Así que vamos a app.component.ts y cambiamos su metodo getHeroes, quedando:

```javascript
getHeroes(): void {
  this.heroService.getHeroes().then(heroes => this.heroes = heroes);
}
```

**PARTE 5** 
=========== 
https://angular.io/docs/ts/latest/tutorial/toh-pt5.html

Acciones a realizar:

- Añadir un dashboard con los "top 4".
- Navegar entre el listado de Heroes anterior y el nuevo dashboard.
- Clickando sobre un heroe en cualquiera de las vistas nos dirigirá a la vista de detalles del heroe seleccionado.
- Clickando en un link ( dentro de un email ) no dirigirá a la vista de un heroe en particular.

![Imagen del caso de uso]
(https://angular.io/resources/images/devguide/toh/nav-diagram.png)


Para ello comenzaremos a utilizar el Routing (navegación) de AngularJS. El plan es el siguiente:

- Reubicar lo que concierne a los "héroes", que ahora está en AppComponent, a un nuevo HeroesComponent y convertir AppComponent en una parte que sólo se ocupe de la navegación 
- Agregar un enrutamiento 
- Crear un nuevo dashboard (cuadro de mandos)
- Acceder al dashboard  mediante el enrutamiento



Paso 1 - Pasar el contenido de AppComponent a un nuevo HeroesComponent. Para luego cargar este último en un nuevo AppComponent.
------

El app.component.ts, que se encuentra en la carpeta app, la renombramos por heroes.component.ts . Dentro le cambiamos el nombre de la clase

```javascript
export class HeroesComponent implements OnInit {
}

```

y el selector, que está dentro del decorador Component

```javascript
@Component({
  selector: 'my-heroes',
})
```

Una vez que ya tenemos nuestro nuevo componente Heroes, vamos a crear de nuevo el app component, pero ahora servirá como "navegador".
Creamos  el archivo app/app.component.ts donde crearemos la clase AppComponent, que dentro tendrá un atributo title. Le pondremos a la clase un decorador Component, cuyo selector será 'mi-app' y cuya template será un simple h1 con el atributo title de la clase y la etiqueta my-heroes, para instanciar HeroesComponent (el que antes era AppComponent), quedando inicialmente algo como: 

```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}

``` 
Al poner el title aquí, debemos de quitarlo de Appcomponent, para no duplicar, para eso simplemente podemos eliminar el h1 correspondiente (de la propiedad template) y la propiedad title de heroes.component.ts.

Ahora nos dirigimos a AppModule (app/app.module.ts), al que le añadimos en el array declarations el HeroComponent (ya que es donde ponemos todos los componentes de los que se hacen uso, y este es nuevo..). Tambien le hacemos un import a HeroService y lo metemos en el array provider del NgModule, ya que necesitaremos este servicio en las vistas. Y por tanto, borraremos el HeroService del providers de HeroesComponent. app.modules.ts quedaría algo como:

```javascript
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

```












