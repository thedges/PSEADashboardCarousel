({
	onInit: function (component, event, helper) {
		component.set('v.carouselColumns', [
			{ label: 'Name', fieldName: 'name', type: 'text' },
			{ label: 'Transition Interval (sec)', fieldName: 'transitionInterval', type: 'number' },
			{ label: 'Refresh Interval (min)', fieldName: 'refreshInterval', type: 'number' }
		]);

		component.set('v.itemColumns', [
			{ label: 'Dashboard Name', fieldName: 'dashboardName', type: 'text' },
			{ label: 'Page Name', fieldName: 'pageName', type: 'text' },
			{ label: 'Page ID', fieldName: 'pageId', type: 'text' }
		]);

		helper.getCarouselList(component);
		helper.getDashboardList(component);



	},
	onCarouselSelect: function (component, event, helper) {
		console.log('onCarouselSelect');
		var carouselList = component.get("v.carouselList");
		var carouselId = component.get("v.carouselId");
		carouselList.forEach(function (car) {
			if (car.id == carouselId) {
				component.set('v.carousel', car);
			}
		});

		helper.getItemList(component);
	},
	onItemSelect: function (component, event, helper) {
		console.log('onItemSelect');

		var itemList = component.get("v.itemList");
		var itemId = component.get("v.itemId");
		itemList.forEach(function (item) {
			if (item.id == itemId) {
				component.set('v.item', item);
			}
		});
	},
	onDashboardSelect: function (component, event, helper) {
		console.log('onDashboardSelect');


		var dashboardList = component.get("v.dashboardList");
		var item = component.get("v.item");
		//var dashboardName = component.get("v.dashboardName");
		dashboardList.forEach(function (db) {
			if (db.name == item.dashboardName) {
				item.dashboardLabel = db.label;
				component.set('v.item', item);
				component.set('v.dashboardId', db.id);
			}
		});

		helper.getPageList(component, component.get('v.dashboardId'));

	},
	onPageSelect: function (component, event, helper) {
		console.log('onPageSelect');


		var pageList = component.get("v.pageList");
		var item = component.get("v.item");

		pageList.forEach(function (pg) {
			if (pg.id == item.pageId) {
				item.pageLabel = pg.label;
				component.set('v.item', item);
				component.set('v.pageId', pg.id);
			}
		});
	},
	addCarousel: function (component, event, helper) {
		console.log('addCarousel');
		component.set("v.carousel", { "id": null, "name": null, "transitionInterval": null, "refreshInterval": null });
	},
	deleteCarousel: function (component, event, helper) {
		console.log('deleteCarousel');
	},
	upsertCarousel: function (component, event, helper) {
		console.log('upsertCarousel');
	},
	addItem: function (component, event, helper) {
		console.log('addItem');
		component.set("v.item", { "id": null, "dashboardName": null, "pageId": null, "filter": null });
	},
	deleteItem: function (component, event, helper) {
		console.log('deleteItem');
	},
	upsertItem: function (component, event, helper) {
		console.log('upsertItem');
	},
	onSelectChange: function (component, event, helper) {
		console.log('onSelectChange');
		var selectBox = component.find("selectBox");
		console.log('selectBox...');
		console.log('selectBox.selectedIndex=' + selectBox.selectedIndex);
		var selectedValue = selectBox.options[selectBox.selectedIndex].value;
		console.log('value=' + selectedValue);
	},
	handleCarouselAdd: function (component, event, helper) {
		component.set("v.carousel", { "id": null, "name": null, "transitionInterval": null, "refreshInterval": null });
		helper.clearItems(component);
		helper.showEditCarousel(component);
	},
	handleCarouselEdit: function (component, event, helper) {
		var carIndex = event.getSource().get("v.name");
		console.log('carIndex=' + carIndex);

		helper.setCarousel(component, carIndex);
		helper.showEditCarousel(component);
	},
	handleCarouselDelete: function (component, event, helper) {
		var carIndex = event.getSource().get("v.name");
		console.log('carIndex=' + carIndex);

		helper.setCarousel(component, carIndex);
		helper.showDeleteCarousel(component);
	},
	handleCarouselItems: function (component, event, helper) {
		var carIndex = event.getSource().get("v.name");
		console.log('carIndex=' + carIndex);

		helper.setCarousel(component, carIndex);
		//helper.getItemList(component);
	},
	handleCarouselRefresh: function (component, event, helper) {
		helper.getCarouselList(component, true, true);
	},
	closeCarouselModal: function (component, event, helper) {
		helper.hideEditCarousel(component);
	},
	saveCarouselModal: function (component, event, helper) {
		helper.saveCarousel(component);
	},
	handleItemAdd: function (component, event, helper) {
		component.set("v.item", { "id": null, "carouselId": component.get('v.carousel').id, "dashboardLabel": null, "dashboardName": null, "pageLabel": null, "pageId": null, "filter": null });
		component.set("v.pageList", null);
		component.set("v.pageId", null);
		helper.showEditItem(component);
	},
	handleItemEdit: function (component, event, helper) {
		var itemIndex = event.getSource().get("v.name");
		console.log('itemIndex=' + itemIndex);

		helper.setItem(component, itemIndex);
		helper.showEditItem(component);
	},
	handleItemDelete: function (component, event, helper) {
		var itemIndex = event.getSource().get("v.name");
		console.log('itemIndex=' + itemIndex);

		helper.setItem(component, itemIndex);
		helper.showDeleteItem(component);
	},
	handleItemUp: function (component, event, helper) {
		var startIdx = event.getSource().get("v.name");
		var itemList = component.get('v.itemList');
		console.log('startIdx=' + startIdx);

		if (startIdx != 0) {
			var tempItem = itemList[startIdx];
			itemList[startIdx] = itemList[startIdx - 1];
			itemList[startIdx - 1] = tempItem;
			component.set('v.itemList', itemList);

			helper.setItemOrder(component);
		}

	},
	handleItemDown: function (component, event, helper) {
		var startIdx = event.getSource().get("v.name");
		var itemList = component.get('v.itemList');
		console.log('startIdx=' + startIdx);

		if (startIdx != itemList.length - 1) {
			var tempItem = itemList[startIdx];
			itemList[startIdx] = itemList[startIdx + 1];
			itemList[startIdx + 1] = tempItem;
			component.set('v.itemList', itemList);

			helper.setItemOrder(component);
		}
	},
	handleItemSort: function (component, event, helper) {
		helper.setItemOrder(component);
	},
	closeItemModal: function (component, event, helper) {
		helper.hideEditItem(component);
	},
	saveItemModal: function (component, event, helper) {
		helper.saveItem(component, component.get("v.item"));
	},
	closeDeleteCarouselModal: function (component, event, helper) {
		helper.hideDeleteCarousel(component);
	},
	closeDeleteItemModal: function (component, event, helper) {
		helper.hideDeleteItem(component);
	},
	deleteItemModal: function (component, event, helper) {
		helper.deleteItem(component);
	},
	deleteCarouselModal: function (component, event, helper) {
		helper.deleteCarousel(component);
	}
})