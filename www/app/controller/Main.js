Ext.define('SV.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: ['SV.view.EntryDetail', 'SV.store.Entries'],

    config: {
        refs: {
            main: 'mainpanel',
            settings: '#settingsButton',
            entries: 'entrylist'
        },
        control: {
            entries: {
                disclose: 'showDetail'
            },
            main: {
                activate: function(main) {
                    var loginInfo = Ext.decode(localStorage.getItem('sweetview-settings'));
                    if (loginInfo == null) {
                        SV.app.showSettingsForm();
                    } else {
                        Ext.getStore('Entries').load();
                    }
                }
            },
            settings: {
                tap: function() {
                    SV.app.showSettingsForm();
                }
            }
        }
    },

    showDetail: function(list, record) {
        var main = this.getMain();
        this.getEntries().setMasked({
            xtype: 'loadmask',
            message: 'Loading...'
        });
        SV.app.makeRequest('get_entry_list', {
            session: SV.app.sessionId,
            module_name:'Accounts',
            query:"accounts.id='" + record.entryId() + "'",
            order_by:'name',
            offset:'0',
            select_fields:['id', 'name', 'description', 'website'],
            link_name_to_fields_array:[{
                name:'contacts', 
                value:['id', 'first_name', 'last_name', 
                'email1', 'email2', 'phone_home',
                'phone_work', 'phone_mobile']
            }],
            max_results:''
        },
        function(response, opts){
            main.setMasked(false);
            var obj = Ext.decode(response.responseText);
            if(obj.entry_list[0].id) {
                main.push({
                    xtype: 'entrydetail',
                    title: obj.entry_list[0].name_value_list.name.value,
                    data: {
                        account: obj.entry_list[0].name_value_list,
                        contacts: obj.relationship_list[0][0].records
                    }
                })
            } else {
                Ext.Msg.alert(obj.name, obj.description, Ext.emptyFn);
                console.log(obj.name + " : " + obj.description);
            }
        }, 
        function(response, opts){
            main.setMasked(false);
            Ext.Msg.alert('Server side failure', 'Status code ' + response.status, Ext.emptyFn);
        });
    }
});
