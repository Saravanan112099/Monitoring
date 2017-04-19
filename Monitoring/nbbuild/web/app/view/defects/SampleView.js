Ext.util.CSS.createStyleSheet(
        '.style-fieldset {border-radius: 4px;margin : 5px}.font-weight{font-weight: 900;vertical-align: middle;font-size : 15px !important;font-family : serif} .biggertext { vertical-align: middle;font-size : 15px !important;font-family : serif}.medtext {font-size : 14px !important;} .text-wrapper {   word-break: break-word;   word-wrap: break-word;} .comment-window {display: inline-block;background-color: #eae6e6;border-radius: 7px;display: flex;min-width : 50%;max-width: 97%;padding: 5px;margin : 5px;float : left}'
        );
Ext.define('app.view.defects.SampleView',{
	extend : 'Ext.panel.Panel',
	alias: 'widget.detailedView',
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
	autoScroll: true,
//	title : 'Defect Details',
//	titleAlign: 'center',
	header:{
        titlePosition:3,
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
						    	  	var card = Ext.getCmp('layout_card');
		                            var cardLayout = card.getLayout();
		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
		                        	cardLayout.setActiveItem(2);
						      }, c);
						    }
						  }
					},
					{
						xtype : 'label',
						text : ' | '
					},
					{
						xtype : 'label',
						html : '<a style="font-size:14px;text-decoration: none;" href="#">&nbspHome</a>',
						listeners: {
						    render: function(c){
						      c.getEl().on('click', function(){
						    	  	var card = Ext.getCmp('layout_card');
		                            var cardLayout = card.getLayout();
		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
		                        	cardLayout.setActiveItem(0);
						      }, c);
						    }
						  }
					}
					]
    },
	items : [
	         {
	        	 xtype : 'panel',
	        	 title : '<b style="font-size:14px;">Defect Details</b>',
	        	 titleAlign:'center',
//	             html  : 'Panels can contain Children',
	             frame : true,
	             style :{
//	         		'background-color' : 'lightgray',
	         		'border-width' : '1px',
	         	},
	             width    : 860,
	             height   : 750,
	             items : [{
	            	 	xtype : 'container',
	            	 	width :'850px',
	            	 	height : '25px',
	            	 	layout : {
	            	 		type : 'hbox',
	            	 		align : 'center',
	            			pack : 'center'
	            	 	},
	            	 	style : {
//	            	 		'float' : 'left',
//	            	 		'margin-left' : '3px',
		            		'padding' : '2px',
	            	 		'border-width' : '1px',
	            	 		'border-color' : 'gray',
		            	    'border-style': 'ridge'
	            	 	},
	            	 	items : [{
	            	 		xtype : 'displayfield',
	            	 		id : 'dtlUserName',
	            	 		flex : 1,
	            	 		labelCls: 'font-weight',
	            	 		fieldCls: 'medtext',
	            	 		fieldLabel : 'User Name',
	            	 		value : 'qa.dominos@cuetrans.com'
	            	 	},
	            	 	{
	            	 		xtype : 'displayfield',
	            	 		id : 'dtlTenantName',
	            	 		labelCls: 'font-weight',
	            	 		fieldCls: 'medtext',
	            	 		flex : 1,
	            	 		fieldLabel : 'Tenant Name',
	            	 		value : 'dominos_tenant'
	            	 	}]
	            	 	
	             	},
	             	{
	             		xtype : 'container',
	             		items : [{
	   	            	 xtype : 'fieldset',
		            	 title : '<b class = "biggertext">Basic Details</b>',
		            	 columnWidth: 0.5,
		            	 defaults: {anchor: '100%'},
		            	 height : '100%',
		            	 layout: {
	                         type: 'vbox',
	                         // pack: 'start',
	                         align: 'stretch'
	                     },
//		            	 width : '50%',
//		            	 padding : '5px',
		            	 style : {
		            		'float' : 'left',
		            		'padding' : '5px',
		            		'width': '420px',
		            	    'margin': '2px',
		            	    'border-width' : '1px',
	            	 		'border-color' : 'gray',
		            	    'border-style': 'ridge'
		            	 },
		            	 fieldDefaults: {
	                         labelAlign: 'left',
	                         labelWidth: 150
	                     },
		            	 items : [
//		            	    {
//		            		 html  : 'Panels can contain Children',
//		            	    },
		            	 {
		            		xtype : 'displayfield',
		            		id : 'dtlId',
	            	 		labelCls: 'font-weight',
	            	 		fieldCls: 'medtext',
	            	 		flex : 1,
	            	 		fieldLabel : 'Defect ID',
	            	 		value : '1002'
		            		 
		            	 },{
		            		 xtype: 'combobox',
		            		 id : 'dtlStatus',
		            		 labelCls: 'font-weight',
	            	 		 fieldCls: 'medtext',
		            		 fieldLabel: 'Status',
		            		 store: ['NEW','OPEN', 'IN PROGRESS', 'FIXED'],
		            		 queryMode: 'local',
		            		 emptyText:'Select Series',
		            		 forceSelection:true,
		            		 editable: false,
		            		 listeners: {
		            		        afterrender: function() {
		            		           this.setValue('OPEN');
		            		        }
		            		    }
		            	 },{
		            		xtype : 'displayfield',
		            		id : 'dtlSubmittedDate',
	            	 		labelCls: 'font-weight',
	            	 		fieldCls: 'medtext',
	            	 		flex : 1,
	            	 		fieldLabel : 'Submitted Date',
//	            	 		value : '2017-03-31 13:47:13 IST',
	            	 		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T'),
//	            	 		renderer : function(v){
//	            	 			
//	            	 		}
		            	 },{
		            		 xtype: 'datefield',
		            		 id : 'dtlDeliveryDate',
		                     fieldLabel: 'Delivery Date',
		                     labelCls: 'font-weight',
		            	 	 fieldCls: 'medtext',
//		                     value: '-',
//		                     minValue : new Date(),
		                     format: "Y-m-d H:i:s T",
//		                     listeners: {
//		                         select: function(combo, value) {
//		                              todate=value;
//
//		                         }
//		                     }
		            	 },
		            	 {
		            		xtype : 'displayfield',
		            		id : 'dtlLastModifiedDate',
	            	 		labelCls: 'font-weight',
	            	 		fieldCls: 'medtext',
	            	 		flex : 1,
	            	 		fieldLabel : 'Last Modified Date',
	            	 		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T'),
//	            	 		value : '2017-03-08 13:47:13 IST'
		            	 }]
		            	 
		             },{
		            	 xtype : 'fieldset',
		            	 title : '<b class = "biggertext" >Defect Details</b>',
		            	 columnWidth: 0.5,
		            	 height : '100%',
		            	 defaults: {anchor: '100%'},
		            	 layout: {
	                         type: 'vbox',
	                         // pack: 'start',
	                         align: 'stretch'
	                     },
//		            	 width : '50%',
//		            	 padding : '5px',
		            	 style : {
		            		'float' : 'right',
		            		'padding' : '5px',
		            		'width': '420px',
		            	    'margin': '2px',
		            	    'border-width' : '1px',
	            	 		'border-color' : 'gray',
		            	    'border-style': 'ridge'
		            	 },
		            	 fieldDefaults: {
	                         labelAlign: 'left',
	                         labelWidth: 150
	                     },
		            	 items : [{
			            		xtype : 'displayfield',
			            		id : 'dtlWindow',
		            	 		labelCls: 'font-weight',
		            	 		fieldCls: 'medtext',
		            	 		flex : 1,
		            	 		fieldLabel : 'Window Name',
		            	 		value : 'Reports'
			            	 },
			            	 {
			            		xtype : 'displayfield',
			            		id : 'dtlComponent',
		            	 		labelCls: 'font-weight',
		            	 		fieldCls: 'medtext',
		            	 		flex : 1,
		            	 		fieldLabel : 'Module Name',
		            	 		value : 'Asset Summary Report'
			            	 },
//			            	 {
//			            		xtype : 'displayfield',
//			            		id : 'dtl',
//		            	 		labelCls: 'font-weight',
//		            	 		fieldCls: 'medtext',
//		            	 		flex : 1,
//		            	 		fieldLabel : 'Attachments',
//		            	 		value : '-'
//			            	 },
			            	 {
                                 xtype: 'displayfield',
                                 labelCls: 'font-weight',
                                 fieldCls: 'medtext',
                                 fieldLabel: 'Attachments',
                                 flex : 1,
                                 id: 'dtlAttachments_1_fname',
                                 name: 'attachments',
                                 hidden: true,
                                 store: Ext.create('Ext.data.Store', {
                                     fields: ['attachment_id', 'attachment_name', 'created_dt'],
                                     data: [{
                                             'attachment_id': 1016,
                                             'attachment_name': 'SomeFile',
                                             'created_dt': 1489401434
                                         }],
                                 }),
                                 listeners: {
                                     afterrender: function(component, a, b, c) {
                                    	 console.log('Rendered')
                                    	 console.log(component)
                                         component.getEl().on('click', function() {
                                             if (component.value != '-') {
                                                 var attachment_id = component.store.data.items[0].data.attachment_id;
                                                 window.open("GetDefectServlet?attachment_id=" + attachment_id);
                                             }
                                         });
                                     }
                                 },
                                 value: '-'
                             },
                             {
                                 xtype: 'displayfield',
                                 labelCls: 'font-weight',
                                 fieldCls: 'medtext',
//                                 style : {
//                                	'background:' : 'bisque' 
//                                 },
                                 labelSeparator : "",
                                 fieldLabel: ' ',
                                 hidden: true,
                                 id: 'dtlAttachments_2_fname',
                                 store: Ext.create('Ext.data.Store', {
                                     fields: ['attachment_id', 'attachment_name', 'created_dt'],
                                     data: [{
                                             'attachment_id': 1016,
                                             'attachment_name': 'SomeFile',
                                             'created_dt': 1489401434
                                         }],
                                 }),
                                 listeners: {
                                     afterrender: function(component, a, b, c) {
                                         component.getEl().on('click', function() {
                                             if (component.value != '-') {
                                                 var attachment_id = component.store.data.items[0].data.attachment_id;
                                                 window.open("GetDefectServlet?attachment_id=" + attachment_id);
                                             }
                                         });
                                     }
                                 },
                                 value: '-'
                             },
                             {
                                 xtype: 'displayfield',
                                 labelCls: 'font-weight',
                                 fieldCls: 'medtext',
                                 labelSeparator : "",
                                 fieldLabel: ' ',
                                 hidden: true,
                                 id: 'dtlAttachments_3_fname',
                                 store: Ext.create('Ext.data.Store', {
                                     fields: ['attachment_id', 'attachment_name', 'created_dt'],
                                     data: [{
                                             'attachment_id': 1016,
                                             'attachment_name': 'SomeFile',
                                             'created_dt': 1489401434
                                         }],
                                 }),
                                 listeners: {
                                     afterrender: function(component, a, b, c) {
                                         component.getEl().on('click', function() {
                                             if (component.value != '-') {
                                                 var attachment_id = component.store.data.items[0].data.attachment_id;
                                                 window.open("GetDefectServlet?attachment_id=" + attachment_id);
                                             }
                                         });
                                     }
                                 },
                                 value: '-'
                             },
                             {
                                 xtype: 'displayfield',
                                 labelCls: 'font-weight',
                                 fieldCls: 'medtext',
                                 labelSeparator : "",
                                 fieldLabel: ' ',
                                 hidden: true,
                                 id: 'dtlAttachments_4_fname',
                                 store: Ext.create('Ext.data.Store', {
                                     fields: ['attachment_id', 'attachment_name', 'created_dt'],
                                     data: [{
                                             'attachment_id': 1016,
                                             'attachment_name': 'SomeFile',
                                             'created_dt': 1489401434
                                         }],
                                 }),
                                 listeners: {
                                     afterrender: function(component, a, b, c) {
                                         component.getEl().on('click', function() {
                                             if (component.value != '-') {
                                                 var attachment_id = component.store.data.items[0].data.attachment_id;
                                                 window.open("GetDefectServlet?attachment_id=" + attachment_id);
                                             }
                                         });
                                     }
                                 },
                                 value: '-'
                             },
                             {
                                 xtype: 'displayfield',
                                 labelCls: 'font-weight',
                                 fieldCls: 'medtext',
                                 labelSeparator : "",
                                 fieldLabel: ' ',
                                 hidden: true,
                                 id: 'dtlAttachments_5_fname',
                                 store: Ext.create('Ext.data.Store', {
                                     fields: ['attachment_id', 'attachment_name', 'created_dt'],
                                     data: [{
                                             'attachment_id': 1016,
                                             'attachment_name': 'SomeFile',
                                             'created_dt': 1489401434
                                         }],
                                 }),
                                 listeners: {
                                     afterrender: function(component, a, b, c) {
                                         component.getEl().on('click', function() {
                                             if (component.value != '-') {
                                                 var attachment_id = component.store.data.items[0].data.attachment_id;
                                                 window.open("GetDefectServlet?attachment_id=" + attachment_id);
                                             }
                                         });
                                     }
                                 },
                                 value: '-'
                             },
			            	 ]
		            	 
		             }]
	             	},
	             	{
	                    xtype: 'container',
	                    style: {
//	                        'margin-left': '5px',
	                        'background': 'rgba(191, 188, 188, 0.682353)',
	                        'margin-bottom': '1px',
	                        'margin-top': '10px'
	                    },
	                    width: "100%",
	                    items: [
	                        {
	                            xtype: 'label',
	                            html: '<b>Title</b>',
	                            cls: 'biggertext',
	                            style: {
	                                'margin-left': '5px'
	                            }
	                        },
	                    ]
	                },
	                {
	                    xtype: 'label',
	                    id: 'dtlSubject',
//	                    style: {
//	                        'margin-left': '5px',
//	                        'border': 'inset 1px white',
//	                        'border-width': '1px',
//	                        'margin-top': '2px',
//	                        'margin-bottom': '2px',
//	                        'min-height': '27px'
//	                    },
	                    width: "100%",
	                    text: '',
	                },
	                {
	                    xtype: 'container',
	                    style: {
//	                        'margin-left': '5px',
	                        'background': 'rgba(191, 188, 188, 0.682353)',
	                        'margin-bottom': '1px',
	                        'margin-top': '10px'
	                    },
	                    width: "100%",
	                    items: [
	                        {
	                            xtype: 'label',
	                            html: '<b>Description</b>',
	                            cls: 'biggertext',
	                            style: {
	                                'margin-left': '5px'
	                            }
	                        },
	                    ]
	                },
	                {
	                    xtype: 'label',
	                    id: 'dtlDescription',
//	                    style: {
//	                        'margin-left': '5px',
//	                        'border': 'inset 1px white',
//	                        'border-width': '1px',
//	                        'margin-top': '2px',
//	                        'margin-bottom': '2px',
//	                        'min-height': '27px'
//	                    },
	                    width: "100%",
	                    text: '',
	                },
	                {
	                    xtype: 'container',
	                    style: {
//	                        'margin-left': '5px',
	                        'background': 'rgba(191, 188, 188, 0.682353)',
	                        'margin-bottom': '1px',
	                        'margin-top': '10px'
	                    },
	                    width: "100%",
	                    items: [
	                        {
	                            xtype: 'label',
	                            html: '<b>Comments</b>',
	                            cls: 'biggertext',
	                            style: {
	                                'margin-left': '5px'
	                            }
	                        },
	                    ]
	                },
	                {
	                    xtype: 'container',
	                    layout: {
	                        type: 'hbox',
	                        pack: "center",
	                        align: "bottom"
	                    },
	                    style: {
//	                        'margin-left': '5px',
//	                        'background': 'rgba(191, 188, 188, 0.682353)',
	                        'margin-bottom': '1px',
	                        'margin-top': '5px'
	                    },
	                    width: '100%',
	                    items: [
	                        {
	                            xtype: 'textarea',
	                            id: 'dtlComments',
	                            width: '85%',
	                            listeners: {
	                                'change': function() {
	                                    if (this.getValue().length > 499) {
	                                        this.setValue(this.getValue().substr(0, 499));
	                                        Ext.Msg.alert('Alert', 'Input Character Count Should Be Below 500');
	                                    }
	                                }
	                            },
	                            style: {
//	                                'margin-left': '5px',
	                                'padding-right': '5px'
	                            },
	                            fieldStyle: {
	                                'border': 'inset 2px white',
	                            }
	                        },
	                        {
							    xtype: 'button',
							    flex: 1,
							    dock: 'bottom',
							    padding: 5,
							    text: 'Send Comments',
							    handler: function(b) {
							        var formDialog = b.up('detailedView');
							        var defect_id = Ext.getCmp('dtlId');
							        var sendBy = Ext.getCmp('dtlSendBy');
							        var comm = Ext.getCmp('dtlComments');
							        formDialog.fireEvent('onSubmitComments', formDialog, defect_id,sendBy, comm);
							    }
							}
//	                        {
//	                        	xtype : 'container',
//	                        	height : '100%',
//	                        	width: '20%',
//	                        	style : {
//	                        		'margin-left' : '5px'
//	                        	},
//	                        	layout : {
//	                        		type : 'vbox',
////	                        		align : 'top',
////	                        		pack : 'stretch'
//	                        	},
//	                        	items : [
//											{
//												xtype: 'combobox',
//												 id : 'dtlSendBy',
////												 labelCls: 'font-weight',
////												 fieldCls: 'medtext',
//												 width : 160,
//												 fieldStyle: {
////													 'background': 'rgba(191, 188, 188, 0.682353)',
////													 'margin-top' : '-10px'
////													 	'width': '100px!important'
//													},
////												 fieldLabel: 'Status',
////												 store: ['NEW','OPEN', 'IN PROGRESS', 'FIXED'],
//											//	 queryMode: 'local',
//												 emptyText:'Send By',
//											//	 forceSelection:true,
//											//	 editable: false,
//												
//											},
//											{
//											    xtype: 'button',
//											    flex: 1,
//											    dock: 'bottom',
//											    padding: 5,
//											    text: 'Send Comments',
//											    handler: function(b) {
//											        var formDialog = b.up('detailedView');
//											        var defect_id = Ext.getCmp('dtlId');
//											        var sendBy = Ext.getCmp('dtlSendBy');
//											        var comm = Ext.getCmp('dtlComments');
//											        formDialog.fireEvent('onSubmitComments', formDialog, defect_id,sendBy, comm);
//											    }
//											}
//	                        	        ]
//	                        },
	                        ,
	                    ]
	                },
	                {
	                    xtype: 'container',
	                    id: 'coment-container',
	                    width: '100%',
	                    height: '300px',
	                    autoScroll: true,
//	                    layout : 'fit',
	                    style: {
	                        'overflow': 'auto',
	                        'margin-top': '5px',
//	                        'margin-left': '5px',
	                        'margin-right': '5px',
//	                        'border': 'inset',
	                        'border-width': '1px',
//	                        'padding-left': '4px',
	                    },
	                    items: [
	                            {
	                            	html: '<div style="width:100%;min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Commented by : <b>Support Team</b></div><div style="float:right;">Date : <b>2017-03-08 13:47:13 IST</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>Requested to get the Defect Lists</span></div></div>'
	                            }	                            
	                    ]
	                }
	             	]
	         }
	        ]
})