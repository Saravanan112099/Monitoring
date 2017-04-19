Ext.define('app.store.defect.ModuleStore', {
	extend : 'Ext.data.Store',
	storeId : 'window_store',
	// model : 'app.model.ChartModel',
	autoLoad : true,
	fields : [ 'module' ],
	data : [ {
		module : 'Home'
	},{
		module : 'Map'
	},
	{
		module : 'Reports'
	}],
//	proxy : {
//		type : 'ajax',
//		reader : {
//			type : 'json'
//		}
//	}
})