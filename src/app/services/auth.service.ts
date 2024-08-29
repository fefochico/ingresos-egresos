import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription, map } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../shared/redux/auth.actions';
import * as ingresoEgresoAccions from '../shared/redux/ingreso-egreso.actions';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private _userSubcription!:Subscription;
  private _user: Usuario | null=null;

  get user(){
    return this._user;
  }

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) {}

  ngOnDestroy(): void {
    this._user=null;
    this._userSubcription?.unsubscribe();
    this.store.dispatch(authActions.unSetUser());
    this.store.dispatch(ingresoEgresoAccions.unSetItem())
  }

  async initAuthListener(){
    this.afAuth.authState.subscribe((fuser)=>{
      if(fuser){
        this._userSubcription=this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()//Fumada del colega yo lo cogería del fuser
        .subscribe(firestoreUser=> {
          const user: Usuario= Usuario.fromFirebase(firestoreUser)
          console.log(Usuario.fromFirebase(firestoreUser));
          this._user= user;
          this.store.dispatch(authActions.setUser({user}));
          this.store.dispatch(ingresoEgresoAccions.unSetItem());
        })
      }else{
        this._user=null;
        this._userSubcription?.unsubscribe();
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
