//Ext.TaskManager.start({
//    run: function() {
//        Ext.getCmp('lblTime').setText(Ext.Date.format(new Date(), 'Y-m-d H:i:s T'));
////        Ext.getCmp('lblTime').setText(Ext.Date.format(new Date(), 'Y-m-d H:i:s O'));
//    },
//    interval: 1000
//});
Ext.define('app.view.layout.BorderLayout', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.borderLayout',
    xtype: 'layout-border',
    requires: ['Ext.layout.container.Border'],
    layout: 'border',
//	width : 500,
//	height : 400,

    bodyBorder: false,
    defaults: {
        collapsible: true,
//		split : true,
    },
    initComponent: function() {
        var me = this;
        var chart = Ext.create('app.view.chart.Chart');
        var tenantGrid = Ext.create('app.view.tenant.TenantView');
        var omanChart = Ext.create('app.view.chart.OmanChart');
        var uaeChart = Ext.create('app.view.chart.UaeChart');
        var ksaChart = Ext.create('app.view.chart.KsaChart');
        Ext.data.StoreManager.lookup('app.store.chartstore.OmanChartStore').on('refresh', function(store, records) {
        	records = store.data.items;
            var total = 0;
            var used = 0;
            var cache = 0;
            var buffer = 0;
            for (var i = 0; i < records.length; i++) {
                if (records[i].get('name') === 'Mem %')
                {
                	total = records[i].get('details').totalMemory;
                	used = records[i].get('details').usedMemory;
                	cache = records[i].get('details').cacheMemory;
                	buffer = records[i].get('details').bufferMemory;
                    Ext.getCmp('omanTotalMem').update('<b title = "Total Memory : '+total+'">Total&nbsp:&nbsp</b>'+(parseInt(total)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('omanUsedMem').update('<b title = "Used Memory : '+used+'">Used&nbsp:&nbsp</b>'+(parseInt(used)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('omanCacheMem').update('<b title = "Cache Memory : '+cache+'">Cache&nbsp:&nbsp</b>'+(parseInt(cache)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('omanBufferMem').update('<b title = "Buffer Memory : '+buffer+'">Buffer&nbsp:&nbsp</b>'+(parseInt(buffer)/1024).toFixed(2)+'G' +'\t');
                }
            };
        });
//        Ext.data.StoreManager.lookup('app.store.chartstore.UaeChartStore').on('refresh', function(store, records) {
//        	records = store.data.items;
//            var total = 0;
//            var used = 0;
//            var cache = 0;
//            var buffer = 0;
//            for (var i = 0; i < records.length; i++) {
//                if (records[i].get('name') === 'Mem %')
//                {
//                	total = records[i].get('details').totalMemory;
//                	used = records[i].get('details').usedMemory;
//                	cache = records[i].get('details').cacheMemory;
//                	buffer = records[i].get('details').bufferMemory;
////                    Ext.getCmp('lblTotal').update('<b>Total&nbsp:&nbsp</b>'+records[i].get('details').totalMemory +'\t'+'<b>Used&nbsp:&nbsp</b>'+records[i].get('details').usedMemory + 'G'+'\t'+'<b>Cache&nbsp:&nbsp</b>'+records[i].get('details').cacheMemory + 'G'+'\t'+'<b>Buffer&nbsp:&nbsp</b>'+records[i].get('details').bufferMemory + 'G');
//                	Ext.getCmp('uaeTotalMem').update('<b title = "Total Memory : '+total+'">Total&nbsp:&nbsp</b>'+(parseInt(total)/1024).toFixed(2)+'G' +'\t');
//                    Ext.getCmp('uaeUsedMem').update('<b title = "Used Memory : '+used+'">Used&nbsp:&nbsp</b>'+(parseInt(used)/1024).toFixed(2)+'G' +'\t');
//                    Ext.getCmp('uaeCacheMem').update('<b title = "Cache Memory : '+cache+'">Cache&nbsp:&nbsp</b>'+(parseInt(cache)/1024).toFixed(2)+'G' +'\t');
//                    Ext.getCmp('uaeBufferMem').update('<b title = "Buffer Memory : '+buffer+'">Buffer&nbsp:&nbsp</b>'+(parseInt(buffer)/1024).toFixed(2)+'G' +'\t');
//                }
//            };
//        });
        Ext.data.StoreManager.lookup('app.store.chartstore.KsaChartStore').on('refresh', function(store, records) {
        	records = store.data.items;
            var total = 0;
            var used = 0;
            var cache = 0;
            var buffer = 0;
            for (var i = 0; i < records.length; i++) {
                if (records[i].get('name') === 'Mem %')
                {
                	total = records[i].get('details').totalMemory;
                	used = records[i].get('details').usedMemory;
                	cache = records[i].get('details').cacheMemory;
                	buffer = records[i].get('details').bufferMemory;
//                    Ext.getCmp('lblTotal').update('<b>Total&nbsp:&nbsp</b>'+records[i].get('details').totalMemory +'\t'+'<b>Used&nbsp:&nbsp</b>'+records[i].get('details').usedMemory + 'G'+'\t'+'<b>Cache&nbsp:&nbsp</b>'+records[i].get('details').cacheMemory + 'G'+'\t'+'<b>Buffer&nbsp:&nbsp</b>'+records[i].get('details').bufferMemory + 'G');
                	Ext.getCmp('ksaTotalMem').update('<b title = "Total Memory : '+total+'">Total&nbsp:&nbsp</b>'+(parseInt(total)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('ksaUsedMem').update('<b title = "Used Memory : '+used+'">Used&nbsp:&nbsp</b>'+(parseInt(used)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('ksaCacheMem').update('<b title = "Cache Memory : '+cache+'">Cache&nbsp:&nbsp</b>'+(parseInt(cache)/1024).toFixed(2)+'G' +'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
                    Ext.getCmp('ksaBufferMem').update('<b title = "Buffer Memory : '+buffer+'">Buffer&nbsp:&nbsp</b>'+(parseInt(buffer)/1024).toFixed(2)+'G' +'\t');
                }
            };
        });
        
        me.items = [{
//                title: 'System Details',
//                titleAlign:'center',
                layout: 'hbox',
//    		items : [chart],
                header:{
                    titlePosition:1,
                    defaults:{ // means same definitions as you would inside of the tool cfg option
                        xtype:'tool'
                    },
                items : [
					{
						xtype : 'label',
						html : '<a style="font-size:14px;text-decoration: none;" href="#">< Back&nbsp</a>',
						listeners: {
						    render: function(c){
						      c.getEl().on('click', function(){
						    	  	console.log('Clicked Back Button');
//						    	  	var card = Ext.getCmp('layout_card');
//		                            var cardLayout = card.getLayout();
//		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
//		                        	cardLayout.setActiveItem(0);
						    	  	Ext.getCmp('layout_card').getLayout().setActiveItem(0)
						      }, c);
						    }
						  }
					},
//					{
//						xtype : 'label',
//						text : ' | '
//					},
//					{
//						xtype : 'label',
//						html : '<a style="font-size:14px;text-decoration: none;" href="#">&nbspHome</a>'
//					} 
					]
                },
                tools: [
                        {
                        xtype: 'label',
                        text : 'Last Updated Time : '+Ext.Date.format(new Date(), 'Y-m-d H:i:s T'),
                        id: 'lblTime',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '13px',
                            'margin-right': '10px'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Refresh',
                        style: {
                            'margin-right': '10px'
                        },
                        //	disabled : true,
                        iconCls: 'btn-refresh',
//			    action : 'refreshReport'
                        listeners: {
                            'click': function() {
                                var mask = new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."});
                                mask.show();
                                Ext.Ajax.request({
                                    url: 'DetailedReport',
                                    method: 'GET',
//                                    params: {
//                                        loggedin: true
//                                    },
                                    scope: this,
                                    success: function(response, opts) {
                                        Ext.getCmp('lblTime').setText('Last Updated Time : '+Ext.Date.format(new Date(), 'Y-m-d H:i:s T'));
                                        var chartStore = Ext.data.StoreManager.lookup('app.store.ChartStore');
                                        var omanChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.OmanChartStore');
                                        var uaeChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.UaeChartStore');
                                        var ksaChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.KsaChartStore');
                                        var tenantStore = Ext.data.StoreManager.lookup('app.store.TenantStore');
                                        response = Ext.decode(response.responseText);
                                        if (response.success) {
                                            mask.hide();
//                                            console.log(response);
                                            omanChartStore.loadRawData(response);
                                            uaeChartStore.loadRawData(response);
                                            ksaChartStore.loadRawData(response);
                                            tenantStore.loadRawData(response);
//                                              chartStore.load({url: 'app/data/SystemDetails1.json'})
                                        }
                                    },
                                    failure: function(err) {
                                        mask.hide();
                                        Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
                                    }
                                });
                            }
                        }
                    }
                ],
                items: [
                    {
                        title: 'OMAN SERVER',
//                        items: [omanChart],
//                        layout: 'fit',
                                items: [
                                            {
                                                layout : 'fit',
                                                items : [{
                                                    xtype : omanChart,
                                                }]
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'omanTotalMem',    
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'omanUsedMem',      
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'omanCacheMem',      
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'omanBufferMem',      
                                            }
                                        ],
                        flex: 1
                    },
//                    {
//                        title: 'UAE SERVER',
//                                items: [
//                                            {
//                                                layout : 'fit',
//                                                items : [{
//                                                    xtype : uaeChart,
//                                                }]
//                                            },
//                                            {
//                                                xtype : 'label',
//                                                id: 'uaeTotalMem',    
//                                            },
//                                            {
//                                                xtype : 'label',
//                                                id: 'uaeUsedMem',      
//                                            },
//                                            {
//                                                xtype : 'label',
//                                                id: 'uaeCacheMem',      
//                                            },
//                                            {
//                                                xtype : 'label',
//                                                id: 'uaeBufferMem',      
//                                            }
//                                        ],
//                        flex: 1
//                    },
                    {
                        title: 'KSA SERVER',
                                items: [
                                            {
                                                layout : 'fit',
                                                items : [{
                                                    xtype : ksaChart,
                                                }]
                                            },
                                            {
                                               xtype : 'label',
                                                id: 'ksaTotalMem',    
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'ksaUsedMem',      
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'ksaCacheMem',      
                                            },
                                            {
                                                xtype : 'label',
                                                id: 'ksaBufferMem',      
                                            }
                                        ],
                        flex: 1
                    }
                ],
                region: 'north',
                collapsible: false,
            },
            {
                layout: 'fit',
                items: [{
                        title: 'Tenant Details',
                        xtype: tenantGrid,
//                        flex: 1
                    },
//                {
//    			title :'Tenant Details',
////    			items : tenantGrid1,
//    			flex : 1
//    		},{
//    			title : 'Tenant Details',
//    			items : tenantGrid2,
//    			flex : 1
//    		}
                ],
                collapsible: false,
                region: 'center',
            }];
        me.callParent();
    }

});