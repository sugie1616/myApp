Ext.require(['*']);

Ext.onReady(function() {
Ext.tip.QuickTipManager.init();
var formPanel = Ext.widget('form', {
	renderTo: Ext.getBody(),
	frame: true,
	//width: 200,
	bodyPadding: 10,
	bodyBorder: true,
	title: 'Account Registration',

	defaults: {
		anchor: '100%'
	},
	fieldDefaults: {
		labelAlign: 'left',
	msgTarget: 'none',
	invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
	},
	listeners: {
		fieldvaliditychange: function() {
			this.updateErrorState();
		},
	fielderrorchange: function() {
		this.updateErrorState();
	}
	},

	updateErrorState: function() {
		var me = this,
		errorCmp, fields, errors;

		if (me.hasBeenDirty || me.getForm().isDirty()) { //prevents showing global error when form first loads
			errorCmp = me.down('#formErrorState');
			fields = me.getForm().getFields();
			errors = [];
			fields.each(function(field) {
				Ext.Array.forEach(field.getErrors(), function(error) {
					errors.push({name: field.getFieldLabel(), error: error});
				});
			});
			errorCmp.setErrors(errors);
			me.hasBeenDirty = true;
		}
	},

	items: [
	{
		xtype: 'displayfield',
		value: 'User Name:',
	},
	{
		xtype: 'textfield',
		name: 'username',
		emptyText: 'User Name',
		//fieldLabel: 'User Name',
		allowBlank: false,
		minLength: 6
	},
//	{
//		xtype: 'displayfield',
//		value: 'E-mail Adress:',
//	},
//	{
//		xtype: 'textfield',
//		name: 'email',
//		emptyText: 'E-mail Adress',
//		//fieldLabel: 'Email Address',
//		vtype: 'email',
//		allowBlank: false
//	},
	{
		xtype: 'displayfield',
		value: 'Password:',
	},
	{
		xtype: 'textfield',
		name: 'password1',
		//fieldLabel: 'Password',
		inputType: 'password',
		//style: 'margin-top:15px',
		allowBlank: false,
		minLength: 8
	},
	{
		xtype: 'displayfield',
		value: 'Repeat Password:',
	},
	{
		xtype: 'textfield',
		name: 'password2',
		//fieldLabel: 'Repeat Password',
		inputType: 'password',
		allowBlank: false,
		validator: function(value) {
			var password1 = this.previousSibling('[name=password1]');
			return (value === password1.getValue()) ? true : 'Passwords do not match.'
		}
	},
	],

	dockedItems: [{
		xtype: 'container',
		dock: 'bottom',
		layout: {
			type: 'hbox',
			align: 'middle'
		},
		padding: '10 10 5',

		items: [
		{
			xtype: 'component',
			id: 'formErrorState',
			baseCls: 'form-error-state',
			flex: 1,
//			validText: 'Form is valid',
//			invalidText: 'Form has errors',
			tipTpl: Ext.create('Ext.XTemplate', '<ul><tpl for="."><li><span class="field-name">{name}</span>: <span class="error">{error}</span></li></tpl></ul>'),

			getTip: function() {
				var tip = this.tip;
				if (!tip) {
					tip = this.tip = Ext.widget('tooltip', {
						target: this.el,
						title: 'Error Details:',
						autoHide: false,
						anchor: 'top',
						mouseOffset: [-11, -2],
						closable: true,
						constrainPosition: false,
						cls: 'errors-tip'
					});
					tip.show();
				}
				return tip;
			},

			setErrors: function(errors) {
				var me = this,
				baseCls = me.baseCls,
				tip = me.getTip();

				errors = Ext.Array.from(errors);

				// Update CSS class and tooltip content
				if (errors.length) {
					me.addCls(baseCls + '-invalid');
					me.removeCls(baseCls + '-valid');
					me.update(me.invalidText);
					tip.setDisabled(false);
					tip.update(me.tipTpl.apply(errors));
				} else {
					me.addCls(baseCls + '-valid');
					me.removeCls(baseCls + '-invalid');
					me.update(me.validText);
					tip.setDisabled(true);
					tip.hide();
				}
			}
		},
		{
			xtype: 'button',
			formBind: true,
			disabled: true,
			text: 'Register!',
			width: 80,
			handler: function() {
				var form = formPanel.getForm();
				Ext.Ajax.request({
					method: 'GET',
					url: 'http://localhost/cgi-bin/register.k',
					params: form.getValues(true),
					success: function() {
						Ext.Msg.alert('Registratin Completed');
					},
					failure: function() {
						Ext.Msg.alert('Registratin Failed');
					},
				});
			}
		},
		{
			xtype: 'button',
			formBind: true,
			disabled: true,
			id: 'loginButton',
			text: 'Login',
			width: 80,
			handler: function() {
				Ext.Ajax.request({
					method: 'GET',
					url: 'http://localhost/cgi-bin/login.k',
					params: formPanel.getForm(),
					success: function() {
						Ext.Msg.alert('Login Completed');
					},
					failure: function() {
						Ext.Msg.alert('Login Failed');
					},
				});
			}
		},
		]
	}]
});

var editorPanel = Ext.widget('form', {
	title: 'Editor',
	frame: true,
	split: true,
	animCollapse: true,
	margins: '0 0 0 5',
	region: 'center',
	fieldDefaults: {
		labelAlign: 'left',
	},
	items: [
		{
			xtype: 'displayfield',
			name: 'textarealabel',
			fieldLabel: 'TextArea',
			value: ''
		},
		{
			xtype: 'textareafield',
			name: 'textarea',
			id: 'textarea',
			height: 200,
			width: 800,
			emptyText: 'Source Code',
		},
		{
			xtype: 'button',
			name: 'runbtn',
			text: 'Run',
			handler: function() {
				Ext.Ajax.request({
					method: 'POST',
					url: 'http://localhost/cgi-bin/run.k',
					params: {
						input: document.getElementById("textarea").getElementsByTagName("textarea")[0].value
					},
					success: function(result) {
						//Ext.Msg.alert('Success Run Konoha');
						document.getElementById("console").getElementsByTagName("textarea")[0].value = result.responseText;
					},
					failure: function() {
						Ext.Msg.alert('Fail Run Konoha');
					},
				});
			}
		},	
		{
			xtype: 'button',
			name: 'savebtn',
			text: 'Save',
			handler: function() {
				Ext.Ajax.request({
					method: 'GET',
					url: 'http://localhost/cgi-bin/src.k',
					params: 'print "Hello World"',
					success: function() {
						Ext.Msg.alert('Saving Completed');
					},
					failure: function() {
						Ext.Msg.alert('Saving Failed');
					},
				});
			}
		},
		{
			xtype: 'button',
			name: 'loadbtn',
			text: 'Load',
			handler: function() {
				Ext.Ajax.request({
					method: 'GET',
					url: 'http://localhost/cgi-bin/src.k',
					params: 'print "Hello World"',
					success: function() {
						Ext.Msg.alert('Loading Completed');
					},
					failure: function() {
						Ext.Msg.alert('Saving Failed');
					},
				});
			}
		},
		{
			xtype: 'displayfield',
			name: 'textarealabel',
			fieldLabel: 'Console',
			value: ''
		},
		{
			xtype: 'textareafield',
			name: 'console',
			id: 'console',
			width: 800,
			emptyText: 'Console',
		},
	]
});

var findPanel = Ext.create('Ext.form.Panel', {
	title: 'find your friends',
	frame: true,
	split: 'true',
	margins: '5 0 0 5',
	items: [
		{
			xtype: 'displayfield',
			value: 'Friends Name:',
		},
		{
			xtype: 'textfield',
			emptyText: 'Friends Name',
		},
		{
			xtype: 'button',
			text: 'Search',
			handler: function() {
				Ext.Ajax.request({
					method: 'GET',
					url: 'http://localhost/cgi-bin/usr.k',
					params: formPanel.getForm(),
					success: function() {
						Ext.Msg.alert('Search Completed');
					},
					failure: function() {
						Ext.Msg.alert('Search Failed');
					},
				});
			}
		//store: store
		},
	],
});

var northPanel = Ext.create('Ext.panel.Panel', {
	frame: true,
	split: true,
	//collapsible: true,
	//animCollapse: true,
	margins: '0 0 0 5',
	title: 'north',
	region:'north',
	html: 'Welcome !',
	items: [
	],
});

//center panel
var centerPanel = Ext.create('Ext.panel.Panel', {
	frame: true,
	split: true,
	//collapsible: true,
	//animCollapse: true,
	margins: '0 0 0 5',
	title: 'center',
	region:'center',
	items:[
	new Ext.Panel({
		title: 'Your-info',
	region: 'north',
	stateId: 'me-panel',
	frame: true,
	split: true,
	animCollapse: true,
	margins: '0 0 0 5',
	html: 'Hello World',
	items: []
	}),
		editorPanel,
		]
});

//west panel
var westPanel = Ext.create('Ext.panel.Panel', {
	title: 'West',
	width: 210,
	region: 'west',
	maxWidth: 400,
	frame: true,
	split: true,
	collapsible: true,
	animCollapse: true,
	margins: '0 0 0 5',
	items:[
	formPanel,
	]
});

//east panel
var eastPanel = Ext.create('Ext.panel.Panel',{
	title: 'Friends',
	width: 210,
	maxWidth: 400,
	region: 'east',
	frame: true,
	split: true,
	collapsible: true,
	animCollapse: true,
	margins: '0 0 0 5',
	items:[
		findPanel,
	],
});
new Ext.Viewport({
	layout: 'border',
	items:[
	northPanel,
	centerPanel,
	westPanel,
	eastPanel,
	]
});
});
