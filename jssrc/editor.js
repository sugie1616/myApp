Ext.require([
		'Ext.panel.*'
		]);

Ext.onReady(function() {

	var editorPanel = Ext.create('Ext.panel.Panel', {
		frame: true,
		title: 'Simple Editor',
		width: 800,
		bodyPadding: 10,
		region: 'east',

		fieldDefaults: {
			labelAlign: 'left',
			labelWidth: 90,
			anchor: '100%',
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
			width: 700,
			value: 'Editing Source Code',
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
			width: 700,
			value: 'Editing Comment'
		},
		{
			xtype: 'button',
			name: 'comment',
			text: 'comment',
			align: 'right'
		},
		]
	});
	editorPanel.render('editor-ct');
});
