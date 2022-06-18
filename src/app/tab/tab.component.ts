/** @format */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tab } from './tab.interface';


@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements Tab {
	@Output() onClick: EventEmitter<void> = new EventEmitter<void>();
	@Input() title: string;
	public isActive: boolean = false;

	clickTabContent() {
		this.onClick.emit();
	}
}
