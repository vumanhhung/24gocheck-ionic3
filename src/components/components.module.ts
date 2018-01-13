import { NgModule } from '@angular/core';
import { CoreComponent } from './core/core';
import { FrontSliderComponent } from './front-slider/front-slider';
@NgModule({
	declarations: [CoreComponent,
    FrontSliderComponent],
	imports: [],
	exports: [CoreComponent,
    FrontSliderComponent]
})
export class ComponentsModule {}
