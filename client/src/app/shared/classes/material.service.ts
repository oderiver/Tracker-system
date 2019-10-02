import {ElementRef} from "@angular/core";

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

  static initTooltip(ref: ElementRef) : MaterialInstance{
    return M.Tooltip.init(ref.nativeElement)
  }
}
