Ext.application({
    name: 'SV',

    controllers: ['Main', 'Settings'],
    views: ['Main', 'SettingsForm'],
    stores: ['Entries', 'Settings'],
    models: ['Entry', 'Settings'],
    requires: ['SV.proxy.Login', 'SV.store.Settings','Ext.MessageBox'],
    
    viewport: {
        autoMaximize: true
    },
    
    launch: function() {
        Ext.Viewport.add([{
            xtype: 'mainpanel'
        }, {
            xtype: 'settingsform'
        }]);
    },
    
    sessionId: '',
    
    authenticate: function() {
        var loginInfo = Ext.decode(localStorage.getItem('sweetview-settings'));
        if (SV.app.sessionId) {
            console.log("success, id is " + SV.app.sessionId);
        } else {
            console.log("no id yet, authenticating");
            if (loginInfo !== null) {
                SV.app.makeRequest('login', {
                    user_auth:{
                        user_name:loginInfo.username, 
                        password:loginInfo.password,
                        version:'.01'
                    },
                    application_name:'sweetview'
                }, function(response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.id) {
                        console.log("Login successfull, session id is " + obj.id);
                        SV.app.sessionId = obj.id;
                    } else {
                        Ext.Msg.alert(obj.name, obj.description, Ext.emptyFn);
                        console.log(obj.name + " : " + obj.description);
                        SV.app.sessionId = 0;
                    }
                }, function(response, opts) {
                    Ext.Msg.alert('Server side failure', 'Status code ' + response.status, Ext.emptyFn);
                    console.log('Server side failure with status code ' + response.status);
                    SV.app.sessionId = 0;
                }, false);
            } else {
                Ext.Msg.alert('Settings', 'You need to configure the application for first use.', Ext.emptyFn);
                console.log("No connection settings.")
                SV.app.showSettingsForm();
            }
        }
    },
    
    makeRequest: function(method, rdata, onSuccess, onFailure, async) {
        var loginInfo = Ext.decode(localStorage.getItem('sweetview-settings'));
        Ext.Ajax.request({
            method: 'GET',
            url : loginInfo.url + '/service/v2/rest.php',
            params: {
                input_type: 'JSON',
                response_type: 'JSON',
                method: method,
                rest_data: Ext.encode(rdata)
            },
            success: onSuccess,
            failure: onFailure,
            async: typeof async !== 'undefined' ? async : true
        });
    },
    
    showSettingsForm: function() {
        Ext.Viewport.setActiveItem(1);
    },

    showMainPanel: function() {
        Ext.Viewport.setActiveItem(0);
    }
});