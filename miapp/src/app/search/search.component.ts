import { Component, OnInit } from '@angular/core'
import { Application, Dialogs, EventData, ItemEventData, View } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Toasty, ToastDuration } from '@triniwiz/nativescript-toasty'

import { Producto } from '../productos/domain/producto'
import { ProductosService } from '../productos/domain/productos.service'

@Component({
  standalone: false,
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  texto: string = ''
  resultados: Producto[] = []
  categorias: string[] = ['Ropa', 'Calzado', 'Accesorios']
  private navBloqueada = false

  constructor(private productosService: ProductosService, private routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    this.filtrar('')
  }

  // ---- Búsqueda (two-way binding con [(ngModel)] + validador minLen) ----
  filtrar(texto: string): void {
    const t = (texto || '').trim().toLowerCase()
    if (t.length > 0 && t.length < 3) {
      return // el validador minLen marca el error; no se filtra
    }
    this.resultados = this.productosService
      .getAll()
      .filter((p) => p.nombre.toLowerCase().includes(t) || (p.categoria || '').toLowerCase().includes(t))
  }

  // ---- Navegación listado -> detalle con RouterExtensions.navigate ----
  onItemTap(args: ItemEventData): void {
    if (this.navBloqueada) {
      return
    }
    const producto = this.resultados[args.index]
    this.routerExtensions.navigate(['/search/detalle', producto.id])
  }

  // ---- Pull to refresh: agrega un elemento aleatorio ----
  onRefresh(args: any): void {
    const pull = args.object
    setTimeout(() => {
      const nuevo = this.productosService.agregarAleatorio()
      this.filtrar(this.texto)
      pull.refreshing = false // ocultar el ícono de carga
      this.mostrarToast('Nuevo producto: ' + nuevo.nombre)
    }, 1000)
  }

  // ---- Diálogo "action" para elegir categoría + animación de ícono ----
  elegirCategoria(args: EventData, producto: Producto): void {
    this.bloquearNavegacion()
    const icono = args.object as View
    icono.animate({ rotate: 360, duration: 500 }).then(() => (icono.rotate = 0))

    Dialogs.action({
      title: 'Categoría de ' + producto.nombre,
      cancelButtonText: 'Cancelar',
      actions: this.categorias,
    }).then((opcion) => {
      if (opcion && opcion !== 'Cancelar') {
        producto.categoria = opcion // modifica el atributo del objeto
        this.filtrar(this.texto) // reasigna el arreglo para refrescar el ListView
        this.mostrarToast('Categoría cambiada a ' + opcion)
      }
    })
  }

  // ---- Gesto longPress sobre la estrella ----
  toggleFavorito(args: EventData, producto: Producto): void {
    this.bloquearNavegacion()
    const icono = args.object as View
    icono
      .animate({ scale: { x: 1.6, y: 1.6 }, duration: 200 })
      .then(() => icono.animate({ scale: { x: 1, y: 1 }, duration: 200 }))

    producto.favorito = !producto.favorito
    this.filtrar(this.texto)
    this.mostrarToast(producto.favorito ? 'Agregado a favoritos' : 'Quitado de favoritos')
  }

  // Evita que el tap de un ícono dispare también la navegación del itemTap
  private bloquearNavegacion(): void {
    this.navBloqueada = true
    setTimeout(() => (this.navBloqueada = false), 600)
  }

  private mostrarToast(texto: string): void {
    new Toasty({ text: texto, duration: ToastDuration.SHORT }).show()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
