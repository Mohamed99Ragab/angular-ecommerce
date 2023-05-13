import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/pages/home/home.component';
import { NotfoundComponent } from './website/pages/notfound/notfound.component';
import { ContactsComponent } from './website/pages/contacts/contacts.component';
import { AboutComponent } from './website/pages/about/about.component';

const routes: Routes = [
 
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'about',component:AboutComponent},
      {path:'contacts',component:ContactsComponent},

      {
        path: 'auth', 
        loadChildren: () => import('src/app/website/pages/auth/auth.module').then(m => m.AuthModule)
      },

      {
        path: '', 
        loadChildren: () => import('src/app/website/pages/products/products.module').then(m => m.ProductsModule)
      },

      {path:'**',component:NotfoundComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
