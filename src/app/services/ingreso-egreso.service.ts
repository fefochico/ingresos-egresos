import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const user = this.authService.user;
    return this.firestore.doc(`/${user!.uid}/ingresos-egresos`, )
    .collection('items')
    .add({cantidad: ingresoEgreso.cantidad, descripcion: ingresoEgreso.descripcion, tipo: ingresoEgreso.tipo})
    .then(ref => console.log('exito',ref))
    .catch(err => console.warn(err));
  }

  initIngresosEgresosListener(uid: string){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc =>{
          const data: any= doc.payload.doc.data();
          return {
            uid: doc.payload.doc.id,
            ...data
          }
        })
      })
    )
  }

  borrarIngresoEgreso(uidItem: string){
    const uid= this.authService.user!.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
