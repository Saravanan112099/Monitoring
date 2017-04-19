var tenantGrid = Ext.create('app.view.tenant.TenantView');
var chart = Ext.create('app.view.chart.Chart');
Ext.define('app.view.layout.VerticalBox', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.layout.container.VBox'
    ],
    xtype: 'layout-vertical-box',
    width: 500,
    height: 400,
    
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    
  defaults: {
        frame: true,
        bodyPadding: 2
    },

    items: [
        {
           	title : 'System Details',
        	items : [chart],
        },       
        {
        	title: 'Tenant Details',
           	items : [tenantGrid],
        }
    ]

});