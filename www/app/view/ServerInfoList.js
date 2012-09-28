Ext.define('SV.view.ServerInfoList', {
    extend: 'Ext.List',
    xtype: 'serverinfolist',
    requires: ['SV.store.ServerInfoStore'],
    
    config: {
        title: 'Server System Info',
        itemTpl: '{flavor} | {version} | {gmt_time}',
        store: 'ServerInfoStore'
    }
});
