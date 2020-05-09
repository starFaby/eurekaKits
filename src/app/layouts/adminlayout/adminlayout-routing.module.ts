import { Routes } from '@angular/router';
import { StartComponent } from 'src/app/views/start/start.component';
import { ProductosComponent } from 'src/app/views/admin/productos/productos.component';
import { CategoriaComponent } from 'src/app/views/admin/categoria/categoria.component';
import { CategorialistComponent } from 'src/app/views/admin/categoria/categorialist/categorialist.component';
import { ProductolistComponent } from 'src/app/views/admin/productos/productolist/productolist.component';
import { ClientcategoriaComponent } from 'src/app/views/home/clientcategoria/clientcategoria.component';
import { ClientcateproduComponent } from 'src/app/views/home/clientcateprodu/clientcateprodu.component';
import { ClientprodComponent } from 'src/app/views/home/clientprod/clientprod.component';
import { NoproductComponent } from 'src/app/views/noproduct/noproduct.component';
import { CanastaComponent } from 'src/app/views/home/canasta/canasta.component';
import { ClientpersonformComponent } from 'src/app/views/home/clientpersonform/clientpersonform.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { PromocionComponent } from 'src/app/views/admin/promocion/promocion.component';
import { ClientformapagoComponent } from 'src/app/views/home/clientformapago/clientformapago.component';
import { ClientpromoComponent } from 'src/app/views/home/clientpromo/clientpromo.component';
import { ClientfacturasptbeComponent } from 'src/app/views/home/clientfacturasptbe/clientfacturasptbe.component';

export const AdminlayoutRoutingModule: Routes = [
    {path: '' , component: StartComponent},
    {path: 'productos' , component: ProductosComponent},
    {path: 'categorias' , component: CategoriaComponent},
    {path: 'categoriaList' , component: CategorialistComponent},
    {path: 'productoList' , component: ProductolistComponent},
    {path: 'clientCategoriaoList' , component: ClientcategoriaComponent},
    {path: 'clientCateprodu/:id' , component: ClientcateproduComponent},
    {path: 'clientProd/:id' , component: ClientprodComponent},
    {path: 'noProduct' , component: NoproductComponent},
    {path: 'canasta' , component: CanastaComponent, canActivate: [AuthGuard]},
    {path: 'registForm' , component: ClientpersonformComponent},
    {path: 'login' , component: LoginComponent},
    {path: 'promo' , component: PromocionComponent},
    {path: 'promoList' , component: PromocionComponent},
    {path: 'formaPago' , component: ClientformapagoComponent, canActivate: [AuthGuard]},
    {path: 'clientPromo/:id' , component: ClientpromoComponent},
    {path: 'clientFacturasptbe' , component: ClientfacturasptbeComponent}
];
