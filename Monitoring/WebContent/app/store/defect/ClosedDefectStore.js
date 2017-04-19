Ext.define('app.store.defect.ClosedDefectStore', {
	extend : 'Ext.data.Store',
	storeId: 'closedDefectStore',
//	model : 'app.model.ChartModel',
    fields: ['defect_id','module','component','subject','description',
             {
			    	name : 'tenant_nm',
					type : 'string',
					convert : function(value, record) {
						if(value == 'cuecent_tenant'){
							return 'Others'
						}else{
							return (value != null) ? value.replace('_tenant','') : value;
						}
					}
			 },'user_nm','created_by','modified_by','tenant_id','user_id','attachments','comments',
			             {
				name : 'created_dt',
				type : 'date',
				dateFormat : 'Y-m-d H:i:s T',
				convert : function(value, record) {
					value = value.toString();
//					console.log(valueindexOf(":"));
//					console.log(!isNaN(value));
					//CHECK THE VALUE IS IS IN MILLIESECONDS
					if(!isNaN(value)){
						var d = new Date(parseInt(value * 1000));
						var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
						return d;
					}else{
						var d = new Date(value);
						if(!isNaN(d.getTime())){
							return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
						}else{
							return value;
						}
					}
					
				},
			},
//             'created_dt',
//             'modified_dt',
					{
						name : 'modified_dt',
						type : 'date',
						dateFormat : 'Y-m-d H:i:s T',
						convert : function(value, record) {
//							if(v){
//								var d = new Date(parseInt(v * 1000));
//								var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
//								return d;
//							}
							value = value.toString();
							//CHECK THE VALUE IS IS IN MILLIESECONDS
							if(!isNaN(value)){
								var d = new Date(parseInt(value * 1000));
								var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
								return d;
							}else{
								var d = new Date(value);
								if(!isNaN(d.getTime())){
									return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
								}else{
									return value;
								}
							}
						},
					},
//					'deliver_dt',
					{
						name : 'deliver_dt',
						type : 'date',
						dateFormat : 'Y-m-d H:i:s T',
						convert : function(value, record) {
//							if(v){
//								var d = new Date(parseInt(v * 1000));
//								var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
//								return d;
//							}
							
							if(value != null){
								value = value.toString();
								//CHECK THE VALUE IS IS IN MILLIESECONDS
								if(!isNaN(value)){
//									console.log('!!!!!!!!!!!!!');
//									console.log(value);
									var d = new Date(parseInt(value * 1000));
									var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
									return d;
								}else{
//									console.log('11111111111111111111');
									var d = new Date(value);
									if(!isNaN(d.getTime())){
//										console.log('22222222222222222');
										return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
									}else{
//										console.log('33333333333333333');
										return value;
									}
								}
							}
						},
					},
					'assigned_to','priority','category','submitted_dt','status',{
						name : 'sort_status',
						type : 'string',
						convert : function(value,record){
//							console.log(record);
							value = record.get('status');
		                	if(value == 'NEW'){
		                		return '0'+value;
		                	}else if(value == 'OPEN'){
		                		return '1'+value;
		                	}else if(value == 'IN PROGRESS'){
		                		return '2'+value;
		                	}else if(value == 'FIXED'){
		                		return '3'+value;
		                	}else if(value == 'REOPEN'){
		                		return '4'+value;
		                	}else if(value == 'CLOSED'){
		                		return '5'+value;
		                	}else{
		                		return value;
		                	} 
						}
					}],
	autoLoad : 'true',
//	proxy : {
//		type : 'ajax',
//		method : 'POST',
//		url : 'report',
//		// url: 'app/data/SystemDetails.json',
//		reader : {
//			type : 'json',
//			root : 'sysDetails'
//		}
//	},
//	proxy: {
//        type: 'memory',
//        reader: {
//            type: 'json'
//        }
//    },
	proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            // THIS IS THE FUNCTION YOU NEED TO MANIPULATE THE DATA
            getData: function(data){
                Ext.each(data.results, function(rec) {
                    var access = rec.access;
                });

                return data;
            }
        }
	},
	
	data : []
});