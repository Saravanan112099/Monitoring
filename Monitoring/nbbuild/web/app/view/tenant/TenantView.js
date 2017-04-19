Ext.define('app.view.tenant.TenantView', {
	alias: 'widget.tenantView',
	extend: 'Ext.grid.Panel',
	// renderTo: document.body,
        layout : 'fit',
        autoShow: true,
//        height: 620,
//        width: 300,
        closable: false,
        resizable: false,
	store: 'app.store.TenantStore',
	viewConfig: {
		getRowClass: function (record, rowIndex, rp, ds) {
//					if (record.get('totalVehicles') == 0) {
//						return 'zerodata';
//					}
		}
	},
//	requires: [
//	           'Ext.ux.grid.FiltersFeature',
//	           'Ext.ux.grid.filter.ListFilter',
//	           'Ext.ux.grid.menu.ListMenu',
//	           'Ext.ux.exporter.Exporter'
//	           ],
	columns: {
		defaults: {
			renderer: function (value, metaData, record) {
				if (record.get('totalVehicles') == 0) {
					metaData.tdAttr = 'style="background:#cec8c8 !important; "';
				}
				return value;
			}
		},
		items: [
				{
				    text : 'S.No',
				    xtype: 'rownumberer',
				    width: 30,
				//    sortable: false,
//				    locked: false,
				    align : 'center'
				},
				{
					text: 'Tenant Name',
					tooltip : 'Tenant Name',
					dataIndex: 'tenantName',
//					listeners: {
//		                mouseenter: {
//		                    element: 'el',
//		                    fn: function(a,b,c,d){
//		                        console.log('mouseenter column 1');
//		                        console.log(a);
//		                        console.log(b);
//		                        console.log(c);
//		                        console.log(d);
//		                    }
//		                }
//		            },
//					width : 113,
					flex : 1
				},
				{
					text: 'Total Vehicles',
					tooltip : 'Total Vehicles',
//					align: 'center',
					dataIndex: 'totalVehicles',
                                        flex: 0.6,
                                        listeners: {
                                            'click': function(dv, record, item, index, e,store) {
                                                var assetDetailsStore = Ext.data.StoreManager.lookup('app.store.AssetDetailsStore');
                                                var assetDetailsGrid = Ext.create('app.view.tenant.AssetDetailsGrid');
                                                assetDetailsGrid.store.clearFilter();
                                                var pannel = new Ext.Panel({
                                                        layout:'fit',
                                                        border:false,
                                                        bodyBorder:false,
                                                        hideBorders:true,
//                                                        html: 'some text here'
                                                        tbar : [
                                                                    {
                                                                        xtype : 'label',
                                                                        text : 'Search',
                                                                        style: {
            //                                                                fontWeight: 'bold',
                                                                            fontSize: '13px',
                                                                            'margin-right': '10px'
                                                                        },
                                                                    },
                                                                    {
                                                                        xtype: 'textfield',
                                                                        anchor: '100%',
                                                                        style: {
                                                                            'margin-right': '20px'
                                                                        },
                                                                        listeners : {
                                                                            change : function(combo, value){
                                                                                assetDetailsGrid.store.clearFilter();
                                                                                if (value) {
                                                                                var matcher = new RegExp(Ext.String.escapeRegex(value), "i");
                                                                                assetDetailsGrid.store.filter({
                                                                                    filterFn: function(record) {
                                                                                        return matcher.test(record.get('REG_NO')) ||
                                                                                            matcher.test(record.get('CREATED_DT')) ||
                                                                                            matcher.test(record.get('SPEED')) ||
                                                                                            matcher.test(record.get('IGNITION')) ||
                                                                                            matcher.test(record.get('DISTANCE'));
                                                                                    }
                                                                                });
                                                                            }
                                                                            }
                                                                        }
                                                                }
                                                            ],
                                                        items : [assetDetailsGrid]
                                                  });
                                                var window = Ext.create('Ext.window.Window', {
                                                    renderTo: Ext.getBody(),
                                                    closeAction :'hide',
                                                    layout: 'fit',
                                                    title : store.data.tenantName.toUpperCase() +' - Asset Summery',
                                                    items: [pannel],
                                                });
                                                window.show();
                                                var mask = new Ext.LoadMask(pannel, {msg: "Please wait..."});
                                                mask.show();
                                                Ext.Ajax.request({
                                                    scope: this,
                                                    url: 'DetailedReport',
                                                    method: 'POST',
                                                    params: {
                                                        tenantName : store.data.tenantName,
                                                        assetStatus : 'Total'
                                                    },
                                                    success: function(response, opts) {
                                                        response = Ext.decode(response.responseText);
                                                        mask.hide();
                                                            assetDetailsStore.loadRawData(response.TotalAssetList);
                                                    },
                                                    failure: function(err) {
                                                        mask.hide();
                                                        Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
                                                    }
                                                });
//                                                console.log(assetDetailsGrid);
                                            }
                                        },
                    renderer: function (value, metaData, record) {
						var totalVehicles = record.get('totalVehicles');
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							return '<a href="#">' + value +'</a>';
						}else if(value > 0 && totalVehicles != 0){
                            metaData.tdAttr = 'style="cursor: pointer !important"';
                            return '<a href="#">' + value +'</a>';
						}
						else {
							return '<a href="#">' + value +'</a>';
						}
					}
//					width : 40
				},
				{
					text: 'Moving',
					tooltip : 'Moving',
//					align: 'center',
					dataIndex: 'moving',
					flex: 0.5,
                                        listeners: {
                                            'click': function(dv, record, item, index, e,store) {
                                                var assetDetailsStore = Ext.data.StoreManager.lookup('app.store.AssetDetailsStore');
                                                var assetDetailsGrid = Ext.create('app.view.tenant.AssetDetailsGrid');
                                                assetDetailsGrid.store.clearFilter();
                                                var pannel = new Ext.Panel({
                                                        layout:'fit',
                                                        border:false,
                                                        bodyBorder:false,
                                                        hideBorders:true,
                                                        tbar : [
                                                                {
                                                                    xtype : 'label',
                                                                    text : 'Search',
                                                                    style: {
        //                                                                fontWeight: 'bold',
                                                                        fontSize: '13px',
                                                                        'margin-right': '10px'
                                                                    },
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    anchor: '100%',
                                                                    style: {
                                                                        'margin-right': '20px'
                                                                    },
                                                                    listeners : {
                                                                        change : function(combo, value){
        //                                                                    var grid = Ext.getCmp('grid');
        //                                                                    var newValue = "1174YM";
                                                                            assetDetailsGrid.store.clearFilter();
                                                                            if (value) {
                                                                            var matcher = new RegExp(Ext.String.escapeRegex(value), "i");
                                                                            assetDetailsGrid.store.filter({
                                                                                filterFn: function(record) {
                                                                                    return matcher.test(record.get('REG_NO')) ||
                                                                                        matcher.test(record.get('CREATED_DT')) ||
                                                                                        matcher.test(record.get('SPEED')) ||
                                                                                        matcher.test(record.get('IGNITION')) ||
                                                                                        matcher.test(record.get('DISTANCE'));
                                                                                }
                                                                            });
                                                                        }
                                                                        }
                                                                    }
                                                            }
                                                        ],
                                                        items : [assetDetailsGrid]
                                                  });
                                                var window = Ext.create('Ext.window.Window', {
                                                    renderTo: Ext.getBody(),
                                                    closeAction :'hide',
                                                    layout: 'fit',
                                                    title : store.data.tenantName.toUpperCase() +' - Asset Summery ' + '(Moving)',
                                                    
                                                    items: [pannel],
                                                    listeners: {}
                                                });
                                                window.show();
                                                var mask = new Ext.LoadMask(pannel, {msg: "Please wait..."});
                                                mask.show();
                                                Ext.Ajax.request({
                                                    scope: this,
                                                    url: 'DetailedReport',
                                                    method: 'POST',
                                                    params: {
                                                        tenantName : store.data.tenantName,
                                                        assetStatus : 'In Transit'
                                                    },
                                                    success: function(response, opts) {
                                                        response = Ext.decode(response.responseText);
                                                        mask.hide();
                                                            assetDetailsStore.loadRawData(response.AssetDetailsList);
                                                    },
                                                    failure: function(err) {
                                                        mask.hide();
                                                        Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
                                                    }
                                                });
                                            }
                                        },
                                        renderer: function (value, metaData, record) {
						var totalVehicles = record.get('totalVehicles');
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							return '<a href="#">' + value +'</a>';
						}
                                                else if(value > 0 && totalVehicles != 0){
                                                        metaData.tdAttr = 'style="cursor: pointer !important"';
                                                        return '<a href="#">' + value +'</a>';
                                                }
						else {
							return '<a href="#">' + value +'</a>';
						}
					}
//					width : 40
				},
				{
					text: 'Non Moving',
					tooltip : 'Not Moving',
//					align: 'center',
					dataIndex: 'notMoving',
					flex: 0.5,
                                        listeners: {
                                            'click': function(dv, record, item, index, e,store) {
                                                var assetDetailsStore = Ext.data.StoreManager.lookup('app.store.AssetDetailsStore');
                                                var assetDetailsGrid = Ext.create('app.view.tenant.AssetDetailsGrid');
                                                assetDetailsGrid.store.clearFilter();
                                                var pannel = new Ext.Panel({
                                                        layout:'fit',
                                                        border:false,
                                                        bodyBorder:false,
                                                        hideBorders:true,
                                                        tbar : [
                                                                {
                                                                    xtype : 'label',
                                                                    text : 'Search',
                                                                    style: {
        //                                                                fontWeight: 'bold',
                                                                        fontSize: '13px',
                                                                        'margin-right': '10px'
                                                                    },
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    anchor: '100%',
                                                                    style: {
                                                                        'margin-right': '20px'
                                                                    },
                                                                    listeners : {
                                                                        change : function(combo, value){
        //                                                                    var grid = Ext.getCmp('grid');
        //                                                                    var newValue = "1174YM";
                                                                            assetDetailsGrid.store.clearFilter();
                                                                            if (value) {
                                                                            var matcher = new RegExp(Ext.String.escapeRegex(value), "i");
                                                                            assetDetailsGrid.store.filter({
                                                                                filterFn: function(record) {
                                                                                    return matcher.test(record.get('REG_NO')) ||
                                                                                        matcher.test(record.get('CREATED_DT')) ||
                                                                                        matcher.test(record.get('SPEED')) ||
                                                                                        matcher.test(record.get('IGNITION')) ||
                                                                                        matcher.test(record.get('DISTANCE'));
                                                                                }
                                                                            });
                                                                        }
                                                                        }
                                                                    }
                                                            }
                                                        ],
                                                        items : [assetDetailsGrid]
                                                  });
                                                var window = Ext.create('Ext.window.Window', {
                                                    renderTo: Ext.getBody(),
                                                    closeAction :'hide',
                                                    layout: 'fit',
                                                    title : store.data.tenantName.toUpperCase() +' - Asset Summery ' + '(NonMoving)',
                                                    items: [pannel],
                                                    listeners: {}
                                                });
                                                window.show();
                                                var mask = new Ext.LoadMask(pannel, {msg: "Please wait..."});
                                                mask.show();
                                                Ext.Ajax.request({
                                                    scope: this,
                                                    url: 'DetailedReport',
                                                    method: 'POST',
                                                    params: {
                                                        tenantName : store.data.tenantName,
                                                        assetStatus : 'Parked'
                                                    },
                                                    success: function(response, opts) {
                                                        response = Ext.decode(response.responseText);
                                                        mask.hide();
                                                            assetDetailsStore.loadRawData(response.AssetDetailsList);
                                                    },
                                                    failure: function(err) {
                                                        mask.hide();
                                                        Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
                                                    }
                                                });
                                            }
                                        },
                                        renderer: function (value, metaData, record) {
						var totalVehicles = record.get('totalVehicles');
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							return '<a href="#">' + value +'</a>';
						}
                                                else if(value > 0 && totalVehicles != 0){
                                                        metaData.tdAttr = 'style="cursor: pointer !important"';
                                                        return '<a href="#">' + value +'</a>';
                                                }
						else {
							return '<a href="#">' + value +'</a>';
						}
					}
//					width : 40
				},
				{
//					text: 'Non Reporting (2 hrs)',
					text: 'Not Reporting (2 to 4 hrs)',
//					align: 'center',
					tooltip : 'Non Reporting (Between 2 - 4 hrs)',
					dataIndex: 'nonReporting2',
					flex: 1
//					width : 40
				},
				{
//					text: 'Non Reporting (4 hrs)',
					text: 'Not Reporting (4 to 6 hrs)',
					tooltip : 'Non Reporting (Between 4 - 6 hrs)',
//					align: 'center',
					dataIndex: 'nonReporting4',
					flex: 1
//					width : 40
				},
				{
//					text: 'Non Reporting (6 hrs)',
					text: 'Not Reporting (6 to 24 hrs)',
					tooltip : 'Non Reporting (Between 6 - 24 hrs)',
//					align: 'center',
					dataIndex: 'nonReporting6',
					flex: 1
//					width : 40
				},
				{
					text: 'Not Reporting (24 hrs)',
					tooltip : 'Non Reporting (Greater than 24 hrs)',
//					align: 'center',
					dataIndex: 'nonReporting24',
					flex: 1,
//                                        overCls: 'hand',
                                        listeners: {
                                            'click': function(dv, record, item, index, e,store) {
                                                var assetDetailsStore = Ext.data.StoreManager.lookup('app.store.AssetDetailsStore');
                                                var assetDetailsGrid = Ext.create('app.view.tenant.AssetDetailsGrid');
                                                assetDetailsGrid.store.clearFilter();
                                                var pannel = new Ext.Panel({
                                                        layout:'fit',
                                                        border:false,
                                                        bodyBorder:false,
                                                        hideBorders:true,
                                                        tbar : [
                                                                {
                                                                    xtype : 'label',
                                                                    text : 'Search',
                                                                    style: {
        //                                                                fontWeight: 'bold',
                                                                        fontSize: '13px',
                                                                        'margin-right': '10px'
                                                                    },
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    anchor: '100%',
                                                                    style: {
                                                                        'margin-right': '20px'
                                                                    },
                                                                    listeners : {
                                                                        change : function(combo, value){
        //                                                                    var grid = Ext.getCmp('grid');
        //                                                                    var newValue = "1174YM";
                                                                            assetDetailsGrid.store.clearFilter();
                                                                            if (value) {
                                                                            var matcher = new RegExp(Ext.String.escapeRegex(value), "i");
                                                                            assetDetailsGrid.store.filter({
                                                                                filterFn: function(record) {
                                                                                    return matcher.test(record.get('REG_NO')) ||
                                                                                        matcher.test(record.get('CREATED_DT')) ||
                                                                                        matcher.test(record.get('SPEED')) ||
                                                                                        matcher.test(record.get('IGNITION')) ||
                                                                                        matcher.test(record.get('DISTANCE'));
                                                                                }
                                                                            });
                                                                        }
                                                                        }
                                                                    }
                                                            }
                                                        ],
                                                        items : [assetDetailsGrid]
                                                  });
                                                var window = Ext.create('Ext.window.Window', {
                                                    renderTo: Ext.getBody(),
                                                    closeAction :'hide',
                                                    layout: 'fit',
                                                    title : store.data.tenantName.toUpperCase() +' - Asset Summery ' + '(NonReporting)',
                                                    items: [pannel],
                                                    listeners: {}
                                                });
                                                window.show();
                                                var mask = new Ext.LoadMask(pannel, {msg: "Please wait..."});
                                                mask.show();
                                                Ext.Ajax.request({
                                                    scope: this,
                                                    url: 'DetailedReport',
                                                    method: 'POST',
                                                    params: {
                                                        tenantName : store.data.tenantName,
                                                        assetStatus : 'Uncertain'
                                                    },
                                                    success: function(response, opts) {
                                                        response = Ext.decode(response.responseText);
                                                        mask.hide();
                                                            assetDetailsStore.loadRawData(response.AssetDetailsList);
                                                    },
                                                    failure: function(err) {
                                                        mask.hide();
                                                        Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
                                                    }
                                                });
                                            }
                                        },
//					width : 40,
					renderer: function (value, metaData, record) {
						var totalVehicles = record.get('totalVehicles');
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							return '<a href="#">' + value +'</a>';
						}
                                                else if(value > 0 && totalVehicles != 0){
                                                    if (value / totalVehicles >= 0.5) {
                                                            metaData.tdAttr = 'style="cursor: pointer !important"';
                                                            return '<a href="#">' + value +'</a>' + '<img title="Non Reporting Count is greater than 50% of Total Vehicle Count" src="ext/resources/themes/images/access/dd/drop-no.gif"></img>';
                                                    }else{
                                                            metaData.tdAttr = 'style="cursor: pointer !important"';
                                                            return '<a href="#">' + value +'</a>';
                                                    }
                                                }						
						else {
							return '<a href="#">' + value +'</a>';
						}
					}
				},
				{
					text: 'Last Feed Time',
					tooltip : 'Last Feed Time',
//					align: 'center',
					dataIndex: 'lastFeedTime',
//					flex: 1,
//					width : '140',
					minWidth : '140',
					renderer : function(value,metaData,record){
//						console.log(value);
						var totalVehicles = record.get('totalVehicles');
						var d = new Date(parseInt(value));
//						console.log(d);
//						console.log(d.toLocaleString());
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							if(value == null){
								return "0000-00-00 00:00:00";
							}else{
								return Ext.util.Format.date(d, 'Y-m-d H:i:s T');
							}
						}else{
//							return Ext.Date.format(new Date(value), 'Y-m-d');
							return Ext.util.Format.date(d, 'Y-m-d H:i:s T');
						}

					}
				},
				{
//					xtype: 'booleancolumn',
					text: 'Report Executed',
					tooltip : 'Report Executed',
//					align: 'center',
					dataIndex: 'reportExecutioStatus',
					flex: 1,
//					width : 40,
					sortable:false,
//					trueText: true,
//					falseText: false,
					renderer: function (value, metaData, record) {
						var totalVehicles = record.get('totalVehicles');
//						console.log(value);
//						if(value == true){
////							console.log(record);
////							console.log(record.data.reportExecutioStatus);
//							record.data.reportExecutioStatus = 1;
//						}
//						if(value == false){
////							console.log(record);
////							console.log(record.data.reportExecutioStatus);
//							record.data.reportExecutioStatus = 0;
//						}
						if (totalVehicles == 0) {
							metaData.tdAttr = 'style="background:#cec8c8 !important;"';
							return '<span><img src="ext/resources/themes/images/access/grid/drop-no.gif"></img></span>';
						}
						else if (value == true) {
//							value = 1;
							return '<span><img src="ext/resources/themes/images/access/grid/drop-yes.gif"></img></span>';
						}
						else {
//							value = 0;
							return '<span><img src="ext/resources/themes/images/access/grid/drop-no.gif"></img></span>';
						}
						
					}
				}]
	}
});