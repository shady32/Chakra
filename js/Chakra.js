"use strict"; +
function($) {
	document.addEventListener("touchmove", function(e) { //disable wechat default scroll
		e.preventDefault();
	}, false);
	DOMTokenList.prototype.adds = function(tokens) {
		if(!tokens) {
			return;
		}
		tokens.split(" ").forEach(function(token) {
			token && this.add(token);
		}.bind(this));
		return this;
	};
	Date.prototype.pattern = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
			"H+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		var week = {
			"0": "\u65e5",
			"1": "\u4e00",
			"2": "\u4e8c",
			"3": "\u4e09",
			"4": "\u56db",
			"5": "\u4e94",
			"6": "\u516d"
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};
	Date.prototype.setDateTime = function(dateTime) {
		var v = dateTime.split(/[- :]/g);
		var d = new Date();
		var yyyy = v[0] ? v[0] : 0,
			MM = v[1] ? v[1] : 0,
			dd = v[2] ? v[2] : 0,
			HH = v[3] ? v[3] : 0,
			mm = v[4] ? v[4] : 0,
			ss = v[5] ? v[5] : 0;
		d.setFullYear(yyyy, MM - 1, dd);
		d.setHours(HH, mm, ss);
		return d;
	};
	Date.prototype.add = function(value, unit) {
		!unit && (unit = 'day');
		unit = unit.toLowerCase();
		if(typeof(value) !== 'number') {
			value = parseInt(value);
		}
		var newDate = new Date(this.getTime());
		switch(unit) {
			case 'day':
				newDate.setDate(this.getDate() + value);
				break;
			case 'month':
				newDate.setMonth(this.getMonth() + value);
				break;
			case 'week':
				newDate.setDate(this.getDate() + value * 7);
				break;
			case 'quarter':
				newDate.setMonth(this.getMonth() + value * 3);
				break;
			case 'year':
				newDate.setFullYear(this.getFullYear() + value);
				break;
			default:
				newDate.setDate(this.getDate() + value);
				break;
		}
		return newDate;
	};
	Date.prototype.getTimeStamp = function() {
		return parseInt(this.getTime() / 1000);
	};
	Date.prototype.setTimeStamp = function(second) {
		if(typeof(second) != 'number') {
			second = parseInt(second);
		}
		this.setTime(second * 1000);
		return this;
	};
	Date.prototype.getAge = function(birthday) {
		if(typeof(birthday) != 'number') {
			if(birthday.indexOf('-')) {
				birthday = new Date().setDateTime(birthday).getTime();
			} else {
				birthday = parseInt(birthday);
			}
		}
		if(birthday.toString().length == 10) {
			birthday = new Date().setTimeStamp(birthday).getTime();
		}
		var birth = new Date(birthday);
		return this.getFullYear() - birth.getFullYear();
	};
	$.getQueryString = function(url) {
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var strs = url.split("?")[1].split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	};
}(Zepto) +

function($) {
	function __dealCssEvent(eventNameArr, callback) {
		var events = eventNameArr,
			i, dom = this;

		function fireCallBack(e) {
			if(e.target !== this) return;
			callback.call(this, e);
			for(i = 0; i < events.length; i++) {
				dom.off(events[i], fireCallBack);
			}
		}
		if(callback) {
			for(i = 0; i < events.length; i++) {
				dom.on(events[i], fireCallBack);
			}
		}
	}
	$.fn.animationEnd = function(callback) {
		__dealCssEvent.call(this, ['webkitAnimationEnd', 'animationend'], callback);
		return this;
	};
	$.showIndicator = function() {
		if($('.preloader-indicator-modal')[0]) {
			$('.preloader-indicator-modal').addClass("loaded");
			return;
		}
		$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
	};
	$.hideIndicator = function() {
		if($('.preloader-indicator-modal').hasClass("loaded")) {
			$('.preloader-indicator-modal').removeClass("loaded");
			return
		}
		$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
	};
	var path = location.href.split("/");
	path.pop(path.length);
	$.root = path.join("/");
}(Zepto); +

function($) {
	if(!window.CustomEvent) {
		window.CustomEvent = function(type, config) {
			config = config || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var e = document.createEvent('CustomEvent');
			e.initCustomEvent(type, config.bubbles, config.cancelable, config.detail);
			return e;
		};
		window.CustomEvent.prototype = window.Event.prototype;
	}

	var EVENTS = {
		pageLoadStart: 'pageLoadStart', // ajax 开始加载新页面前
		pageLoadCancel: 'pageLoadCancel', // 取消前一个 ajax 加载动作后
		pageLoadError: 'pageLoadError', // ajax 加载页面失败后
		pageLoadComplete: 'pageLoadComplete', // ajax 加载页面完成后（不论成功与否）
		pageAnimationStart: 'pageAnimationStart', // 动画切换 page 前
		pageAnimationEnd: 'pageAnimationEnd', // 动画切换 page 结束后
		beforePageRemove: 'beforePageRemove', // 移除旧 document 前（适用于非内联 page 切换）
		pageRemoved: 'pageRemoved', // 移除旧 document 后（适用于非内联 page 切换）
		beforePageSwitch: 'beforePageSwitch', // page 切换前，在 pageAnimationStart 前，beforePageSwitch 之后会做一些额外的处理才触发 pageAnimationStart
		pageInit: 'pageInitInternal' // 目前是定义为一个 page 加载完毕后（实际和 pageAnimationEnd 等同）
	};

	var Util = {
		getUrlFragment: function(url) {
			var hashIndex = url.indexOf('#');
			return hashIndex === -1 ? '' : url.slice(hashIndex + 1);
		},
		getAbsoluteUrl: function(url) {
			var link = document.createElement('a');
			link.setAttribute('href', url);
			var absoluteUrl = link.href;
			link = null;
			return absoluteUrl;
		},
		getBaseUrl: function(url) {
			var hashIndex = url.indexOf('#');
			return hashIndex === -1 ? url.slice(0) : url.slice(0, hashIndex);
		},
		toUrlObject: function(url) {
			var fullUrl = this.getAbsoluteUrl(url),
				baseUrl = this.getBaseUrl(fullUrl),
				fragment = this.getUrlFragment(url);
			return {
				base: baseUrl,
				full: fullUrl,
				original: url,
				fragment: fragment
			};
		},
		supportStorage: function() {
			var mod = 'chakra.router.storage.ability';
			try {
				sessionStorage.setItem(mod, mod);
				sessionStorage.removeItem(mod);
				return true;
			} catch(e) {
				return false;
			}
		}
	};

	var routerConfig = {
		sectionGroupClass: 'page-group',
		curPageClass: 'page-current',
		visiblePageClass: 'page-visible',
		pageClass: 'page'
	};

	var DIRECTION = {
		leftToRight: 'from-left-to-right',
		rightToLeft: 'from-right-to-left'
	};

	var theHistory = window.history;

	var Router = function() {
		this.sessionNames = {
			currentState: 'chakra.router.currentState',
			maxStateId: 'chakra.router.maxStateId'
		};
		this._init();
		this.xhr = null;
		window.addEventListener('popstate', this._onPopState.bind(this));
	};

	Router.prototype._init = function() {
		this.$view = $('body');
		this.cache = {};
		var $doc = $(document);
		var currentUrl = location.href;
		this._saveDocumentIntoCache($doc, currentUrl);
		var curPageId;
		var currentUrlObj = Util.toUrlObject(currentUrl);
		var $allSection = $doc.find('.' + routerConfig.pageClass);
		var $visibleSection = $doc.find('.' + routerConfig.curPageClass);
		var $curVisibleSection = $visibleSection.eq(0);
		var $hashSection;
		if(currentUrlObj.fragment) {
			$hashSection = $doc.find('#' + currentUrlObj.fragment);
		}
		if($hashSection && $hashSection.length) {
			$visibleSection = $hashSection.eq(0);
		} else if(!$visibleSection.length) {
			$visibleSection = $allSection.eq(0);
		}
		if(!$visibleSection.attr('id')) {
			$visibleSection.attr('id', this._generateRandomId());
		}
		if($curVisibleSection.length &&
			($curVisibleSection.attr('id') !== $visibleSection.attr('id'))) {
			$curVisibleSection.removeClass(routerConfig.curPageClass);
			$visibleSection.addClass(routerConfig.curPageClass);
		} else {
			$visibleSection.addClass(routerConfig.curPageClass);
		}
		curPageId = $visibleSection.attr('id');
		if(theHistory.state === null) {
			var curState = {
				id: this._getNextStateId(),
				url: Util.toUrlObject(currentUrl),
				pageId: curPageId
			};

			theHistory.replaceState(curState, '', currentUrl);
			this._saveAsCurrentState(curState);
			this._incMaxStateId();
		}
	};

	Router.prototype.load = function(url, param, ignoreCache, isPushState) {
		if(ignoreCache === undefined) {
			ignoreCache = false;
		}
		if(url == location.href && !ignoreCache) {
			return;
		}
		this._saveDocumentIntoCache($(document), location.href);
		this._switchToDocument(url, ignoreCache, isPushState, null, param);
	};

	Router.prototype.forward = function() {
		theHistory.forward();
	};

	Router.prototype.back = function() {
		theHistory.back();
	};

	Router.prototype.loadPage = Router.prototype.load;

	Router.prototype._switchToDocument = function(url, ignoreCache, isPushState, direction, param) {
		var baseUrl = Util.toUrlObject(url).base;
		if(ignoreCache) {
			delete this.cache[baseUrl];
		}

		var cacheDocument = this.cache[baseUrl];
		var context = this;
		if(cacheDocument) {
			setTimeout(function() {
				context._doSwitchDocument(url, isPushState, direction, param);
			}, 50)
		} else {
			this._loadDocument(url, {
				success: function($doc) {
					try {
						context._parseDocument(url, $doc);
						context._doSwitchDocument(url, isPushState, direction, param);
					} catch(e) {
						console.error(e);
						//location.href = url;
					}
				},
				error: function(e) {
					console.error(e);
					//location.href = url;
				}
			});
		}

	};

	Router.prototype._doSwitchDocument = function(url, isPushState, direction, param) {
		if(typeof isPushState === 'undefined') {
			isPushState = true;
		}

		var urlObj = Util.toUrlObject(url);
		var $currentDoc = this.$view.find('.' + routerConfig.sectionGroupClass);
		var $newDoc = $($('<div></div>').append(this.cache[urlObj.base].$content).html());
		var $allSection = $newDoc.find('.' + routerConfig.pageClass);
		var $visibleSection = $newDoc.find('.' + routerConfig.curPageClass);
		var $hashSection;
		if(urlObj.fragment) {
			$hashSection = $newDoc.find('#' + urlObj.fragment);
		}
		if($hashSection && $hashSection.length) {
			$visibleSection = $hashSection.eq(0);
		} else if(!$visibleSection.length) {
			$visibleSection = $allSection.eq(0);
		}
		if(!$visibleSection.attr('id')) {
			$visibleSection.attr('id', this._generateRandomId());
		}
		$.setSessionStorage($visibleSection.attr('id'), param);
		var $currentSection = this._getCurrentSection();
		$currentSection.trigger(EVENTS.beforePageSwitch, [$currentSection.attr('id'), $currentSection]);

		$allSection.removeClass(routerConfig.curPageClass);
		$visibleSection.addClass(routerConfig.curPageClass);

		this.$view.prepend($newDoc);

		this._animateDocument($currentDoc, $newDoc, $visibleSection, direction);

		if(isPushState) {
			this._pushNewState(url, $visibleSection.attr('id'));
		}
	};

	Router.prototype._isTheSameDocument = function(url, anotherUrl) {
		return Util.toUrlObject(url).base === Util.toUrlObject(anotherUrl).base;
	};

	Router.prototype._loadDocument = function(url, callback) {
		if(this.xhr && this.xhr.readyState < 4) {
			this.xhr.onreadystatechange = function() {};
			this.xhr.abort();
			this.dispatch(EVENTS.pageLoadCancel);
		}

		this.dispatch(EVENTS.pageLoadStart);

		callback = callback || {};
		var self = this;
		var params = $.getQueryString(url);
		var target = $.root + "/" + params["m"].replace(/_/g, "/") + "/" + params["a"] + ".ca";
		this.xhr = $.ajax({
			url: target,
			success: $.proxy(function(data, status, xhr) {
				var $doc = $('<html></html>');
				$doc.append(data);
				callback.success && callback.success.call(null, $doc, status, xhr);
			}, this),
			error: function(xhr, status, err) {
				callback.error && callback.error.call(null, xhr, status, err);
				self.dispatch(EVENTS.pageLoadError);
			},
			complete: function(xhr, status) {
				callback.complete && callback.complete.call(null, xhr, status);
				self.dispatch(EVENTS.pageLoadComplete);
			}
		});
	};

	Router.prototype._parseDocument = function(url, $doc) {

		var $innerView = $doc.find('.' + routerConfig.sectionGroupClass);

		if(!$innerView.length) {
			throw new Error('missing router view mark: ' + routerConfig.sectionGroupClass);
		}

		this._saveDocumentIntoCache($doc, url);
	};

	Router.prototype._saveDocumentIntoCache = function(doc, url) {
		var urlAsKey = Util.toUrlObject(url).base;
		var $doc = $(doc);
		this._extendHTML($doc);
		this.cache[urlAsKey] = {
			$doc: $doc,
			$content: $doc.find('.' + routerConfig.sectionGroupClass)
		};
	};

	Router.prototype._extendHTML = function($doc) {
		var extend = $doc.find("extend");
		if(extend.length === 0) {
			return;
		}
		extend.forEach(function(e) {
			var $e = $(e);
			var ext = {};
			try {
				eval($e.html());
			} catch(_e) {
				console.error(_e);
			}
			if(ext && ext.src) {
				var src = $.root + "/" + ext.src;
				$.ajax({
					type: "get",
					url: src,
					async: false,
					success: function(html) {
						var binds = html.match(/\{\$[\S]*?\}/g);
						binds && (binds.forEach(function(b) {
							var _b = b.replace("{", "").replace("}", "").replace("$", "");
							var content = ext.data;
							_b.split(".").forEach(function(__b) {
								content = content[__b]
							})
							if(typeof content === "object") {
								content = JSON.stringify(content);
							}
							html = html.replace(b, content);
						}))
						$e.before(html);
						$e.remove();
					}
				});
			}
		})
		this._extendHTML($doc)
	}

	Router.prototype._getLastState = function() {
		var currentState = sessionStorage.getItem(this.sessionNames.currentState);
		try {
			currentState = JSON.parse(currentState);
		} catch(e) {
			currentState = null;
		}

		return currentState;
	};

	Router.prototype._saveAsCurrentState = function(state) {
		sessionStorage.setItem(this.sessionNames.currentState, JSON.stringify(state));
	};

	Router.prototype._getNextStateId = function() {
		var maxStateId = sessionStorage.getItem(this.sessionNames.maxStateId);
		return maxStateId ? parseInt(maxStateId, 10) + 1 : 1;
	};

	Router.prototype._incMaxStateId = function() {
		sessionStorage.setItem(this.sessionNames.maxStateId, this._getNextStateId());
	};

	Router.prototype._animateDocument = function($from, $to, $visibleSection, direction) {
		var sectionId = $visibleSection.attr('id');

		var $visibleSectionInFrom = $from.find('.' + routerConfig.curPageClass);
		$visibleSectionInFrom.addClass(routerConfig.visiblePageClass).removeClass(routerConfig.curPageClass);

		$visibleSection.trigger(EVENTS.pageAnimationStart, [sectionId, $visibleSection]);

		this._animateElement($from, $to, direction);

		$from.animationEnd(function() {
			$visibleSectionInFrom.removeClass(routerConfig.visiblePageClass);
			$(window).trigger(EVENTS.beforePageRemove, [$from]);
			$from.remove();
			$(window).trigger(EVENTS.pageRemoved);
		});

		$to.animationEnd(function() {
			$visibleSection.trigger(EVENTS.pageAnimationEnd, [sectionId, $visibleSection]);
			$visibleSection.trigger(EVENTS.pageInit, [sectionId, $visibleSection]);
		});
	};

	Router.prototype._animateElement = function($from, $to, direction) {
		if(typeof direction === 'undefined') {
			direction = DIRECTION.rightToLeft;
		}

		var animPageClasses = [
			'page-from-center-to-left',
			'page-from-center-to-right',
			'page-from-right-to-center',
			'page-from-left-to-center'
		].join(' ');

		var classForFrom, classForTo;
		switch(direction) {
			case DIRECTION.rightToLeft:
				classForFrom = 'page-from-center-to-left';
				classForTo = 'page-from-right-to-center';
				break;
			case DIRECTION.leftToRight:
				classForFrom = 'page-from-center-to-right';
				classForTo = 'page-from-left-to-center';
				break;
			default:
				classForFrom = 'page-from-center-to-left';
				classForTo = 'page-from-right-to-center';
				break;
		}

		$from.removeClass(animPageClasses).addClass(classForFrom);
		$to.removeClass(animPageClasses).addClass(classForTo);

		$from.animationEnd(function() {
			$from.removeClass(animPageClasses);
		});
		$to.animationEnd(function() {
			$to.removeClass(animPageClasses);
		});
	};

	Router.prototype._getCurrentSection = function() {
		return this.$view.find('.' + routerConfig.curPageClass).eq(0);
	};

	Router.prototype._back = function(state, fromState) {
		if(this._isTheSameDocument(state.url.full, fromState.url.full)) {
			var $newPage = $('#' + state.pageId);
			if($newPage.length) {
				var $currentPage = this._getCurrentSection();
				this._animateSection($currentPage, $newPage, DIRECTION.leftToRight);
				this._saveAsCurrentState(state);
			} else {
				location.href = state.url.full;
			}
		} else {
			this._saveDocumentIntoCache($(document), fromState.url.full);
			this._switchToDocument(state.url.full, false, false, DIRECTION.leftToRight);
			this._saveAsCurrentState(state);
		}
	};

	Router.prototype._forward = function(state, fromState) {
		if(this._isTheSameDocument(state.url.full, fromState.url.full)) {
			var $newPage = $('#' + state.pageId);
			if($newPage.length) {
				var $currentPage = this._getCurrentSection();
				this._animateSection($currentPage, $newPage, DIRECTION.rightToLeft);
				this._saveAsCurrentState(state);
			} else {
				location.href = state.url.full;
			}
		} else {
			this._saveDocumentIntoCache($(document), fromState.url.full);
			this._switchToDocument(state.url.full, false, false, DIRECTION.rightToLeft);
			this._saveAsCurrentState(state);
		}
	};

	Router.prototype._onPopState = function(event) {
		var state = event.state;
		if(!state || !state.pageId) {
			return;
		}

		var lastState = this._getLastState();

		if(!lastState) {
			console.error && console.error('Missing last state when backward or forward');
			return;
		}

		if(state.id === lastState.id) {
			return;
		}

		if(state.id < lastState.id) {
			this._back(state, lastState);
		} else {
			this._forward(state, lastState);
		}
	};

	Router.prototype._pushNewState = function(url, sectionId) {
		var state = {
			id: this._getNextStateId(),
			pageId: sectionId,
			url: Util.toUrlObject(url)
		};
		theHistory.pushState(state, '', url);
		this._saveAsCurrentState(state);
		this._incMaxStateId();
	};

	Router.prototype._generateRandomId = function() {
		return "page-" + (+new Date());
	};

	Router.prototype.dispatch = function(event) {
		var e = new CustomEvent(event, {
			bubbles: true,
			cancelable: true
		});

		window.dispatchEvent(e);
	};

	function isInRouterBlackList($link) {
		var classBlackList = [
			'external',
			'tab-link',
			'open-popup',
			'close-popup',
			'open-panel',
			'close-panel'
		];

		for(var i = classBlackList.length - 1; i >= 0; i--) {
			if($link.hasClass(classBlackList[i])) {
				return true;
			}
		}

		var linkEle = $link.get(0);
		var linkHref = linkEle.getAttribute('href');

		var protoWhiteList = [
			'http',
			'https'
		];

		if(/^(\w+):/.test(linkHref) && protoWhiteList.indexOf(RegExp.$1) < 0) {
			return true;
		}

		if(linkEle.hasAttribute('external')) {
			return true;
		}

		return false;
	}

	$(function() {
		if(!Util.supportStorage()) {
			return;
		}

		var $pages = $('.' + routerConfig.pageClass);
		if(!$pages.length) {
			var warnMsg = 'Disable router function because of no .page elements';
			if(window.console && window.console.warn) {
				console.warn(warnMsg);
			}
			return;
		}

		var router = $.router = new Router();
		$(window).trigger("routerReady");
		$(document).on('click', 'a', function(e) {
			var $target = $(e.currentTarget);

			if(isInRouterBlackList($target)) {
				return;
			}
			e.preventDefault();
			if($target.hasClass('back')) {
				router.back();
			} else {
				var url = e.currentTarget.href;
				if(!url || url === '#') {
					return;
				}
				var ignoreCache = $target.attr('data-no-cache') === 'true';
				$.router.load(url, null, ignoreCache);
			}
		});
	});
}(Zepto); +

function($) {
	var getPage = function() {
		var $page = $(".page-current");
		if(!$page[0]) $page = $(".page").addClass('page-current');
		return $page;
	};
	$.getSessionStorage = function(key) {
		return JSON.parse(sessionStorage.getItem(key));
	}
	$.setSessionStorage = function(key, value) {
		value && (sessionStorage.setItem(key, JSON.stringify(value)));
	}
	$(window).on('pageLoadStart', function() {
		$.showIndicator();
	});
	$(window).on('pageAnimationStart', function() {
		$.hideIndicator();
	});
	$(window).on('pageLoadCancel', function() {
		$.hideIndicator();
	});
	$(window).on('pageLoadComplete', function() {
		$.hideIndicator();
	});
	$(window).on('pageLoadError', function() {
		$.hideIndicator();
		mui.toast('加载失败');
	});

	$(window).on('pageAnimationStart', function(event, id, page) {
		//TODO:: 关闭一些popover
		var $body = $("body");
		if($body.hasClass("mui-poppicker-active-for-page")) {
			$(".mui-poppicker").remove();
			$(".mui-backdrop").remove();
			$body.removeClass("mui-poppicker-active-for-page");
		}
		if($body.hasClass("mui-popup-active-for-page")) {
			$(".mui-popup").remove();
			$(".mui-popup-backdrop").remove();
			$body.removeClass("mui-popup-active-for-page");
		}
		if($body.hasClass("mui-dtpicker-active-for-page")) {
			$(".mui-dtpicker").remove();
			$(".mui-backdrop").remove();
			$body.removeClass("mui-dtpicker-active-for-page");
		}
		if($body.hasClass("mui-popover-active-for-page")) {
			$(".mui-popover").css("display", "none");
			$(".mui-popover").removeClass("mui-active");
			$(".mui-backdrop").remove();
			$body.removeClass("mui-popover-active-for-page");
		}
		if($body.hasClass("mui-guide-active-for-page")) {
			$(".mui-backdrop").remove();
			$body.removeClass("mui-guide-active-for-page");
		}
	});

	$(window).on('pageInit', function() {
		$.hideIndicator();
	});

	$.init = function() {
		$.showIndicator();
		$.data = {};
		var $page = getPage();
		var id = $page[0].id;
		$.doAjax("data/userInfo.json", {
			code: $.getQueryString("CODE")
		}, function(d) {
			$page.trigger('pageInit', [id, $page]);
			$.data.userInfo = d;
			$.router.load(location.href, null, true, false);
		})

	};
}(Zepto); +

function($) {
	var settings;

	function getSettings() {
		$.ajax({
			type: "get",
			url: "data/settings.json",
			async: false,
			success: function(d) {
				settings = d;
			}
		});
	}
	$.doAjax = function(url, data, callback, err, type) {
		!type && (type = "get");
		Zepto.showIndicator();
		!settings && (getSettings());
		$.data.token && (data.token = $.data.token);
		$.ajax({
			type: type,
			url: settings.server + url,
			data: data,
			async: true,
			success: function(d) {
				$.hideIndicator();
				if(d.code != 0) {
					mui.toast(d.message);
					err && err();
				} else {
					d.token && ($.data.token = d.token);
					callback && callback(d.data);
				}

			},
			error: function(e) {
				console.error(e);
				mui.toast("系统出错，请稍后再试")
				$.hideIndicator();
			}
		});
	};
}(Zepto)