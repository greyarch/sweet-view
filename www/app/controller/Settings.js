Ext.define('SV.controller.Settings', {
    extend: 'Ext.app.Controller',
    
    requires: ['SV.view.SettingsForm', 'SV.store.Settings'],
 
    config: {
        control: {
            '#saveSettingsButton': {
                tap: 'saveSettings'
            },
            'settingsform': {
                show: 'fillForm'
            }
        }
    },
    
    fillForm: function(form, options) {
        var s = Ext.decode(localStorage.getItem('sweetview-settings'));
        if (s !== null) {
            var settings = Ext.create('SV.model.Settings', {
                url:s.url,
                username:s.username,
                password:s.password
            });
            form.setRecord(settings);
        } else form.setRecord(Ext.create('SV.model.Settings'));
    },

    saveSettings: function(button) {
        var settings = button.getParent().getValues();
        var saved = Ext.decode(localStorage.getItem('sweetview-settings'));
        var hashPass = CryptoJS.MD5(settings.password).toString();
        if (saved !== null) {
            hashPass = saved.password !== settings.password ? hashPass : saved.password;
        }
        var s = {
            url:settings.url, 
            username:settings.username, 
            password:hashPass
        };
        localStorage.setItem('sweetview-settings', Ext.encode(s));
        SV.app.showMainPanel();
    }
});