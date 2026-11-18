import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { SearchDetalleComponent } from './search-detalle.component'
import { MinLenDirective } from './min-len.directive'

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, SearchRoutingModule],
  declarations: [SearchComponent, SearchDetalleComponent, MinLenDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
