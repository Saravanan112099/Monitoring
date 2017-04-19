Ext.define('app.store.defect.TenantNameStore', {
	extend : 'Ext.data.Store',
	storeId : 'tenantname_store',
	autoLoad : true,
	fields : [ {
			    	name : 'tenantname',
					type : 'string',
					convert : function(value, record) {
						if(value == 'cuecent_tenant'){
							return 'Others'
						}else{
							return value;
						}							
					}
				} 
			],
	sorters: [{
        property: 'tenantname',
        direction: 'ASC'
    }],
	data : [ {
				tenantname : 'IVMS_USER 1',
			}, {
				tenantname : 'IVMS_USER 2',
			} ]
});