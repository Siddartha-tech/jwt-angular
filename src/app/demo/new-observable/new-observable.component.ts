import { Component, OnInit } from '@angular/core';
import { first, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-new-observable',
  templateUrl: './new-observable.component.html',
  styleUrls: ['./new-observable.component.css']
})
export class NewObservableComponent implements OnInit {

  demo: number[] = [];
  constructor() { 
  }

  ngOnInit(): void {
    const newObservable = new Observable(observer => {
      for (let index = 0; index < 5; index++) {
        observer.next(index);
        this.demo.push(index);
      }
      observer.complete();
    });

    

    newObservable.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error),
      complete: () => console.log('complete')
    });
    this.fetchValuesAsSubcription();
  }

  getItemAsObservable(): Observable<number[]> {
    return of(this.demo);
  }

  fetchValuesAsSubcription() {
    // this.getItemAsObservable().pipe(map(data => {
    //   console.log(`log from method ${data}`);
    // }));
    this.getItemAsObservable().pipe(first()).subscribe({
      next: (data) => console.log(`log from method ${data}`),
      error: (error) => console.log(`log from method error ${error}`),
      complete: () => console.log("log from method complete")
    });
  }

}
