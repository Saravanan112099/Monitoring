/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('app.model.AssetDetailsModel', {
        extend: 'Ext.data.Model',
        fields: ['ASSET_ID','REG_NO','ASSET_DESC','ASSET_CATEGORY','MODEL_NM','ESN','LATITUDE',{
                name : 'IGNITION',
                convert: function(value, record) {
                    if(value == true){
                        return 'ON';
                    }else{
                        return 'OFF';
                    }
            }
        },'UOM','NAME','RESOURCE_ID','MOBILE_NO','LONGITUDE',{
            name : 'CREATED_DT',
            convert : function(value,record){
                var d = new Date(value);
                if(value == null){
                        return "0000-00-00 00:00:00";
                }else{
                        return Ext.util.Format.date(d, 'Y-m-d H:i:s T');
                }
            }
        },'SPEED','EVENT_ID','EVENT_DESC','BASE_LOCATION','CARRIER_NM','DATASOURCE','DISTANCE']
});