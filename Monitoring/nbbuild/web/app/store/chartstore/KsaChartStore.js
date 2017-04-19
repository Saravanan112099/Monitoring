Ext.define('app.store.chartstore.KsaChartStore', {
	extend : 'Ext.data.Store',
        storeId: 'ksachartstore',
	model : 'app.model.ChartModel',
	autoLoad : 'true',
	proxy : {
		type : 'ajax',
		method : 'POST',
		url : 'report',
		// url: 'app/data/SystemDetails.json',
		reader : {
			type : 'json',
			root : 'ksaSysDetails'
		}
	}
});