Ext.define('app.model.GridModel', {
		extend: 'Ext.data.Model',
		fields: ['tenantName', 'totalVehicles', 'moving','notMoving','nonReporting2','nonReporting4','nonReporting6','nonReporting24','lastFeedTime','reportExecutioStatus']
	});