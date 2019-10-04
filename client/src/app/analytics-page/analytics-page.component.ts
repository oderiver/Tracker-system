// import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
// import {AnalyticsService} from "../shared/services/analytics.service";
// import {AnalyticsPage} from "../shared/interfaces";
// import {Chart} from 'chart.js'
// import {Subscription} from "rxjs";
//
// @Component({
//   selector: 'app-analytics-page',
//   templateUrl: './analytics-page.component.html',
//   styleUrls: ['./analytics-page.component.css']
// })
// export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
//
//   @ViewChild('gain', {static: false}) gainRef: ElementRef
//   @ViewChild('order', {static: true}) orderRef: ElementRef
//
//   aSub: Subscription
//   average: number
//   pending = true
//
//   constructor(private service: AnalyticsService) { }
//
//   ngAfterViewInit(){
//     this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
//       this.average = data.average
//
//       this.pending = false
//     })
//   }
//
//   ngOnDestroy() {
//     if(this.aSub){
//       this.aSub.unsubscribe()
//     }
//   }
// }

import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {Chart} from 'chart.js'
import {AnalyticsService} from '../shared/services/analytics.service'
import {Subscription} from "rxjs";
import {AnalyticsPage} from "../shared/interfaces";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  [x: string]: any;

  @ViewChild('gain', {static: false}) gainRef: ElementRef
  @ViewChild('order', {static: false}) orderRef: ElementRef

  aSub: Subscription
  average: number
  pending = true

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    //this.analyticsService.fetchAnalytics().subscribe((data: AnalyticsPage) => {
    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map(i => i.label)
      gainConfig.data = data.chart.map(i => i.gain)

      orderConfig.labels = data.chart.map(i => i.label)
      orderConfig.data = data.chart.map(i => i.order)

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = 300 + 'px'
      orderCtx.canvas.height = 300 + 'px'
      new Chart(gainCtx, createConfig(gainConfig))
      new Chart(orderCtx, createConfig(orderConfig))

      this.pending = false
    })
  }
  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }
}

function createConfig({labels, data, label, color, title}) {
  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          steppedLine: false,
          data: data,
          borderColor: color,
          fill: false
        }
      ]
    },
    options: {
      responsive: true
    }
  }
}
