import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutUsComponent},
  {path:'contact',component:ContactUsComponent}, 
  {path:'login',component:LoginComponent},
  //lazy loading of products and cart modules
  {
    path:'products',
    loadChildren:()=>import('./products/products.module').then((m)=>m.ProductsModule),
    
    },

  {
    path:'cart',
    loadChildren:()=>import('./cart/cart.module').then((m)=>m.CartModule),
    canActivate:[AuthGuard]
    },

   
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
