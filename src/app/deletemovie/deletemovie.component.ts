import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {
  moviesDB: any[]=[];
  constructor(private dbService: DatabaseService, private router: Router) { }
  //get all movies
  onGetMovies(){
    console.log("From GetMovies");
    return this.dbService.getMovies().subscribe((data:any)=>{
      this.moviesDB=data;
    });
  }
  //delete movie
  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe((data:any)=>{
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }

  ngOnInit() {
    this.onGetMovies();
  }

}



  
  
  