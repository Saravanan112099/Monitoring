Ext.define('app.view.chart.UaeChart',{
    extend : 'Ext.chart.Chart',
    width : 500,
    height : 80,
//    layout : 'fit',
    style :{
        'margin-top': '-8px',
        'margin-left': '-4px',
        'margin-bottom': '-10px'
    },
	animate : true,
	store : 'app.store.chartstore.UaeChartStore',
	axes : [ {
		type : 'Numeric',
		position : 'bottom',
		fields : [ 'value' ],
		hidden : true,
		label : {
			renderer : Ext.util.Format.numberRenderer('0,0')
		},
		grid : true,
		minimum : 0,
		maximum : 100
	}, {
		type : 'Category',
		position : 'left',
		fields : 'name'
	} ],
	series : [ {
		type : 'bar',
		axis : 'bottom',
		tips : {
			trackMouse : true,
			renderer : function(storeItem, item) {
//				console.log(storeItem.data.details);
//				console.log(item);
                                if((storeItem.data.details !== "") && (storeItem.data.details.totalMemory)){
//                                    this.setTitle(storeItem.get('name').replace(/%/, 'Usage') + ' : '+(parseInt(storeItem.data.details.usedMemory)/1024).toFixed(2)+ ' of '+(parseInt(storeItem.data.details.totalMemory)/1024).toFixed(2)+'</br>'+'Free : '+(parseInt(storeItem.data.details.totalMemory) - parseInt(storeItem.data.details.usedMemory))) ;
                                    this.setTitle('Free : '+(parseInt(storeItem.data.details.totalMemory) - parseInt(storeItem.data.details.usedMemory))+' Mb'+ '</br>'+
                                                    'Used : '+storeItem.data.details.usedMemory+'</br>'+
                                                    'Total : '+storeItem.data.details.totalMemory) ;
                                }else{
                                    this.setTitle(storeItem.get('name').replace(/%/, 'Usage') + ' : '+ storeItem.get('value') + '%');
                                }
			}
		},
                        yPadding:6,
                        barWidth: 40,
                        style : {
                            width: 30
                        },
                        gutter: 60,
		label : {
			display : 'insideEnd',
                        font: '12px news-gothic-std,sans-serif',
                        minMargin: 500,                      
			field : ['value'],
//			renderer : Ext.util.Format.numberRenderer('0'),
                        renderer: function(value,b,record) {
//                                return String(v).replace(/(.)00000$/, '.$1M');
                                    if(record.data.name === 'Disk %'){
                                        var tot = record.data.details.totalDiskSpace;
                                        var used = record.data.details.usedDiskSpace;
                                        var avail = record.data.details.availableDiskSpace;
                                        return used + ' / ' + tot;
                                    }else{
                                        return Math.round(value * 100) / 100;
                                    }      
                            },
//                        },
			orientation : 'horizontal',
			color : '#333',
			'text-anchor' : 'right'
		},
		xField : 'name',
		yField : 'value',
		renderer : function(sprite, record, attr, index, store) {
			var str = attr.store;
                        var name = record.data.name;
			var value = record.data.value;
			attr.height = 10;
			var color;
			if (name === "Cpu %") {
                            if(value <= 10){
                                color = 'rgb(136, 255, 0)';
                            }
                            else if(value > 10 && value < 20){
                                color = 'rgb(255, 144, 0)';
                            }else{
                                color = 'rgb(255, 84, 0)';
                            }
				
			}
                        if (name === "Mem %") {
                            if(value <= 50){
                                color = 'rgb(136, 255, 0)';
                            }
                            else if(value > 50 && value < 70){
                                color = 'rgb(255, 144, 0)';
                            }else{
                                color = 'rgb(255, 84, 0)';
                            }
				
			}
                        if (name === "Disk %") {
                            if(value <= 70){
                                color = 'rgb(136, 255, 0)';
                            }
                            else if(value > 70 && value < 90){
                                color = 'rgb(255, 144, 0)';
                            }else{
                                color = 'rgb(255, 84, 0)';
                            }
				
			}
			return Ext.apply(attr, {
				fill : color
			});
		}
	} ]
});