import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';

const routes: Routes = [
  {path:'home',component:MainComponent},
  {path:'',pathMatch:'full', redirectTo:'home'},
  {path:'**',pathMatch:'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
