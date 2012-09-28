Ext.define('SV.proxy.Login', {
    extend: 'Ext.data.proxy.Ajax',
    
    config: {
        url : 'http://crm5.qualityhouse.biz/service/v2/rest.php',
        model: 'SV.model.Entry',
        
        enablePagingParams: false,
        reader: {
            type: 'json'
        }
    }
});
