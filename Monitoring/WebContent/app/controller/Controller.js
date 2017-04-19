
Ext.define('app.controller.Controller', {
	extend: 'Ext.app.Controller',
	views: ['app.view.Login', 'app.view.layout.BorderLayout',
		'app.view.tenant.TenantView',
		'app.view.tenant.AssetDetailsGrid',
		//            'app.view.home.Home'
		//            'app.store.chartstore.OmanChartStore',
		//            'app.store.chartStore.UaeChartStore',
		//            'app.store.chartStore.KsaChartStore'
	],
	init: function () {
		this.control({
			'login': {
				onLogin: this.onLoginRequest,
				//				onLogin: function(){
				//					var myObj = {
				//						 param1 : 'something',
				//							 obj1    : {
				//							    a : 'something in obj1'
				//							 }
				//
				//						}
				//					Ext.Ajax.request({
				//						url: 'GetDefectServlet',
				//						method: 'POST',
				//						async: true,
				//						params: {
				//							workFlowName : 'Sample',
				//							ajax_req: Ext.encode(myObj)
				//							
				//						},
				//						scope: this,
				//					})
				//				}
			},
			'tenantView button[action=refreshReport]': {
				click: this.refreshReport
			},
			'home': {
				getDefects: this.getDefects,
				onUpdate: this.updateDefect,
				getComboDetails: this.getComboDetails,
				getTenantStatus: this.getTenantStatus
			},
			'newDefect': {
				onIssueSubmit: this.onIssueSubmit
			},
			'detailedView': {
				onSubmitComments: this.updateDefect,
				onUpdate: this.updateDefect,
			},
			'defectGridView': {
				onUpdate: this.updateOnGrid,
				getDefects: this.getDefects, 
			}
			//			'borderLayout button[action=showOmanServer]': {
			//            	click : this.showOmanServer
			//            },
			//			'borderLayout button[action=showOmanServerDb]':{
			//				click : this.showOmanServerDb()
			//   			}
		});
	},
	
	getTenantStatus : function(formDialog){
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
		mask.show();
//		USERNAME = loginCredentials.username;
//		PASSWORD = loginCredentials.password;
		Ext.Ajax.request({
			url: 'DetailedReport',
			method: 'GET',
//			async: true,
//			params: {
//				//				username: Ext.encode(loginCredentials.username),
//				username: 'ivms',
//				password: 'ivms',
//				//				password: Ext.encode(loginCredentials.password),
//				//				username : USERNAME,
//				//				password : PASSWORD,
//				loggedin: false
//			},
			scope: this,

			success: function (response, opts) {
				var chartStore = Ext.data.StoreManager.lookup('app.store.ChartStore');
				var omanChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.OmanChartStore');
				var uaeChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.UaeChartStore');
				var ksaChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.KsaChartStore');
				var tenantStore = Ext.data.StoreManager.lookup('app.store.TenantStore');
				response = Ext.decode(response.responseText);
				console.log('Success');
				console.log(response);
				if (response.success) {
					mask.hide();
					Ext.getCmp('lblTime').setText('Last Updated Time : '+Ext.Date.format(new Date(), 'Y-m-d H:i:s T'));
//					loginDialog.destroy();
					//					var layoutVerticalBox = Ext.create('app.view.layout.VerticalBox');
					//                                        console.log(response);layout_card
//					var borderLayout = Ext.create('app.view.layout.BorderLayout');
//					var cardLayout = Ext.create('app.view.layout.CardLayout');
					omanChartStore.loadRawData(response);
					uaeChartStore.loadRawData(response);
					ksaChartStore.loadRawData(response);
					tenantStore.loadRawData(response);
//					Ext.create('Ext.container.Viewport', {
//						layout: {
//							type: 'fit',
//						},
//						resizable: false,
//						items: [borderLayout]
//					});
				} else {
					mask.hide();
					Ext.MessageBox.alert('Login Failed', 'Username or Password incorrect...');
					loginForm.getForm().reset();
				};
			},
			failure: function (err) {
				console.log('failed');
				console.log(err);
				mask.hide();
				Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
//				loginForm.getForm().reset();
			}
		});
	},
	onLoginRequest: function (loginDialog, loginForm, loginCredentials) {
		var mask = new Ext.LoadMask(loginDialog, { msg: "Please wait..." });
		mask.show();
		USERNAME = loginCredentials.username;
		PASSWORD = loginCredentials.password;
		Ext.Ajax.request({
			url: 'report',
			method: 'POST',
			async: true,
			params: {
				username: Ext.encode(loginCredentials.username),
//				username: 'ivms',
//				password: 'ivms',
				password: Ext.encode(loginCredentials.password),
				//				username : USERNAME,
				//				password : PASSWORD,
				loggedin: false
			},
			scope: this,

			success: function (response, opts) {
				var chartStore = Ext.data.StoreManager.lookup('app.store.ChartStore');
				var omanChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.OmanChartStore');
				var uaeChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.UaeChartStore');
				var ksaChartStore = Ext.data.StoreManager.lookup('app.store.chartstore.KsaChartStore');
				var tenantStore = Ext.data.StoreManager.lookup('app.store.TenantStore');
				response = Ext.decode(response.responseText);
				//		        console.log(response.details);
				if (response.success) {
					mask.hide();
					loginDialog.destroy();
					//					var layoutVerticalBox = Ext.create('app.view.layout.VerticalBox');
					//                                        console.log(response);layout_card
					var borderLayout = Ext.create('app.view.layout.BorderLayout');
					
					omanChartStore.loadRawData(response);
					uaeChartStore.loadRawData(response);
					ksaChartStore.loadRawData(response);
					tenantStore.loadRawData(response);
					var cardLayout = Ext.create('app.view.layout.CardLayout');
					Ext.create('Ext.container.Viewport', {
						layout: {
							type: 'fit',
						},
						resizable: false,
						items: [cardLayout]
					});
				} else {
					mask.hide();
					Ext.MessageBox.alert('Login Failed', 'Username or Password incorrect...');
					loginForm.getForm().reset();
				};
			},
			failure: function (err) {
				mask.hide();
				Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
				loginForm.getForm().reset();
			}
		});
	},
	onIssueSubmit: function (formDialog) {
		console.log('Requested to insert Ticket');
		var that = this;
		var form = Ext.getCmp('form-problem-submit').getForm();
		console.log(form);
		var mask = new Ext.LoadMask(formDialog, { msg: "Please wait..." });
		mask.show();
		if (form.isValid()) {
			form.submit({
				// url: 'DefectlogServlet',
				url: 'DefectlogServlet',
				method: 'POST',
				params: {
					userName: USERNAME
				},
				success: function (response, msg) {
					//					console.log('SUCCESS');
					console.log(msg.response.responseText);
					var a = ['defect_module', 'defect_user_name',
						'defect_component', 'screen-shot',
						'selectedFiles', 'defect_subject',
						'defect_description',
						'have_screen_shot'];
					for (var i = 0; i < a.length; i++) {
						resetItem(a[i]);
					}
					Ext.getCmp('have_screen_shot').setValue('false');
					//					Ext.getCmp('screen-shot').fileInputEl.set({
					//						multiple : true
					//					});
					Ext.getCmp('selectedFiles').el.setHTML('');
					mask.hide();
					Ext.Msg.alert('Success',
						'Submitted Your Ticket...');
					//					Ext.getCmp('layout_report_us').getLayout()
					//							.setActiveItem(0);
					//					Ext.getCmp('layout_report_us').setTitle(
					//							'Report Us');
					function hide_message() {
						Ext.defer(function () {
							Ext.MessageBox.hide();
						}, 3000);
					}

					that.getDefects(null);
					var card = Ext.getCmp('layout_card');
					var cardLayout = card.getLayout();
					var activeLayoutIndex = card.items.indexOf(cardLayout.activeItem);
					cardLayout.setActiveItem(2);

					//					hide_message();
				},
				failure: function (err, msg) {
					mask.hide();
					console.log('FAIL...');
					console.log(err);
					console.log(msg);
					var result = Ext.decode(msg.response.responseText);
					////					console.log(result);
					Ext.Msg.alert('Failed', result.resultText);
					//					// var p = Ext.getCmp('fileHolder');
					//					// var i = p.items.items[1];
					//					// p.remove(i, true);
					//					// console.log('removed');
					//					// p.add(1,ffield);
					//					resetItem('screen-shot');
					//					Ext.getCmp('screen-shot').fileInputEl.set({
					//						multiple : true
					//					});
					//					Ext.getCmp('selectedFiles').setHtml('');

					// mask.hide();
					// Ext.MessageBox.alert('Error', 'Server
					// Error...!!!');
				}
			});
		} else {
			mask.hide();
			Ext.Msg.alert('Alert', 'Please Fill All Fields');
		}
	},
	getDefects: function (formDialog) {
		//		console.log('Get Defects Called');
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
		mask.show();
		Ext.Ajax.request({
			url: 'GetDefectServlet',
			method: 'POST',
			params: {
				workFlowName: 'getDefects'
			},
			scope: this,
			success: function (response, opts) {
				mask.hide();
				var defectStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
				response = Ext.decode(response.responseText);
//								console.log(response);
				defectStore.loadRawData(response);
//				var a = Ext.getCmp('defect_grid').filters.getFilter(5);
//				a.menu.store.data.items[0].data.id = "Saravanan";
//				a.menu.store.data.items[0].data.text = "Saravanan";
//				var str = Ext.StoreManager.lookup('app.store.DefectStore').data.items
//				defectStore = defectStore.data.items;
//				
//				var str1 = Ext.data.StoreManager.lookup('statusStore');
//
//				st = []
//
//				defectStore.forEach(function(item){
//					if(st.indexOf(item.get('status')) == -1){
//						st.push(item.get('status'));
//				      console.log('.........');
//				    }
//				})
//
//				var out = JSON.stringify(st.map(function (el) {
//				    return { "status": el };
//				}));
//
//				console.log(out);
//
//				var a = Ext.JSON.decode(out)
//				console.log(str1.data);
//				str1.loadData(a);
////				str1.load();
//				console.log(str1.data);
//				console.log(a);
			},
			failure: function (err) {
				mask.hide();
				Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
			}
		});
	},
	//	updateDefect : function(formDialog,colName,recordId,newValue,rowIdx){
	updateDefect: function (formDialog, recordId, rowIdx, comm) {
//		console.log('Reached to Controller');
		//		console.log('Column Name : ' + colName);
//		console.log('Record Id : ' + recordId);
		//		console.log('New Value : ' + newValue);
		var commStat  = null;
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
				mask.show();
//				comStat = 'comment only';
		//		app.util.Utilities.currentStatus = items.get('status');
		//		app.util.Utilities.currentDeliverDate = items.get('deliver_dt');
//				if (app.util.Utilities.currentStatus != editValues.status && app.util.Utilities.currentDeliverDate == editValues.deliver_dt && comm.trim() != '') {
//					
//				}
//				if (app.util.Utilities.currentStatus == editValues.status && app.util.Utilities.currentDeliverDate == editValues.deliver_dt && comm.trim() != '') {
//					console.log('Comment Only');
//				}
				if(!comm){
					comm = '';
				}
				if ((app.util.Utilities.currentStatus != editValues.status || app.util.Utilities.currentDeliverDate != editValues.deliver_dt) && comm.trim() == '') {
//					console.log('Without Commet')
					commStat = 'WithoutCommet';
				}else if ((app.util.Utilities.currentStatus != editValues.status || app.util.Utilities.currentDeliverDate != editValues.deliver_dt) && comm.trim() != '') {
//					console.log('With Commet')
					commStat = 'WithCommet';
				}else if ((app.util.Utilities.currentStatus == editValues.status && app.util.Utilities.currentDeliverDate == editValues.deliver_dt) && comm.trim() != '') {
//					console.log('Only Commet')
					commStat = 'OnlyCommet';
				}else if (app.util.Utilities.currentStatus == editValues.status && app.util.Utilities.currentDeliverDate == editValues.deliver_dt && comm.trim() == '') {
//					console.log('No Changes');
					commStat = null;
//					mask.hide();
				}
				
				if(commStat != null){
					console.log("Req Sent with : "+commStat);
					Ext.Ajax.request({
						url: 'GetDefectServlet',
						method: 'POST',
						params: {
							workFlowName: 'updateDefect',
							updatedValues: Ext.encode(editValues),
							comments: comm,
							subflow : commStat,
							defectId: recordId,
							sendBy: USERNAME,
							//				newValue : newValue
						},
						scope: this,
						success: function (response, opts) {
							mask.hide();
							response = Ext.decode(response.responseText);
							app.util.Utilities.currentStatus = editValues.status
							app.util.Utilities.currentDeliverDate = editValues.deliver_dt					
							Ext.getCmp('dtlComments').reset();
							var grid = Ext.getCmp('defect_grid');
							var b = grid.getStore().getRange();
//							b[rowIdx].set('modified_dt', (new Date()).getTime() / 1000);
							b[rowIdx].set('status', response.status);
							b[rowIdx].set('modified_dt', response.modified_dt);
							b[rowIdx].set('deliver_dt', response.deliver_dt);
							Ext.getCmp('dtlLastModifiedDate').setValue(new Date(response.modified_dt * 1000));
							
							editValues.status = '';
							editValues.deliver_dt = '';
							
							var comments = response.comments;
							if (comments != null && comm) {
								var problemListStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
								// UPDATE THE COMMENTS IN GRID STORE
								problemListStore.data.getByKey(app.util.Utilities.gridRowId).data.comments = comments;
								var comContainer = Ext.getCmp('coment-container');
								// REMOVE PREVIOUS CONTENT IN THE COMMENT CONTAINER
								comContainer.removeAll();
								for (var i = 0; i < comments.length; i++) {
									var d = new Date(parseInt(comments[i].created_dt) * 1000);
									var dt = Ext.util.Format.date(d, 'Y-m-d H:i:s T');
									var itm = {
										html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Sent by : <b>'
										+ comments[i].created_by
										+ '</b></div><div style="float:right;">Date : <b>'
										+ dt + '</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>'
										+ comments[i].comment
										+ '</span></div></div>'
									};
									comContainer.add(itm);
								}
							}
							//            		}

						},
						failure: function (err) {
							editValues.status = '';
							editValues.deliver_dt = '';
							editValues.comments = '';
							mask.hide();
							Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
						}
					});
				}else{
					mask.hide();
					console.log('No Changes');
				}
	},
	updateOnGrid: function (formDialog, recordId, rowIdx) {
	//		console.log('Request Reached to Controller');
	//		console.log('Column Name : ' + colName);
	//		console.log('Record Id : ' + recordId);
	//		console.log('New Value : ' + newValue);
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
		mask.show();
		Ext.Ajax.request({
			url: 'GetDefectServlet',
			method: 'POST',
			params: {
				workFlowName: 'updateDefect',
				updatedValues: Ext.encode(editValues),
				subflow : 'WithoutCommet',
				defectId: recordId,
				sendBy: USERNAME,
				//				newValue : newValue
			},
			scope: this,
			success: function (response, opts) {
				mask.hide();
				response = Ext.decode(response.responseText);
				app.util.Utilities.currentStatus = editValues.status
				app.util.Utilities.currentDeliverDate = editValues.deliver_dt					
				Ext.getCmp('dtlComments').reset();
				var grid = Ext.getCmp('defect_grid');
				var b = grid.getStore().getRange();
	//			b[rowIdx].set('modified_dt', (new Date()).getTime() / 1000);
				b[rowIdx].set('status', response.status);
				b[rowIdx].set('modified_dt', response.modified_dt);
				b[rowIdx].set('deliver_dt', response.deliver_dt);
				Ext.getCmp('dtlLastModifiedDate').setValue(new Date(response.modified_dt * 1000));
				
				editValues.status = '';
				editValues.deliver_dt = '';
			},
			failure: function (err) {
				editValues.status = '';
				editValues.deliver_dt = '';
				editValues.comments = '';
				mask.hide();
				Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
			}
		});		
	},

	getComboDetails: function (formDialog) {
		console.log('Requested to get Combo Details');
		var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
		mask.show();
		Ext.Ajax.request({
			url: 'GetDefectServlet',
			method: 'POST',
			params: {
				workFlowName: 'getComboDetails'
			},
			scope: this,
			success: function (response, opts) {
				console.log('Success');
				console.log(response);
				mask.hide();
				var storeWindow = Ext.data.StoreManager.lookup('app.store.defect.ModuleStore');
				var storeComponent = Ext.data.StoreManager.lookup('app.store.defect.ComponentStore');
				var storeUserName = Ext.data.StoreManager.lookup('app.store.defect.TenantNameStore');
				// console.log(moduleStore);
				// console.log(componentStore);
				response = Ext.decode(response.responseText);
				// console.log(response[Object.keys(response)[0]])
				// console.log(response[Object.keys(response)[1]])
				storeWindow.loadRawData(response[Object.keys(response)[0]])
				storeComponent.loadRawData(response[Object.keys(response)[1]])
				storeUserName.loadRawData(response[Object.keys(response)[2]])
				//				var defectStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
				//				response = Ext.decode(response.responseText);
				//				console.log(response);
				//				defectStore.loadRawData(response);
			},
			failure: function (err) {
				console.log('Fail');
				//				mask.hide();
				//				Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
			}
		});
	},

});

function resetItem(id) {
	// get the file upload element
	var fileField = document.getElementById(id);
	// get the file upload parent element
	var parentNod = fileField.parentNode;
	// create new element
	var tmpForm = document.createElement("form");
	parentNod.replaceChild(tmpForm, fileField);
	tmpForm.appendChild(fileField);
	tmpForm.reset();
	parentNod.replaceChild(fileField, tmpForm);
}


//updateDefectOnDetailPage: function (formDialog, colName, recordId, newValue, rowIdx) {
////		console.log('Request Reached to Controller');
////		console.log('Column Name : ' + colName);
////		console.log('Record Id : ' + recordId);
////		console.log('New Value : ' + newValue);
//var mask = new Ext.LoadMask(Ext.getBody(), { msg: "Please wait..." });
//mask.show();
//Ext.Ajax.request({
//	url: 'GetDefectServlet',
//	method: 'POST',
//	params: {
//		workFlowName: 'updateDefect',
//		colName: colName,
//		defectId: recordId,
//		newValue: newValue
//	},
//	scope: this,
//	success: function (response, opts) {
//		mask.hide();
//		//				var defectStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
//		//				response = Ext.decode(response.responseText);
//		console.log(response);
//		var grid = Ext.getCmp('defect_grid');
//		var b = grid.getStore().getRange();
//		if (colName == 'status') {
//			b[rowIdx].set('modified_dt', (new Date()).getTime() / 1000);
//			b[rowIdx].set('status', newValue);
//			Ext.getCmp('dtlLastModifiedDate').setValue(new Date());
//		} else if (colName == 'deliver_dt') {
//			b[rowIdx].set('modified_dt', (new Date()).getTime() / 1000);
//			b[rowIdx].set('deliver_dt', newValue);
//			Ext.getCmp('dtlLastModifiedDate').setValue(new Date());
//			//            		b[rowIdx].set('status',newValue);
//		}
//		//				defectStore.loadRawData(response);
//	},
//	failure: function (err) {
//		mask.hide();
//		Ext.MessageBox.alert('Error', 'Error in Fetching Data From Server');
//	}
//});
//},

//submitComments: function (formDialog, defect_id, comm) {
//var mask = new Ext.LoadMask(formDialog, {
//	msg: "Please wait..."
//});
//mask.show();
////		console.log('Received Request');
////		console.log(defect_id.value);
////		console.log(comm.value);
////		console.log(sendBy.getValue());
//if (comm.getValue() != "") {
//	comm.value = comm.value.split("'").join("''");
//	Ext.Ajax.request({
//		url: 'GetDefectServlet',
//		method: 'POST',
//		params: {
//			workFlowName: 'persistComment',
//			defectId: defect_id.value,
//			//							sendBy : sendBy.getValue(),
//			sendBy: USERNAME,
//			comment: comm.value,
//		},
//		scope: this,
//		success: function (response, opts) {
//			comm.reset();
//			var commStore = Ext.data.StoreManager.lookup('app.store.defect.CommentsStore');
//			var problemListStore = Ext.data.StoreManager.lookup('app.store.DefectStore');
//			response = Ext.decode(response.responseText);
//			problemListStore.data.getByKey(app.util.Utilities.gridRowId).data.comments = response;
//			commStore.loadRawData(response);
//
//			var comments = commStore.data.items;
//			var comContainer = Ext
//				.getCmp('coment-container');
//			if (comments != null) {
//				comContainer.removeAll();
//				for (var i = 0; i < comments.length; i++) {
//					var d = new Date(
//						parseInt(comments[i]
//							.get('created_dt')) * 1000);
//					var dt = Ext.util.Format
//						.date(d,
//						'Y-m-d H:i:s T');
//					var itm = {
//						html: '<div style="min-height:40px;margin-top:2px;margin-bottom: 5px;"><div style="background:#f7f7f7;font-size:12px;height:16px;"><div style="float:left">Sent by : <b>'
//						+ comments[i].get('created_by')
//						+ '</b></div><div style="float:right;">Date : <b>'
//						+ dt + '</b></div></div><div style="margin:5px;overflow-wrap:break-word;white-space: pre-wrap;"><span>'
//						+ comments[i].get('comment')
//						+ '</span></div></div>'
//					};
//					comContainer.add(itm);
//				}
//			} else {
//				comContainer.removeAll();
//			}
//			mask.hide();
//			// Ext.MessageBox.alert('Success',
//			// 'Comment Submitted...!!!');
//		},
//		failure: function (err, res) {
//			mask.hide();
//			//							console.log(err, res);
//			Ext.MessageBox.alert('Error',
//				'Server Error...!!!');
//		}
//	})
//} else {
//	mask.hide();
//	Ext.MessageBox.alert('Alert',
//		'Please Enter Some Comments...!!!');
//}
//},