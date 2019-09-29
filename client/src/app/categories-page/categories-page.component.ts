import { Component, OnInit } from '@angular/core';
import {CategoriesServices} from "../shared/services/categories.services";
import {Category} from "../shared/interfaces";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false
  categories: Category[] = []

  constructor(private categoriesService: CategoriesServices) {

  }

  ngOnInit() {
    this.loading = true
    this.categoriesService.fetch().subscribe(categories => {
      this.loading = false
      this.categories = categories
      console.log('Categories', categories)
    })
  }

}
