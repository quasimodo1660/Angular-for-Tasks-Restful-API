import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tasks=[];
  task={};
  showOne=false;
  title = 'Restful Tasks API';
  constructor(private _httpService:HttpService){}
  ngOnInit(){
    // this.getTasksFromService();
    console.log(task.length)
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {console.log("Got our tasks!", data)
    this.tasks = data['tasks']
    });  
  }
  getAllButtonClick():void{
    this.getTasksFromService();
    
  }
  getTaskFromID(id){
    let observable = this._httpService.getTaskByID(id);
    observable.subscribe(data => {console.log("Got one task!", data)
    this.task = data['task'][0]
    this.showOne=true;
    });  
  }
  getTaskButtonClick(id){
    this.getTaskFromID(id);
  }
}


