Ext.define('app.store.defect.ComponentStore', {
    extend : 'Ext.data.Store',
	storeId: 'component_Store',
    autoLoad: true,
    fields: ['component'],
	    data : [ {
		component : 'Asset Report Card',
	}, {
		component : 'Complete Track Report',
	}]
});