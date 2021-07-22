import { NgModule } from '@angular/core';
import { TreeModule } from '../tree.module';
import { TreeCompositionComponent } from './tree.composition';

@NgModule({
  declarations: [TreeCompositionComponent],
  imports: [TreeModule],
  bootstrap: [TreeCompositionComponent],
})
export class CompositionModule {}

