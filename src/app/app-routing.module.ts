import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { GameGuard } from './guards/game.guard';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'game',
    canLoad: [GameGuard],
    loadChildren: () =>
      import('./core/game/game.module').then((m) => m.GameModule),
  },
  { path: 'start', component: StartPageComponent },
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
