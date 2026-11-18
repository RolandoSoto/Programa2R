import { platformNativeScript, registerElement, runNativeScriptAngularApp } from '@nativescript/angular'
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh'

import { AppModule } from './app/app.module'

// PullToRefresh es un plugin externo: hay que registrar su tag
registerElement('PullToRefresh', () => PullToRefresh)

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
})
