import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.scss']
})
export class PersonasComponent implements OnInit {
  baseURL = '127.0.0.1:8040/'
  personas =[
    {id:'1', nombre:'manuel', telefno:'4234234', email:'manuel@gmail.com'},
   
  ];
  nuevaPersona = new FormGroup({
    nombre:new FormControl(''),
    telefono:new FormControl(''),
    email :new FormControl('')
  })
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.recuperarDatos()
  }
  recuperarDatos(){
    this.http.get('personas')
    .subscribe(
      (response:any)=>{
        console.log('response received')
        console.log(response)
        this.personas = response.data;
      },
      (error)=>{
        console.error('Request failed width error')
        console.log(error)
      },
      ()=>{

      }
    )
  }
  agregarPersona(){
    this.http.post<any>(this.baseURL+'personas',{
      nombre:this.nuevaPersona.value.nombre,
     telefono :this.nuevaPersona.value.telefono,
      email:this.nuevaPersona.value.email,
      }).subscribe(res=>{
        console.log("res")
        console.log(res)
        this.recuperarDatos();
        

        },
        err=>{
          console.log(err)
        }
     ); 
    }

    actualizarPersona(personaModificar: any){
      this.http.put<any>(this.baseURL+'personas/'+personaModificar.id,{
        nombre:this.nuevaPersona.value.nombre,
       telefono :this.nuevaPersona.value.telefono,
        email:this.nuevaPersona.value.email,
        }).subscribe(res=>{
          console.log("res")
          console.log(res)
          this.recuperarDatos();
          
          },
          err=>{
            console.log(err)
          }
       ); 
      }

      deletePersona(personaModificar: any){
        this.http.delete<any>(this.baseURL+'personas/'+personaModificar.id,)
        .subscribe(res=>{
            console.log("res")
            console.log(res)
            this.recuperarDatos();
            },
            err=>{
              console.log(err)
            }
         ); 
        }
}
