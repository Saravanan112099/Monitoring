var defectsGrid = Ext.create('app.view.defects.DefectGrid');
var defectGridClosed = Ext.create('app.view.defects.DefectGridClosed');
Ext.define('app.view.layout.TabPanel', {
	extend : 'Ext.tab.Panel',
//    width: 300,
//    height: 200,
    activeTab: 0,
    layout : 'fit',
    header:{
        titlePosition:1,
        defaults:{ // means same definitions as you would inside of the tool cfg option
            xtype:'tool'
        },
			        items : [
					{
						xtype : 'label',
						html : '<a style="font-size:14px;text-decoration: none;" href="#">< Back&nbsp</a>',
						listeners: {
						    render: function(c){
						      c.getEl().on('click', function(){
						    	  	var card = Ext.getCmp('layout_card');
		                            var cardLayout = card.getLayout();
		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
		                        	cardLayout.setActiveItem(0);
						      }, c);
						    }
						  }
					},
					{
						xtype : 'label',
						html : '<a style="font-size:14px;" href="#">Submit New Ticket</a>&nbsp&nbsp&nbsp',
						listeners: {
						    render: function(c){
						      c.getEl().on('click', function(){
						    	  	var card = Ext.getCmp('layout_card');
		                            var cardLayout = card.getLayout();
		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
		                        	cardLayout.setActiveItem(4);
		                        	var formDialog = Ext.getCmp('panel_home');
		                            formDialog.fireEvent('getComboDetails', formDialog);
						      }, c);
						    }
						  }
					},
					{
                        xtype: 'button',
                        text: 'Refresh',
                        style: {
                            'margin-right': '10px'
                        },
                        //	disabled : true,
                        iconCls: 'btn-refresh',
                        handler : function(c){
                        	var formDialog = Ext.getCmp('defect_grid');
                            formDialog.fireEvent('getDefects', formDialog);
                        }
                    }
					]
    },
    items: [
        {
            title: 'All Tickets',
            xtype : defectsGrid
//            bodyPadding: 10,
//            html : 'A simple tab'
        },
        {
            title: 'Closed Tickets',
            xtype : defectGridClosed
//            html : 'Another one'
        }
    ],
//    renderTo : Ext.getBody()
});