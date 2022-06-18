/** @format */
import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { TabComponent } from 'app/tab/tab.component';

import { Tab } from '../tab/tab.interface';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit, OnDestroy {
	@ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;
	private tabClickSubscriptions: any[] = [];

	ngAfterContentInit(): void {
		console.log(this.tabs);
		this.tabs.forEach((tab) => {
			let subscription = tab.onClick.subscribe(() => {
				console.log(`tab ${tab.title} content clicked`);
			});
			this.tabClickSubscriptions.push(subscription);
		});
		this.selectTab(this.tabs.first);
	}

	selectTab(tab: Tab): void {
		this.tabs.forEach((tab) => (tab.isActive = false));
		tab.isActive = true;
	}

	ngOnDestroy(): void {
		if (this.tabClickSubscriptions) {
			this.tabClickSubscriptions.forEach((item) => item.unsubscribe());
		}
	}
}
