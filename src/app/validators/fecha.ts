import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Fecha {
    dateExat() {
        const fecha = new Date();
        const mm = fecha.getMonth() + 1;
        const dd = fecha.getDate();
        const yyyy = fecha.getFullYear();
        const mm1 = this.addCero(mm);
        const dd1 = this.addCero(dd);
        const fechaHoy = `${mm1}/${dd1}/${yyyy}`;
        console.log(fechaHoy);
        return fechaHoy ;
    }
    dateExatParam(getFecha: any) {
        const fecha = new Date(getFecha);
        const mm = fecha.getMonth() + 1;
        const dd = fecha.getDate();
        const yyyy = fecha.getFullYear();
        const mm1 = this.addCero(mm);
        const dd1 = this.addCero(dd);
        const fechaHoy = `${mm1}/${dd1}/${yyyy}`;
        return fechaHoy ;
    }
    addCero(i: any) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
}
