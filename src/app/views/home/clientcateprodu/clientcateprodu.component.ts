import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CateproduService } from 'src/app/services/cateprodu.service';
import { Cateprod } from 'src/app/models/cateprod';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientcateprodu',
  templateUrl: './clientcateprodu.component.html',
  styleUrls: ['./clientcateprodu.component.scss']
})
export class ClientcateproduComponent implements OnInit {
  id: string;
  cateProd: Cateprod[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cateproduService: CateproduService,
    private toast: ToastrService) { }
  API_URI_IMAGE = this.cateproduService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetCateProdu();
  }
  onGetCateProdu() {
    this.activatedRoute.params.subscribe(
      params => {
        // tslint:disable-next-line:no-string-literal
        this.id = atob(params['id']);
        this.cateproduService.onGetProducto(this.id).subscribe(
          res => {
            if (res !== null) {
              this.cateProd = res;
            } else {
              this.toast.warning('warning', 'No se existe productos', {
                timeOut: 3000
              });
            }
          },
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 0) {
                this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
                  timeOut: 3000
                });
              }
            }
          }
        );
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.toast.error('Error', 'Servidor Caido: Consulte con el administrador', {
              timeOut: 3000
            });
          }
        }
      }
    );
  }

  onSelectedProducto(id: string) {
    this.router.navigate(['/clientProd', btoa(id)]);
  }

}
