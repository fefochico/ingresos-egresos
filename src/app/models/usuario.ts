export class Usuario{
    static fromFirebase(user:any): Usuario{
        return new Usuario(user.email, user.uid, user.nombre)
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){

    }
}