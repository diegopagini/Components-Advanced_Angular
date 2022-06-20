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
	// @ContentChild(TabComponent) tab: TabComponent; "ContenChild" permite acceder al componente que se esté utilizando como hijo de este
	// utilizando que se esté mostrando por el content projection. (ng-content). ContenChild solo permite acceder a un componente hijo,
	// si hubiera mas de uno se quedaria solo con el primero
	@ContentChildren(TabComponent) public tabs: QueryList<TabComponent>; // ContenChildren es como ContenChild pero permite acceder a un
	// array de componentes.
	private tabClickSubscriptions: any[] = [];

	ngAfterContentInit(): void {
		// Si se utiliza un ContenChild o ContenChildren es necesesario utilizarlos solo luego del ciclo de vida
		// ngAfterContentInit
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
