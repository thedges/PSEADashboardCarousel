({
    jsLoaded: function (component, event, helper) {
        helper.getConfig(component);
    },
    onRender: function (component, event, helper) {
        console.log('onRender...');
        var config = component.get("v.config");
        
        var elem = document.getElementById('main-carousel');
        console.log('elem=' + elem);
        
        if (elem != null && !component.get('v.rendered')) {
            component.set('v.rendered', true);
            
            console.log('page is loaded');
            var ref = config.refreshInterval*1000;
            console.log('refreshInterval=' + ref);
            //var elem = document.getElementById('main-carousel');
            var flkty = new Flickity(elem, {
                "autoPlay": 15000,
                "pauseAutoPlayOnHover": false
            });
            
            if (window.location.pathname.startsWith('/apex')) component.set("v.fullscreen", true);
            
            component.set('v.flkty', flkty);
            window.flkty = flkty;
            
            flkty.on('settle', function (event, index) {
                flkty.options.autoPlay = ref;
                if (flkty.player.state === 'playing') {
                    component.set('v.playing', true);
                }
                else if (flkty.player.state === 'paused' || flkty.player.state === 'stopped') {
                    component.set('v.playing', false);
                }

                var indx = flkty.selectedIndex;
                console.log('settle indx=' + indx);
                var config = component.get('v.config');
                var item = config.items[indx];

                if (item.pageId != null)
                {
                    var evt = $A.get('e.wave:pageChange');
        
                    var evtParams = {};
                    evtParams['pageid'] = item.pageId;
                    evtParams['devName'] = item.dashboardName;
                    evt.setParams(evtParams);
                    evt.fire();
                }
            });
            
            flkty.on('select', function (event, index) {
                flkty.options.autoPlay = ref;
                if (flkty.player.state === 'playing') {
                    component.set('v.playing', true);
                }
                else if (flkty.player.state === 'paused' || flkty.player.state === 'stopped') {
                    component.set('v.playing', false);
                }
            });
        }
    },
    onLoad: function (component, event, helper) {
        console.log('onLoad...');
    },
    newWindow: function (component, event, helper) {
        var config = component.get("v.config");
        window.open('/apex/PSEADashboardCarouselVF?configId=' + config.configId, '_blank');
    },
    playPlayer: function (component, event, helper) {
        var flkty = component.get('v.flkty');
        window.flkty.playPlayer();
        component.set("v.playing", true);
    },
    stopPlayer: function (component, event, helper) {
        var flkty = component.get('v.flkty');
        window.flkty.pausePlayer();
        component.set("v.playing", false);
    },
    closeError: function (component, event, helper) {
        component.set('v.errorMsg', null);
    }
})