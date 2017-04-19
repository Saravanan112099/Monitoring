Ext.define('app.store.tenantstore.OmanGridStore', {
	extend : 'Ext.data.Store',
	model : 'app.model.GridModel',
//	autoLoad : 'true',
	sortOnLoad: true,
	sorters: { property: 'totalVehicles', direction : 'ASC' },
	proxy : {
		type : 'ajax',
//		method : 'POST',
//		url : 'report',
		// url: 'app/data/SystemDetails.json',
		reader : {
			type : 'json',
			root : 'tenantDetails'
		}
	}

});
