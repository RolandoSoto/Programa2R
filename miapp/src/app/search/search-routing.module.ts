import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'
import { SearchDetalleComponent } from './search-detalle.component'

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'detalle/:id', component: SearchDetalleComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}
