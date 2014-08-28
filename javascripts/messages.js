(
	function( $ ) {
		var settings = {			
			messages: {	
				constants: {					
				}				
			}
		};
		
		/**
		* This variable holds all methods supported by this plugin. 
		*/		
		var methods = {
			
			add: function(options) {
				
				return this.each(function() {
					var $this = $(this);
					
					var $message = helpers.messages.getMessage(options);
					
					helpers.messages.remove($this, options);
					
					if(options.where) {
						if(options.where === 'before') {
							$this.before($message);
						} else if(options.where === 'after') {
							$this.after($message);
						} else if(options.where === 'append') {
							$this.append($message);
						} else if(options.where === 'prepend') {
							$this.prepend($message);
						}
					} else {
						$this.after($message);
					}
					
					if(options.flash) {
						$this.effect('highlight', options.flash);
					}
					
					if(options.autoHide) {
						setTimeout(function() {
							$message.remove();
						}, options.autoHide);
					}
				});
			},
			
			remove: function(options) {
				return this.each(function() {
					var $this = $(this);
					
					helpers.messages.remove($this, options);
				});
			},
			
			update: function(options) {
				return this.each(function() {
					var $this = $(this);
					
					helpers.messages.findMessage(element, options).html(options.text);
				
					if(options.flash) {
						$this.effect('highlight', options.flash);
					}
				});
			}
		};
		
		var helpers = {
			messages: {
				getMessage: function(options) {
					var $messageSpan = $('<span></span>');
			
					$messageSpan.append(options.text);			
					$messageSpan.addClass('_msg _msg_' + options.type + ' _msg_' + options.id);
					
					return $messageSpan;
				},
				
				getMessageParent: function(element, options) {
					if(options.where) {
						if(options.where === 'before' || options.where === 'after') {
							return element.siblings();
						} else if(options.where === 'append' || options.where === 'prepend') {
							return element;
						}
					} else {
						return element.siblings();
					}
				},
				
				findMessage: function(element, options) {
					if(options.id) {
						return helpers.messages.getMessageParent(element, options).find('span._msg_' + options.id);						
					} else if (options.type) {
						return helpers.messages.getMessageParent(element, options).find('span._msg_' + options.type);						
					} else {
						return helpers.messages.getMessageParent(element, options).find('span._msg');						
					}
				},
				
				remove: function(element, options) {
					helpers.messages.findMessage(element, options).remove();
				}
			},
			
			common: {
				getElementEvent: function(element) {
					var type = 'keyup';
	
					if(element.is('input:checkbox') || element.is('input:radio') || element.is('select') || element.is('input:file')) {
						type = 'change';
					} 
					
					return type;
				},
				
				getElementValue: function(element) {
					var value = $.trim(element.val());
	
					if(element.is('select')) {
						value = $.trim(element.find('option:selected').val());
					} 
					
					return value;
				},
				
				getElementDisplayValue: function(element) {
					var value = $.trim(element.val());
					
					if(element.is('select')) {
						var values = [];
						element.find('option:selected').each(function() {
							values.push($.trim(this.value));
						});
						
						value = values.join(", ");
					} else if (element.is('input:checkbox') || element.is('input:radio')) {
						value = element.prop('checked');
					}
					
					return value;
				},

				getElementDefaultDisplayValue: function(element) {
					var value = $.trim(element.prop('defaultValue'));
					
					if (element.is('select')) {
						var values = [];
						element.find('option').filter(function() {
							return this.defaultSelected;
						}).each(function() {
							values.push($.trim(this.innerHTML));
						});
						
						value = values.join(", ");
					} else if (element.is('input:checkbox') || element.is('input:radio')) {
						value = element.prop('defaultChecked');
					}
					
					return value;
				},

				getDefaultSelectedValueForRadio: function(element) {
					var value = '';
					
					$('input:radio[name=' + element.attr('name') + ']').each(function() {
						if (this.defaultChecked) {
							value = this.value;
						}
					});
					
					return value;
				}
			}	
		};
		
		/**
		* This is where calls from pages come. Calls requested functions appropriately. 
		*/ 
		$.fn.messages = function( method ) {
			// If the method parameter is present, then call the method, else call the default method i.e. init. 
			if( methods[method] ) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else if ( !method || typeof method === 'object' ) {
				return methods.init.apply(this, arguments);
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.messages');
			}
		}; 
	}
) (jQuery) ;