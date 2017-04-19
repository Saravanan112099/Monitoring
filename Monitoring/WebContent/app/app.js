var USERNAME = null;
var PASSWORD = null
var editValues = {
		status : '',
		deliver_dt : '',
		assigned_to : '',
		priority : '',
		category : ''
}
//window.onunload = function (e) {
//	var form = new Ext.FormPanel({
//	    formBind: true,
//	    defaultType: 'textfield',
//	    url: 'http://localhost:8080/CueTransSupport/DefectlogServlet',
//	    method : 'GET',
//	    items : [{
//	    	name : 'UserName',
//	    	value : USERNAME
//	    }]
//	});
//	form.getForm().submit();
//    console.log('Page Refreshed');
//};
Ext.application({
	name : 'app',
	appFolder : 'app',
	requires : [ 'Ext.container.Viewport' ],
	controllers:['app.controller.Controller'],
	stores : [ 
            'app.store.TenantStore',
            'app.store.AssetDetailsStore',
            'app.store.DefectStore',
            'app.store.defect.ClosedDefectStore',
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
//		console.log('Form Submitted');
		
		Ext.create('Ext.container.Container', {
			renderTo: Ext.getBody(),
			layout : {
				type : 'fit',
//				align : 'center',
//				pack: 'center'
				
			},
			items : [ login ]
		});
	}
});
