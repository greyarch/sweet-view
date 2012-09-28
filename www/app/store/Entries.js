Ext.define('SV.store.Entries', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'SV.model.Entry',
        proxy: {
            type: 'ajax',
            url: 'http://localhost',
            extraParams: {
                input_type: 'JSON',
                response_type: 'JSON',
                method: 'get_entry_list'
            },
            enablePagingParams: false,
            reader: {
                type: 'json',
                rootProperty: 'entry_list'
            }
        },
        grouper: {
            groupFn: function(record) {
                return record.data.name_value_list.name.value.substr(0, 1).toUpperCase();
            }
        },
        sorters: [
        {
            sorterFn: function(record1, record2) {
                var name1 = record1.data.name_value_list.name.value.toUpperCase(),
                    name2 = record2.data.name_value_list.name.value.toUpperCase();
                        
                return name1 > name2 ? 1 : (name1 == name2 ? 0 : -1);
            },
            direction: 'ASC'
        }
        ],
        listeners: {
            beforeload: function() {
                if (!SV.app.sessionId) {
                    SV.app.authenticate();
                }
                var loginInfo = Ext.decode(localStorage.getItem('sweetview-settings'));
                if (loginInfo !== null) {
                    var proxy = this.getProxy();
                    proxy.setUrl(loginInfo.url + '/service/v2/rest.php');
                    proxy.setExtraParam('rest_data', Ext.encode({
                        session:SV.app.sessionId,
                        module_name:'Accounts',
                        query:'',
                        order_by:'name',
                        offset:'0',
                        select_fields:['id', 'name'],
                        link_name_to_fields_array:[],
                        max_results:'1000000'
                    }));
                } else {
                    console.log("No connection settings.")
                    SV.app.showSettingsForm();
                }
            }
        }
    }
});
