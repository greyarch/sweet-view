Ext.define('SV.view.EntryDetail', {
    extend: 'Ext.Panel',
    xtype: 'entrydetail',

    config: {
        title: 'Details',
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: [
        '<p>{account.description.value}</p>',
        '<p>{account.website.value}</p>',
        '<p><strong>Contacts</strong></br>',
        '<tpl for="contacts">',
        '<tpl if="first_name">Name: {first_name.value}</tpl>',
        '<tpl if="last_name">{last_name.value}<br/></tpl>',
        '<tpl if="phone_work">Phone work: {phone_work.value}<br/></tpl>',
        '<tpl if="phone_mobile">Phone mobile: {phone_mobile.value}<br/></tpl>',
        '<p/>',
        '</tpl>'
        ]
    }
});
