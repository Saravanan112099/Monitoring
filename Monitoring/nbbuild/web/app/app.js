var USERNAME = null;
var PASSWORD = null
window.onunload = function (e) {
	var form = new Ext.FormPanel({
	    formBind: true,
	    defaultType: 'textfield',
	    url: 'http://localhost:8080/CueTransSupport/DefectlogServlet',
	    method : 'GET',
	    items : [{
	    	name : 'UserName',
	    	value : USERNAME
	    }]
	});
	form.getForm().submit();
    console.log('Page Refreshed');
};
Ext.application({
	name : 'app',
	appFolder : 'app',
	requires : [ 'Ext.container.Viewport' ],
	controllers:['app.controller.Controller'],
	stores : [ 
            'app.store.TenantStore',
            'app.store.AssetDetailsStore',
            'app.store.DefectStore',
            'app.store.defect.ModuleStore',
            'app.store.defect.ComponentStore',
            'app.store.defect.TenantNameStore',
            'app.store.defect.CommentsStore',
//            'app.store.ChartStore',
            'app.store.chartstore.OmanChartStore',
            'app.store.chartstore.UaeChartStore',
            'app.store.chartstore.KsaChartStore' 
        ],
	models : [ 'app.model.GridModel', 'app.model.ChartModel','app.model.AssetDetailsModel' ],
	launch : function() {
		var login = Ext.create('app.view.Login');
//		Ext.Msg.alert('Working');

//		var form = new Ext.FormPanel({
//		    formBind: true,
//		    defaultType: 'textfield',
//		    url: 'http://localhost:8080/CueTransSupport/DefectlogServlet',
//		    method : 'GET',
//		    items : [{
//		    	name : 'UserName',
//		    	value : 'Saravanan'
//		    }],
//		    buttons: [{
//		        text: 'Execute exploit',
//		        handler: function () {
//		            form.submit({
////		                waitMsg: 'Running exploit ...',
//		                success: function (a,b) {
//		                	console.log(a);
//		                	console.log(Ext.JSON.decode(b.response.responseText));
//		                    Ext.Msg.alert('Yeh!', 'Exploit sent to the zombie.')
//		                    window.open('http://localhost:8080/CueTransSupport/');
//		                },
//		                failure: function () {
//		                    Ext.beef.msg('Ehhh!', 'An error occured while trying to send the exploit.')
//		                }
//		            });
//		            
//		        }
//		    }]
//		});
//		form.getForm().submit({
//            waitMsg: 'Running exploit ...',
//            success: function (a,b) {
//            	console.log(a);
//            	console.log(Ext.JSON.decode(b.response.responseText));
//                Ext.Msg.alert('Yeh!', 'Exploit sent to the zombie.')
//            },
//            failure: function () {
//                Ext.beef.msg('Ehhh!', 'An error occured while trying to send the exploit.')
//            }
//        });
		console.log('Form Submitted');
		
		Ext.create('Ext.container.Container', {
			renderTo: Ext.getBody(),
			layout : {
				type : 'fit',
//				align : 'center',
//				pack: 'center'
				
			},
			items : [ login ]
		});
//      var templateFns = {
//      setAvatar: function(values) {
//        var avatar = values.avatar;
//          return '<div class="item_avatar" >' +
////            values.name.match(/\b\w/g).join('').substring(0, 3).toUpperCase() 
//            'Monitoring'
//            + '</div>';
//        console.error('Invalid Avatar');
//      }
//    };
//
//    // Create the templates
//    var galleryTemplate = Ext.create('Ext.XTemplate',
//        '<tpl for=".">',
//        '<div class="gallery_selector">',
//        '{[this.setAvatar(values)]}',
//        '<div class="item_title">{name}</div>',
//        '</div>',
//        '</tpl>',
//        templateFns
//      )
//    // Create the view
//    var sampleView = Ext.create('Ext.view.View', {
//      xtype: 'dataview',
////      width : '500px',
//      cls: 'view_container',
//      layout : {
//    	  type : 'fit',
//    	  align : 'center',
//    	  pack: 'center'
//      },
//      overflow: 'auto',
//      overflowX: 'hidden',
//      renderTo: Ext.getBody(),
//      store: {
//        fields: [
//          'avatar',
//          'name',
//          'nickname', {
//            name: 'age',
//            type: 'int'
//          },
//          'height'
//        ],
////        sorters: [{
////          property: 'name',
////          direction: 'asc'
////        }]
//      },
//      tpl: galleryTemplate,
//      itemSelector: '.gallery_selector',
//      listeners: {
//        itemclick: function(item, record) {
//          console.info('Selected: ' + record.get('name'));
//        },
//        itemdblclick: function(item, record) {
//            console.info('Open: ' + record.get('name'));
//            window.show();
//        }
//      }
//    });
//
//
//    // Create the sample user data where Stacey has an invalid color to use the default
//    sampleView.getStore().loadData([
//    {
//      'avatar': '#02b685',
//      'name': 'Saravanan',
//      'nickname': 'SVN',
//      'age': 21,
//      'height': '5\'2"'
//    }, {
//      'avatar': '#02b685',
//      'name': 'Joe',
//      'nickname': 'Joey',
//      'age': 25,
//      'height': '5\'7"'
//    }, {
//      'avatar': '#02b685',
//      'name': 'William',
//      'nickname': 'Bill',
//      'age': 32,
//      'height': '5\'5"'
//    }, {
//      'avatar': '#02b685',
//      'name': 'Kelly',
//      'nickname': 'Kel',
//      'age': 41,
//      'height': '5\'8"'
//    }
//]);
//    var window = Ext.create('Ext.window.Window', {
//        title: 'My Title',
//        height: 400,
//        width: 600,
////                items: [
////                grid
////                ],
//                bbar: [{
//                    text: 'Save',
//                    handler: function(btn) {
//                        alert('Save!');
//                    }
//                }, {
//                    text: 'Close',
//                    handler: function(btn) {
////                        alert('Cancel!');
//                          window.hide();
//                    }
//                }]
//    });
	}
});
