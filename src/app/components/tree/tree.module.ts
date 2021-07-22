import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    TreeComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule
  ],
  exports: [
    TreeComponent,
  ]
})
export class TreeModule {}