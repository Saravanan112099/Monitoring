Ext.define('app.view.tenant.AssetDetailsGrid', {
    alias: 'widget.assetDetailsGrid',
//    store: Ext.create('MyApp.store.Marks'),
    layout : 'fit',
    extend: 'Ext.grid.Panel',
    store: 'app.store.AssetDetailsStore',
//    tbar : [
//        {
//          xtype: 'exportbutton',
////          store: 'app.store.AssetDetailsStore'
//        }
//      ],
//    autoShow: true,
//    loadMask: true,
    height : 500,
    width: 800,
    columns: {
        items: [
                    
//                    new Ext.grid.RowNumberer(),
                    {
                        text : 'S.No',
                        xtype: 'rownumberer',
                        width: 40,
//                        sortable: false,
//                        locked: true
                    },
                    {
                            text: 'Reg No',
//					align: 'center',
                            dataIndex: 'REG_NO',
//                            flex: 0.5
                            minWidth : '100'
//					width : 40
                    },
                    {
//					text: 'Non Reporting (2 hrs)',
                            text: 'Date/Time',
                            dataIndex: 'CREATED_DT',
                            minWidth : '140',
//                            renderer : function(value,metaData,record){
////						var d = new Date(parseInt(value));
//                                                var d = new Date(value);
//                                                if(value == null){
//                                                        return "0000-00-00 00:00:00";
//                                                }else{
//                                                        return Ext.util.Format.date(d, 'Y-m-d H:i:s T');
//                                                }
//
//					}
//					width : 40
                    },
                    {
//					text: 'Non Reporting (4 hrs)',
                            text: 'Speed',
//					align: 'center',
                            dataIndex: 'SPEED',
//                            flex: 1
                            minWidth : '100'
//					width : 40
                    },
                    {
//					text: 'Non Reporting (6 hrs)',
                            text: 'Ignition',
                            dataIndex: 'IGNITION',
                            flex: 0.25,
//                            renderer : function(value,metaDate,record){
//                                if(value == true){
//                                    record.set(true,'ON');
////                                    return 'ON';
//                                }else{
//                                    
//                                    return 'OFF';
//                                }
//                            }
//					width : 40
                    },
                    {
//					text: 'Non Reporting (6 hrs)',
                            text: 'Address',
                            dataIndex: 'DISTANCE',
                            flex: 1
//					width : 40
                    }]
    }
})

