
'use strict';

var Utils = require('../lib/Utils'),
	util = require('util'),
	extend = util._extend,
	AppControllerSingleton = require('./AppController'),
	appController = AppControllerSingleton.getInstance(),
	getPreferences = require('../lib/getPreferences'),
	GetResponse = require('../lib/GetResponse');

/**
 *
 * @class PreferencesController
 * @constructor
 *
 */
function PreferencesController() {
	this.init();
}

PreferencesController.prototype = extend(PreferencesController.prototype, Utils.prototype);
PreferencesController.prototype = extend(PreferencesController.prototype, {

	constructor : PreferencesController,

	/**
	 *
	 * @method init
	 * called by constructor
	 * @public
	 */
	init: function () {

		this.options = appController.options;

		appController.app.post('/service/preferences', this._serviceWritePreferences.bind(this));
	},

	/**
	 * @method _serviceWritePreferences
	 * @param {object} req
	 * @param {object} res
	 * @private
	 */
	_serviceWritePreferences: function (req, res) {

		var data = getPreferences(this.options);

		data[req.body.key] = req.body.value;

		this.writeFile(this.options.restPath + '/preferences.json', JSON.stringify(data));

		res.end();
	}

});

module.exports = PreferencesController;