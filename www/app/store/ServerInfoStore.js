Ext.define('SV.store.ServerInfoStore', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'SV.model.ServerInfo',
        proxy: {
            type: 'ajax',
            url : 'http://crm5.qualityhouse.biz/service/v2/rest.php?get_server_info',
            extraParams: {
                input_type: 'JSON',
                response_type: 'JSON'
            },
            enablePagingParams: false,
            reader: {
                type: 'json'
            }
        },
        autoLoad: true
    }
});
