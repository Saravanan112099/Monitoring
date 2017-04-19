Ext.define('app.store.ChartStore', {
	extend : 'Ext.data.Store',
        storeId: 'chartstore',
	model : 'app.model.ChartModel',
	autoLoad : 'true',
	proxy : {
		type : 'ajax',
		method : 'POST',
		url : 'report',
		// url: 'app/data/SystemDetails.json',
		reader : {
			type : 'json',
			root : 'sysDetails'
		}
	}
});