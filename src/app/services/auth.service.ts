import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) {}

  async initAuthListener(){
    this.afAuth.authState.subscribe((fuser)=>{
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email)
    })

  }

  crearUsuario(nombre: string, email: string, password: string){

    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(({user})=>{
      const newUser= new Usuario(user?.uid!, nombre, user?.email!);
      return this.firestore.doc(`${user?.uid}/usuario`)
      .set({...newUser})
    })
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.signOut();
  }

  isAuth():Observable<boolean>{
    return this.afAuth.authState.pipe(
      map(fUser=>fUser!=null)
    )
  }
}
