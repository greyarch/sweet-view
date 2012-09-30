Ext.application({
    name: 'SV',

    controllers: ['Main', 'Settings'],
    views: ['Main', 'SettingsForm'],
    stores: ['Entries', 'Settings'],
    models: ['Entry', 'Settings'],
    requires: ['SV.proxy.Login', 'SV.store.Settings','Ext.MessageBox'],
    
    viewport: {
        autoMaximize: true,
        masked: {
            xtype: 'loadmask',
            message: 'Loging in'
        }
    },
    
    launch: function() {
        Ext.Viewport.add([{xtype: 'mainpanel'}]);
        Ext.Viewport.add([{xtype: 'settingsform'}]);
        this.authenticate();
    },
    
    sessionId: '',
    
    authenticate: function() {
        var sv = this;
        var loginInfo = Ext.decode(localStorage.getItem('sweetview-settings'));
        if (sv.sessionId) {
            console.log("success, id is " + SV.app.sessionId);
        } else {
            Ext.Viewport.setMasked(true);
            console.log("no id yet, authenticating");
            if (loginInfo !== null) {
                sv.makeRequest('login', {
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
                        sv.sessionId = obj.id;
                    } else {
                        Ext.Msg.alert(obj.name, obj.description, Ext.emptyFn);
                        console.log(obj.name + " : " + obj.description);
                        sv.sessionId = 0;
                    }
                }, function(response, opts) {
                    Ext.Msg.alert('Server side failure', 'Status code ' + response.status, Ext.emptyFn);
                    console.log('Server side failure with status code ' + response.status);
                    sv.sessionId = 0;
                }, false);
            } else {
                Ext.Msg.alert('Settings', 'Please, configure the application.', Ext.emptyFn);
                console.log("No connection settings.")
                sv.showSettingsForm();
            }
            Ext.Viewport.setMasked(false);
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