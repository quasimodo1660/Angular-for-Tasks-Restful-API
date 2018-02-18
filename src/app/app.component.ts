import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  newTask={};
  tasks=[];
  task={};
  // showOne=false;
  title = 'Restful Tasks API';
  constructor(private _httpService:HttpService){}
  ngOnInit(){
    this.getTasksFromService();
    this.newTask={title:"",description:""};
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {console.log("Got our tasks!", data)
    this.tasks = data['tasks']
    });  
  }
  getTaskButtonClick(id){
    let observable = this._httpService.getTaskByID(id);
    observable.subscribe(data => {console.log("Got one task!", data)
    this.newTask={id:data['task'][0]._id,title:data['task'][0].title,description:data['task'][0].description} 
    });  
  }
  onSubmit(){
    console.log(this.newTask);
    if('id' in this.newTask){
      let id = this.newTask['id'];
      this._httpService.updateTask(id,this.newTask).subscribe(data=>{
        console.log(data);
      this.newTask={title:"",description:""}
      })
    }
    else{
      this._httpService.addOneTask(this.newTask).subscribe(data=>{
        console.log(data);
      this.newTask={title:"",description:""}
    });
    } 
    this.getTasksFromService();
  }
  deleteTask(id){
    this._httpService.removeTask(id).subscribe(data=>{
      console.log(data)
      this.getTasksFromService();
    });    
  }
}


