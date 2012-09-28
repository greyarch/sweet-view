Ext.define('SV.view.SettingsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'settingsform',
    requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.field.Password', 'Ext.field.Url', 'Ext.Button'],
    
    config: {
        title: 'Login Settings',
        scroll : 'vertical',
        items: [
        {
            xtype: 'button',
            id: 'saveSettingsButton',
            text: 'Save',
            ui: 'confirm'
        },
        {
            xtype: 'fieldset',
            instructions: 'What is the URL of your SugarCRM installation',
            title: 'Connection settings',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '40%'
            },
            items: [
            {
                xtype: 'urlfield',
                name : 'url',
                label: 'SugarCRM URL',
                placeHolder: 'http://www.mysugarcrm.com'
            }]
        },
        {
            xtype: 'fieldset',
            title: 'Authentication settings',
            instructions: 'Please enter your credentials',
            defaults: {
                required: true,
                labelAlign: 'left',
                labelWidth: '40%'
            },
            items: [
            {
                xtype: 'textfield',
                name : 'username',
                label: 'User name',
                placeHolder: 'username'
            }, {
                xtype: 'passwordfield',
                name : 'password',
                label: 'Password'
            }]
        }]
    }
    
});
