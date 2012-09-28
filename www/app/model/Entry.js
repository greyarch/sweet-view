Ext.define('SV.model.Entry', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'module_name', 'name_value_list']
    },
    
    entryName: function() {
        var data = this.get('name_value_list');
        return data.name.value;
    },
    
    entryDescription: function() {
        var data = this.get('name_value_list');
        return data.description.value;
    },
    
    entryWebsite: function() {
        var data = this.get('name_value_list');
        return data.website.value;
    },
    
    entryId: function() {
        return this.get('id');
    }
});
