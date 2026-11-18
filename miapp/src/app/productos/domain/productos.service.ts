import { Injectable } from '@angular/core'
import { Producto } from './producto'

// providedIn: 'root' => servicio global, inyectado a nivel de la aplicación
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Camiseta', precio: 15, descripcion: 'Camiseta de algodón 100%.', categoria: 'Ropa', favorito: false },
    { id: 2, nombre: 'Zapatos', precio: 45, descripcion: 'Zapatos deportivos livianos.', categoria: 'Calzado', favorito: false },
    { id: 3, nombre: 'Gorra', precio: 10, descripcion: 'Gorra ajustable.', categoria: 'Accesorios', favorito: false },
    { id: 4, nombre: 'Mochila', precio: 30, descripcion: 'Mochila resistente al agua.', categoria: 'Accesorios', favorito: false },
  ]

  private nombresNuevos = ['Bufanda', 'Reloj', 'Lentes', 'Cinturón', 'Billetera', 'Audífonos', 'Sandalias', 'Chaqueta']
  private categorias = ['Ropa', 'Calzado', 'Accesorios']

  getAll(): Producto[] {
    return this.productos
  }

  getById(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id)
  }

  // Simula la respuesta de un servicio remoto (usado por pull to refresh)
  agregarAleatorio(): Producto {
    const id = Math.max(...this.productos.map((p) => p.id)) + 1
    const nombre = this.nombresNuevos[Math.floor(Math.random() * this.nombresNuevos.length)]
    const nuevo: Producto = {
      id,
      nombre,
      precio: Math.floor(Math.random() * 50) + 5,
      descripcion: 'Producto agregado al actualizar la lista.',
      categoria: this.categorias[Math.floor(Math.random() * this.categorias.length)],
      favorito: false,
    }
    this.productos.unshift(nuevo)
    return nuevo
  }
}
