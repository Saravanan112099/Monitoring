Ext.define('app.store.chartstore.UaeChartStore', {
	extend : 'Ext.data.Store',
        storeId: 'uaechartstore',
	model : 'app.model.ChartModel',
	autoLoad : 'true',
	proxy : {
		type : 'ajax',
		method : 'POST',
		url : 'report',
		// url: 'app/data/SystemDetails.json',
		reader : {
			type : 'json',
			root : 'uaeSysDetails'
		}
	}
});