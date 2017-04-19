//Ext.util.CSS.createStyleSheet(
//        '.style-fieldset {border-radius: 4px;margin : 5px}.font-weight{font-weight: 900;vertical-align: middle;font-size : 15px !important;font-family : serif} .biggertext { vertical-align: middle;font-size : 15px !important;font-family : serif}.medtext {font-size : 14px !important;} .text-wrapper {   word-break: break-word;   word-wrap: break-word;} .comment-window {display: inline-block;background-color: #eae6e6;border-radius: 7px;display: flex;min-width : 50%;max-width: 97%;padding: 5px;margin : 5px;float : left}'
//        );
//Ext.define('app.view.defects.DetailedList',{
//	extend : 'Ext.panel.Panel',
//    // id: 'defectDetails',
//    defaultListenerScope: true,
//// bodyStyle: 'padding:5px;margin-top:-15px;',
//    closable: false,
////     width : 500,
////    width : 500,
////    height: 200,
////    layout: 'hbox',
//    autoScroll: true,
//    resizable: false,
//    items: [
//        {
//            xtype: 'form',
////            width : '900px',
//            layout: {
//                type: 'vbox',
//                align: 'center',
//                pack: 'center'
//            },
//            // anchor: '100%',
//            items: [
//                {
//                    xtype: 'container',
//                    id: 'defectDetails',
//                    // autoEl: 'left',
//                    layout: {
//                        type: 'hbox',
//                        // pack: 'start',
//                        align: 'stretch'
//                    },
//                    width: '100%',
//                    items: [
//                        {
//                            xtype: 'fieldset',
//                            cls: 'style-fieldset',
//                            // width: 350,
//                            flex: 1,
//                            columnWidth: 0.5,
//                            title: '<b class = "biggertext" style="color: gray;">Basic Information</b>',
//                            defaultType: 'textfield',
//                            // defaults: {anchor: '100%'},
//                            items: [
//                                {
//                                    xtype: 'container',
//                                    padding: '5px',
//                                    layout: {
//                                        type: 'vbox',
//                                        // pack: 'start',
//                                        align: 'stretch'
//                                    },
//                                    width: '100%',
//                                    flex: 1,
//                                    items: [
//                                        {
//                                            xtype: 'displayfield',
//                                            labelCls: 'font-weight',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Problem ID',
//                                            id: 'dtlId',
//                                            value: '12546',
//                                        },
//                                        {
//                                            xtype: 'displayfield',
//                                            labelCls: 'font-weight',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Submitted Date',
//                                            id: 'dtlsubmittedDate',
//                                            value: '-',
//                                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T')
//                                        },
//                                        {
//                                            xtype: 'displayfield',
//                                            labelCls: 'font-weight',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Status',
//                                            id: 'dtlStatus',
//                                            value: 'spTenant'
//                                        },
//                                        {
//                                            xtype: 'displayfield',
//                                            labelCls: 'font-weight',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Delivery Date',
//                                            id: 'dtlDeliveryDate',
//                                            value: '-',
//                                            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T')
//                                        }
//                                    ]
//                                }],
//                        },
//                        {
//                            xtype: 'fieldset',
//                            cls: 'style-fieldset', columnWidth: 0.5,
//                            // width: 350,
//                            flex: 1,
////                            fieldDefaults: {
////                                labelAlign: 'left',
////                                labelWidth: 150
////                            },
//                            title: '<b class = "biggertext" style="color: gray;">Detailed Information</b>',
//                            defaultType: 'textfield',
//                            defaults: {anchor: '100%'}, items: [
//                                {
//                                    xtype: 'container',
//                                    padding: '5px',
//                                    layout: {
//                                        type: 'vbox',
//                                        // pack: 'start',
//                                        align: 'stretch'
//                                    },
//                                    width: '100%',
//                                    flex: 1,
//                                    
//                                    items: [
//                                        {
//                                            xtype: 'textfield',
////                                            fieldBodyCls: 'x-form-trigger-wrap-default x-form-text x-form-text-default',
//                                            readOnly : true,
////                                            labelAlign: 'left',
////                                            labelWidth: 200,
//                                            labelCls: 'font-weight',
////                                            style : 'background-color:#FF0000',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Problem Window',
//                                            id: 'dtlWindow',
//                                            value: 'Reports'
//                                        },
//                                        {
//                                            xtype: 'displayfield',
//                                            fieldBodyCls: 'x-form-trigger-wrap-default x-form-text x-form-text-default',
//                                            labelCls: 'font-weight',
//                                            fieldCls: 'medtext',
//                                            fieldLabel: 'Problem Module',
//                                            id: 'dtlComponent',
//                                            value: 'Daily Summery Report'
//                                        },
////                                        {
////                                            xtype: 'displayfield',
////                                            labelCls: 'font-weight',
////                                            fieldCls: 'medtext',
////                                            fieldLabel: 'Attachments',
////                                            id: 'dtlAttachments_1_fname',
////                                            name: 'attachments',
////                                            hidden: true,
////                                            store: Ext.create('Ext.data.Store', {
////                                                fields: ['attachment_id', 'attachment_name', 'created_dt'],
////                                                data: [{
////                                                        'attachment_id': 1016,
////                                                        'attachment_name': 'SomeFile',
////                                                        'created_dt': 1489401434
////                                                    }],
////                                            }),
////                                            listeners: {
////                                                afterrender: function(component, a, b, c) {
////                                                    component.getEl().on('click', function() {
////                                                        if (component.value != '-') {
////                                                            var attachment_id = component.store.data.items[0].data.attachment_id;
////                                                            window.open("GetDefectsServlet?attachment_id=" + attachment_id);
////                                                        }
////                                                    });
////                                                }
////                                            },
////                                            value: '-'
////                                        },
////                                        {
////                                            xtype: 'displayfield',
////                                            labelCls: 'font-weight',
////                                            fieldCls: 'medtext',
////                                            hidden: true,
////                                            id: 'dtlAttachments_2_fname',
////                                            store: Ext.create('Ext.data.Store', {
////                                                fields: ['attachment_id', 'attachment_name', 'created_dt'],
////                                                data: [{
////                                                        'attachment_id': 1016,
////                                                        'attachment_name': 'SomeFile',
////                                                        'created_dt': 1489401434
////                                                    }],
////                                            }),
////                                            listeners: {
////                                                afterrender: function(component, a, b, c) {
////                                                    component.getEl().on('click', function() {
////                                                        if (component.value != '-') {
////                                                            var attachment_id = component.store.data.items[0].data.attachment_id;
////                                                            window.open("GetDefectsServlet?attachment_id=" + attachment_id);
////                                                        }
////                                                    });
////                                                }
////                                            },
////                                            value: '-'
////                                        },
////                                        {
////                                            xtype: 'displayfield',
////                                            labelCls: 'font-weight',
////                                            fieldCls: 'medtext',
////                                            hidden: true,
////                                            id: 'dtlAttachments_3_fname',
////                                            store: Ext.create('Ext.data.Store', {
////                                                fields: ['attachment_id', 'attachment_name', 'created_dt'],
////                                                data: [{
////                                                        'attachment_id': 1016,
////                                                        'attachment_name': 'SomeFile',
////                                                        'created_dt': 1489401434
////                                                    }],
////                                            }),
////                                            listeners: {
////                                                afterrender: function(component, a, b, c) {
////                                                    component.getEl().on('click', function() {
////                                                        if (component.value != '-') {
////                                                            var attachment_id = component.store.data.items[0].data.attachment_id;
////                                                            window.open("GetDefectsServlet?attachment_id=" + attachment_id);
////                                                        }
////                                                    });
////                                                }
////                                            },
////                                            value: '-'
////                                        },
////                                        {
////                                            xtype: 'displayfield',
////                                            labelCls: 'font-weight',
////                                            fieldCls: 'medtext',
////                                            hidden: true,
////                                            id: 'dtlAttachments_4_fname',
////                                            store: Ext.create('Ext.data.Store', {
////                                                fields: ['attachment_id', 'attachment_name', 'created_dt'],
////                                                data: [{
////                                                        'attachment_id': 1016,
////                                                        'attachment_name': 'SomeFile',
////                                                        'created_dt': 1489401434
////                                                    }],
////                                            }),
////                                            listeners: {
////                                                afterrender: function(component, a, b, c) {
////                                                    component.getEl().on('click', function() {
////                                                        if (component.value != '-') {
////                                                            var attachment_id = component.store.data.items[0].data.attachment_id;
////                                                            window.open("GetDefectsServlet?attachment_id=" + attachment_id);
////                                                        }
////                                                    });
////                                                }
////                                            },
////                                            value: '-'
////                                        },
////                                        {
////                                            xtype: 'displayfield',
////                                            labelCls: 'font-weight',
////                                            fieldCls: 'medtext',
////                                            hidden: true,
////                                            id: 'dtlAttachments_5_fname',
////                                            store: Ext.create('Ext.data.Store', {
////                                                fields: ['attachment_id', 'attachment_name', 'created_dt'],
////                                                data: [{
////                                                        'attachment_id': 1016,
////                                                        'attachment_name': 'SomeFile',
////                                                        'created_dt': 1489401434
////                                                    }],
////                                            }),
////                                            listeners: {
////                                                afterrender: function(component, a, b, c) {
////                                                    component.getEl().on('click', function() {
////                                                        if (component.value != '-') {
////                                                            var attachment_id = component.store.data.items[0].data.attachment_id;
////                                                            window.open("GetDefectsServlet?attachment_id=" + attachment_id);
////                                                        }
////                                                    });
////                                                }
////                                            },
////                                            value: '-'
////                                        },
//                                    ]
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    xtype: 'container',
//                    style: {
//                        'margin-left': '5px',
//                        'background': 'rgba(191, 188, 188, 0.682353)',
//                        'margin-bottom': '1px'
//                    },
//                    width: "100%",
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Title',
//                            cls: 'biggertext',
//                            style: {
//                                'margin-left': '5px'
//                            }
//                        },
//                    ]
//                },
//                {
//                    xtype: 'label',
//                    id: 'dtlSubject',
//                    style: {
//                        'margin-left': '5px',
//                        'border': 'inset 1px white',
//                        'border-width': '1px',
//                        'margin-top': '2px',
//                        'margin-bottom': '2px',
//                        'min-height': '27px'
//                    },
//                    width: "100%",
//                    text: '',
//                },
//                {
//                    xtype: 'container',
//                    style: {
//                        'margin-left': '5px',
//                        'background': 'rgba(191, 188, 188, 0.682353)',
//                        'margin-bottom': '1px'
//                    },
//                    width: "100%",
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Description',
//                            cls: 'biggertext',
//                            style: {
//                                'margin-left': '5px'
//                            }
//                        },
//                    ]
//                },
//                {
//                    xtype: 'label',
//                    id: 'dtlDescription',
//                    style: {
//                        'margin-left': '5px',
//                        'border': 'inset 1px white',
//                        'border-width': '1px',
//                        'margin-top': '2px',
//                        'margin-bottom': '2px',
//                        'min-height': '27px'
//                    },
//                    width: "100%",
//                    text: '',
//                },
//                {
//                    xtype: 'container',
//                    style: {
//                        'margin-left': '5px',
//                        'background': 'rgba(191, 188, 188, 0.682353)',
//                        'margin-bottom': '1px'
//                    },
//                    width: "100%",
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Comments',
//                            cls: 'biggertext',
//                            style: {
//                                'margin-left': '5px'
//                            }
//                        },
//                    ]
//                },
//                {
//                    xtype: 'container',
//                    layout: {
//                        type: 'hbox',
//                        pack: "center",
//                        align: "bottom"
//                    },
//                    width: '100%',
//                    items: [
//                        {
//                            xtype: 'textarea',
////                            id: 'dtlComments',
//                            width: '80%',
//                            listeners: {
//                                'change': function() {
//                                    if (this.getValue().length > 499) {
//                                        this.setValue(this.getValue().substr(0, 499));
//                                        Ext.Msg.alert('Alert', 'Input Character Count Should Be Below 500');
//                                    }
//                                }
//                            },
//                            style: {
//                                'margin-left': '5px',
//                                'padding-right': '5px'
//                            },
//                            fieldStyle: {
//                                'border': 'inset 2px white',
//                            }
//                        },
//                        {
//                            xtype: 'button',
//                            flex: 1,
//                            dock: 'bottom',
//                            padding: 5,
//                            text: 'Send Comments',
//                            handler: function(b) {
//                                var formDialog = b.up('reportUs');
//                                var defect_id = Ext.getCmp('dtlId');
//                                var comm = Ext.getCmp('dtlComments');
//                                formDialog.fireEvent('onSubmitComments', formDialog, defect_id, comm);
//                            }
//                        },
//                    ]
//                },
//                {
//                    xtype: 'container',
////                    id: 'coment-container',
//                    width: '100%',
//                    style: {
//                        'overflow': 'auto',
//                        'margin-top': '5px',
//                        'margin-left': '5px',
//                        'margin-right': '5px',
//                        'border': 'inset',
//                        'border-width': '1px',
//                        'padding-left': '4px',
//                    },
//                    items: [
//                            {
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },
//                            {
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },
//                            {
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },
//                            {
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            },{
//                            	html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div><hr/>'
//                            }
//                            
//                    ]
//                }
//            ],
//        }
//    ]
//});