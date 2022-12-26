import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MAIN_REDUCER } from './main.reducer';
import { AppEffects } from './store/app/app.effects';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { GameEffects } from './store/game/game.effects';
import { GameOverComponent } from './pages/game-over/game-over.component';
import { clearStateMetaReducer } from './store/meta-reducer';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GameOverComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(MAIN_REDUCER, { metaReducers:[clearStateMetaReducer] }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AppEffects,GameEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
