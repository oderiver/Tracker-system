import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain', {static: false}) gainRef: ElementRef
  @ViewChild('order', {static: true}) orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit(){
    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      this.pending = false
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
}
