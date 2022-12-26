import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { GameOverComponent } from './pages/game-over/game-over.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'game',
    loadChildren: () =>
      import('./core/game/game.module').then((m) => m.GameModule),
  },
  { path: 'start', component: StartPageComponent},
  { path: 'game-over', component: GameOverComponent},
  {
    path: '**',
    redirectTo: 'start',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
