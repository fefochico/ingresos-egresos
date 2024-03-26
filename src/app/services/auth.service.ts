import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userSubcription!:Subscription;
  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) {}

  async initAuthListener(){
    this.afAuth.authState.subscribe((fuser)=>{
      if(fuser){
        this._userSubcription=this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()//Fumada del colega yo lo cogería del fuser
        .subscribe(firestoreUser=> {
          const user: Usuario= Usuario.fromFirebase(firestoreUser)
          this.store.dispatch(authActions.setUser({user}));
        })
      }else{
        this._userSubcription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
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
