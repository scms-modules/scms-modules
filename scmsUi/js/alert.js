/*alert*/
var alertTimeValue,
	alertHideTimeValue;
var Alert = function() {
	this.timestamp = 3000;
	this.itemHeight = 55;
	this.alerts = [];
	this.alertId = 0;
};
Alert.prototype = {
	/*
	* @param msg 提示语内容
	* @param type 类型：info||succss||error||confirm
	*/
	show: function(msg, options) {
		options.type = options.type || 'info';
		var _this = this, top;
		this.alertId ++;
		this.$body = options.$container || $('body');
		var $showAlerts = this.$body.find('.elayerout-alert-show');
		var $els =  this.$body.find('.tx_alert_type');
		var index, alertsLength =  this.alerts.length + 1;
		for(index = 0; index < alertsLength; index ++) {
			if(!this.alerts[index] && !top) {
				this.alerts[index] = this.alertId;
				top = index * this.itemHeight + 50;
			}			
		}

		var $el = this.template();
		this.$body.append($el);
		$el.find('.tx_msg').html(msg);
		$el.addClass(options.type)
				.css('top', top+'px');

		setTimeout(function() {
			$el.addClass('elayerout-alert-show');
		}, 0)

		$el.delegate('.tx_cansel', 'click', function() {
			_this.hide($el, _this.alertId);
		});
		
		this.close($el, _this.alertId);
	},

	hide: function($el, id) {
		var _this = this;
		$el.removeClass('elayerout-alert-show');
		this.alerts.map((item, index) => {
			if(item === id) {
				_this.alerts[index] = '';
			}
		});
		setTimeout(function () {
			$el.unbind();
			$el.remove();
		}, 500);
	},

	close: function($el, id) {
		var _this = this;
		setTimeout(function () {
			_this.hide($el, id);
		}, this.timestamp);
	},	
	template: function(options) {
		return $('<div class="elayerout-alert tx_alert_type">' +
				'<a href="javascript:void(0);" class="tx_cansel elayerout-alert-btnclose">×</a>' +
				'<div class="tx_content elayerout-alert-content">' +
					'<div class="tx_msg elayerout-alert-msg">提示语内容</div>' +
				'</div>' +
			'</div>');
	}	
};
var Confirm = function() {
	this.$body = $('body');
	this.timestamp = 3000;
	this.$over = this.overTemplate();
	this.$body.append(this.$over);
};
Confirm.prototype = {
	show: function(msg, options) {
		var _this = this;
		if(this.hideTimeout) {
			clearTimeout(this.hideTimeout);
			this.hideTimeout = null;
		}
		this.$el = $('.tx_confirm_type');
		var isHasEl = this.$el && this.$el.length;
		if(!isHasEl) {
			this.$el = this.template();
			this.$body.append(this.$el);
		}
		this.$el.find('.tx_msg').html(msg);
		if(options.title) {
			this.$el.find('.tx_title').html(options.title);
		}
		
		this.$el.css('display', '');
		this.$over.css('display', '');
		setTimeout(function() {
			_this.$el.addClass('elayerout-confirm-show');
			_this.$over.addClass('elayerout-alert-over-show');
		}, 0);

		this.$el.delegate('.tx_cansel', 'click', function() {
			_this.hide();
		});

		this.$el.delegate('.tx_submit', 'click', function() {
			if (options.submit && typeof options.submit === 'function') {
				options.submit(_this);
			}
			else {
				if (options.callback && typeof options.callback === 'function') {
					options.callback();
				}
				_this.hide();
			}
		});
	},
	hide: function() {
		var _this = this;
		_this.$el.removeClass('elayerout-confirm-show');
		_this.$over.removeClass('elayerout-alert-over-show');
		this.hideTimeout = setTimeout(function() {
			_this.$el.css('display', 'none');
			_this.$over.css('display', 'none');
		}, 500)
	},
	template: function() {
		return $('<div class="elayerout-alert confirm tx_confirm_type" style="display:none;">\
				<a href="javascript:void(0);" class="tx_cansel elayerout-alert-btnclose">×</a>\
				<div class="tx_title elayerout-alert-title"><span>系统提示</span></div>\
				<div class="tx_content elayerout-alert-content">\
					<div class="tx_msg elayerout-alert-msg"></div>\
				</div>\
				<div class="modal-footer ">\
					<a href="javascript:void(0);" class="btn btn-default tx_cansel">取消</a>\
					<a href="javascript:void(0);" class="btn btn-success tx_submit">确认</a>\
				</div>\
			</div>');
	},
	overTemplate: function() {
		return $('<div class="elayerout-alert-over" style="display:none;"></div>');
	}
};

var alertClass = new Alert();
var confirmClass = new Confirm();

$.alert = function (msg, options) {
	options = options || {};
	if(options.type === 'confirm') {
		return confirmClass.show(msg, options);
	} else {
		return alertClass.show(msg, options);
	}
};


/*loading*/
var loadingTimeoutValue = {};
$.loading = function (isShow, options) {
	options = options || {};
	var $container = options.$container || $('.elayout-loading-container');
	if ($container && $container.length) {
		$container.css({
			position: 'relative'
		});
	}

	$container = $container && $container.length ? $container : $('body');
	var $el = $container.children('.elayout-loading');
	var $over = $container.children('.elayout-loading-over');
	$container = $container.length ? $container : $('body');
	if (!$el.length) {
		$over = $('<div class="elayout-loading-over" style="display:none;"></div>');
		var $el = $('<div class="elayout-loading" style="display:none;">\
		        <span class="icon">\
		            <i></i><i></i><i></i><i></i>\
		        </span>\
		        <div class="text">Loading...</div>\
		    </div>');
		$container.append($over);
		$container.append($el);
	}

	var name = $container.attr('id') + '_' + $container.attr('class');

	if (loadingTimeoutValue[name]) {
		clearTimeout(loadingTimeoutValue[name]);
		loadingTimeoutValue[name] = null;
	}

	if (isShow) {

		loadingTimeoutValue[name] = setTimeout(function () {
			clearTimeout(loadingTimeoutValue[name]);
			loadingTimeoutValue[name] = null;
			$el.css({
				'display': '',
				'margin-top': $container.scrollTop() + 'px'
			});
			$over.css({
				'display': '',
				'height': ($container[0].scrollHeight || $container.height()) + 'px'
			});
		}, 200);
	}
	else {
		$el.css('display', 'none');
		$over.css('display', 'none');
	}

	if (options.isClear) {
		if (loadingTimeoutValue[name]) {
			clearTimeout(loadingTimeoutValue[name]);
			loadingTimeoutValue[name] = null;
		}
		$('elayout-loading').css('display', 'none');
		$('elayout-loading-over').css('display', 'none');
	}
}

