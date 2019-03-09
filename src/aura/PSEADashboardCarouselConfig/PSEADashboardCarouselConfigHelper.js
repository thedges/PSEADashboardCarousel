({
    getCarouselList: function (component, clearItems, clearCarousel) {
        var self = this;

        if (clearCarousel)
        {
           component.set("v.carousel", null);
        }

        if (clearItems)
        {
            self.clearItems(component);
        }

        //////////////////////
        // setup apex query //
        //////////////////////
        var action = component.get("c.getCarouselList");

        /////////////////////
        // handle callback //
        /////////////////////
        action.setCallback(component, $A.getCallback(function (response) {
            console.log('getCarouselList callback...');
            if (response.getState() === 'SUCCESS') {
                var resp = response.getReturnValue();
                console.log('response=' + resp);
                component.set('v.carouselList', JSON.parse(resp));
            }
            else {
                self.handleErrors(component, response.getError());
            }
        }));

        $A.enqueueAction(action);
    },
    getItemList: function (component) {
        var self = this;

        var carousel = component.get("v.carousel");
        console.log('carousel.id=' + carousel.id);
        if (carousel != null) {
            //////////////////////
            // setup apex query //
            //////////////////////
            var action = component.get("c.getItemList");
            action.setParams({
                "carouselId": carousel.id
            });

            /////////////////////
            // handle callback //
            /////////////////////
            action.setCallback(component, $A.getCallback(function (response) {
                console.log('getConfig callback...');
                if (response.getState() === 'SUCCESS') {
                    var resp = response.getReturnValue();
                    console.log('response=' + resp);
                    component.set('v.itemList', JSON.parse(resp));
                }
                else {
                    self.handleErrors(component, response.getError());
                }
            }));

            $A.enqueueAction(action);
        }
    },
    getDashboardList: function (component) {
        var self = this;
        var sdk = component.find("sdk");
        var context = { apiVersion: "44" };
        var methodName = "listDashboards";
        var methodParameters = {
            pageSize: 200
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function (err, data) {
            console.log('getDashboards=' + JSON.stringify(data));

            var dashboardList = [];
            data.dashboards.forEach(function (dashboard) {
                console.log('dashboard.label=' + dashboard.label);
                console.log('  > dashboard.name=' + dashboard.name);
                console.log('  > dashboard.id=' + dashboard.id);
                dashboardList.push({ "label": dashboard.label, "name": dashboard.name, "id": dashboard.id });
            });

            if (dashboardList != null) dashboardList.sort(function(a,b) 
            { if (a.label > b.label)
                {
                  return 1;
                } 
                else if (b.label > a.label)
                {
                  return -1;
                }
                {
                   return 0;
                }
            });
            
            console.log('dashboardList=' + JSON.stringify(dashboardList));
            component.set("v.dashboardList", dashboardList);

        }));
    },
    getPageList: function (component, dashboardId) {
        var sdk = component.find("sdk");

        var context = { apiVersion: "44" };
        var methodName = "describeDashboard";
        var methodParameters = {
            dashboardId: dashboardId
        };
        sdk.invokeMethod(context, methodName, methodParameters, $A.getCallback(function (err, data) {
            //console.warn('describeDashboard returned: ', err, data);
            if (err !== null) {
                console.error("describeDashboard error: ", err);
            } else {
                console.log('describeDashboard=' + JSON.stringify(data));

                var pageList = [];

                if (data.state && data.state.gridLayouts && data.state.gridLayouts[0] && data.state.gridLayouts[0].pages) {
                    data.state.gridLayouts[0].pages.forEach(function (page) {
                        if (page.label && page.label != 'Untitled') {
                            pageList.push({ "label": page.label, "id": page.name });
                        }
                    });
                }
                
                
                if (pageList != null) pageList.sort(function(a,b) 
                { if (a.label > b.label)
                    {
                      return 1;
                    } 
                    else if (b.label > a.label)
                    {
                      return -1;
                    }
                    {
                       return 0;
                    }
                });
                
                console.log('pageList=' + JSON.stringify(pageList));
                component.set("v.pageList", pageList);
            }
        }));
    },
    saveCarousel: function (component) {
        var self = this;

        var carousel = component.get("v.carousel");

        if (carousel != null) {
            console.log('carousel=' + JSON.stringify(carousel));

            //////////////////////
            // setup apex query //
            //////////////////////
            var action = component.get("c.saveCarousel");
            action.setParams({
                "carousel": JSON.stringify(carousel)
            });

            /////////////////////
            // handle callback //
            /////////////////////
            action.setCallback(component, $A.getCallback(function (response) {
                console.log('saveCarousel callback...');
                if (response.getState() === 'SUCCESS') {
                    var resp = response.getReturnValue();
                    console.log('response=' + resp);
                    component.set("v.carousel", JSON.parse(resp));
                    self.hideEditCarousel(component);
                    self.getCarouselList(component, true, false);
                }
                else {
                    self.handleErrors(component, response.getError());
                }
            }));

            $A.enqueueAction(action);
        }
    },
    deleteCarousel: function (component) {
        var self = this;

        var carousel = component.get("v.carousel");

        if (carousel != null) {
            //////////////////////
            // setup apex query //
            //////////////////////
            var action = component.get("c.delCarousel");
            action.setParams({
                "carouselId": carousel.id
            });

            /////////////////////
            // handle callback //
            /////////////////////
            action.setCallback(component, $A.getCallback(function (response) {
                console.log('deleteCarousel callback...');
                if (response.getState() === 'SUCCESS') {
                    self.hideDeleteCarousel(component);
                    component.set("v.carousel", null);
                    self.getCarouselList(component, true);
                }
                else {
                    self.handleErrors(component, response.getError());
                }
            }));

            $A.enqueueAction(action);
        }
    },
    saveItem: function (component, item) {
        var self = this;

        if (item != null) {
            var itemList = component.get("v.itemList");
            if (itemList != null && item.order == null) item.order = itemList.length+1;
            console.log('item=' + JSON.stringify(item));

            //////////////////////
            // setup apex query //
            //////////////////////
            var action = component.get("c.saveItem");
            action.setParams({
                "item": JSON.stringify(item)
            });

            /////////////////////
            // handle callback //
            /////////////////////
            action.setCallback(component, $A.getCallback(function (response) {
                console.log('saveItem callback...');
                if (response.getState() === 'SUCCESS') {
                    self.hideEditItem(component);
                    self.getItemList(component);
                }
                else {
                    self.handleErrors(component, response.getError());
                }
            }));

            $A.enqueueAction(action);
        }
    },
    deleteItem: function (component) {
        var self = this;

        var item = component.get("v.item");

        if (item != null) {
            //////////////////////
            // setup apex query //
            //////////////////////
            var action = component.get("c.delItem");
            action.setParams({
                "itemId": item.id
            });

            /////////////////////
            // handle callback //
            /////////////////////
            action.setCallback(component, $A.getCallback(function (response) {
                console.log('deleteItem callback...');
                if (response.getState() === 'SUCCESS') {
                    var resp = response.getReturnValue();
                    console.log('response=' + resp);
                    self.hideDeleteItem(component);
                    self.getItemList(component);
                }
                else {
                    self.handleErrors(component, response.getError());
                }
            }));

            $A.enqueueAction(action);
        }
    },
    setItemOrder: function (component) {
        //////////////////////////////////
        // set the order of items first //
        //////////////////////////////////
        var itemList = component.get('v.itemList');
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].order = i + 1;
        }
        component.set("v.itemList", itemList);

        //////////////////////
        // setup apex query //
        //////////////////////
        var action = component.get("c.setItemOrder");
        action.setParams({
            "items": JSON.stringify(itemList)
        });

        /////////////////////
        // handle callback //
        /////////////////////
        action.setCallback(component, $A.getCallback(function (response) {
            console.log('setItemOrder callback...');
            if (response.getState() === 'SUCCESS') {
                console.log('items order has been set');
            }
            else {
                self.handleErrors(component, response.getError());
            }
        }));

        $A.enqueueAction(action);
    },
    handleErrors: function (component, errors) {
        let toastParams = {
            title: "Error!",
            message: "Unknown error", // Default error message
            type: "error",
            mode: "sticky"
        };


        // Pass the error message if any
        if (errors && Array.isArray(errors) && errors.length > 0) {
            toastParams.message = errors[0].message;
        }
        else {
            toastParams.message = errors;
        }

        // Fire error toast
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },
    showSpinner: function (component) {
        component.set('v.showSpinner', true);
    },
    hideSpinner: function (component) {
        component.set('v.showSpinner', false);
    },
    clearItems: function (component) {
        component.set('v.itemList', null);
        component.set('v.item', null);
        component.set('v.itemId', null);
    },
    setCarousel: function (component, carIndex) {
        var self = this;
        var carouselList = component.get("v.carouselList");

        component.set('v.carousel', carouselList[carIndex]);
        component.set('v.carouselId', carouselList[carIndex].id);
        self.getItemList(component);

        /*
        carouselList.forEach(function (car) {
            if (car.id == carId) {
                component.set('v.carousel', car);
                component.set('v.carouselId', carId);
                self.getItemList(component);
            }
        });
        */

    },
    showEditCarousel: function (component) {
        component.set("v.isEditCarousel", true);
    },
    hideEditCarousel: function (component) {
        component.set("v.isEditCarousel", false);
    },
    setItem: function (component, itemIndex) {
        var self = this;
        var itemList = component.get("v.itemList");

        component.set("v.pageList", null);
		component.set("v.pageId", null);
        
        component.set("v.item", itemList[itemIndex]);
        component.set("v.dashboardName", null);
        
        if (itemList[itemIndex].pageId != null)
        {
            self.getPageList(component, itemList[itemIndex].dashboardName);
        }

        /*
        var itemList = component.get("v.itemList");
        itemList.forEach(function (item) {
            if (item.id == itemId) {
                console.log('setting item=' + JSON.stringify(item));
                component.set('v.item', item);
            }
        });
        */
    },
    showEditItem: function (component) {
        component.set("v.isEditItem", true);
    },
    hideEditItem: function (component) {
        component.set("v.isEditItem", false);
    },
    showDeleteCarousel: function (component) {
        component.set("v.isDeleteCarousel", true);
    },
    hideDeleteCarousel: function (component) {
        component.set("v.isDeleteCarousel", false);
    },
    showDeleteItem: function (component) {
        component.set("v.isDeleteItem", true);
    },
    hideDeleteItem: function (component) {
        component.set("v.isDeleteItem", false);
    }
})