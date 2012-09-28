Ext.define('SV.store.Settings', {
    extend: 'Ext.data.Store',
    
    requires: ['Ext.data.proxy.LocalStorage'],
    
    config: {
        model: 'SV.model.Settings',

        proxy:{
            type:'localstorage',
            id:'settings'
        }
    }
});
