      var templateFns = {
      setAvatar: function(values) {
        var avatar = values.avatar;
          return '<div class="item_avatar" ><span>' +
//            values.name.match(/\b\w/g).join('').substring(0, 3).toUpperCase() 
//            'Tenant Status List'
          values.name
            + '</span></div>';
        console.error('Invalid Avatar');
      }
    };

    // Create the templates
    var galleryTemplate = Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '<div class="gallery_selector">',
        '{[this.setAvatar(values)]}',
//        '<div class="item_title">{name}</div>',
        '</div>',
        '</tpl>',
        templateFns
      )
    // Create the view
    var sampleView = Ext.create('Ext.view.View', {
      xtype: 'dataview',
//      width : '500px',
      cls: 'view_container',
      layout : {
    	  type : 'fit',
    	  align : 'center',
    	  pack: 'center'
      },
      overflow: 'auto',
      overflowX: 'hidden',
      renderTo: Ext.getBody(),
      store: {
        fields: ['name'],
        data : [{name : 'Tenant Status List'},{name : 'Ticket List'},{name : 'Submit New Ticket'}]
      
//        sorters: [{
//          property: 'name',
//          direction: 'asc'
//        }]
      },
      tpl: galleryTemplate,
      itemSelector: '.gallery_selector',
      listeners: {
        itemclick: {
        	fn: function ( me, record, item, index, e, eOpts ) {
                if(index == 0){
                	var card = Ext.getCmp('layout_card');
                    var cardLayout = card.getLayout();
                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
                	cardLayout.setActiveItem(1);
                	var formDialog = me.up('home');
                    formDialog.fireEvent('getTenantStatus', formDialog);
                }else if(index == 1){
                	var card = Ext.getCmp('layout_card');
                    var cardLayout = card.getLayout();
                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
                	cardLayout.setActiveItem(2);
                	var formDialog = me.up('home');
                    formDialog.fireEvent('getDefects', formDialog);
                }else if(index == 2){
//                	console.log('You are Clicked "Submit New Defect"');
                	var card = Ext.getCmp('layout_card');
                    var cardLayout = card.getLayout();
                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
                	cardLayout.setActiveItem(4);
                	var formDialog = me.up('home');
                    formDialog.fireEvent('getComboDetails', formDialog);
                }
            }
        }
      }
    });

Ext.define('app.view.home.Home', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.home',
    id: 'panel_home',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items : [sampleView]
});
