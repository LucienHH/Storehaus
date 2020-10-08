const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Long = mongoose.Schema.Types.Long;
xboxgtSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userID: Long,
	userName: String,
	gt: String,
});
module.exports = mongoose.model('xboxgt', xboxgtSchema);