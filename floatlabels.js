/**
 * FloatLabels
 * URL: http://clubdesign.github.io/floatlabels.js/
 * Author: Marcus Pohorely ( http://www.clubdesign.at )
 * Copyright: Copyright 2013 / 2014 http://www.clubdesign.at
 *
 * Adapted for bootstrap projects by Michael Levin 2/20/14
 *
 *	Forked and Updated by @beauteprivee
 *	Author: Amir Moradi
 *	
 */

;(function ( $, window, document, undefined ) {
        var pluginName = "floatlabel",
            defaults = {
                slideInput                      : true,
                labelClass                      : '',
                typeMatches                     : /text|password|email|number|search|url|tel/,
            };
        function Plugin ( element, options ) {
            this.$element       = $(element);
            this.settings       = $.extend( {}, defaults, options );
            this.init();
        }
        Plugin.prototype = {
            init: function () {
                var self          = this,
                    settings      = this.settings,
                    thisElement   = this.$element,
                    elementID,
                    placeholderText,
                    floatingText,
                    extraClasses
                ;
                if( thisElement.prop('tagName').toUpperCase() != 'INPUT' &&
                    thisElement.prop('tagName').toUpperCase() != 'TEXTAREA' &&
                    thisElement.prop('tagName').toUpperCase() !== 'SELECT') { return; }
                if( thisElement.prop('tagName').toUpperCase() === 'INPUT' &&
                    !settings.typeMatches.test( thisElement.attr('type') ) ) { return; }
                placeholderText     = thisElement.attr('placeholder');
                if( typeof(placeholderText) === 'undefined' ) { return; }
                elementID = thisElement.attr('id');
                if( !elementID ) {
                    elementID = Math.floor( Math.random() * 100 ) + 1;
                    thisElement.attr('id', elementID);
                }
                floatingText        = thisElement.data('label');
                extraClasses        = thisElement.data('class');
                if( !extraClasses ) { extraClasses = ''; }
                if( !floatingText || floatingText === '' ) { floatingText = placeholderText; }
                thisElement.wrap('<div class="floatlabel-wrapper"></div>');
                thisElement.addClass('floatlabel-input');
                if (thisElement.prop('tagName').toUpperCase() == 'SELECT') { 
                	settings.labelClass = settings.labelClass + ' floatlabel-select-label';
                }
                thisElement.before('<label for="' + elementID + '" class="floatlabel-label floatlabel-label-inactive' + settings.labelClass + ' ' + extraClasses + '">' + floatingText + '</label>');
                this.$label = thisElement.prev('label');
                thisElement.on('keyup blur change input', function( e ) {
                    self.checkValue( e );
                });
                thisElement.on('blur', function() { thisElement.prev('label').removeClass('floatlabel-label-focus') });
                thisElement.on('focus', function() { thisElement.prev('label').addClass('floatlabel-label-focus') });
                this.checkValue();
            },
            checkValue: function( e ) {
                if( e ) {
                    var keyCode         = e.keyCode || e.which;
                    if( keyCode === 9 ) { return; }
                }
                var thisElement  = this.$element,
                    currentFlout = thisElement.data('flout');
                if( thisElement.val() !== "" ) { thisElement.data('flout', '1'); }
                if( thisElement.val() === "" ) { thisElement.data('flout', '0'); }
                if( thisElement.data('flout') === '1' && currentFlout !== '1' ) {
                    this.showLabel();
                }
	            if (thisElement.prop('tagName').toUpperCase() !== 'SELECT') { 
                	if( thisElement.data('flout') === '0' && currentFlout !== '0' ) {
    	               this.hideLabel();
        	        }
                }
            },
            showLabel: function() {
                var self = this;
                self.$label.css({ 'display' : 'block' });
                window.setTimeout(function() {
                    self.$label.removeClass('floatlabel-label-inactive').addClass('floatlabel-label-active');
                    if( self.settings.slideInput === true ) {
	                    if (self.$element.prop('tagName').toUpperCase() !== 'SELECT') { 
							self.$element.addClass('floatlabel-input-slide');
	                    }

                    }
                }, 50);
            },
            hideLabel: function() {
                var self = this;
                self.$label.removeClass('floatlabel-label-active').addClass('floatlabel-label-inactive');
                if( self.settings.slideInput === true ) {
                    if (self.$element.prop('tagName').toUpperCase() !== 'SELECT') { 
	                    self.$element.removeClass('floatlabel-input-slide');
	                }
                }
            }
        };
        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };
})( jQuery, window, document );
