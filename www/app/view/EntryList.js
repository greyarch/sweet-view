Ext.define('SV.view.EntryList', {
    extend: 'Ext.List',
    xtype: 'entrylist',
    requires: ['SV.store.Entries'],
    
    config: {
        title: 'Accounts',
        itemTpl: '{name_value_list.name.value}',
        store: 'Entries',
//        onItemDisclosure: true,
        grouped: true,
        indexBar: true
    }
});
