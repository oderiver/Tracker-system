import {ElementRef} from "@angular/core";
import {duration} from "moment";

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}
declare var M

export class MaterialService {
  static toast(message: string){
    M.toast({html: message})
  }

  static /*initializeFloatingButton*/initalizeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs(){
    M.updateTextFields()
  }

  static initModal(ref: ElementRef) : MaterialInstance{
    return M.Modal.init(ref.nativeElement)
  }
}
