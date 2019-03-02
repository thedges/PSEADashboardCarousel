({
    getConfig : function(component) {
        var self = this;
        
        //////////////////////
        // setup apex query //
        //////////////////////
        var action = component.get("c.getConfig");
        
        action.setParams({
            "configId": component.get("v.configId")
        });
        
        /////////////////////
        // handle callback //
        /////////////////////
        action.setCallback(component, function(response) {
            if (response.getState() === 'SUCCESS') {
                var resp = response.getReturnValue();
                console.log('response=' + resp);
                component.set('v.config', JSON.parse(resp));
            }
            else
            {
                self.handleErrors(response.getError());
            }
        });
        
        $A.enqueueAction(action);
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
    }
})