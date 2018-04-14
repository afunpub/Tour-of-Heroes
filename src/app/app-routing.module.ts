import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
const routes: Routes = [
  // {path: '', component: HeroesComponent}, // 這樣即使沒加/heroes路徑也可以顯示網頁
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailComponent },
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  /* imports: [
    CommonModule
  ],
  declarations: []
  router服務用不到 CommonModule,declarations所以注記掉*/
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot( routes )
  ],
})
export class AppRoutingModule { }
