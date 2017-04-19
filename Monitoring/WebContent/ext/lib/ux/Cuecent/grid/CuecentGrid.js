/**
* CuecentGrid

Instance Creation
-------- --------
1. xtype : CuecentGrid

2. Ext.create('CuecentGrid', {
	  config....
   })

"x-livesearch-match" class is used to highlight the text. 

Set boolean flag to enable or disable the following
addBtn, removeBtn, saveBtn, exportPdf, exportXls, paging, filterHighlight

*/
var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 1,
    autoCancel: false
});

Ext.define('CuecentGrid', {
	extend : 'Ext.grid.GridPanel',
	alias : 'widget.CuecentGrid',
	xtype : 'CuecentGrid',
	columnLines: true,	
	overFlow: true,
	sortable: true,
	addBtn : false,
	removeBtn : false,
	sheetName:'Search Results',
	XLSFileName:"",
	saveBtn : false,
	exportPdf : false,
	exportXls : false,
	paging : false,	
	useRenderedData : [],
	_gridData : [],
	_gridTempData : [],
	filterQuery : undefined,
	constructor : function() {		
		this.callParent(arguments);		
		this.matchCls = 'x-livesearch-match';
	},
	initComponent : function() {		
		var btns = [];
		var this_ = this;
		this.dockedItems = this.dockedItems == undefined ? [] : this.dockedItems;
		var toolbar = Ext.create('Ext.toolbar.Toolbar', {
				renderTo: document.body,			
				items: []
			});
		this.tbar = this.tbar == undefined ? toolbar : this.tbar;
		
		if(this.paging) {
			this._pagingToolbar = Ext.create('Ext.toolbar.Paging', {
				store: this.store,
				dock: 'bottom',
				id : this.id+"_pagingToolBar",
				cls: 'pagination',
				//cls: 'tbarSection',
				displayInfo: true,				
				doRefresh:function(){
					//alert("Page refresh");
					this.store.load();
					this.store.clearFilter();
					this.store.loadPage(1);
					this_.filterGrid(Ext.getCmp(this_.id+"_filterText").setValue(""));
					this_.filterGrid(Ext.getCmp(this_.id+"_highlightText").setValue(""));
				}
			});
			this.dockedItems.push(this._pagingToolbar);			
		}
		
		if(this.addBtn) {
			var that = this;
			this.tbar.add({
				xtype : 'button',			
				icon: 'ext/gpl/ivms_theme/images/toolbar/Grid_add_icon.png',
				cls: 'grid_toolbar',
				handler : function() {
					that.addRecord();
				}
			})
		}
		
		if(this.removeBtn) {
			var that=this;
			this.tbar.add({
				xtype : 'button',			
				icon: 'ext/gpl/ivms_theme/images/toolbar/Grid_delete_icon.png',
				cls: 'grid_toolbar',
				handler : function() {
					that.removeRecord();
				}
			})
		}
		
		if(this.filterHighlight) {
		
			this.tbar.add({
				xtype : 'textfield',
				id : this.id+"_filterText",
				name : this.id+"_filterText",
				emptyText : 'Enter to filter',
				submitEmptyText : false,
				listeners: {
					'change': function(field, event) {
						this_.filterGrid(field);						
					},
					"specialkey": function(field, e) {
						if (e.getKey() == e.ENTER) {
							this_.filterGrid(field);
						}
					}
                }
			});
			
			this.tbar.add({
				xtype : 'button',
				text : 'Filter',
				height: 25,
				 cls: 'Gridbtn',
				handler : function(eventobj) {				
					this_.filterGrid(Ext.getCmp(this_.id+"_filterText"));
				}
			});	
			
			this.tbar.add({
				xtype : 'textfield',
				id : this.id+"_highlightText",
				name : this.id+"_highlightText",
				emptyText : 'Enter to Highlight',
				submitEmptyText : false,
				listeners : {
					'change' : function(field) {
						var gridStore = this_.store;
                        var grid = this_;                        
                        this_.onTextFieldChange(field.getValue(), gridStore, grid, field)
					}
				}
			});
			
			this.tbar.add({
				xtype : 'button',
				cls: 'Gridbtn',
				width: 25,
                height: 25,
				iconCls : 'cuecentGrid-downIcon',
				tooltip: 'Click here to find a next Row.',
				handler : function() {					 
                    this_.onPreviousClick(this_);
				}
			});
			
			this.tbar.add({
				xtype : 'button',
				cls: 'Gridbtn',
				width: 25,
                height: 25,
				iconCls : 'cuecentGrid-upIcon',
				tooltip: 'Click here to find a previous row.',
				handler : function() {
					this_.onNextClick(this_);
				}
			});
		}		
		
		if(this.saveBtn) {
			this.tbar.add({
				xtype : 'button',
				text : 'Save',
				iconCls : 'cuecentGrid-saveIcon',
				handler : function() {
					
				}
			})
		}
		
		this.tbar.add({
			xtype : 'tbfill'
		});
	
		if(this.exportXls) {
		
			this.tbar.add({
				xtype : 'label',
				text:'Export'
			});
			this.tbar.add({
				xtype : 'tbseparator'
			});
			this.tbar.add({
				xtype : 'image',			
				src: 'ext/gpl/ivms_theme/images/gridbar/excel_logo.png',
                cls: "gridtbar_icon_right",				
			    listeners: {
					el: {
						click: function(){
							 if(this_.getStore().getCount() == 0  || 
								this_.getStore().getCount() == null || 
								this_.getStore().getCount() == "undefined") {					
								Ext.Msg.alert(Ext.i18n.appBundle.getMsg('alert.info'), 
									Ext.i18n.appBundle.getMsg('exportxls.withempty.data'));
							 } else{
								this_.gridToExportXl(this_);
							}
						}
					}
				}
			});			
		}
	
		if(this.exportPdf) {			
			this.tbar.add({
				xtype : 'button',
				text : 'Export PDF',
				cls: 'Gridbtn',
				iconCls : 'cuecentGrid-pdfIcon',
				handler : function() {
					
				}
			});
		}
		
		var noLoadedItems = this.store.getTotalCount();		
		if(noLoadedItems>0) {			
			var loadedData = [];
			Ext.each(this.store.data.items, function(temp) {
				loadedData.push(Ext.clone(temp.data));
			})
			this._gridData = loadedData;	
			this._gridTempData = Ext.clone(loadedData);
		}
		
		if(this.paging) {
			this.store.setProxy({
				type: 'memory',
				enablePaging : true,
				data : this._gridData,
				reader: {
					type: 'json'
				}
			});
			//this.store.setPageSize(10);
			this.store.load();	
		}
		
		this.viewConfig={
				autoFit: true,
				trackOver: false,
				emptyText: Ext.i18n.appBundle.getMsg('grid.message.norecords'),
				stripeRows: false,
				listeners : {
					refresh : function (dataview) {
							Ext.each(dataview.panel.columns, function (column) {
							
								if(column.dataIndex != null && column.dataIndex != undefined && column.dataIndex != ""){
								column.autoSize();
								//console.log("map grid",column.dataIndex);
								}
								 else{
								 column.minWidth=65;
								 }
							});
					}
				}
			};
		this.callParent(arguments);
	},
	
	updateMemoryStore : function(data) {
		this._gridData = data;	
		this._gridTempData = Ext.clone(data);
		if(this.store.proxy != 'memory') {
			this.store.proxy.data = this._gridData;
			this.store.load();
			this.store.clearFilter();
			this.store.loadPage(1);
		} else {
			throw "This grid doesnt have MemoryProxy";
		}		
	},
	
	addRecord : function() {
		var gridStore = this.store;
		var newRecord = Ext.create(this.store.model, {
			"recStatus": "I"
		}); 	
		gridStore.insert(gridStore.getCount(), newRecord);
	},
	removeRecord : function(){
		var gridStore = this.store;                         
		Ext.each(gridStore.getRange(), function(record) {
			if (record.getData().select) {
				record.set('recStatus', "D")
			   // record.setDirty();
			}
		})

		gridStore.filterBy(function(item) {
			if (item.getData().recStatus == 'D')
				return false;
			else
				return true;
		})
	},
	
	onTextFieldChange : function(value, gridStore, grid, field) {
		var count = 0;
		var me = this;
		grid.view.refresh();
		me.searchValue = value;
		me.indexes = [];
		me.currentIndex = null;
		if (me.searchValue !== null) {
			me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
			gridStore.data.each(function(record, idx) {
				var td = Ext.fly(grid.view.getNode(idx)).down('td'), cell, matches, cellHTML;
				//console.log(grid.view.getNode(idx));
				while (td) {				
					cell = td.down('.x-grid-cell-inner');				
					matches = cell.dom.innerHTML.match(me.tagsRe);
					cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);			
					// populate indexes array, set currentIndex, and replace wrap matched string in a span
					cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
						count += 1;
						if (Ext.Array.indexOf(me.indexes, idx) === -1) {
							me.indexes.push(idx);
						}
						if (me.currentIndex === null) {
							me.currentIndex = idx;
						}						
						return '<span class="' + me.matchCls + '">' + m + '</span>';
					});
					// restore protected tags
					Ext.each(matches, function(match) {
						cellHTML = cellHTML.replace(me.tagsProtect, match);
					});
					// update cell html
					cell.dom.innerHTML = cellHTML;
					td = td.next();
				}
			}, me);
			// results found
			if (me.currentIndex !== null) {
				grid.getSelectionModel().select(me.currentIndex);
			}
		}
		if (me.currentIndex === null) {
			grid.getSelectionModel().deselectAll();
		}
		field.focus();
	},
	
	onPreviousClick : function(grid) {
		var me = this,idx;
		if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
			me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
			grid.getSelectionModel().select(me.currentIndex);
			
			grid.getView().scrollRowIntoView(me.currentIndex);
			//grid.view.bufferedRenderer.scrollTo(me.currentIndex, true);
		}
	},
	
	onNextClick : function(grid) {		
		var me = this,idx;
        if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
			me.currentIndex = me.indexes[idx - 1] || me.indexes[me.indexes.length - 1];
            grid.getSelectionModel().select(me.currentIndex);
			grid.getView().scrollRowIntoView(me.currentIndex);
            //grid.view.bufferedRenderer.scrollTo(me.currentIndex, true);
        }
	},
	
	filterGrid : function(f) {
		var v = f.getValue();
		if(v.trim() == '') {			
			this._gridData = this._gridTempData;
			this.store.proxy.data = this._gridData;
			this.store.load();
			return;
		}
		
		var myData = this._gridTempData;
		var thisRegEx = new RegExp(v, "i");
        var grid = this;
        var records = [];		
		Ext.each(myData, function(record) {
			for (var i = 0; i < grid.columns.length; i++) {			
				if (grid.omitColumns) {
					if (grid.omitColumns.indexOf(grid.columns[i].dataIndex) === -1) {
						if (thisRegEx.test(record[grid.columns[i].dataIndex])) {
							if (!grid.filterHidden && grid.columns[i].isHidden()) {
								continue;
							} else {
								records.push(record);
								break;
							};
						};
					};
				} else {
					if (thisRegEx.test(record[grid.columns[i].dataIndex])) {
						if (!grid.filterHidden && grid.columns[i].isHidden()) {
							continue;
						} else {
							records.push(record);
							break;
						};
					};
				};
			}  
        });		
		this._gridData=records;
		this.store.proxy.data = this._gridData;
        this.store.load();
		this.store.loadPage(1);		
	},
	
	refreshPageBar : function() {
		this._pagingToolbar.doRefresh();
	},
	
	gridToExportXl: function(f) {
		var v = f;
		var input_array={};
		var Grid_def=[];
		var rendererCache = {};
	
		
		for (var i = 1, j=0; i < v.columns.length; i++, j++) {	
			var column = v.columns[i];
			var field = column.dataIndex;
			var Columnfield = column.text;
			var colId = column.itemId;
			if (field=='select' || field=='action_name') {
				j--;
				continue;
			} else if(column.isHidden() == true) {
				j--;				
				continue;
			} else{				
				// use indexOf to check the col and use the renderer fn to get the data back
				Grid_def[j] = {columnname: Columnfield, dataname: field,width: 200 };
				if(this.useRenderedData.indexOf(colId) != -1) {					
					rendererCache[colId] = column.renderer;
				}
			}
		}
		
		var gridStore = v.getStore();
        var dataToSave = [];	 
		 				 
		if (gridStore.isFiltered()){			
			v.each(function(record) {													
				dataToSave.push(record.data);
			});                                     
			v.getStore().filterBy(function(item) {
				if (item.getData().recStatus == 'D')
					return false;
				else
					return true;
			});

		 } else{										 
			dataToSave = v.getStore().getProxy().getReader().rawData;			
			if (dataToSave == undefined || 
				dataToSave == null ||
				dataToSave.length==0){				
					dataToSave1 = v.getStore().data.items;
					var dataToSave = [];
					for(i=0; i < dataToSave1.length ;i++){
						dataToSave.push(dataToSave1[i].data);
					};
			} else {
				dataToSave = Ext.clone(dataToSave);
			}
		}
     
		if(this.useRenderedData.length>0 && dataToSave.length>0) {
			for(var renDatIndex=0; renDatIndex<this.useRenderedData.length; renDatIndex++) {
				var renData = this.useRenderedData[renDatIndex];
				var renderer = rendererCache[renData];				
				if(renderer != undefined) {
					for(var dtsIndex=0; dtsIndex<dataToSave.length; dtsIndex++) {
						var currentDataToSave = dataToSave[dtsIndex];						
						var value = renderer.call(null, currentDataToSave[renData]);
						if(value == undefined || value == null) {
							currentDataToSave[renData] = "";
						} else {
							currentDataToSave[renData] = value;
						}						
					}
				}				
			}
		}	 
	 
		input_array["grid_defn"]=Grid_def;		
		input_array["gridid"] = dataToSave;
		
		if(dataToSave && dataToSave.length == 0) {
			console.log("Error - Data in this table is not saved. Please save the data and try again");
			return;
		}
		
		var  tmpWrkFlwParam=encodeURI(Ext.JSON.encode(input_array));
		var tmpWrkFlwName='ExportToExcel';
		var tmpProcessType='Report';
		
		var hm={};
		hm['workFlowName']=tmpWrkFlwName;
		hm['workFlowParams']=Ext.JSON.encode(input_array);		
		hm['processType']=tmpProcessType;
		hm['sheetName']=this.sheetName;
		hm['fileName']=this.XLSFileName;
		windowOpen('POST',Ext.i18n.appBundle.getMsg('approot')+"/GridExportExcel",hm);
	},
	
	onDestroy : function() {
		this.callParent(arguments);
	},
	
	clearGridData : function(v) {
		var str = this.store;
		str.removeAll();
		str.loadData([]);
		str.getProxy().getReader().rawData = [];
		this._gridData = [];
		this._gridTempData = [];
	}
});


windowOpen = function(verb, url, data, target) {
  var form = document.createElement("form");
  form.action = url;
  form.method = verb;
  form.target = target || "_self";
  if (data) {
    for (var key in data) {
		var hiddenField = document.createElement("input"); 
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", data[key]);
		form.appendChild(hiddenField);
    }
  }
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
};



