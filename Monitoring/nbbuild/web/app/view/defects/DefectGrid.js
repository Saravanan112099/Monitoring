Ext.define('app.util.Utilities', {
    statics: {
        gridRowId : null,
    }
});
var storeWindow = Ext.data.StoreManager.lookup('app.store.defect.ModuleStore');
var storeComponent = Ext.data.StoreManager.lookup('app.store.defect.ComponentStore');
var storeTenantName = Ext.data.StoreManager.lookup('app.store.defect.TenantNameStore');
var isCellEdited = null;
var originalValue = null;
var editedValue = null;

Ext.define('app.view.defects.DefectGrid',{
					alias : 'widget.defectGridView',
					id : 'defect_grid',
					extend : 'Ext.grid.Panel',
					requires: [
					           'Ext.ux.grid.FiltersFeature',
					           'Ext.ux.grid.filter.ListFilter',
					           'Ext.ux.grid.menu.ListMenu'
					           ],
					// renderTo: document.body,
					layout : 'fit',
					autoShow : true,
					// height: 620,
					// width: 300,
					closable : false,
					resizable : false,
					store : 'app.store.DefectStore',
					title : '<b style="font-size:14px;">Defects List</b>',
		        	titleAlign:'center',
					viewConfig : {
						getRowClass : function(record, rowIndex, rp, ds) {
							// if (record.get('totalVehicles') == 0) {
							// return 'zerodata';
							// }
						},
						markDirty:false
					},
					vars : {
						defectId : null,
						beforeValue : null,
						edittedValue : null
					},
					listeners:{
						validateedit: function(event,editor,b){
//			                	console.log(event);
//			                	console.log(editor);
//			                	console.log(b);
			                    if(!editor.value)
			                        return false;
			                    else 
			                   return true;
						},
						edit : function(editor, e){
							var rowIdx = e.rowIdx;
							var dataIdx = e.field;
//							console.log(a);
//							console.log(b);
//							console.log(c);
							
							if(e.originalValue != e.value){
								console.log('Some Changes Happened');
								console.log(e.value);
//								var formDialog = editor.up('defectGridView');
								var formDialog = Ext.getCmp('panel_home');
								var recordId = e.record.get('defect_id');
								var newValue = e.value;
								var colName = e.field
								Ext.Msg.confirm('Confirm', 'Are you sure you want edit?', function(btn){
									if (btn == 'yes'){
										var d = new Date(newValue);
										if(!isNaN(d.getTime())){
											newValue = d.getTime()/1000;
										}
				                    	formDialog.fireEvent('onUpdate',formDialog,colName,recordId,newValue,rowIdx);
				                    }else{
										console.log('No Changes');
										var grid = Ext.getCmp('defect_grid');
				                    	var b = grid.getStore().getRange()
				                    	b[rowIdx].set(dataIdx,e.originalValue)
				                    }
				                  });
							}else{
//								canceledit;
								console.log('No Changes');
							}
						},
						canceledit: function(editor, context) {
							console.log('Edit Cancelled');
				        }	
			        },
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
			    		                        	cardLayout.setActiveItem(0);
			    						      }, c);
			    						    }
			    						  }
			    					}
			    					]
			        },
			        columnLines : true,

			        stripeRows: true,
			        filterable: true,
			        features: [{
			            ftype: 'filters',
			            encode: false,
			            local: true
			        }],
			        plugins : [
		                 Ext.create('Ext.grid.plugin.CellEditing', {
		                     clicksToEdit: 1,		                     
		                 })
		             ],
					columns : {
						defaults: {
				            listeners: {
				            	contextMenu : new Ext.menu.Menu({
				            		  items: [{
				            		    text: 'Edit',
				            		    iconCls: 'edit',
//				            		    handler: edit
				            		  }]
				            		}),
				            	'contextmenu' : function() {
				            	     console.log('You clicked the right mousebutton on me');
				            	   },				            	
				                'dblclick': function(grid, rowIndex, columnIndex, e, div, items) {
//				                	console.log('Double Clicked');
				                	var card = Ext.getCmp('layout_card');
				                    var cardLayout = card.getLayout();
				                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
				                	cardLayout.setActiveItem(3);
//				                    var ids = ['dtlId', 'dtlUserName', 'dtlTenantName', 'dtlsubmittedDate', 'dtlDeliveryDate', 'dtlWindow', 'dtlComponent', 'dtlSubject', 'dtlDescription'];
//				                    var flds = ['defect_id', 'user_nm', 'tenant_nm', 'submitted_dt', 'deliver_dt', 'module', 'component', 'subject', 'description']
//				                    var commStore = Ext.data.StoreManager.lookup('commentsStore');
//				                    commStore.loadRawData(items.get('comments'));
				                	Ext.getCmp('dtlUserName').setValue(items.get('user_nm'));
				                	Ext.getCmp('dtlTenantName').setValue(items.get('tenant_nm'));
				                    Ext.getCmp('dtlId').setValue(items.get('defect_id'));
				                    Ext.getCmp('dtlStatus').setValue(items.get('status'));
				                    Ext.getCmp('dtlSubmittedDate').setValue(items.get('created_dt'));
//				                    Ext.getCmp('dtlSubmittedDate').setValue(new Date());
//				                    Ext.getCmp('dtlSubmittedDate').setValue('Fri Mar 24 2017 14:48:23 GMT+0530 (India Standard Time)');
				                    Ext.getCmp('dtlDeliveryDate').setValue(items.get('deliver_dt'));
				                    Ext.getCmp('dtlLastModifiedDate').setValue(items.get('modified_dt'));
				                    Ext.getCmp('dtlWindow').setValue(items.get('module'));
				                    Ext.getCmp('dtlComponent').setValue(items.get('component'));
				                    Ext.getCmp('dtlSubject').el.setHTML('<div style="border:inset 1px white;border-width:2px;padding:5px;font: 300 13px/15px helvetica,arial,verdana,sans-serif;max-height: 100px;overflow: auto;white-space: pre-wrap;">' + items.get('subject') + '<div>');
				                    Ext.getCmp('dtlDescription').el.setHTML('<div style="border:inset 1px white;border-width:2px;padding:5px;font: 300 13px/15px helvetica,arial,verdana,sans-serif;max-height: 120px;overflow: auto;white-space: pre-wrap;">' + items.get('description') + '<div>');
//
				                    var att_ids = ['dtlAttachments_1_fname', 'dtlAttachments_2_fname', 'dtlAttachments_3_fname', 'dtlAttachments_4_fname', 'dtlAttachments_5_fname'];
				                    var attachments = items.get('attachments');
				                    for (var i = 0; i < 5; i++) {
				                        Ext.getCmp(att_ids[i]).hide();
				                    }
				                    if (attachments != null) {
//				                        console.log(attachments.length);
				                        for (var i = 0; i < attachments.length; i++) {
//				                            console.log(i);
				// Ext.getCmp(att_ids[i]).setValue('-');
				                            Ext.getCmp(att_ids[i]).show();
				                            Ext.getCmp(att_ids[i]).store.loadRawData(attachments[i]);
				                            Ext.getCmp(att_ids[i]).setValue('<a href="#">' + attachments[i].attachment_name + '</a>');
				                        }
				                    }
				                    var comments = items.get('comments');
				                    var comContainer = Ext.getCmp('coment-container');
				                    app.util.Utilities.gridRowId = items.internalId;
				                    if (comments != null) {
				                        comContainer.removeAll();
				                        for (var i = 0; i < comments.length; i++) {
				                            var d = new Date(parseInt(comments[i].created_dt) * 1000);
				                            var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
				                            var itm = {
				                                html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Sent by : <b>' + comments[i].created_by + '</b></div><div style="float:right;">Date : <b>' + dt + '</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>' + comments[i].comment + '</span></div></div>'
				                            };
				                            comContainer.add(itm);
				                        }
				                    } else {
				                        comContainer.removeAll();
				                    }

//				                    Ext.getCmp('layout_card').getLayout().setActiveItem(3);
//				                    Ext.getCmp('layout_card').setTitle('Details');
				                }
				            }
				        },
						items : [ {
							text : 'S.No',
							xtype : 'rownumberer',
							width : 30,
							// sortable: false,
							// locked: false,
							align : 'center'
						}, {
							text : 'Defect Id',
							type : 'string',
							tooltip : 'Defect Id',
							dataIndex : 'defect_id',
							flex : 0.5,
							filter: {
										type: 'numeric',
//										menuItemCfgs: {
//								            minValue: 1020,  // Or 0, or whatever you want
//								            fieldLabel : 'Minimum',
//								            fieldLabel : 'Maximum'
//								        },
								        
										fields: {
						                    lt: {
						                    	fieldLabel : '<',
						                    	emptyCls: 'empty-text-field'
//						                    	fieldCls : 'icon-back'
//						                    	iconCls: 'icon-back'
						                    },
						                    gt: {
						                    	fieldLabel : '>',
						                    },
						                    eq: {
						                    	fieldLabel : '=',
						                    }
						                }
									},
						}, {
							text : 'Module',
							tooltip : 'Module',
							dataIndex : 'module',
							flex : 0.5,
							filter: {    
								type: 'string',
							    emptyText: 'Enter Filter Text...',
							},
						}, {
							text : 'Component',
							tooltip : 'Component',
							dataIndex : 'component',
							flex : 0.8,
							filter: {    
								type: 'string',
								emptyText: 'Enter Filter Text...',
									},
//							renderer : function(value, metaData, record) {
//							}
						}, {
							text : 'Subject',
							tooltip : 'Subject',
							dataIndex : 'subject',
							flex : 1,
							filter: {    
								type: 'string',
								emptyText: 'Enter Filter Text...',
									},
//							renderer : function(value, metaData, record) {
//							}
						}, {
							text : 'Description',
							tooltip : 'Description',
							dataIndex : 'description',
							flex : 1,
							filter: {    
								type: 'string',
								emptyText: 'Enter Filter Text...',
									},
						},{
							type : 'string',
							text : 'Status',
							tooltip : 'Status',
							dataIndex : 'status',
							flex : 0.7,
							filter: {    
								type: 'string',
								},
							tdCls: 'no-dirty',
							getEditor: function(record) {
							    return Ext.create('Ext.form.field.ComboBox', { 
//							            allowBlank: false,
							            editable: false,
							            selectOnFocus: true,
					                    forceSelection: true,
					                    store: [['OPEN', 'OPEN'], ['FIXED', 'FIXED'],['IN PROGRESS', 'IN PROGRESS']],
							    });
							},
						},
						{
							text : 'User Name',
							tooltip : 'User Name',
							dataIndex : 'user_nm',
							flex : 0.5,
							filter: {    
								type: 'string',
								},
						}, {
							text : 'Tenant Name',
							tooltip : 'Tenant Name',
							dataIndex : 'tenant_nm',
							flex : 0.5,
							filter: {    
								type: 'string',
								},
						}, {
							xtype: 'datecolumn',
							text : 'Submitted Date',
							tooltip : 'Created Date',
							dataIndex : 'created_dt',
							dateFormat: 'Y-m-d H:i:s T', 
							flex : 1,
							filter: {
			                    type: 'date',
			                    dataIndex: 'created_dt',
			                    dateFormat: 'Y-m-d H:i:s T',
			                    pickerDefaults: {
			                        // any DatePicker configs
			                    }
			                },
//				            renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T'),
							renderer : function(value, metaData, record) {
								value = value.toString();
//								console.log(valueindexOf(":"));
//								console.log(!isNaN(value));
								if(!isNaN(value)){
									var d = new Date(parseInt(value * 1000));
									var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
									return dt;
								}else{
									var d = new Date(value);
									if(!isNaN(d.getTime())){
										return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
									}else{
										return value;
									}
								}
								
							}
						}, {
							xtype: 'datecolumn',
							dateFormat: 'Y-m-d H:i:s T',
							text : 'Modified Date',
							tooltip : 'Modified Date',
							dataIndex : 'modified_dt',
							 flex: 1,
							 filter: {
				                    type: 'date',
				                    dataIndex: 'modified_dt',
				                    dateFormat: 'Y-m-d H:i:s T',
				                    pickerDefaults: {
				                        // any DatePicker configs
				                    }
				                },
//							 renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T'),
							 renderer : function(value, metaData, record) {
									value = value.toString();
									//	CHECK THE VALUE IS IS IN MILLIESECONDS
									if(!isNaN(value)){
										var d = new Date(parseInt(value * 1000));
										var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
										return dt;
									}else{
										var d = new Date(value);
										if(!isNaN(d.getTime())){
											return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
										}else{
											return value;
										}
									}
									
								}
						}, {
							xtype: 'datecolumn',
							text : 'Deliver Date',
							tooltip : 'Deliver Date',
							dataIndex : 'deliver_dt',
							dateFormat: 'Y-m-d H:i:s T',
							flex : 1,
							getEditor: function(record) {
							    return Ext.create('Ext.form.field.Date', { 
							            editable: false,
							            selectOnFocus: true,
					                    forceSelection: true,
							    });
							},
							filter: {
			                    type: 'date',
			                    dataIndex: 'deliver_dt',
			                    dateFormat: 'Y-m-d H:i:s T',
			                    pickerDefaults: {
			                        // any DatePicker configs
			                    }
			                },
//							renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s T'),
							renderer : function(value, metaData, record) {
//								console.log(value);
								if(value != null){
									value = value.toString();
									if(!isNaN(value)){
										var d = new Date(parseInt(value * 1000));
										var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
										return dt;
									}else{
										var d = new Date(value);
										if(!isNaN(d.getTime())){
											return Ext.util.Format.date(value, 'Y-m-d H:i:s T')
										}else{
											return value;
										}
									}
								}else{
									return value;
								}								
							}
						} ]
					}
				});