import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dtoformvali } from 'src/app/validators/dtoformvali';
import { MatDialogRef } from '@angular/material';
import { Dto } from 'src/app/models/dto';
import { DtoService } from 'src/app/services/dto.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dtoform',
  templateUrl: './dtoform.component.html',
  styleUrls: ['./dtoform.component.scss']
})
export class DtoformComponent implements OnInit {
  formDto: FormGroup;
  constructor(
    private dtoformvali: Dtoformvali,
    private matDialogRef: MatDialogRef<DtoformComponent>,
    private dtoService: DtoService,
    private toast: ToastrService
  ) {
    this.formDto = this.dtoformvali.formDto;
   }

  ngOnInit() {
  }
  onSubmit() {
    if (this.formDto.valid) {
      if (this.formDto.get('iddto').value == null) {
        const newDto: Dto = {
          dto: this.formDto.get('dto').value,
          estado: this.formDto.get('estado').value
        };
      } else {
        const iddto = this.formDto.get('iddto').value;
        const newDto: Dto = {
          dto: this.formDto.get('dto').value,
          estado: this.formDto.get('estado').value
        };
        this.dtoService.onUpdateCategoria(iddto, newDto).subscribe(
          res => {
            console.log(res);
            this.toast.success('Exito', 'Descuento Actualizado', {
              timeOut: 3000
            });
            this.onCloseDtoForm();
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
        this.onCloseDtoForm();
      }
    }
  }
  onCloseDtoForm() {
    this.formDto.reset();
    this.dtoformvali.oninitializeFomrGroup();
    this.matDialogRef.close();
  }

}
