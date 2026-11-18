# miapp – NativeScript + Angular (drawer navigation)

Proyecto basado en el template
[template-drawer-navigation-ng](https://github.com/NativeScript/template-drawer-navigation-ng).

## Requisitos implementados
1. Basado en el template drawer-navigation-ng (enrutador modular por features + side drawer).
2. Dos componentes nuevos: `ListaComponent` y `DetalleComponent` (`src/app/productos`).
3. Nuevo módulo de feature: `ProductosModule`.
4. Submódulo de ruteo propio: `ProductosRoutingModule`.
5. Navegación integrada al side drawer (`app.component.html` y `app-routing.module.ts`).
6. Service nuevo `ProductosService` (`providedIn: 'root'`), inyectado por DI.
7. `*ngFor` en `lista.component.html`.
8. CSS por plataforma: `lista.component.css`, `lista.component.android.css`, `lista.component.ios.css`.
9. Ícono personalizado en `App_Resources` (launcher Android/iOS e `icono_productos`).
10. Asignación solo en Android: `if (isAndroid) { this.mensajePlataforma = ... }` en `lista.component.ts`.

## Cómo ejecutar
```bash
npm install
ns preview        # o: ns run android
```

## Segundo entregable (formularios, animaciones, imágenes y splash)
1. Página de búsqueda con `ListView` y plantilla anidada con `FlexboxLayout`: `src/app/search/search.component.html`.
2. Listado → detalle con `RouterExtensions.navigate` (`onItemTap` en `search.component.ts`, ruta `detalle/:id`).
3. Pull to refresh (`PullToRefresh`, registrado en `src/main.ts`) que agrega productos aleatorios.
4. Diálogo `Dialogs.action` (ícono de etiqueta) que modifica `categoria` del objeto.
5. Toast con `@triniwiz/nativescript-toasty`.
6. Two-way binding `[(ngModel)]` en el formulario de búsqueda.
7. Validador personalizado con directiva: `src/app/search/min-len.directive.ts` (`minLen`).
8. Gesto `longPress` sobre la estrella (favorito).
9. Animaciones: `rotate` en el ícono de categoría y `scale` en la estrella.
10. Splash screen de Android personalizado: `App_Resources/Android/src/main/res/drawable-nodpi/splash_screen.xml` y `splash_logo.png`.
