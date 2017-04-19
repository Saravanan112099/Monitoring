Ext.define("app.view.Login", {
 extend: 'Ext.window.Window',
 alias: 'widget.login',
 requires: ['Ext.form.Panel'],
 title: 'Please Log In',
 autoShow: true,
 height: 150,
 width: 300,
 closable: false,
 resizable: false,
 layout: 'fit',
 items: [
  {
   xtype: 'form',
   bodyPadding: 5,
   defaults: {
    xtype: 'textfield',
    anchor: '100%'
   },
   items: [
    {
     fieldLabel: 'User Name:',
     name: 'username',
     value : 'Saravanan',
     allowBlank: false
    },
    {
     fieldLabel: 'Password:',
     name: 'password',
     inputType: 'password',
     value : '2486',
     allowBlank: false
    },
   ],
   buttons: [
    {
    	text: 'Log in',
        formBind: true,
        disabled: true,
        handler: function(b,e) {
         var formDialog = b.up('login');
         var form = b.up('form');
         formDialog.fireEvent('onLogin',formDialog,form,form.getValues());
        }
    }
   ] 
  }
 ]
});