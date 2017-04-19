
//var storeWindow = Ext.data.StoreManager.lookup('app.store.defect.ModuleStore');
//var storeComponent = Ext.data.StoreManager.lookup('app.store.defect.ComponentStore');
//var storeTenantName = Ext.data.StoreManager.lookup('app.store.defect.TenantNameStore');
//var DefectStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
//var DefectStore = Ext.create('app.store.DefectStore');
var isCellEdited = null;
var originalValue = null;
var editedValue = null;
Ext.define('app.view.defects.DefectGridClosed',{
					alias : 'widget.defectGridClosed',
					id : 'defect_grid_closed',
					extend : 'Ext.grid.Panel',
					requires: [
					           'Ext.ux.grid.FiltersFeature',
//					           'Ext.ux.grid.filter.ListFilter',
					           'Ext.ux.grid.menu.ListMenu'
					           ],
					// renderTo: document.body,
					layout : 'fit',
					autoShow : true,
					// height: 620,
					// width: 300,
					closable : false,
					resizable : false,
//					store : DefectStore,
					store : 'app.store.defect.ClosedDefectStore',
//					title : '<b style="font-size:14px;">Closed Tickets</b>',
					title : 'Closed Tickets',
		        	titleAlign:'center',
					viewConfig : {
						getRowClass: function(record, rowIndex, rp, ds){
							var deliver_dt =  record.get('deliver_dt');
							var now = new Date();
							var val = record.get('status');
		            		if(val == 'CLOSED'){
//		            			console.log(rowIndex);
		            			return 'row-closed';
//		            			console.log(record);
		            		}
//		            		else if(deliver_dt < now){
//		            			return 'row-deliver';
//		            		}
		            		
		            	},
						markDirty:false
					},
					vars : {
						defectId : null,
						beforeValue : null,
						edittedValue : null
					},
					tools : [],
//					onRender:function(){
//						this.store.clearFilter();
//						var defectGridClosed = Ext.getCmp('defect_grid_closed');
//						defectGridClosed.store.filter(function(rec){
//				                var val = rec.get('status');
//				                return val == 'CLOSED' ;
//				            });
//				            this.callParent(arguments);
//					},
//					onShow:function(){
//						this.store.clearFilter();
//						var defectGridClosed = Ext.getCmp('defect_grid_closed');
//						defectGridClosed.store.filter(function(rec){
//				                var val = rec.get('status');
//				                return val == 'CLOSED' ;
//				            });
//				            this.callParent(arguments);
//					},
					listeners:{			
//						validateedit: function(rowEditor, changes, record, rowIndex){
//			                	console.log(rowEditor);
//			                	console.log(changes);
//			                	console.log(record);
//			                	console.log(rowIndex);
////			                    if(!editor.value)
////			                        return false;
////			                    else 
//			                   return true;
//						},
//						'selectionchange': function(view, records) {
//							console.log(view);
//							console.log(records);
////			                grid.down('#removeEmployee').setDisabled(!records.length);
//			            },
//						itemcontextmenu: function(tree, record, item, index, e, eOpts ) {
//							console.log(tree, record, item, index, e, eOpts );
//					          // Optimize : create menu once
//					          var menu_grid = new Ext.menu.Menu({ items:
//					            [
//					                { text: 'More details', handler: function() {console.log("Moreils");} },
//					                { text: 'Delete', handler: function() {console.log("Delete");}}
//					            ]
//					            });
//					          var position = e.getXY();
//					          e.stopEvent();
//					          if(e.target.offsetParent.cellIndex == 4){
//					        	  menu_grid.showAt(position);
//					          }
//					       },
			            cellclick: function (view, cell, cellIndex, items, row, rowIndex, e) {
//			            	console.log(view, cell, cellIndex, items, row, rowIndex, e)
			            	if(cellIndex == view.getGridColumns().length-1){
			                	console.log(items);
			                	app.util.Utilities.gridRowId = items.internalId;
			                    app.util.Utilities.gridRowIdx = rowIndex;
								app.util.Utilities.currentStatus = items.get('status');
								app.util.Utilities.currentDeliverDate = (items.get('deliver_dt') == null) ? '' : items.get('deliver_dt').getTime()/1000;
			                	var card = Ext.getCmp('layout_card');
			                    var cardLayout = card.getLayout();
			                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
			                	cardLayout.setActiveItem(3);
//			                    var ids = ['dtlId', 'dtlUserName', 'dtlTenantName', 'dtlsubmittedDate', 'dtlDeliveryDate', 'dtlWindow', 'dtlComponent', 'dtlSubject', 'dtlDescription'];
//			                    var flds = ['defect_id', 'user_nm', 'tenant_nm', 'submitted_dt', 'deliver_dt', 'module', 'component', 'subject', 'description']
//			                    var commStore = Ext.data.StoreManager.lookup('commentsStore');
//			                    commStore.loadRawData(items.get('comments'));
			                	Ext.getCmp('dtlComments').reset();
			                	Ext.getCmp('dtlUserName').setValue(items.get('user_nm'));
			                	Ext.getCmp('dtlTenantName').setValue(items.get('tenant_nm'));
			                    Ext.getCmp('dtlId').setValue(items.get('defect_id'));
			                    Ext.getCmp('dtlStatus').setValue(items.get('status'));
			                    Ext.getCmp('dtlSubmittedDate').setValue(items.get('created_dt'));
//			                    Ext.getCmp('dtlSubmittedDate').setValue(new Date());
//			                    Ext.getCmp('dtlSubmittedDate').setValue('Fri Mar 24 2017 14:48:23 GMT+0530 (India Standard Time)');
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
			                    if(items.get('status') == "CLOSED"){
			                    	Ext.getCmp('dtlStatus').readOnly = true;
			                    	Ext.getCmp('dtlDeliveryDate').readOnly = true;
			                    	Ext.getCmp('dtlComments').setReadOnly(true);
			                    	Ext.getCmp('dtlSubmitBtn').disabled = true;
//			                    	Ext.getCmp('dtlStatus').applyEmptyText();
			                    }
//			                    else if(items.get('status') == "CLOSED"){
//			                    	Ext.getCmp('dtlStatus').emptyText = 'CLOSED';
//			                    	Ext.getCmp('dtlStatus').applyEmptyText();
//			                    }
			                    if (attachments != null) {
//			                        console.log(attachments.length);
			                        for (var i = 0; i < attachments.length; i++) {
//			                            console.log(i);
			// Ext.getCmp(att_ids[i]).setValue('-');
			                            Ext.getCmp(att_ids[i]).show();
			                            Ext.getCmp(att_ids[i]).store.loadRawData(attachments[i]);
			                            Ext.getCmp(att_ids[i]).setValue('<a href="#">' + attachments[i].attachment_name + '</a>');
			                        }
			                    }
			                    var comments = items.get('comments');
			                    var comContainer = Ext.getCmp('coment-container');
			                    
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

//			                    Ext.getCmp('layout_card').getLayout().setActiveItem(3);
//			                    Ext.getCmp('layout_card').setTitle('Details');
			                }
//			                var linkClicked = (e.target.tagName == 'A');
//			                var clickedDataIndex =
//			                    view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
//
//			                if (linkClicked && clickedDataIndex == '...') {
//			                    alert(record.get('id'));
//			                }
			            },
			            beforeedit : function(editor,e){
			            	if (e.record.get('status') == 'CLOSED')
			            	    return false;
			            },
						edit : function(editor, e){
//							console.log(editor);
//							console.log(e);
							var oldVal = e.originalValues;
							var newVal = e.newValues;
							oldVal.deliver_dt = (oldVal.deliver_dt != null) ? oldVal.deliver_dt.toString() : oldVal.deliver_dt 
							newVal.deliver_dt = (newVal.deliver_dt != null) ? newVal.deliver_dt.toString() : newVal.deliver_dt
							if((oldVal.status == newVal.status) && (oldVal.assigned_to == newVal.assigned_to)&&(oldVal.priority == newVal.priority)&&(oldVal.category == newVal.category)&&(oldVal.deliver_dt == newVal.deliver_dt)){
								console.log('No Changes');
								
							}else{
								console.log('Row Changed');
								console.log(oldVal.status == newVal.status)
								console.log(oldVal.assigned_to == newVal.assigned_to)
								console.log(oldVal.priority == newVal.priority)
								console.log(oldVal.category == newVal.category)
								console.log(oldVal.deliver_dt == newVal.deliver_dt)
								
								editValues.status = e.newValues.status;
								editValues.deliver_dt = (e.newValues.deliver_dt != null) ? new Date(e.newValues.deliver_dt).getTime()/1000 : e.newValues.deliver_dt;
								editValues.assigned_to = e.newValues.assigned_to;
								editValues.priority = e.newValues.priority;
								editValues.category = e.newValues.category;
								var formDialog = Ext.getCmp('defect_grid');
								formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
							}
							
							
//							
//							if((e.originalValues.status != e.newValues.status) && (e.originalValues.deliver_dt != e.newValues.deliver_dt)){
//								console.log('Both Modified.');
//								editValues.status = e.newValues.status;
//								editValues.deliver_dt = e.newValues.deliver_dt.getTime()/1000;
//								var formDialog = Ext.getCmp('defect_grid');
//								formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
//							}
//							else if(e.originalValues.status != e.newValues.status){
//								console.log('Status Modified.');
//								editValues.status = e.newValues.status;
//								var formDialog = Ext.getCmp('defect_grid');
//								formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
//							} else if(e.originalValues.deliver_dt != e.newValues.deliver_dt){
//								console.log('Delivery date Modified.');
//								editValues.deliver_dt = e.newValues.deliver_dt.getTime()/1000;
//								var formDialog = Ext.getCmp('defect_grid');
//								formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
//							}

														
							// if((e.originalValues.status != e.newValues.status) && (e.originalValues.deliver_dt != e.newValues.deliver_dt)){
							// 	console.log('Both Modified.');
							// 	var status = e.newValues.status;
							// 	var deliver_dt = e.newValues.deliver_dt.getTime()/1000;
							// 	var comm = '';
							// 	var formDialog = Ext.getCmp('defect_grid');
							// 	// formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
							// 	formDialog.fireEvent('updateDefect',formDialog, e.originalValues.defect_id,status,deliver_dt, comm);
							// }
							// else if(e.originalValues.status != e.newValues.status){
							// 	console.log('Status Modified.');
							// 	var status = e.newValues.status;
							// 	var deliver_dt = e.originalValues.deliver_dt.getTime()/1000;
							// 	var comm = '';
							// 	var formDialog = Ext.getCmp('defect_grid');
							// 	// formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
							// 	formDialog.fireEvent('updateDefect',formDialog, e.originalValues.defect_id,status,deliver_dt, comm);
							// } else if(e.originalValues.deliver_dt != e.newValues.deliver_dt){
							// 	console.log('Delivery date Modified.');
							// 	var status = e.originalValues.status;
							// 	var deliver_dt = e.newValues.deliver_dt.getTime()/1000;
							// 	var comm = '';
							// 	var formDialog = Ext.getCmp('defect_grid');
							// 	// formDialog.fireEvent('onUpdate',formDialog,e.originalValues.defect_id,e.rowIdx);
							// 	formDialog.fireEvent('updateDefect',formDialog, e.originalValues.defect_id,status,deliver_dt, comm);
							// }
														
						},
//							var rowIdx = e.rowIdx;
//							var dataIdx = e.field;
////							console.log(a);
////							console.log(b);
////							console.log(c);
//							
//							if(e.originalValue != e.value){
////								console.log('Some Changes Happened');
////								console.log(e.value);
////								var formDialog = editor.up('defectGridView');
//								var formDialog = Ext.getCmp('panel_home');
//								var recordId = e.record.get('defect_id');
//								var newValue = e.value;
//								var colName = e.field
//								Ext.Msg.confirm('Confirm', 'Are you sure you want edit?', function(btn){
//									if (btn == 'yes'){
//										var d = new Date(newValue);
//										if(!isNaN(d.getTime())){
//											newValue = d.getTime()/1000;
//										}
//				                    	formDialog.fireEvent('onUpdate',formDialog,colName,recordId,newValue,rowIdx);
//				                    }else{
//										console.log('No Changes');
//										var grid = Ext.getCmp('defect_grid');
//				                    	var b = grid.getStore().getRange()
//				                    	b[rowIdx].set(dataIdx,e.originalValue)
//				                    }
//				                  });
//							}else{
////								canceledit;
//								console.log('No Changes');
//							}
//						},
						canceledit: function(editor, context) {
							console.log('Edit Cancelled');
				        }	
			        },
//			        header:{
//			            titlePosition:1,
//			            defaults:{ // means same definitions as you would inside of the tool cfg option
//			                xtype:'tool'
//			            },
//			    			        items : [
//			    					{
//			    						xtype : 'label',
//			    						html : '<a style="font-size:14px;text-decoration: none;" href="#">< Back&nbsp</a>',
//			    						listeners: {
//			    						    render: function(c){
//			    						      c.getEl().on('click', function(){
//			    						    	  	var card = Ext.getCmp('layout_card');
//			    		                            var cardLayout = card.getLayout();
//			    		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
//			    		                        	cardLayout.setActiveItem(0);
//			    						      }, c);
//			    						    }
//			    						  }
//			    					},
//			    					{
//			    						xtype : 'label',
//			    						html : '<a style="font-size:14px;" href="#">Submit New Ticket</a>&nbsp&nbsp&nbsp',
//			    						listeners: {
//			    						    render: function(c){
//			    						      c.getEl().on('click', function(){
//			    						    	  	var card = Ext.getCmp('layout_card');
//			    		                            var cardLayout = card.getLayout();
//			    		                            var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
//			    		                        	cardLayout.setActiveItem(4);
//			    		                        	var formDialog = Ext.getCmp('panel_home');
//			    		                            formDialog.fireEvent('getComboDetails', formDialog);
//			    						      }, c);
//			    						    }
//			    						  }
//			    					},
//			    					{
//				                        xtype: 'button',
//				                        text: 'Refresh',
//				                        style: {
//				                            'margin-right': '10px'
//				                        },
//				                        //	disabled : true,
//				                        iconCls: 'btn-refresh',
//				                        handler : function(c){
//				                        	var formDialog = Ext.getCmp('defect_grid');
//				                            formDialog.fireEvent('getDefects', formDialog);
//				                        }
//				                    }
//			    					]
//			        },
			        
			        columnLines : true,

			        stripeRows: true,
			        filterable: true,
			        features: [{
			            ftype: 'filters',
//			            store : 'app.store.DefectStore',
//			            store : DefectStore,
//			            encode: false,
			            local: true
			        }],
			        plugins : [
		                 Ext.create('Ext.grid.plugin.RowEditing', {
		                     clicksToEdit: 2,	
		                     autoCancel: false
		                 }),
//		                 Ext.create('Ext.grid.plugin.CellEditing', {
//		                     clicksToEdit: 1
//		                 })
//							Ext.create('Ext.grid.plugin.RowEditing', {
//							    clicksToMoveEditor: 1,
//							    autoCancel: false
//							})
		             ],
					columns : {
						defaults: {
				            listeners: {
				            	'click' : function(a,b,c,d){
//				            		console.log(a,b,c,d);
//				            		Ext.getCmp('defect_grid').filters.getFilter(4).store.loadData([["OPTION 1"],["OPTION 2"],["OPTION 3"]])
//				            		Ext.getCmp('defect_grid').filters.getFilter(4).store.load();
				            	},
//				            	contextmenu : function(record, item, index, e, eOpts){
//				            		console.log('You clicked the right mousebutton on me');
//		                            var xy = eOpts.getXY();                         
//		                            new Ext.menu.Menu({
//		                                        items : [{
//		                                                    text : 'Add'
//		                                        }, {
//		                                                    text : 'Add'
//		                                        }]
//		                            }).showAt(xy)},
//				            	contextMenu : new Ext.menu.Menu({
//				            		  items: [{
//				            		    text: 'Edit',
//				            		    iconCls: 'edit',
////				            		    handler: edit
//				            		  }]
//				            		}),
//				            	'contextmenu' : function() {
//				            	     console.log('You clicked the right mousebutton on me');
//				            	   },				            	
//				                'dblclick': function(grid, rowIndex, columnIndex, e, div, items) {
//				                	console.log(items);
//				                	app.util.Utilities.gridRowId = items.internalId;
//				                    app.util.Utilities.gridRowIdx = columnIndex;
//				                	var card = Ext.getCmp('layout_card');
//				                    var cardLayout = card.getLayout();
//				                    var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
//				                	cardLayout.setActiveItem(3);
////				                    var ids = ['dtlId', 'dtlUserName', 'dtlTenantName', 'dtlsubmittedDate', 'dtlDeliveryDate', 'dtlWindow', 'dtlComponent', 'dtlSubject', 'dtlDescription'];
////				                    var flds = ['defect_id', 'user_nm', 'tenant_nm', 'submitted_dt', 'deliver_dt', 'module', 'component', 'subject', 'description']
////				                    var commStore = Ext.data.StoreManager.lookup('commentsStore');
////				                    commStore.loadRawData(items.get('comments'));
//				                	Ext.getCmp('dtlUserName').setValue(items.get('user_nm'));
//				                	Ext.getCmp('dtlTenantName').setValue(items.get('tenant_nm'));
//				                    Ext.getCmp('dtlId').setValue(items.get('defect_id'));
//				                    Ext.getCmp('dtlStatus').setValue(items.get('status'));
//				                    Ext.getCmp('dtlSubmittedDate').setValue(items.get('created_dt'));
////				                    Ext.getCmp('dtlSubmittedDate').setValue(new Date());
////				                    Ext.getCmp('dtlSubmittedDate').setValue('Fri Mar 24 2017 14:48:23 GMT+0530 (India Standard Time)');
//				                    Ext.getCmp('dtlDeliveryDate').setValue(items.get('deliver_dt'));
//				                    Ext.getCmp('dtlLastModifiedDate').setValue(items.get('modified_dt'));
//				                    Ext.getCmp('dtlWindow').setValue(items.get('module'));
//				                    Ext.getCmp('dtlComponent').setValue(items.get('component'));
//				                    Ext.getCmp('dtlSubject').el.setHTML('<div style="border:inset 1px white;border-width:2px;padding:5px;font: 300 13px/15px helvetica,arial,verdana,sans-serif;max-height: 100px;overflow: auto;white-space: pre-wrap;">' + items.get('subject') + '<div>');
//				                    Ext.getCmp('dtlDescription').el.setHTML('<div style="border:inset 1px white;border-width:2px;padding:5px;font: 300 13px/15px helvetica,arial,verdana,sans-serif;max-height: 120px;overflow: auto;white-space: pre-wrap;">' + items.get('description') + '<div>');
////
//				                    var att_ids = ['dtlAttachments_1_fname', 'dtlAttachments_2_fname', 'dtlAttachments_3_fname', 'dtlAttachments_4_fname', 'dtlAttachments_5_fname'];
//				                    var attachments = items.get('attachments');
//				                    for (var i = 0; i < 5; i++) {
//				                        Ext.getCmp(att_ids[i]).hide();
//				                    }
//				                    if(items.get('status') == "REOPEN"){
//				                    	Ext.getCmp('dtlStatus').emptyText = 'REOPEN';
//				                    	Ext.getCmp('dtlStatus').applyEmptyText();
//				                    }else if(items.get('status') == "CLOSED"){
//				                    	Ext.getCmp('dtlStatus').emptyText = 'CLOSED';
//				                    	Ext.getCmp('dtlStatus').applyEmptyText();
//				                    }
//				                    if (attachments != null) {
////				                        console.log(attachments.length);
//				                        for (var i = 0; i < attachments.length; i++) {
////				                            console.log(i);
//				// Ext.getCmp(att_ids[i]).setValue('-');
//				                            Ext.getCmp(att_ids[i]).show();
//				                            Ext.getCmp(att_ids[i]).store.loadRawData(attachments[i]);
//				                            Ext.getCmp(att_ids[i]).setValue('<a href="#">' + attachments[i].attachment_name + '</a>');
//				                        }
//				                    }
//				                    var comments = items.get('comments');
//				                    var comContainer = Ext.getCmp('coment-container');
//				                    
//				                    if (comments != null) {
//				                        comContainer.removeAll();
//				                        for (var i = 0; i < comments.length; i++) {
//				                            var d = new Date(parseInt(comments[i].created_dt) * 1000);
//				                            var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
//				                            var itm = {
//				                                html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Sent by : <b>' + comments[i].created_by + '</b></div><div style="float:right;">Date : <b>' + dt + '</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>' + comments[i].comment + '</span></div></div>'
//				                            };
//				                            comContainer.add(itm);
//				                        }
//				                    } else {
//				                        comContainer.removeAll();
//				                    }
//
////				                    Ext.getCmp('layout_card').getLayout().setActiveItem(3);
////				                    Ext.getCmp('layout_card').setTitle('Details');
//				                }
				            }
				        },
						items : [ {
							text : 'S.No',
							xtype : 'rownumberer',
							width : 30,
							// sortable: false,
							// locked: false,
//							renderer : function(v,a,b,c,d){
//								return v;
//							},
							align : 'center'
						}, {
							text : 'Ticket Id',
							type : 'string',
							tooltip : 'Ticket Id',
							dataIndex : 'defect_id',
							flex : 0.3,
							filter: {
										type: 'numeric',
//										menuItemCfgs: {
//								            minValue: 1020,  // Or 0, or whatever you want
//								            fieldLabel : 'Minimum',
//								            fieldLabel : 'Maximum'
//								        },
								        
										fields: {
						                    lt: {
						                    	fieldLabel : 'Before',
						                    	emptyCls: 'empty-text-field'
//						                    	fieldCls : 'icon-back'
//						                    	iconCls: 'icon-back'
						                    },
						                    gt: {
						                    	fieldLabel : 'After',
						                    },
						                    eq: {
						                    	fieldLabel : 'Equal',
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
//							editor: {
//				                // defaults to textfield if no xtype is supplied
//				                allowBlank: false
//				            }
						}, {
							text : 'Component',
							tooltip : 'Component',
							dataIndex : 'component',
							flex : 0.5,
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
							flex : 3,
							filter: {    
								type: 'string',
								emptyText: 'Enter Filter Text...',
									}
						},
						{
							type : 'string',
							text : 'Status',
							tooltip : 'Status',
							sortable: false,
							dataIndex : 'status',
							tdCls: 'no-dirty',
							flex : 0.5,
							doSort: function(state){
						        var ds = this.up('defectGridView').store;
						        ds.sort({
						            property: 'sort_status',
						            direction: state
						        });
						    },
//						    renderer : function(val,a,b,c,d) {
//						    	if(b.get('status') != 'CLOSED'){
//						    		var defectGridClosed = Ext.getCmp('defect_grid_closed');
//						    		defectGridClosed.store().remove(b)
//						    	}
//			                    return val;
//			                },
//							filter: {    
//								type: 'list',
//								dataIndex: 'status', 
////								idField: 'status',
////								labelField: 'status',
//								idField: 'status',
//								labelField: 'status',
//								store : Ext.create('Ext.data.Store',{
//						        	autoload : true,
//						        	fields : ['status'],
//						        })
////								loaded:true,
////							    single: false, 
//								},
							editor: {
								xtype : 'combobox',
								editable: false,
					            autoShow:true,
					            queryMode: 'local',
					            store : Ext.create('Ext.data.Store', {
					                fields: ['name'],
					                data : [
					                    {"name":"OPEN"},
					                    {"name":"FIXED"},
					                    {"name":"IN PROGRESS"},
					                    {"name":"CLOSED"}
					                    //...
					                ]
					            }),
					            displayField: 'name',
					            valueField: 'name',
//					            selectOnFocus: true,
//			                    forceSelection: true,
//			                    store: ['OPEN','FIXED','IN PROGRESS'],
				            },
						},
						{
							text : 'Assigned To',
							tooltip : 'Assigned To',
							dataIndex : 'assigned_to',
							flex : 0.4,
							filter : {
								type: 'list',
						        idField: 'assigned_to',
//						        store: DefectStore,
						        dataIndex: 'assigned_to',
						        labelField: 'assigned_to',
						        store : Ext.create('Ext.data.Store',{
						        	autoload : true,
						        	fields : ['assigned_to'],
						        })
//						        listeners : {
//						        	'beforerender' : function(list){
//						        		console.log(list);
////						        			   }
////						        			});
//						        	}
//						        }
//						        loaded:true,
//						        local : false
							},
							
							editor: {
								xtype : 'combobox',
								editable: true,
					            autoShow:true,
							    queryMode: 'local',
							    displayField: 'name',
					            valueField: 'name',
//							    store : ['OPEN','FIXED','IN PROGRESS'],
							    store : Ext.create('Ext.data.Store', {
							        fields: ['name'],
							        autoLoad : 'true',
							        data: [{
							            "name": ""
							        }]
							    }),
							    listeners:{
		                            focus: function (combo) {
//		                            	var grid = Ext.getCmp('defect_grid');
//		                            	combo.getStore().load(grid.getStore().collect('assigned_to'));
		                            	var str = Ext.StoreManager.lookup('app.store.DefectStore').data.items
		                            	st = [];
		                            	str.forEach(function(item){
		                            						if(st.indexOf(item.get('assigned_to')) == -1){
		                            							st.push(item.get('assigned_to'));
//		                            					      console.log('.........');
		                            					    }
		                            					})
		                            	var out = JSON.stringify(st.map(function (el) {
		                            	    return { "name": el };
		                            	}));
		                            	var a = Ext.JSON.decode(out)
//		                            	console.log(a)
		                            	combo.getStore().loadData(a);
		                            }
		                        }
				            },
						},
						{
							text : 'Priority',
							tooltip : 'Priority',
							dataIndex : 'priority',
							flex : 0.2,
							filter: {
								type: 'numeric',
//								menuItemCfgs: {
//						            minValue: 1020,  // Or 0, or whatever you want
//						            fieldLabel : 'Minimum',
//						            fieldLabel : 'Maximum'
//						        },
						        
								fields: {
				                    lt: {
				                    	fieldLabel : 'Before',
				                    	emptyCls: 'empty-text-field'
//				                    	fieldCls : 'icon-back'
//				                    	iconCls: 'icon-back'
				                    },
				                    gt: {
				                    	fieldLabel : 'After',
				                    },
				                    eq: {
				                    	fieldLabel : 'Equal',
				                    }
				                }
							},
							editor: { 
								xtype: 'numberfield',
						        anchor: '100%',
						        maxValue: 25,
						        minValue: 0
						        }
						},
						{
							text : 'Category',
							tooltip : 'Category',
							dataIndex : 'category',
							flex : 0.4,
							filter: {    
								type: 'list',
//								dataIndex: 'status', 
								idField: 'category',
								labelField: 'category',
								store : Ext.create('Ext.data.Store',{
						        	autoload : true,
						        	fields : ['category'],
						        })
//								store : Ext.create('Ext.data.Store', {
//									fields: ['category'],
//					                data : [
//					                    {"category":"DEFECT"},
//					                    {"category":"FEATURE"},
//					                    {"category":"ENHANCEMENT"},
//					                    {"category":"SUPPORT"}
//					                    //...
//					                ]
//					            }),
//								loaded:true,
//							    single: false, 
								},
							editor: {
								xtype : 'combobox',
								editable: false,
					            autoShow:true,
							            queryMode: 'local',
							            store : Ext.create('Ext.data.Store', {
							                fields: ['category'],
							                data : [
							                    {"category":"DEFECT"},
							                    {"category":"FEATURE"},
							                    {"category":"ENHANCEMENT"},
							                    {"category":"SUPPORT"}
							                    //...
							                ]
							            }),
							            displayField: 'category',
							            valueField: 'category',
//									            selectOnFocus: true,
//							                    forceSelection: true,
//							                    store: ['OPEN','FIXED','IN PROGRESS'],
				            },
						},
						{
							text : 'User Name',
							tooltip : 'User Name',
							dataIndex : 'user_nm',
							flex : 0.5,
							filter: {
								type : 'list',
								store : Ext.create('Ext.data.Store',{
						        	autoload : true,
						        	fields : ['user_nm'],
						        }),
						        idField: 'user_nm',
								labelField: 'user_nm',
							},
						}, {
							text : 'Tenant Name',
							tooltip : 'Tenant Name',
							dataIndex : 'tenant_nm',
							flex : 0.5,
							renderer : function(value){
								if(value == 'cuecent_tenant'){
									return 'Others';
								}else{
									return value;
								}
							},
							filter: {
								type: 'list',
//								loaded:true,
								idField: 'tenant_nm',
								labelField: 'tenant_nm',
								store : Ext.create('Ext.data.Store',{
						        	autoload : true,
						        	fields : ['tenant_nm'],
						        	sorters: [{
						                property: 'tenant_nm',
						                direction: 'ASC'
						            }],
						        })
//								store : Ext.create('Ext.data.Store', {
//									fields: ['name'],
//									autoLoad : 'true',
//					                data : [{"name":"autorentoman_tenant"},{"name":"marhaba_tenant"},{"name":"krpg_tenant"},{"name":"ivmsprod_tenant"},{"name":"vlc_tenant"},{"name":"infiniti_tenant"},{"name":"cuecent_tenant"},{"name":"alwalaalarabia_tenant"},{"name":"autorent_oman_tenant"},{"name":"globalcarrental_tenant"},{"name":"maqshan_tenant"},{"name":"smcinfra_tenant"},{"name":"alrawahi_om_tenant"},{"name":"krshipping_tenant"},{"name":"epc_tenant"},{"name":"firstfocus_tenant"},{"name":"national_tenant"},{"name":"barikgroup_tenant"},{"name":"xpress_tenant"},{"name":"intaj_tenant"},{"name":"petrofac_tenant"},{"name":"omzest_tenant"},{"name":"dominos_tenant"},{"name":"alnouj_tenant"},{"name":"khazain_tenant"},{"name":"towell_tenant"},{"name":"bec_tenant"},{"name":"ztsb_tenant"},{"name":"GCECT_tenant"},{"name":"gulftaleed_tenant"},{"name":"rmab_tenant"},{"name":"omanair_tenant"},{"name":"alghantoot_tenant"},{"name":"omanautorent_tenant"},{"name":"amlaklog_tenant"},{"name":"becadmin_tenant"},{"name":"eurocarrental_tenant"},{"name":"DUB_AUTORENT_tenant"},{"name":"asaasom_tenant"},{"name":"baraka_tenant"},{"name":"marsllc_tenant"},{"name":"budgetcarrental_tenant"},{"name":"beacon_tenant"},{"name":"bcc_om_tenant"},{"name":"powertech_tenant"},{"name":"globalquick_tenant"},{"name":"sba_tenant"},{"name":"AUTORUP_tenant"},{"name":"abclog_tenant"},{"name":"KSARUP_tenant"},{"name":"POONAM_tenant"},{"name":"budgetcar_tenant"},{"name":"bct_tenant"},{"name":"mhdgases_tenant"},{"name":"techmart_tenant"},{"name":"uaeautorent_tenant"},{"name":"aljabri_tenant"},{"name":"prestige_tenant"},{"name":"avis_tenant"}],
//					            }),
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
							editor: {
				                xtype: 'datefield',
//				                allowBlank: false,
				                editable: false,
				                selectOnFocus: true,
				                forceSelection: true,
				                format: 'Y-m-d H:i:s T',
//				                minValue: '01/01/2006',
//				                minText: 'Cannot have a start date before the company existed!',
//				                maxValue: Ext.Date.format(new Date(), 'm/d/Y')
				            },
//							getEditor: function(record) {
//							    return Ext.create('Ext.form.field.Date', { 
//							            editable: false,
//							            selectOnFocus: true,
//					                    forceSelection: true,
//							    });
//							},
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
						},
						{
//							xtype : 'label',
							text : 'Action',
							align : 'center',
							flex : 0.3,
							renderer : function(v){
								return '<a href="#">View</a>'
							},
							listeners: {
								cellclick: function(grid, rowIndex, colIndex) {
//									alert(colIndex);.
									console.log(colIndex);
								}
							}
//							html : '<a href="#">Edit</a>'
							
						} ]
					}
				});

