/*
 Hesk Counter v1.1.0

 Copyright 2011, Heskemo K.
 Free to use under the MIT license.
 http://www.opensource.org/licenses/mit-license.php
 */
String.prototype.replaceAt = function(index, char) {
	return this.substr(0, index) + char + this.substr(index + char.length);
}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/, '');
};
String.prototype.fanslivingTime = function() {
	return fanslivingDateHesk(this);
};
Array.prototype.ucase = function() {
	for ( i = 0; i < this.length; i++) {
		this[i] = this[i].toUpperCase();
	}
	return this;
}
Array.prototype.button_resemble = function() {
	var i;
	for ( i = 0; i < this.length; i++) {

	}
}
if ( typeof jQuery != "undefined")
	jQuery(function($) {
		/*TODO: this function will able to adjust your picture into a defined square size */
		jQuery.fn.imgProfileAdjustment = function(dimension) {
			function doAjust() {
				if ($(this).width() > $(this).height()) {
					$(this).attr('height', dimension + 'px');
				} else {
					$(this).attr('width', dimension + 'px');
				}
				$(this).unbind('load');
			}
			this.one('load', doAjust).each(function() {
				if (this.complete) {
					$(this).load(doAjust);
				}
			});
		}
		jQuery.fn.heskCounter = function(number_raw_input, commafied) {
			if (commafied == undefined) {
				commafied = false;
			}
			var defaultopt = {
				width : '24',
				height : '39',
				start : '666666', // the color without #
				end : '000000', //the color without #
				url : 'http://hesk.imusictech.net/fansliving/images/common/counter-numbers.png'
			};
			var Dis = this;
			var additional_comma_char = function(number_hesk_level2) {
				return Math.floor((parseInt(number_hesk_level2.toString().length) - 1) / 3);
			}
			var div_size = function() {
				var l, cssob;
				if (commafied)
					l = additional_comma_char(number_raw_input) + number_raw_input.length;
				else {
					//alert(number_raw_input);
					l = number_raw_input.length;
				}
				cssob = {
					'width' : parseInt(defaultopt.width * l + l + 1 + 'px'),
					'height' : parseInt(defaultopt.height * 1 + 2) + 'px'
				}
			};
			var charcss = {
				'width' : defaultopt.width + 'px',
				'height' : defaultopt.height + 'px',
				'background-image' : 'url(' + defaultopt.url + ')',
				'background-repeat' : 'no-repeat',
				'float' : 'left',
				'margin' : '1px',
				'margin-right' : '0px'
			};
			var lastcharcss = {
				'width' : defaultopt.width + 'px',
				'height' : defaultopt.height + 'px',
				'background-image' : 'url(' + defaultopt.url + ')',
				'background-repeat' : 'no-repeat',
				'float' : 'left',
				'margin' : '1px',
			};
			/*this.css('filter', 'progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + defaultopt.start + '\', endColorstr=\'#' + defaultopt.end + '\', gradientType=1)');
			 this.css('background-image', '-webkit-gradient(linear, left top, right bottom, color-stop(0.1, #' + defaultopt.start + '), color-stop(0.99, #' + defaultopt.end + '))');
			 this.css('background-image', '-moz-linear-gradient(top left, #' + defaultopt.start + ' 0%, #' + defaultopt.end + ' 100%)');
			 this.css('background-image', '-o-linear-gradient(top left, #' + defaultopt.start + ' 0%, #' + defaultopt.end + ' 100%)');*/

			var commafy = function(number_hesk) {
				var str;
				if ( typeof number_hesk === 'string')
					str = number_hesk.split('.');
				else if ( typeof number_hesk === 'number')
					str = number_hesk.toString().split('.');
				if (str[0].length >= 5) {
					str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
					//adding comma on the appropriate place
				}
				if (str[1] && str[1].length >= 5) {
					str[1] = str[1].replace(/(\d{3})/g, '$1 ');
				}
				return str.join('.');
			}
			var pad = function(number_hesk, size) {
				var s = number_hesk + "";
				while (s.length < size)
				s = "0" + s;
				return s;
			}
			var bgpos = function(number_hesk) {
				//t is your digit
				var g = 10;
				switch(number_hesk) {
					case '.':
						g = 10;
						break;
					case ',':
						g = 11;
						break;
					case ':':
						g = 12;
						break;
					default:
						if ( typeof parseInt(number_hesk) === 'number') {
							g = parseInt(number_hesk);
						}
						break;
				}
				var b = defaultopt.width * g * (-1);
				return b + "px";
			}
			this.html("");
			var l, number_start_process, temp_dump = "";
			//alert(number_raw_input);s
			if (commafied) {
				number_start_process = commafy(number_raw_input);
				l = number_raw_input.length;
			} else {
				number_start_process = number_raw_input;
				l = number_raw_input.length - 1;
			}
			for (var i = 0; i <= l; i++) {
				var c = number_start_process.charAt(i);
				temp_dump += '<div style="background-position: ' + bgpos(c) + ' 0"></div>';
			}
			this.html(temp_dump);
			this.addClass("heskCounterFrame");
			this.children('div').css(charcss);
			div_size();
			this.children('div:last-child').css(lastcharcss);
		};
		/*
		Dates in javascript are numeric values of milliseconds since January 1, 1970. Facebook dates (at least creation_time and update_time in the stream table) are in seconds since January 1, 1970 so you need to multiply by 1000. Here is some code doing it for a post on my wall earlier today:
		*/
		// Takes an ISO time and returns a string representing how
		// long ago the date represents.
		humandate = function(date_str) {
			var time_formats = [[60, 'just now', 1], // 60
			[120, '1 minute ago', '1 minute from now'], // 60*2
			[3600, 'minutes', 60], // 60*60, 60
			[7200, '1 hour ago', '1 hour from now'], // 60*60*2
			[86400, 'hours', 3600], // 60*60*24, 60*60
			[172800, 'yesterday', 'tomorrow'], // 60*60*24*2
			[604800, 'days', 86400], // 60*60*24*7, 60*60*24
			[1209600, 'last week', 'next week'], // 60*60*24*7*4*2
			[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, 'last month', 'next month'], // 60*60*24*7*4*2
			[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, 'last year', 'next year'], // 60*60*24*7*4*12*2
			[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, 'last century', 'next century'], // 60*60*24*7*4*12*100*2
			[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
			];
			var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if (time.substr(time.length - 4, 1) == ".")
				time = time.substr(0, time.length - 4);
			var seconds = (new Date - new Date(time)) / 1000;
			var token = 'ago', list_choice = 1;
			if (seconds < 0) {
				seconds = Math.abs(seconds);
				token = 'from now';
				list_choice = 2;
			}
			var i = 0, format;
			while ( format = time_formats[i++])
			if (seconds < format[0]) {
				if ( typeof format[2] == 'string')
					return format[list_choice];
				else
					return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
			}
			return time;
		};
		fanslivingDateHesk = function(t, logincheck) {
			if (t == undefined) {
				//alert("t is undefined");
				return false;
			}
			if (logincheck == undefined) {
				logincheck = false;
			}
			if (jQuery.trim(t) == '0000-00-00 00:00:00' || humandate(t).indexOf('just now') != -1 && logincheck) {
				return "First Time Log In";
			} else {
				var k = t.replaceAt(10, "T") + "Z";
				return humandate(k);
			}

		}
		//humandate("2008-01-28T20:24:17Z"); // => "2 hours ago
		// If jQuery is included in the page, adds a jQuery plugin to handle it as well
		// under timetag
		jQuery.fn.time_convert_inline = function(before) {
			var val = this.html();
			if (before != undefined)
				this.html(before + " " + fanslivingDateHesk(val));
			else
				this.html(fanslivingDateHesk(val));
		}
		jQuery.fn.time_convert_children = function(selector) {
			var val = this.attr('since');
			if (selector == null)
				alert("doesnt work.. ");
			else
				this.children(selector).html(fanslivingDateHesk(val));
		}
		// done here
		// a small program for CSS animations that requires CSS in plugins from somewhere else.
		// developed and tested by Heskeyo Kam
		jQuery.fn.animCss = function(animation_name, timeout, callback) {
			if (animation_name == null || timeout == null)
				return false;
			var callbacks = jQuery.Callbacks("unique memory");
			function callback_default() {
				this.removeClass();
			}

			if (callback != null)
				callbacks.add(callback);
			if (this.hasClass(animation_name))
				this.removeClass(animation_name);
			else
				this.addClass(animation_name);
			callbacks.add(callback_default);
			var wait = window.setTimeout(function() {
				callbacks.fire();
			}, timeout);
		}
		/*hesk build for comment optimization 2012 Developed and managed by Heskeyo Kam @ imusictech. all rights resvered*/
		jQuery.fn.imusicComment = function() {
			var Dis = this;
			alert("initialized comment component");
			// triggers
			Dis.children("postpress").click(function(event) {
				alert("this button is hitted");
			});
			Dis.children("like").click(function(event) {
				like(this);
			});
			Dis.children("unlike").click(function(event) {
				unlike(this);
			});
			Dis.chidren("commenttime").time_convert_inline();
			//functions to be called
			function post_new_comment(selector) {
				Dis.children(selector);
			}

			function like(selector) {
				Dis.children(selector);
			}

			function unlike(selector) {
				Dis.children(selector);
			}

			function refrest_at(selector) {
				Dis.children(selector);
			}

			function remove(selector) {
				Dis.children(selector);
				setTimeOut()
			}

		}
	});

//@source: http://www.meiocodigo.com/projects/meiomask/

(function(D) {
	var C = (window.orientation != null);
	var A = ((D.browser.opera || (D.browser.mozilla && parseFloat(D.browser.version.substr(0, 3)) < 1.9)) ? "input" : "paste");
	var B = function(F) {
		F = D.event.fix(F || window.event);
		F.type = "paste";
		var E = F.target;
		setTimeout(function() {
			D.event.dispatch.call(E, F)
		}, 1)
	};
	D.event.special.paste = {
		setup : function() {
			if (this.addEventListener) {
				this.addEventListener(A, B, false)
			} else {
				if (this.attachEvent) {
					this.attachEvent("on" + A, B)
				}
			}
		},
		teardown : function() {
			if (this.removeEventListener) {
				this.removeEventListener(A, B, false)
			} else {
				if (this.detachEvent) {
					this.detachEvent("on" + A, B)
				}
			}
		}
	};
	D.extend({
		mask : {
			rules : {
				"z" : /[a-z]/,
				"Z" : /[A-Z]/,
				"a" : /[a-zA-Z]/,
				"*" : /[0-9a-zA-Z]/,
				"@" : /[0-9a-zA-Z������������������]/
			},
			keyRepresentation : {
				8 : "backspace",
				9 : "tab",
				13 : "enter",
				16 : "shift",
				17 : "control",
				18 : "alt",
				27 : "esc",
				33 : "page up",
				34 : "page down",
				35 : "end",
				36 : "home",
				37 : "left",
				38 : "up",
				39 : "right",
				40 : "down",
				45 : "insert",
				46 : "delete",
				116 : "f5",
				123 : "f12",
				224 : "command"
			},
			iphoneKeyRepresentation : {
				10 : "go",
				127 : "delete"
			},
			signals : {
				"+" : "",
				"-" : "-"
			},
			options : {
				attr : "alt",
				mask : null,
				type : "fixed",
				maxLength : -1,
				defaultValue : "",
				signal : false,
				textAlign : true,
				selectCharsOnFocus : true,
				autoTab : true,
				setSize : false,
				fixedChars : "[(),.:/ -]",
				onInvalid : function() {
				},
				onValid : function() {
				},
				onOverflow : function() {
				}
			},
			masks : {
				"phone" : {
					mask : "(99) 9999-9999"
				},
				"phone-us" : {
					mask : "(999) 999-9999"
				},
				"cpf" : {
					mask : "999.999.999-99"
				},
				"cnpj" : {
					mask : "99.999.999/9999-99"
				},
				"date" : {
					mask : "39/19/9999"
				},
				"date-us" : {
					mask : "19/39/9999"
				},
				"cep" : {
					mask : "99999-999"
				},
				"time" : {
					mask : "29:59"
				},
				"cc" : {
					mask : "9999 9999 9999 9999"
				},
				"integer" : {
					mask : "999.999.999.999",
					type : "reverse"
				},
				"decimal" : {
					mask : "99,999.999.999.999",
					type : "reverse",
					defaultValue : "000"
				},
				"decimal-us" : {
					mask : "99.999,999,999,999",
					type : "reverse",
					defaultValue : "000"
				},
				"signed-decimal" : {
					mask : "99,999.999.999.999",
					type : "reverse",
					defaultValue : "+000"
				},
				"signed-decimal-us" : {
					mask : "99,999.999.999.999",
					type : "reverse",
					defaultValue : "+000"
				}
			},
			init : function() {
				if (!this.hasInit) {
					var E = this, F, G = (C) ? this.iphoneKeyRepresentation : this.keyRepresentation;
					this.ignore = false;
					for ( F = 0; F <= 9; F++) {
						this.rules[F] = new RegExp("[0-" + F + "]")
					}
					this.keyRep = G;
					this.ignoreKeys = [];
					D.each(G, function(H) {
						E.ignoreKeys.push(parseInt(H, 10))
					});
					this.hasInit = true
				}
			},
			set : function(I, F) {
				var E = this, G = D(I), H = "maxLength";
				F = F || {};
				this.init();
				return G.each(function() {
					if (F.attr) {
						E.options.attr = F.attr
					}
					var O = D(this), Q = D.extend({}, E.options), N = O.attr(Q.attr), J = "";
					J = ( typeof F == "string") ? F : (N !== "") ? N : null;
					if (J) {
						Q.mask = J
					}
					if (E.masks[J]) {
						Q = D.extend(Q, E.masks[J])
					}
					if ( typeof F == "object" && F.constructor != Array) {
						Q = D.extend(Q, F)
					}
					if (D.metadata) {
						Q = D.extend(Q, O.metadata())
					}
					if (Q.mask != null) {
						Q.mask += "";
						if (O.data("mask")) {
							E.unset(O)
						}
						var K = Q.defaultValue, L = (Q.type === "reverse"), M = new RegExp(Q.fixedChars, "g");
						if (Q.maxLength === -1) {
							Q.maxLength = O.attr(H)
						}
						Q = D.extend({}, Q, {
							fixedCharsReg : new RegExp(Q.fixedChars),
							fixedCharsRegG : M,
							maskArray : Q.mask.split(""),
							maskNonFixedCharsArray : Q.mask.replace(M, "").split("")
						});
						if ((Q.type == "fixed" || L) && Q.setSize && !O.attr("size")) {
							O.attr("size", Q.mask.length)
						}
						if (L && Q.textAlign) {
							O.css("text-align", "right")
						}
						if (this.value !== "" || K !== "") {
							var P = E.string((this.value !== "") ? this.value : K, Q);
							this.defaultValue = P;
							O.val(P)
						}
						if (Q.type == "infinite") {
							Q.type = "repeat"
						}
						O.data("mask", Q);
						O.removeAttr(H);
						O.bind("keydown.mask", {
							func : E._onKeyDown,
							thisObj : E
						}, E._onMask).bind("keypress.mask", {
							func : E._onKeyPress,
							thisObj : E
						}, E._onMask).bind("keyup.mask", {
							func : E._onKeyUp,
							thisObj : E
						}, E._onMask).bind("paste.mask", {
							func : E._onPaste,
							thisObj : E
						}, E._onMask).bind("focus.mask", E._onFocus).bind("blur.mask", E._onBlur).bind("change.mask", E._onChange)
					}
				})
			},
			unset : function(F) {
				var E = D(F);
				return E.each(function() {
					var H = D(this);
					if (H.data("mask")) {
						var G = H.data("mask").maxLength;
						if (G != -1) {
							H.attr("maxLength", G)
						}
						H.unbind(".mask").removeData("mask")
					}
				})
			},
			string : function(J, F) {
				this.init();
				var I = {};
				if ( typeof J != "string") {
					J = String(J)
				}
				switch(typeof F) {
					case"string":
						if (this.masks[F]) {
							I = D.extend(I, this.masks[F])
						} else {
							I.mask = F
						}
						break;
					case"object":
						I = F
				}
				if (!I.fixedChars) {
					I.fixedChars = this.options.fixedChars
				}
				var E = new RegExp(I.fixedChars), G = new RegExp(I.fixedChars, "g");
				if ((I.type === "reverse") && I.defaultValue) {
					if ( typeof this.signals[I.defaultValue.charAt(0)] != "undefined") {
						var H = J.charAt(0);
						I.signal = ( typeof this.signals[H] != "undefined") ? this.signals[H] : this.signals[I.defaultValue.charAt(0)];
						I.defaultValue = I.defaultValue.substring(1)
					}
				}
				return this.__maskArray(J.split(""), I.mask.replace(G, "").split(""), I.mask.split(""), I.type, I.maxLength, I.defaultValue, E, I.signal)
			},
			_onFocus : function(G) {
				var F = D(this), E = F.data("mask");
				E.inputFocusValue = F.val();
				E.changed = false;
				if (E.selectCharsOnFocus) {
					F.select()
				}
			},
			_onBlur : function(G) {
				var F = D(this), E = F.data("mask");
				if (E.inputFocusValue != F.val() && !E.changed) {
					F.trigger("change")
				}
			},
			_onChange : function(E) {
				D(this).data("mask").changed = true
			},
			_onMask : function(E) {
				var G = E.data.thisObj, F = {};
				F._this = E.target;
				F.$this = D(F._this);
				F.data = F.$this.data("mask");
				if (F.$this.attr("readonly") || !F.data) {
					return true
				}
				F[F.data.type] = true;
				F.value = F.$this.val();
				F.nKey = G.__getKeyNumber(E);
				F.range = G.__getRange(F._this);
				F.valueArray = F.value.split("");
				return E.data.func.call(G, E, F)
			},
			_onKeyDown : function(F, G) {
				this.ignore = D.inArray(G.nKey, this.ignoreKeys) > -1 || F.ctrlKey || F.metaKey || F.altKey;
				if (this.ignore) {
					var E = this.keyRep[G.nKey];
					G.data.onValid.call(G._this, E || "", G.nKey)
				}
				return C ? this._onKeyPress(F, G) : true
			},
			_onKeyUp : function(E, F) {
				if (F.nKey === 9 || F.nKey === 16) {
					return true
				}
				if (F.repeat) {
					this.__autoTab(F);
					return true
				}
				return this._onPaste(E, F)
			},
			_onPaste : function(F, G) {
				if (G.reverse) {
					this.__changeSignal(F.type, G)
				}
				var E = this.__maskArray(G.valueArray, G.data.maskNonFixedCharsArray, G.data.maskArray, G.data.type, G.data.maxLength, G.data.defaultValue, G.data.fixedCharsReg, G.data.signal);
				G.$this.val(E);
				if (!G.reverse && G.data.defaultValue.length && (G.range.start === G.range.end)) {
					this.__setRange(G._this, G.range.start, G.range.end)
				}
				if ((D.browser.msie || D.browser.safari) && !G.reverse) {
					this.__setRange(G._this, G.range.start, G.range.end)
				}
				if (this.ignore) {
					return true
				}
				this.__autoTab(G);
				return true
			},
			_onKeyPress : function(L, E) {
				if (this.ignore) {
					return true
				}
				if (E.reverse) {
					this.__changeSignal(L.type, E)
				}
				var M = String.fromCharCode(E.nKey), O = E.range.start, I = E.value, G = E.data.maskArray;
				if (E.reverse) {
					var H = I.substr(0, O), K = I.substr(E.range.end, I.length);
					I = H + M + K;
					if (E.data.signal && (O - E.data.signal.length > 0)) {
						O -= E.data.signal.length
					}
				}
				var N = I.replace(E.data.fixedCharsRegG, "").split(""), F = this.__extraPositionsTill(O, G, E.data.fixedCharsReg);
				E.rsEp = O + F;
				if (E.repeat) {
					E.rsEp = 0
				}
				if (!this.rules[G[E.rsEp]] || (E.data.maxLength != -1 && N.length >= E.data.maxLength && E.repeat)) {
					E.data.onOverflow.call(E._this, M, E.nKey);
					return false
				} else {
					if (!this.rules[G[E.rsEp]].test(M)) {
						E.data.onInvalid.call(E._this, M, E.nKey);
						return false
					} else {
						E.data.onValid.call(E._this, M, E.nKey)
					}
				}
				var J = this.__maskArray(N, E.data.maskNonFixedCharsArray, G, E.data.type, E.data.maxLength, E.data.defaultValue, E.data.fixedCharsReg, E.data.signal, F);
				if (!E.repeat) {
					E.$this.val(J)
				}
				return (E.reverse) ? this._keyPressReverse(L, E) : (E.fixed) ? this._keyPressFixed(L, E) : true
			},
			_keyPressFixed : function(E, F) {
				if (F.range.start == F.range.end) {
					if ((F.rsEp === 0 && F.value.length === 0) || F.rsEp < F.value.length) {
						this.__setRange(F._this, F.rsEp, F.rsEp + 1)
					}
				} else {
					this.__setRange(F._this, F.range.start, F.range.end)
				}
				return true
			},
			_keyPressReverse : function(E, F) {
				if (D.browser.msie && ((F.range.start === 0 && F.range.end === 0) || F.range.start != F.range.end)) {
					this.__setRange(F._this, F.value.length)
				}
				return false
			},
			__autoTab : function(F) {
				if (F.data.autoTab && ((F.$this.val().length >= F.data.maskArray.length && !F.repeat) || (F.data.maxLength != -1 && F.valueArray.length >= F.data.maxLength && F.repeat))) {
					var E = this.__getNextInput(F._this, F.data.autoTab);
					if (E) {
						F.$this.trigger("blur");
						E.focus().select()
					}
				}
			},
			__changeSignal : function(F, G) {
				if (G.data.signal !== false) {
					var E = (F === "paste") ? G.value.charAt(0) : String.fromCharCode(G.nKey);
					if (this.signals && ( typeof this.signals[E] !== "undefined")) {
						G.data.signal = this.signals[E]
					}
				}
			},
			__getKeyNumber : function(E) {
				return (E.charCode || E.keyCode || E.which)
			},
			__maskArray : function(M, H, G, J, E, K, N, L, F) {
				if (J === "reverse") {
					M.reverse()
				}
				M = this.__removeInvalidChars(M, H, J === "repeat" || J === "infinite");
				if (K) {
					M = this.__applyDefaultValue.call(M, K)
				}
				M = this.__applyMask(M, G, F, N);
				switch(J) {
					case"reverse":
						M.reverse();
						return (L || "") + M.join("").substring(M.length - G.length);
					case"infinite":
					case"repeat":
						var I = M.join("");
						return (E !== -1 && M.length >= E) ? I.substring(0, E) : I;
					default:
						return M.join("").substring(0, G.length)
				}
				return ""
			},
			__applyDefaultValue : function(G) {
				var E = G.length, F = this.length, H;
				for ( H = F - 1; H >= 0; H--) {
					if (this[H] == G.charAt(0)) {
						this.pop()
					} else {
						break
					}
				}
				for ( H = 0; H < E; H++) {
					if (!this[H]) {
						this[H] = G.charAt(H)
					}
				}
				return this
			},
			__removeInvalidChars : function(H, G, E) {
				for (var F = 0, I = 0; F < H.length; F++) {
					if (G[I] && this.rules[G[I]] && !this.rules[G[I]].test(H[F])) {
						H.splice(F, 1);
						if (!E) {
							I--
						}
						F--
					}
					if (!E) {
						I++
					}
				}
				return H
			},
			__applyMask : function(H, F, I, E) {
				if ( typeof I == "undefined") {
					I = 0
				}
				for (var G = 0; G < H.length + I; G++) {
					if (F[G] && E.test(F[G])) {
						H.splice(G, 0, F[G])
					}
				}
				return H
			},
			__extraPositionsTill : function(H, F, E) {
				var G = 0;
				while (E.test(F[H++])) {
					G++
				}
				return G
			},
			__getNextInput : function(Q, G) {
				var F = Q.form;
				if (F == null) {
					return null
				}
				var J = F.elements, I = D.inArray(Q, J) + 1, L = J.length, O = null, K;
				for ( K = I; K < L; K++) {
					O = D(J[K]);
					if (this.__isNextInput(O, G)) {
						return O
					}
				}
				var E = document.forms, H = D.inArray(Q.form, E) + 1, N, M, P = E.length;
				for ( N = H; N < P; N++) {
					M = E[N].elements;
					L = M.length;
					for ( K = 0; K < L; K++) {
						O = D(M[K]);
						if (this.__isNextInput(O, G)) {
							return O
						}
					}
				}
				return null
			},
			__isNextInput : function(G, E) {
				var F = G.get(0);
				return F && (F.offsetWidth > 0 || F.offsetHeight > 0) && F.nodeName != "FIELDSET" && (E === true || ( typeof E == "string" && G.is(E)))
			},
			__setRange : function(G, H, E) {
				if ( typeof E == "undefined") {
					E = H
				}
				if (G.setSelectionRange) {
					G.setSelectionRange(H, E)
				} else {
					var F = G.createTextRange();
					F.collapse();
					F.moveStart("character", H);
					F.moveEnd("character", E - H);
					F.select()
				}
			},
			__getRange : function(F) {
				if (!D.browser.msie) {
					return {
						start : F.selectionStart,
						end : F.selectionEnd
					}
				}
				var G = {
					start : 0,
					end : 0
				}, E = document.selection.createRange();
				G.start = 0 - E.duplicate().moveStart("character", -100000);
				G.end = G.start + E.text.length;
				return G
			},
			unmaskedVal : function(E) {
				return D(E).val().replace(D.mask.fixedCharsRegG, "")
			}
		}
	});
	D.fn.extend({
		setMask : function(E) {
			return D.mask.set(this, E)
		},
		unsetMask : function() {
			return D.mask.unset(this)
		},
		unmaskedVal : function() {
			return D.mask.unmaskedVal(this[0])
		}
	})
})(jQuery)
/*flip counter v1.2
 @source: http://bloggingsquared.com/jquery/flipcounter/
 */

eval( function(p, a, c, k, e, r) {
	e = function(c) {
		return (c < a ? '' : e(parseInt(c / a))) + (( c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
	};
	if (!''.replace(/^/, String)) {
		while (c--)
		r[e(c)] = k[c] || e(c);
		k = [
		function(e) {
			return r[e]
		}];
		e = function() {
			return '\\w+'
		};
		c = 1
	};
	while (c--)
	if (k[c])
		p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}('(o($){$.1C.w=o(j){r k=q;r l={y:0,23:1,1e:0,M:"21-V",I:"21-1g",20:2L,z:30,1Y:"2J/w-2I.2H",1V:q,1U:2s,1S:q,1R:q,1Q:q,1P:q,X:q};r m={1I:o(e){u s.B(o(){k=$(s);r c=$.1j(l,e);r d=k.D("w");e=$.1j(d,c);k.D("w",e);p(e.y===q||e.y==0){1o()!==q?e.y=1o():e.y=0;v("y",e.y)}v("G",q);v("H",q);k.Z("1v",o(a,b){1H(b)});k.Z("17",o(a){1G()});k.Z("19",o(a){1E()});k.Z("1b",o(a){T()});k.1d();J()})},2f:o(a){u s.B(o(){k=$(s);p(!E()){$(s).w()}v("y",a);J()})},27:o(a){u s.B(o(){k=$(s);p(!E()){$(s).w()}v("y",a);J()})},2X:o(){r a=q;s.B(a=o(){k=$(s);p(!E()){$(s).w()}a=n("y");u a});u a},1v:o(a){u s.B(o(){k=$(s);p(!E()){$(s).w()}k.U("1v",a)})},1b:o(){u s.B(o(){k=$(s);p(!E()){$(s).w()}k.U("1b")})},17:o(){u s.B(o(){k=$(s);p(!E()){$(s).w()}k.U("17")})},19:o(){u s.B(o(){k=$(s);p(!E()){$(s).w()}k.U("19")})}};p(m[j]){u m[j].1k(s,1D.2t.2i.O(1y,1))}C{p(A j==="2M"||!j){u m.1I.1k(s,1y)}C{$.1t("2G "+j+" 2u 1x 2g 2U 14.w")}}o E(){r a=k.D("w");p(A a=="1u"){u q}u R}o n(a){r b=k.D("w");r c=b[a];p(A c!=="1u"){u c}u q}o v(a,b){r c=k.D("w");c[a]=b;k.D("w",c)}o 1T(){p(k.P(\'[W="\'+n("I")+\'"]\').N<1){k.1z(\'<2w 2x="1A" W="\'+n("I")+\'" 1g="\'+n("y")+\'" />\')}r a=1B();r b=1s().N;p(b>a){1l(i=0;i<b-a;i++){r c=$(\'<L 2e="\'+n("M")+\'" 1f="\'+1a("0")+\'" />\');k.2n(c)}}C{p(b<a){1l(i=0;i<a-b;i++){k.P("."+n("M")).2q().1F()}}}k.18("."+n("M")).B(o(){p(0==$(s).18("L").N){$(s).1z(\'<L 1f="2v:1A">0</L>\')}})}o J(){1T();r c=1s();r d=16();r e=0;$.B(d,o(a,b){V=c.15().2y(e);$(s).2z("1f",1a(V));$(s).18("L").2A(V.2B(" ","&2F;").15());e++});1J()}o 16(){u k.P("."+n("M"))}o 1B(){u 16().N}o 1o(){r a=2K(k.P(\'[W="\'+n("I")+\'"]\').1K());p(a==a==q){u q}u a}o 1J(){k.P(\'[W="\'+n("I")+\'"]\').1K(n("y"))}o 1s(){r a=n("y");p(A a!=="y"){$.1t("2N 1L 2R 2S-2T 1g.");u"0"}r b="";p(n("X")){p($.1M){b=$.1M(a,n("X"))}C{$.1t("2V 2W 14 1N 1O 1x 28. 29 1N 1O 2a 1L 2b 2c X 2d.")}}C{p(a>=0){r c=n("23");r d=c-a.1r().15().N;1l(r i=0;i<d;i++){b+="0"}b+=a.1r(n("1e"))}C{b="-"+1q.33(a.1r(n("1e")))}}u b}o 1a(a){r b="2h:"+n("20")+"1p; 2j:"+n("z")+"1p; 2k:2l-2m; 1n-2o:2p(\'"+n("1Y")+"\'); 1n-1w:2r-1w; ";r c=1m 1D;c["1"]=n("z")*0;c["2"]=n("z")*-1;c["3"]=n("z")*-2;c["4"]=n("z")*-3;c["5"]=n("z")*-4;c["6"]=n("z")*-5;c["7"]=n("z")*-6;c["8"]=n("z")*-7;c["9"]=n("z")*-8;c["0"]=n("z")*-9;c["."]=n("z")*-10;c["-"]=n("z")*-11;c[","]=n("z")*-12;c[" "]=n("z")*-13;p(a 2C c){u b+"1n-2D: "+c[a]+"1p 2E;"}u b}o 1H(a){p(R==n("G")){T()}p(A a!=="1u"){a=$.1j(k.D("w"),a);k.D("w",a)}C{a=k.D("w")}p(q==n("H")){v("H",(1m 1W).1X())}p(q==n("K")){v("K",0)}p(q==n("Y")){v("Y","0.0")}p(q==n("F")){v("F",n("y"));p(q==n("F")){v("F",0)}}1c();r b=n("1S");p(A b=="o"){b.O(k,k)}}o 1c(){r c=n("H");r d=n("K");r e=n("Y");r f=n("F");r g=n("1Z")-n("F");p(g==0){u q}r h=n("1U");r i=n("1V");v("G",R);o 1i(){d+=10;e=1q.2P(d/10)/10;p(1q.2Q(e)==e){e+=".0"}v("Y",e);r a=(1m 1W).1X()-c-d;r b=0;p(A i=="o"){b=i.1k(k,[q,d,f,g,h])}C{b=22(q,d,f,g,h)}v("y",b);v("K",d);J();p(d<h){v("1h",24.25(1i,10-a))}C{T()}}24.25(1i,10)}o T(){p(q==n("G")){u q}26(n("1h"));v("H",q);v("F",q);v("1Z",q);v("K",0);v("G",q);v("Q",q);r a=n("1R");p(A a=="o"){a.O(k,k)}}o 1G(){p(q==n("G")||R==n("Q")){u q}26(n("1h"));v("Q",R);r a=n("1Q");p(A a=="o"){a.O(k,k)}}o 1E(){p(q==n("G")||q==n("Q")){u q}v("Q",q);1c();r a=n("1P");p(A a=="o"){a.O(k,k)}}o 22(x,t,b,c,d){u t/d*c+b}}})(14);14.1C.1d=o(){s.2Y().2Z(o(){p(s.31!=3){$(s).1d();u q}C{u!/\\S/.32(s.2O)}}).1F()};', 62, 190, '|||||||||||||||||||||||_getOption|function|if|false|var|this||return|_setOption|flipCounter||number|digitWidth|typeof|each|else|data|_isInitialized|start_number|animating|start_time|counterFieldName|_renderCounter|time|span|digitClass|length|call|children|paused|true||_stopAnimation|trigger|digit|name|formatNumberOptions|elapsed|bind|||||jQuery|toString|_getDigits|pauseAnimation|find|resumeAnimation|_getDigitStyle|stopAnimation|_doAnimation|htmlClean|numFractionalDigits|style|value|interval|animation_step|extend|apply|for|new|background|_getCounterValue|px|Math|toFixed|_getNumberFormatted|error|undefined|startAnimation|repeat|not|arguments|append|hidden|_getDigitsLength|fn|Array|_resumeAnimation|remove|_pauseAnimation|_startAnimation|init|_setCounterValue|val|to|formatNumber|plugin|is|onAnimationResumed|onAnimationPaused|onAnimationStopped|onAnimationStarted|_setupCounter|duration|easing|Date|getTime|imagePath|end_number|digitHeight|counter|_noEasing|numIntegralDigits|window|setTimeout|clearTimeout|setNumber|loaded|This|required|use|the|setting|class|renderCounter|exist|height|slice|width|display|inline|block|prepend|image|url|first|no|1E4|prototype|does|visibility|input|type|charAt|attr|text|replace|in|position|0px|nbsp|Method|png|medium|img|parseFloat|40|object|Attempting|nodeValue|floor|round|render|non|numeric|on|The|numberformatter|getNumber|contents|filter||nodeType|test|abs'.split('|'), 0, {}))

/*

 StackBlur - a fast almost Gaussian Blur For Canvas

 Version: 	0.5
 Author:		Mario Klingemann
 Contact: 	mario@quasimondo.com
 Website:	http://www.quasimondo.com/StackBlurForCanvas
 Twitter:	@quasimondo

 In case you find this class useful - especially in commercial projects -
 I am not totally unhappy for a small donation to my PayPal account
 mario@quasimondo.de

 Or support me on flattr:
 https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

 Copyright (c) 2010 Mario Klingemann

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */
var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
function stackBlurImage(imageID, canvasID, radius, blurAlphaChannel) {
	var img = document.getElementById(imageID);
	var w = img.naturalWidth;
	var h = img.naturalHeight;
	var canvas = document.getElementById(canvasID);
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, w, h);
	context.drawImage(img, 0, 0);
	if (isNaN(radius) || radius < 1)
		return;
	if (blurAlphaChannel)
		stackBlurCanvasRGBA(canvasID, 0, 0, w, h, radius);
	else
		stackBlurCanvasRGB(canvasID, 0, 0, w, h, radius);
}

function stackBlurCanvasRGBA(id, top_x, top_y, width, height, radius) {
	if (isNaN(radius) || radius < 1)
		return;
	radius |= 0;
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	var imageData;
	try {
		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch(e) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				imageData = context.getImageData(top_x, top_y, width, height);
			} catch(e) {
				alert("Cannot access local image");
				throw new Error("unable to access local image data: " + e);
				return;
			}
		}
	} catch(e) {
		alert("Cannot access image");
		throw new Error("unable to access image data: " + e);
	}
	var pixels = imageData.data;
	var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
	var div = radius + radius + 1;
	var w4 = width << 2;
	var widthMinus1 = width - 1;
	var heightMinus1 = height - 1;
	var radiusPlus1 = radius + 1;
	var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
	var stackStart = new BlurStack();
	var stack = stackStart;
	for ( i = 1; i < div; i++) {
		stack = stack.next = new BlurStack();
		if (i == radiusPlus1)
			var stackEnd = stack;
	}
	stack.next = stackStart;
	var stackIn = null;
	var stackOut = null;
	yw = yi = 0;
	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];
	for ( y = 0; y < height; y++) {
		r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
		r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
		g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
		a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3]);
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;
		stack = stackStart;
		for ( i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}
		for ( i = 1; i < radiusPlus1; i++) {
			p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
			r_sum += (stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i);
			g_sum += (stack.g = ( pg = pixels[p + 1])) * rbs;
			b_sum += (stack.b = ( pb = pixels[p + 2])) * rbs;
			a_sum += (stack.a = ( pa = pixels[p + 3])) * rbs;
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;
			stack = stack.next;
		}
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( x = 0; x < width; x++) {
			pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
			if (pa != 0) {
				pa = 255 / pa;
				pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
				pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
				pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
			} else {
				pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
			}
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;
			p = (yw + (( p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
			r_in_sum += (stackIn.r = pixels[p]);
			g_in_sum += (stackIn.g = pixels[p + 1]);
			b_in_sum += (stackIn.b = pixels[p + 2]);
			a_in_sum += (stackIn.a = pixels[p + 3]);
			r_sum += r_in_sum;
			g_sum += g_in_sum;
			b_sum += b_in_sum;
			a_sum += a_in_sum;
			stackIn = stackIn.next;
			r_out_sum += ( pr = stackOut.r);
			g_out_sum += ( pg = stackOut.g);
			b_out_sum += ( pb = stackOut.b);
			a_out_sum += ( pa = stackOut.a);
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;
			stackOut = stackOut.next;
			yi += 4;
		}
		yw += width;
	}
	for ( x = 0; x < width; x++) {
		g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
		yi = x << 2;
		r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
		g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
		a_out_sum = radiusPlus1 * ( pa = pixels[yi + 3]);
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		a_sum += sumFactor * pa;
		stack = stackStart;
		for ( i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack.a = pa;
			stack = stack.next;
		}
		yp = width;
		for ( i = 1; i <= radius; i++) {
			yi = (yp + x) << 2;
			r_sum += (stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i);
			g_sum += (stack.g = ( pg = pixels[yi + 1])) * rbs;
			b_sum += (stack.b = ( pb = pixels[yi + 2])) * rbs;
			a_sum += (stack.a = ( pa = pixels[yi + 3])) * rbs;
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			a_in_sum += pa;
			stack = stack.next;
			if (i < heightMinus1) {
				yp += width;
			}
		}
		yi = x;
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( y = 0; y < height; y++) {
			p = yi << 2;
			pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
			if (pa > 0) {
				pa = 255 / pa;
				pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
				pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
				pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
			} else {
				pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
			}
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			a_sum -= a_out_sum;
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			a_out_sum -= stackIn.a;
			p = (x + ((( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
			r_sum += (r_in_sum += (stackIn.r = pixels[p]));
			g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
			b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
			a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));
			stackIn = stackIn.next;
			r_out_sum += ( pr = stackOut.r);
			g_out_sum += ( pg = stackOut.g);
			b_out_sum += ( pb = stackOut.b);
			a_out_sum += ( pa = stackOut.a);
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			a_in_sum -= pa;
			stackOut = stackOut.next;
			yi += width;
		}
	}
	context.putImageData(imageData, top_x, top_y);
}

function stackBlurCanvasRGB(id, top_x, top_y, width, height, radius) {
	if (isNaN(radius) || radius < 1)
		return;
	radius |= 0;
	var canvas = document.getElementById(id);
	var context = canvas.getContext("2d");
	var imageData;
	try {
		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch(e) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				imageData = context.getImageData(top_x, top_y, width, height);
			} catch(e) {
				alert("Cannot access local image");
				throw new Error("unable to access local image data: " + e);
				return;
			}
		}
	} catch(e) {
		alert("Cannot access image");
		throw new Error("unable to access image data: " + e);
	}
	var pixels = imageData.data;
	var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, r_out_sum, g_out_sum, b_out_sum, r_in_sum, g_in_sum, b_in_sum, pr, pg, pb, rbs;
	var div = radius + radius + 1;
	var w4 = width << 2;
	var widthMinus1 = width - 1;
	var heightMinus1 = height - 1;
	var radiusPlus1 = radius + 1;
	var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
	var stackStart = new BlurStack();
	var stack = stackStart;
	for ( i = 1; i < div; i++) {
		stack = stack.next = new BlurStack();
		if (i == radiusPlus1)
			var stackEnd = stack;
	}
	stack.next = stackStart;
	var stackIn = null;
	var stackOut = null;
	yw = yi = 0;
	var mul_sum = mul_table[radius];
	var shg_sum = shg_table[radius];
	for ( y = 0; y < height; y++) {
		r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;
		r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
		g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		stack = stackStart;
		for ( i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack = stack.next;
		}
		for ( i = 1; i < radiusPlus1; i++) {
			p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
			r_sum += (stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i);
			g_sum += (stack.g = ( pg = pixels[p + 1])) * rbs;
			b_sum += (stack.b = ( pb = pixels[p + 2])) * rbs;
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			stack = stack.next;
		}
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( x = 0; x < width; x++) {
			pixels[yi] = (r_sum * mul_sum) >> shg_sum;
			pixels[yi + 1] = (g_sum * mul_sum) >> shg_sum;
			pixels[yi + 2] = (b_sum * mul_sum) >> shg_sum;
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			p = (yw + (( p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;
			r_in_sum += (stackIn.r = pixels[p]);
			g_in_sum += (stackIn.g = pixels[p + 1]);
			b_in_sum += (stackIn.b = pixels[p + 2]);
			r_sum += r_in_sum;
			g_sum += g_in_sum;
			b_sum += b_in_sum;
			stackIn = stackIn.next;
			r_out_sum += ( pr = stackOut.r);
			g_out_sum += ( pg = stackOut.g);
			b_out_sum += ( pb = stackOut.b);
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			stackOut = stackOut.next;
			yi += 4;
		}
		yw += width;
	}
	for ( x = 0; x < width; x++) {
		g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;
		yi = x << 2;
		r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
		g_out_sum = radiusPlus1 * ( pg = pixels[yi + 1]);
		b_out_sum = radiusPlus1 * ( pb = pixels[yi + 2]);
		r_sum += sumFactor * pr;
		g_sum += sumFactor * pg;
		b_sum += sumFactor * pb;
		stack = stackStart;
		for ( i = 0; i < radiusPlus1; i++) {
			stack.r = pr;
			stack.g = pg;
			stack.b = pb;
			stack = stack.next;
		}
		yp = width;
		for ( i = 1; i <= radius; i++) {
			yi = (yp + x) << 2;
			r_sum += (stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i);
			g_sum += (stack.g = ( pg = pixels[yi + 1])) * rbs;
			b_sum += (stack.b = ( pb = pixels[yi + 2])) * rbs;
			r_in_sum += pr;
			g_in_sum += pg;
			b_in_sum += pb;
			stack = stack.next;
			if (i < heightMinus1) {
				yp += width;
			}
		}
		yi = x;
		stackIn = stackStart;
		stackOut = stackEnd;
		for ( y = 0; y < height; y++) {
			p = yi << 2;
			pixels[p] = (r_sum * mul_sum) >> shg_sum;
			pixels[p + 1] = (g_sum * mul_sum) >> shg_sum;
			pixels[p + 2] = (b_sum * mul_sum) >> shg_sum;
			r_sum -= r_out_sum;
			g_sum -= g_out_sum;
			b_sum -= b_out_sum;
			r_out_sum -= stackIn.r;
			g_out_sum -= stackIn.g;
			b_out_sum -= stackIn.b;
			p = (x + ((( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;
			r_sum += (r_in_sum += (stackIn.r = pixels[p]));
			g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
			b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
			stackIn = stackIn.next;
			r_out_sum += ( pr = stackOut.r);
			g_out_sum += ( pg = stackOut.g);
			b_out_sum += ( pb = stackOut.b);
			r_in_sum -= pr;
			g_in_sum -= pg;
			b_in_sum -= pb;
			stackOut = stackOut.next;
			yi += width;
		}
	}
	context.putImageData(imageData, top_x, top_y);
}

function BlurStack() {
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.a = 0;
	this.next = null;
}

