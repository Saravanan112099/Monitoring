Ext.define('app.store.chartstore.OmanChartStore', {
	extend : 'Ext.data.Store',
        storeId: 'omanchartstore',
	model : 'app.model.ChartModel',
	autoLoad : 'true',
	proxy : {
		type : 'ajax',
		method : 'POST',
		url : 'report',
		// url: 'app/data/SystemDetails.json',
		reader : {
			type : 'json',
			root : 'omanSysDetails'
		}
	}
});