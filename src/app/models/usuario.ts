export class Usuario{
    static fromFirebase(user:any): Usuario{
        return new Usuario(user.uid, user.nombre, user.email)
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ){

    }
}