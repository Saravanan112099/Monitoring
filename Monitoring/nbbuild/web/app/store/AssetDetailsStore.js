Ext.define('app.store.AssetDetailsStore', {
	extend : 'Ext.data.Store',
        model : 'app.model.AssetDetailsModel',
//        storeId: 'assetdetailsstore',
//	autoLoad : 'true',
	proxy : {
		type : 'ajax',
		method : 'POST',
		url : 'DetailedReport',
		// url: 'app/data/SystemDetails.json',
//		reader : {
//			type : 'json',
//			root : 'AssetDetailsList'
//		}
	}
});