import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  URL = 'http://localhost:8080';
  @Input('data') data: any = [];
  @Output() emitter = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  

  emitirEvento(citaId: number) {
    this.emitter.emit({ 
      update: true, citaId: citaId 
    });
  }
}
