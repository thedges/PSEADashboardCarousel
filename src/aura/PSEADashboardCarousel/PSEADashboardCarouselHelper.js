({
    getConfig : function(component) {
        var self = this;
        
        //console.log('getConfig called...');
        var configId = component.get("v.configId");
        if (configId)
        {
        //////////////////////
        // setup apex query //
        //////////////////////
        var action = component.get("c.getConfig");
        
        action.setParams({
            "configId": configId
        });
        
        /////////////////////
        // handle callback //
        /////////////////////
        action.setCallback(component, $A.getCallback(function(response) {
            console.log('getConfig callback...');
            if (response.getState() === 'SUCCESS') {
                var resp = response.getReturnValue();
                console.log('response=' + resp);
                component.set('v.config', JSON.parse(resp));
            }
            else
            {
                self.handleErrors(component, response.getError());
            }
        }));
        
        $A.enqueueAction(action);
      }
    },
    handleErrors: function (component, errors) {
        var errorMsg;
        console.log('errors=' + JSON.stringify(errors));
        //this.hideSpinner(component);
        
        // Pass the error message if any
        if (errors && Array.isArray(errors) && errors.length > 0) {
            errorMsg = errors[0].message;
        } else {
            errorMsg = errors;
        }
        component.set("v.errorMsg", errorMsg);
        
    },
    showSpinner: function (component) {
        component.set('v.showSpinner', true);
    },
    hideSpinner: function (component) {
        component.set('v.showSpinner', false);
    },
    refresh: function (component, flkty) {
        flkty.destroy();
        var tmpconfig = component.get("v.config");
        component.set("v.config", null);
        component.set("v.rendered", false);
        component.set("v.config", tmpconfig);
    }
})