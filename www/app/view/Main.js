Ext.define('SV.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'mainpanel',
    requires: [
    'SV.view.EntryList',
    'SV.view.SettingsForm',
    'SV.store.Entries'
    ],

    config: {
        items: [{
            xtype: 'entrylist'
        }],
        autoDestroy: false,
        navigationBar: {
            items:[{
                xtype: 'button',
                id: 'settingsButton',
                text: 'Settings',
                align: 'right'
            }]
        } 
    }
});