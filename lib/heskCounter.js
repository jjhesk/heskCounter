/*
 Hesk Counter v1.0.4

 Copyright 2012, Heskemo K.
 Free to use under the MIT license.
 http://www.opensource.org/licenses/mit-license.php
 */
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
			'width':defaultopt.width * l + 'px',
			'height':defaultopt.height + 'px'
		}
		var charcss = {
			'width' : defaultopt.width + 'px',
			'height' : defaultopt.height + 'px',
			'background-image' : 'url(' + defaultopt.url + ')',
			'background-repeat' : 'no-repeat',
			'float':'left'
		};this.css('filter', 'progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + defaultopt.start + '\', endColorstr=\'#' + defaultopt.end + '\', gradientType=1)');this.css('background-image', '-webkit-gradient(linear, left top, right bottom, color-stop(0.1, #' + defaultopt.start + '), color-stop(0.99, #' + defaultopt.end + '))');this.css('background-image', '-moz-linear-gradient(top left, #' + defaultopt.start + ' 0%, #' + defaultopt.end + ' 100%)');this.css('background-image', '-o-linear-gradient(top left, #' + defaultopt.start + ' 0%, #' + defaultopt.end + ' 100%)');this.css(cssob);
		var bgpos=function(t){
			var g = 10;
			switch(t){
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
				if(typeof parseInt(t) ==='number'){
					g = parseInt(t);
				}
				break;
			}
				var b=defaultopt.width*g*(-1);
				return b+"px"; 
		}
		for (var i = 0; i < l; i++) {
			// s.charAt(i) gets the character
			// you may want to do a some jQuery thing here, like $('<img...>')
			// document.write('<img src="' + num.charAt(i) + '.png" />');
			var c = num.charAt(i);
			this.append('<div style="background-position: '+bgpos(c)+' 0"></div>');
		}
		this.children('div').css(charcss);
	}
});
