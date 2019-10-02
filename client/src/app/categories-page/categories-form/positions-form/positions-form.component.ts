import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal', {static: false}) modalRef: ElementRef
  @Input('categoryId') categoryId: string
  positions: Position[] = []
  loading = false
  modal: MaterialInstance

  constructor(private positionsService: PositionsService) { }

  ngOnInit() {
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.modal.open()
  }

  onAddPosition(){
    this.modal.open()
  }

  onCancel(){
    this.modal.close()
  }
}

