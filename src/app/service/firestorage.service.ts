import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public storage: AngularFireStorage) { }


  //Le indico que la promesa que voy a recibir es tipo string
  // uploadImage(file: any, path: string, nombre: string): Promise<string>{
  //   return new Promise(resolve =>{
  //     const filePath = path + '/' + nombre;
  //     const ref = this.storage.ref(filePath);
  //     const task = ref.put(file);
  //     resolve('Este es el enlace');
    
  //   });
  // }

  
  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(  resolve => {
        const filePath = path + '/' + nombre;
        //const ref = this.storage.ref(filePath);
        this.storage.upload(filePath, file);
        //const task = ref.put(file);
        resolve('Este es el enlace');
        
    });
}

  
}
