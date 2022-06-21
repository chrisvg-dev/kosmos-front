import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  URL = 'http://localhost:8080';
  doctores : any = [];
  listaConsultorio : any = [];
  citas : any = [];

  public paciente: string = '';
  public horario: string = '';
  public doctorId: number = 0;
  public consultorioId: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listarDoctores();
    this.listarConsultorios();
    this.listarCitas();
  }

  public listarDoctores() {
    this.http.get(this.URL + "/doctores").subscribe({
      next: resp => this.doctores = resp,
      error: resp => console.log(resp),
    });
  }

  public guardarCita() {
    this.http.post(this.URL + "/citas", {
      "doctorId": this.doctorId,
      "consultorioId": this.consultorioId,
      "horarioConsulta": this.horario,
      "nombrePaciente": this.paciente
  }).subscribe({
      next: resp => {this.listarCitas();},
      error: resp => console.log(resp)
    });
  }

  public listarCitas() {
    this.http.get(this.URL + "/citas").subscribe({
      next: resp => this.citas = resp,
      error: resp => console.log(this.citas),
    });
  }
  
  public listarConsultorios() {
    this.http.get(this.URL + "/consultorio").subscribe({
      next: resp => {
        this.listaConsultorio = resp;
        console.log(resp)
      },
      error: resp => console.log(resp),
    });
  }

  public eliminarCita(id: number) {
    this.http.delete(this.URL + "/citas/cita/"+id).subscribe({
      next: resp => {
        alert(resp)
        this.listarCitas();
      },
      error: resp => console.log(resp),
    });
  }
}
