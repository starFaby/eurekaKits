import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CateproduService } from 'src/app/services/cateprodu.service';
import { Cateprod } from 'src/app/models/cateprod';

@Component({
  selector: 'app-clientcateprodu',
  templateUrl: './clientcateprodu.component.html',
  styleUrls: ['./clientcateprodu.component.scss']
})
export class ClientcateproduComponent implements OnInit {
  id: string;
  cateProd: Cateprod;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cateproduService: CateproduService) { }
  API_URI_IMAGE = this.cateproduService.API_URI_IMAGE;
  ngOnInit() {
    this.onGetCateProdu();
  }
  onGetCateProdu() {
    this.activatedRoute.params.subscribe(
      params => {
        this.id = params['id'];
        this.cateproduService.onGetProducto(this.id).subscribe(
          res => {
            if (Object.keys(res).length > 0) { // Object.keys(res) length
              this.cateProd = res;
            } else  {
              console.log('no datos 1');
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  onSelectedProducto(id: string) {
    this.router.navigate(['/clientProd', id]);
  }

}
