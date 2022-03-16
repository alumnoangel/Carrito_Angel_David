import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore,
    AngularFireStorage: AngularFireStorage) { }

  createDoc(data:any, path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data:any, path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
    return this.database.createId();
  }

  //Añado a getCollection <tipo> para indicarle el parametro de la coleccion que voy a tener,
  //en este caso un array que lo añado en set-productos.component.ts
  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }
}
