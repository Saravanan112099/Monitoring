Ext.define('app.store.defect.CommentsStore', {
	extend : 'Ext.data.Store',
	storeId: 'commentsStore',
    autoLoad: true,
    fields: ['comment_id', 'comment', 'created_by', 'created_dt'],
    data: [
        {
            comment_id: 1000,
            comment: 'Sample Comment Form Store',
            created_by: 'Store User',
            created_dt: 1542558754
        }
    ]
});