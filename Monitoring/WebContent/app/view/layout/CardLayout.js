var home = Ext.create('app.view.home.Home');
var border = Ext.create('app.view.layout.BorderLayout');
//var defectsGrid = Ext.create('app.view.defects.DefectGrid');
var tabPanel = Ext.create('app.view.layout.TabPanel');
//var detailedList = Ext.create('app.view.defects.DetailedList');
var newDfect = Ext.create('app.view.defects.NewDefect');
var sampleView = Ext.create('app.view.defects.DetailedList');
Ext.define('app.view.layout.CardLayout', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.cardLayout',
//    requires: ['Ext.form.Panel'],
    id: 'layout_card',
//    title: 'Report Us',
    layout: {
        type: 'card',
        align: 'middle',
        pack: 'center'
    },
//    tools : [{
//    	xtype : 'button',
//    	text : 'back'
//    }],
    items : [
             home,border,tabPanel,sampleView,newDfect
             ]
})