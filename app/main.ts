import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';//importamos el modulo que será el que "lanzaremos"

const platform = platformBrowserDynamic();// para otra platatorma, como por ej.: mobile, sería otra platform....
platform.bootstrapModule(AppModule);