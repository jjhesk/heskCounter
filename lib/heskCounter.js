/*
 Hesk Counter v1.0.4

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
		jQuery.fn.heskCounter = function(num) {
			var defaultopt = {
				width : '24',
				height : '39',
				start : '666666', // the color without #
				end : '000000', //the color without #
				url : 'http://hesk.imusictech.net/fansliving/images/common/counter-numbers.png'
			};
			var l = num.length;
			var cssob = {
				'width' : parseInt(defaultopt.width * l + l + 1) + 'px',
				'height' : parseInt(defaultopt.height * 1 + 2) + 'px'
			}
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
			this.css(cssob);
			var bgpos = function(t) {
				var g = 10;
				switch(t) {
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
						if ( typeof parseInt(t) === 'number') {
							g = parseInt(t);
						}
						break;
				}
				var b = defaultopt.width * g * (-1);
				return b + "px";
			}
			for (var i = 0; i < l; i++) {
				// `s.charAt(i)` gets the character
				// you may want to do a some jQuery thing here, like $('<img...>')
				//document.write('<img src="' + num.charAt(i) + '.png" />');
				var c = num.charAt(i);
				this.append('<div style="background-position: ' + bgpos(c) + ' 0"></div>');
			}
			this.addClass("heskCounterFrame");
			this.children('div').css(charcss);
			this.children('div:last-child').css(lastcharcss);
		}
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
		fanslivingDateHesk = function(t) {
			var k = "2012-09-25 11:35:37";
			k = t.replaceAt(10, "T") + "Z";
			return humandate(k);
		}
		//humandate("2008-01-28T20:24:17Z"); // => "2 hours ago
		// If jQuery is included in the page, adds a jQuery plugin to handle it as well
		// under timetag
		jQuery.fn.time_convert_hesk=function(selector) {
			var val = this.attr('since');
			if(selector==null)this.html(fanslivingDateHesk(val));
			else this.children(selector).html(fanslivingDateHesk(val));
		}
	});
