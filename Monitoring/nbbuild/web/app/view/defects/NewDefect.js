var storeWindow = Ext.data.StoreManager.lookup('app.store.defect.ModuleStore');
var storeComponent = Ext.data.StoreManager.lookup('app.store.defect.ComponentStore');
var storeTenantName = Ext.data.StoreManager.lookup('app.store.defect.TenantNameStore');
//console.log(storeUserName);
console.log(storeWindow);
Ext.define('app.view.defects.NewDefect', {
 extend: 'Ext.panel.Panel',
 alias: 'widget.newDefect',
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
//	title : 'Defect Details',
//	titleAlign:'center',
//	autoScroll: true,
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
//            {
//            xtype: 'label',
//            text : 'Last Updated Time : '+Ext.Date.format(new Date(), 'Y-m-d H:i:s T'),
//            id: 'lblTime',
//            style: {
//                fontWeight: 'bold',
//                fontSize: '13px',
//                'margin-right': '10px'
//            }
//        }
    ],
	items : [
	         {
	        	 xtype : 'form',
	        	 id: 'form-problem-submit',
	        	 title : '<b style="font-size:14px;">Submit Defect</b>',
	        	 titleAlign:'center',
//	             html  : 'Panels can contain Children',
	             frame : true,
	             style :{
//	         		'background-color' : 'lightgray',
	         		'border-width' : '1px',
	         	},
	             width    : 860,
	             height   : 750,
	             items : [
	             	{
	             		xtype : 'container',
//	             		layout : 'hbox',
	             		style : {
	             			'margin-top' : '10px'
	             		},
	             		items : [{
	   	            	 xtype : 'fieldset',
		            	 title : '<b class = "biggertext">Basic Details</b>',
//		            	 columnWidth: 0.5,
//		            	 defaults: {anchor: '100%'},
		            	 height : '100%',
//		            	 layout: {
//	                         type: 'vbox',
//	                         // pack: 'start',
//	                         align: 'stretch'
//	                     },
//		            	 width : '50%',
//		            	 padding : '5px',
		            	 style : {
		            		'float' : 'left',
		            		'padding' : '5px',
		            		'width': '420px',
		            	    'margin': '2px',
		            	    'border-width' : '3px',
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
                             xtype: 'combo',
                             id: 'defect_module',
                             name: 'defectModule',
                             labelCls: 'font-weight',
                             fieldCls: 'medtext',
                             fieldLabel: 'Enter Window Name',
                             allowBlank: false,
                             queryMode: 'local',
                             editable: true,
//                             store: 'window_store',
                             store : storeWindow,
                             listeners: {
                             	'expand': function(c) {
//                             		console.log('Expanded');
                             		var formDialog = c.up('newDefect');
//                             		formDialog.fireEvent('ongetModuleList', formDialog);
                                 },
                             	select: function(combo, record, index) {
//                                     console.log(combo);
//                                     var subCategory = Ext.getCmp('defect_component');
//                                     var comboValue = combo.getValue();
//                                     subCategory.clearValue();
//                                     if (comboValue == 'home') {
//                                         subCategory.bindStore(store_home);
//                                     } else if (comboValue == 'map') {
//                                         subCategory.bindStore(store_map);
//                                     } else if (comboValue == 'reports') {
//                                         subCategory.bindStore(store_component);
//                                     } else {
//                                     }
                                 }
                             },
                             displayField: 'module',
                             valueField: 'module'
                         },
                         {
                             xtype: 'combo',
                             id: 'defect_user_name',
                             name: 'defectTenantName',
                             labelCls: 'font-weight',
                             fieldCls: 'medtext',
                             fieldLabel: 'Select Tenant Name',
                             allowBlank: false,
                             queryMode: 'local',
                             editable: false,
                             store: storeTenantName,
                             listeners: {
                             	'expand': function(c) {
//                             		console.log('Expanded');
//                             		var formDialog = c.up('reportUs');
//                             		formDialog.fireEvent('ongetModuleList', formDialog);
                                 },
                             	select: function(combo, record, index) {
//                                     console.log(combo);
//                                     var subCategory = Ext.getCmp('defect_component');
//                                     var comboValue = combo.getValue();
//                                     subCategory.clearValue();
//                                     if (comboValue == 'home') {
//                                         subCategory.bindStore(store_home);
//                                     } else if (comboValue == 'map') {
//                                         subCategory.bindStore(store_map);
//                                     } else if (comboValue == 'reports') {
//                                         subCategory.bindStore(store_component);
//                                     } else {
//                                     }
                                 },
                                 
                             },
                             displayField: 'tenantname',
                             valueField: 'tenantname'
                         },{
                             xtype: 'checkbox',
                             fieldLabel: 'Have Screen Shot',
                             id: 'have_screen_shot',
                             name: 'haveScreenshot',
                             labelCls: 'font-weight',
                             fieldCls: 'medtext',
                             handler: function(checkbox, checked) {
                                 if (checked == true) {
                                     Ext.getCmp('screen-shot').enable();
                                     Ext.getCmp('selectedFiles').show();
                                 } else {
                                     Ext.getCmp('screen-shot').disable();
                                     Ext.getCmp('selectedFiles').hide();
                                 }
                             },
                             listeners : {
                            	 afterrender : function(a,b,c){
//                                	 a.hide();
//                                	 a.show();
                                 }
                             }
                         }]
		            	 
		             },{
		            	 xtype : 'fieldset',
		            	 title : '<b class = "biggertext" >Defect Details</b>',
//		            	 columnWidth: 0.5,
		            	 height : '100%',
//		            	 defaults: {anchor: '100%'},
//		            	 layout: {
//	                         type: 'vbox',
//	                         // pack: 'start',
//	                         align: 'stretch'
//	                     },
//		            	 width : '50%',
//		            	 padding : '5px',
		            	 style : {
		            		'float' : 'right',
		            		'padding' : '5px',
		            		'width': '420px',
		            	    'margin': '2px',
		            	    'border-width' : '3px',
		            	    'border-style': 'ridge'
		            	 },
		            	 fieldDefaults: {
	                         labelAlign: 'left',
	                         labelWidth: 150
	                     },
		            	 items : [{
                             xtype: 'combo',
                             id: 'defect_component',
                             name: 'defectComponent',
                             allowBlank: false,
                             labelCls: 'font-weight',
                             fieldCls: 'medtext',
//disabled: true,
                             fieldLabel: 'Enter Module Name',
                             queryMode: 'local',
                             editable: true,
                             // reference: 'userIssueReport',
                             store: storeComponent,
                             displayField: 'component',
                             valueField: 'component'
                         },
                         {
                             xtype: 'filefield',
                             id: 'screen-shot',
                             name: 'screenShots',
                             allowBlank: false,
                             clearOnSubmit: false,
                             disabled: true,
                             emptyText: 'Select an image',
                             fieldLabel: 'Upload Screen Shots',
                             buttonText: 'Browse',
                             labelCls: 'font-weight',
                             buttonOnly: false,
                             listeners: {
                                 render: function() {
                                     this.fileInputEl.set({multiple: true});
                                     // console.log(this.fileInputEl.id);
                                 },
                                 change: function(fld, value) {
                                     Ext.getCmp('selectedFiles').el.setHTML('');
                                     var files = fld.fileInputEl.dom.files;
                                     if (files.length > 5) {
                                         Ext.MessageBox.alert('Alert', 'Maximum 5 Files Only allowed');
                                         Ext.getCmp('selectedFiles').el.setHTML('');
                                         resetItem('screen-shot');
                                         fld.fileInputEl.set({multiple: true});
                                     } else {
                                         var s = "";
                                         Ext.each(files, function(fls) {
                                             s = s + '<i >'+ fls.name + '</br><i>';
                                         });
                                         Ext.getCmp('selectedFiles').el.setHTML(s);
                                     }
                                 }
                             }
                         },
                         {
                             xtype: 'displayfield',
                             hidden : true,
                             id: 'selectedFiles',
                             style: {
                                 'margin-left': '150px'
                             },
                             html: ''
                         }
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
	                    xtype: 'textfield',
	                    id: 'defect_subject',
	                    name: 'defectSubject',
	                    allowBlank: false,
	                    width: "100%",
	                    style: {
//	                        'margin-left': '5px',
	                        // 'border': '4px'
	                    },
	                    listeners: {
	                        'change': function() {
	                            if (this.getValue().length > 100) {
	                                this.setValue(this.getValue().substr(0, 100));
	                                Ext.Msg.alert('Alert', 'Character Count Should Be Below 100');
	                            }
	                        }
	                    },
	                    fieldStyle: "border:inset 1px white"
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
	                            html: '<b>Description</b>  <span style="font-size:14px;">( Character Limit - <span id="charLimit">2500</span> )</span>',
	                            cls: 'biggertext',
	                            style: {
	                                'margin-left': '5px'
	                            }
	                        },
	                    ]
	                },
	                {
	                    xtype: 'textarea',
	                    id: 'defect_description',
	                    name: 'defectDescription',
	                    allowBlank: false,
	                    listeners: {
	                        'change': function() {
//	                        	document.getElementById('charLimit').innerHTML = 2500 - this.getValue().length;
	                            if (this.getValue().length > 2499) {
	                                this.setValue(this.getValue().substr(0, 2499));
	                                Ext.Msg.alert('Alert', 'Character Count Should Be Below 2500');
	                            }
	                        }
	                    },
	                    style: {
//	                        'margin-left': '5px'
	                    },
	                    fieldStyle: "border:inset 1px white",
	                    width: "100%",
	                    height: 150
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
	                    layout: {
	                    	type : 'hbox',
	                    	align : 'center',
	                    	pack : 'center'
	                    },
	                    items: [
//	                            {
//					        xtype: 'component',
//					        flex: 1
//					    },
	                    {
                            xtype: 'button',
                            text : 'Submit',
                            style: {'margin-left': '0px','width' : '80px'},
                            handler: function(b, e) {
                                var issueWindow = Ext.getCmp('defect_module');
                                var haveScreenShot = Ext.getCmp('have_screen_shot');
                                var issueReport = Ext.getCmp('defect_component');
                                var issueUserName = Ext.getCmp('defect_user_name');
                                var issueScreenShot = Ext.getCmp('screen-shot');
                                var issueTitle = Ext.getCmp('defect_subject');
                                var issueDescription = Ext.getCmp('defect_description');
                                var formDialog = b.up('newDefect');

                                var thisform = Ext.getCmp('form-problem-submit').getForm();
                                var a = thisform.getValues();
                                if (a.defectModule == "") {
                                    Ext.Msg.alert('Alert', 'Please Fill Defect Window');
                                } else if (a.defectComponent == "") {
                                    Ext.Msg.alert('Alert', 'Please Fill Defect Module');
                                } else if (a.defectUserName == "") {
                                    Ext.Msg.alert('Alert', 'Please Fill User Name');
                                } else if (a.defectSubject == "") {
                                    Ext.Msg.alert('Alert', 'Please Fill Title');
                                } else if (a.defectDescription == "") {
                                    Ext.Msg.alert('Alert', 'Please Fill Defect Description');
                                } else if (!thisform.isValid()) {
                                    Ext.Msg.alert('Alert', '<div style="text-align: center;margin-left: 30px;">Please Upload Screen Shots </br> Or </br>Uncheck The Checkbox</div>')
                                } else if (thisform.isValid()) {
                                    Ext.MessageBox.show({
                                        title: 'Confirm',
                                        msg: 'Do you want to submit this Defect?',
                                        buttons: Ext.MessageBox.OKCANCEL,
                                        fn: function(btn) {
                                            if (btn == 'ok') {
                                                formDialog.fireEvent('onIssueSubmit', formDialog);
                                            }
                                            if (btn == 'cancel') {
                                                this.close();
                                            }

                                        },
                                        icon: Ext.MessageBox.QUESTION
                                    });
    // }
                                } else {
                                    Ext.Msg.alert('Alert', 'Please Fill All Fields');
                                }
                            }
                        },
                        {
                            xtype : 'button',
                        	text: 'Cancel',
                        	style: {'margin-left': '2px','width' : '80px'},
                            handler: function(b, e) {
                            	var card = Ext.getCmp('layout_card');
                                var cardLayout = card.getLayout();
                                var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
                            	cardLayout.setActiveItem(0);
//                                Ext.getCmp('layout_report_us').getLayout().setActiveItem(1);
//                                Ext.getCmp('layout_report_us').setTitle('Report Us');
                            }
                        }]
	                }
	                ],
	                }
	        ]
})