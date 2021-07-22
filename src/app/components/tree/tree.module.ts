import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
@NgModule({
  declarations: [
    TreeComponent,
  ],
  imports: [
    MatTreeModule
  ],
  exports: [
    TreeComponent,
  ]
})
export class TreeModule {}