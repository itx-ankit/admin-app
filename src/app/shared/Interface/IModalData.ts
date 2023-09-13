import { TemplateRef } from '@angular/core';

export interface IModalData {
  modalName: string;
  componentToLoad: TemplateRef<any>;
  modalId?: Symbol;
  modalHeightVh?: number;
  modalWidthVw?: number;
}
