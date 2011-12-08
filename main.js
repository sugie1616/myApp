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
		{
			xtype: 'displayfield',
			value: 'E-mail Adress:',
		},
		{
			xtype: 'textfield',
			name: 'email',
			emptyText: 'E-mail Adress',
			//fieldLabel: 'Email Address',
			vtype: 'email',
			allowBlank: false
		},
		{
			xtype: 'displayfield',
			value: 'Password:',
		},
		{
			xtype: 'textfield',
			name: 'password1',
			//fieldLabel: 'Password',
			inputType: 'password',
			style: 'margin-top:15px',
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
//			{
//				xtype: 'checkboxfield',
//				name: 'acceptTerms',
//				fieldLabel: 'Terms of Use',
//				hideLabel: true,
//				style: 'margin-top:15px',
//				boxLabel: 'I have read and accept the <a href="http://www.sencha.com/legal/terms-of-use/" class="terms">Terms of Use</a>.',
//
//				// Listener to open the Terms of Use page link in a modal window
//				listeners: {
//					click: {
//						element: 'boxLabelEl',
//						fn: function(e) {
//							var target = e.getTarget('.terms'),
//							win;
//							if (target) {
//								win = Ext.widget('window', {
//									title: 'Terms of Use',
//									modal: true,
//									html: '<iframe src="' + target.href + '" width="950" height="500" style="border:0"></iframe>',
//									buttons: [{
//										text: 'Decline',
//									handler: function() {
//										this.up('window').close();
//										formPanel.down('[name=acceptTerms]').setValue(false);
//									}
//									}, {
//										text: 'Accept',
//									handler: function() {
//										this.up('window').close();
//										formPanel.down('[name=acceptTerms]').setValue(true);
//									}
//									}]
//								});
//								win.show();
//								e.preventDefault();
//							}
//						}
//					}
//				},
//
//				// Custom validation logic - requires the checkbox to be checked
//				getErrors: function() {
//					return this.getValue() ? [] : ['You must accept the Terms of Use']
//				}
//			}
			],

			dockedItems: [{
				xtype: 'container',
				dock: 'bottom',
				layout: {
					type: 'hbox',
					align: 'middle'
				},
				padding: '10 10 5',

				items: [{
					xtype: 'component',
					id: 'formErrorState',
					baseCls: 'form-error-state',
					flex: 1,
					validText: 'Form is valid',
					invalidText: 'Form has errors',
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
				}, {
					xtype: 'button',
					formBind: true,
					disabled: true,
					text: 'Register!',
					width: 80,
					handler: function() {
						var form = this.up('form').getForm();

						/* Normally we would submit the form to the server here and handle the response...
						   form.submit({
						   clientValidation: true,
						   url: 'register.php',
						   success: function(form, action) {
						//...
						},
						failure: function(form, action) {
						//...
						}
						});
						*/

						if (form.isValid()) {
							Ext.Msg.alert('Submitted Values', form.getValues(true));
						}
					}
				}]
			}]
	});

	//	var formPanel = Ext.widget('form',{
	//		title: 'Form',
	//		frame: true,
	//		width: 300,
	//		bodyStyle:{
	//			padding:'8px'
	//		},
	//		items:[
	//		{
	//			xtype: 'textfield',
	//			name: 'user ID',
	//			fieldLabel: 'user ID',
	//		},
	//		{
	//			xtype: 'textfield',
	//			name: 'password',
	//			inputType: 'password',
	//			fieldLabel: 'password'
	//		},
	//		],
	//		buttonAlign:'left',
	//		buttons:[
	//			{
	//				text:'register',
	//				handler:function(){
	//					var formFields = this.up('form').getForm();
	//					var formValues = formFields.getValues();
	//					var data = [];
	//					new Ext.iterate(formValues,function(key, val, arr){
	//						data.push({
	//							fieldname:key,
	//							formvalue:val
	//						});
	//					});
	//	
	//					var tpl = new Ext.XTemplate(
	//							'<tpl for=".">',
	//							'<p>{fieldname}:{formvalue}</p>',
	//							'</tpl>'
	//					);
	//	
	//					new Ext.Msg.show()({
	//						title: 'confirmation',
	//						msg:tpl.apply(data),
	//						width:300,
	//						buttons:Ext.Msg.OK
	//					});
	//				}
	//			}
	//		]
	//	});
	//north panel
	var northPanel = Ext.create('Ext.panel.Panel', {
		frame: true,
		split: true,
		//collapsible: true,
		//animCollapse: true,
		margins: '0 0 0 5',
		title: 'north',
		region:'north',
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
			new Ext.Panel({
				title: 'Simple Editor',
			stateId: 'editor-panel',
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
			height: 300,
			width: 800,
			emptyText: 'Source Code',
			},
			{
				xtype: 'displayfield',
				name: 'textarealabel',
				fieldLabel: 'CommentArea',
				value: ''
			},
			{
				xtype: 'textareafield',
				name: 'commentarea',
				width: 800,
			emptyText: 'Comment',
			},
			{
				xtype: 'button',
				name: 'comment',
				text: 'comment',
				align: 'right'
			},
			]
			}),
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
		width: 300,
		region: 'east',
		frame: true,
		split: true,
		collapsible: true,
		animCollapse: true,
		margins: '0 0 0 5',
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
