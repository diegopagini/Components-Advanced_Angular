/** @format */
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';


@Component({
	selector: 'app-display',
	templateUrl: 'display.component.html',
	styleUrls: ['./display.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnChanges {
	@Input() time: number = null;
	public minutes: string = '00';
	public seconds: string = '00';

	ngOnChanges(changes) {
		if (changes.time) {
			const minutes = Math.trunc(changes.time.currentValue / 60);
			const seconds = changes.time.currentValue - minutes * 60;
			this.minutes = ('0' + minutes).substr(-2);
			this.seconds = ('0' + seconds).substr(-2);
		}
	}
}
