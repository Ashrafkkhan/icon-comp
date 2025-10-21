function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

$(document).ready(function() {
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

	/* Search */
	/*$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});*/
	
	/*$('#search').bind("enterKey",function(e){
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});*/

	/*$('#submit_search').bind("click", function(e) {
		alert("here");
		fnSearchSubmit();
	});

	$('#prod_search').on('keydown', function(e) {
		if (e.keyCode == 13) {
			fnSearchSubmit();
		}
	});

	function fnSearchSubmit(){
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('#prod_search').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	}*/

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$( document ).ready(function() {
	//$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});

	// Replace legacy toll-free number with new number across the DOM
	(function replaceLegacyPhone(){
		var oldPatterns = [/1800\s*309\s*2944/g, /18003092944/g];
		var newDisplay = '+91 92734 30073';
		var newTel = 'tel:+919273430073';

		// Update visible text nodes
		oldPatterns.forEach(function(rx){
			$('body *').contents().filter(function(){
				return this.nodeType === 3 && rx.test(this.nodeValue);
			}).each(function(){
				this.nodeValue = this.nodeValue.replace(rx, newDisplay);
			});
		});

		// Update tel: hrefs
		$('a[href^="tel:"]').each(function(){
			var href = $(this).attr('href');
			if(/18003092944|1800\s*309\s*2944/.test(href)){
				$(this).attr('href', newTel);
			}
		});
	})();

	// Normalize links pointing to index.html to the consolidated homepage
	(function normalizeIndexLinks(){
		var target = '../www.themvp.in/index1117.html';
		// Rewrite plain index.html or ./index.html anchors
		$('a[href="index.html"], a[href="./index.html"]').attr('href', target);
		// Intercept clicks that might programmatically navigate to index.html
		$(document).on('click', 'a', function(e){
			var href = $(this).attr('href') || '';
			if (href === 'index.html' || href === './index.html') {
				$(this).attr('href', target);
			}
		});
	})();

	// Hide any visible "Blog" links site-wide
	(function hideBlogLinks(){
		// Hide by href containing 'blog'
		$('a[href*="/blog"], a[href*="blog."] , a[href$="/blog"], a[href$="blog"]').each(function(){
			$(this).closest('li').length ? $(this).closest('li').hide() : $(this).hide();
		});
		// Hide anchors whose text is exactly 'Blog' (case-insensitive)
		$('a').filter(function(){
			return ($(this).text()||'').trim().toLowerCase() === 'blog';
		}).each(function(){
			$(this).closest('li').length ? $(this).closest('li').hide() : $(this).hide();
		});
		// Hide generic blog teaser/sections if any remain
		$('.blog, .blog.media, section.blog, section.blog.media').hide();
	})();

	// Replace "Enterprises" with "Gallery" in text nodes
	(function replaceEnterprisesWithGallery(){
		$('body *').contents().filter(function(){
			return this.nodeType === 3 && /Enterprises/i.test(this.nodeValue);
		}).each(function(){
			this.nodeValue = this.nodeValue.replace(/Enterprises/gi, 'Gallery');
		});
	})();

	// Remove "support@themvp.in" email from text nodes
	(function removeSupportEmail(){
		$('body *').contents().filter(function(){
			return this.nodeType === 3 && /support@themvp\.in/i.test(this.nodeValue);
		}).each(function(){
			this.nodeValue = this.nodeValue.replace(/support@themvp\.in/gi, '');
		});
	})();

	// Remove "$", "₹", and "â‚¹" symbols from price-like text nodes (e.g., "$303,516.00" -> "303,516.00", "₹1,080.00" -> "1,080.00", "â‚¹1,080.00" -> "1,080.00")
	(function stripCurrencySymbols(){
		function isPriceTextNode(node){
			if (!node || node.nodeType !== 3) return false;
			var p = node.parentNode;
			if (!p) return false;
			var tag = (p.tagName || '').toUpperCase();
			if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') return false;
			return /[\$â‚¹]\s*\d/.test(node.nodeValue);
		}

		$('body *').contents().filter(function(){ return isPriceTextNode(this); }).each(function(){
			this.nodeValue = this.nodeValue.replace(/[\$â‚¹]\s*(?=\d)/g, '');
		});
	})();
	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});

	// Currency Conversion and Text Replacement Functions
	(function() {
		console.log('Starting currency conversion and text replacement...');
		
		// Function to add ₹ symbol before prices and replace other currency symbols
		function convertToRupeeCurrency() {
			console.log('Starting currency conversion...');
			
			// Replace existing currency symbols with ₹
			const currencySymbols = [
				{ pattern: /\$(\d+)/g, replacement: '₹$1' },
				{ pattern: /USD\s*(\d+)/gi, replacement: '₹$1' },
				{ pattern: /Rs\.?\s*(\d+)/gi, replacement: '₹$1' },
				{ pattern: /INR\s*(\d+)/gi, replacement: '₹$1' },
				{ pattern: /(\d+)\s*USD/gi, replacement: '₹$1' },
				{ pattern: /(\d+)\s*Rs\.?/gi, replacement: '₹$1' },
				{ pattern: /(\d+)\s*INR/gi, replacement: '₹$1' }
			];

			// Apply currency symbol replacements
			currencySymbols.forEach(({ pattern, replacement }) => {
				$('body').html($('body').html().replace(pattern, replacement));
			});

			// Find and add ₹ before standalone numbers that look like prices (4+ digits)
			const pricePattern = /\b(\d{4,}(?:,\d{3})*(?:\.\d{2})?)\b/g;
			const textNodes = getTextNodes(document.body);
			
			textNodes.forEach(node => {
				if (node.textContent && !node.textContent.includes('₹')) {
					const newText = node.textContent.replace(pricePattern, (match) => {
						// Skip if it's already part of a price or if it's a year/date/phone number
						if (node.parentElement && 
							(node.parentElement.textContent.includes('₹') || 
							 node.parentElement.textContent.includes('20') ||
							 node.parentElement.textContent.includes('19') ||
							 node.parentElement.textContent.includes('tel:') ||
							 node.parentElement.textContent.includes('wa.me'))) {
							return match;
						}
						return '₹' + match;
					});
					
					if (newText !== node.textContent) {
						node.textContent = newText;
					}
				}
			});

			// Handle data attributes that might contain prices
			$('[data-value]').each(function() {
				const value = $(this).attr('data-value');
				if (value && /^\d+$/.test(value) && parseInt(value) > 100) {
					if ($(this).text() && !$(this).text().includes('₹')) {
						$(this).text('₹' + value);
					}
				}
			});

			console.log('Currency conversion completed!');
		}

		// Function to change the "Powered by" text
		function changePoweredByText() {
			console.log('Changing "Powered by" text...');
			
			// Find the powered by element using multiple selectors
			const poweredByElement = $('.poweredby');
			if (poweredByElement.length) {
				// Update the text content
				poweredByElement.html('<span>Powered by </span><a href="../madebytnm.com/index.html" target="_blank"> DB Square Technology</a>');
				console.log('Successfully changed "Powered by" text to "DB Square Technology"');
			} else {
				console.log('Powered by element not found');
			}
			
			// Also search for any other instances of this text in the entire document
			const allTextNodes = getTextNodes(document.body);
			allTextNodes.forEach(node => {
				if (node.textContent && node.textContent.includes("That's No Moon")) {
					node.textContent = node.textContent.replace("That's No Moon", "DB Square Technology");
					console.log('Found and replaced additional instance of "That\'s No Moon"');
				}
			});
		}

		// Helper function to get all text nodes
		function getTextNodes(element) {
			const textNodes = [];
			const walker = document.createTreeWalker(
				element,
				NodeFilter.SHOW_TEXT,
				null,
				false
			);
			
			let node;
			while (node = walker.nextNode()) {
				textNodes.push(node);
			}
			
			return textNodes;
		}

		// Helper function to convert a specific node
		function convertNodeToRupee(node) {
			if (node.nodeType === 1) { // Element node
				const pricePattern = /\b(\d{4,}(?:,\d{3})*(?:\.\d{2})?)\b/g;
				const textNodes = getTextNodes(node);
				
				textNodes.forEach(textNode => {
					if (textNode.textContent && !textNode.textContent.includes('₹')) {
						const newText = textNode.textContent.replace(pricePattern, (match) => {
							return '₹' + match;
						});
						
						if (newText !== textNode.textContent) {
							textNode.textContent = newText;
						}
					}
				});
			}
		}

		// Function to run all conversions
		function runAllConversions() {
			convertToRupeeCurrency();
			changePoweredByText();
		}

		// Run immediately if DOM is ready
		if (document.readyState === 'loading') {
			$(document).ready(runAllConversions);
		} else {
			runAllConversions();
		}

		// Also run after a short delay to catch any late-loading content
		setTimeout(runAllConversions, 1000);

		// Handle any dynamically loaded content
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach(function(node) {
						if (node.nodeType === 1) { // Element node
							convertNodeToRupee(node);
							// Also check for powered by text in new content
							if (node.querySelector && node.querySelector('.poweredby')) {
								changePoweredByText();
							}
						}
					});
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		console.log('Currency conversion and text replacement completed!');
	})();
});



    // Function to add ₹ symbol before prices and replace other currency symbols
    function convertToRupeeCurrency() {
       
        // Change "Powered by That's No Moon" to "Powered by DB Square Technology"
        changePoweredByText();
    }

    // Function to change the "Powered by" text
    function changePoweredByText() {
        console.log('Changing "Powered by" text...');
        
        // Find the powered by element
        const poweredByElement = document.querySelector('.poweredby');
        if (poweredByElement) {
            // Update the text content
            poweredByElement.innerHTML = '<span>Powered by </span><a href="../madebytnm.com/index.html" target="_blank"> DB Square Technology</a>';
            console.log('Successfully changed "Powered by" text to "DB Square Technology"');
        } else {
            console.log('Powered by element not found');
        }
        
        // Also search for any other instances of this text in the entire document
        const allTextNodes = getTextNodes(document.body);
        allTextNodes.forEach(node => {
            if (node.textContent && node.textContent.includes("That's No Moon")) {
                node.textContent = node.textContent.replace("That's No Moon", "DB Square Technology");
                console.log('Found and replaced additional instance of "That\'s No Moon"');
            }
        });
    }

    // Helper function to get all text nodes
    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    }

    // Helper function to convert a specific node
    function convertNodeToRupee(node) {
        if (node.nodeType === 1) { // Element node
            const pricePattern = /\b(\d{4,}(?:,\d{3})*(?:\.\d{2})?)\b/g;
            const textNodes = getTextNodes(node);
            
            textNodes.forEach(textNode => {
                if (textNode.textContent && !textNode.textContent.includes('₹')) {
                    const newText = textNode.textContent.replace(pricePattern, (match) => {
                        return '₹' + match;
                    });
                    
                    if (newText !== textNode.textContent) {
                        textNode.textContent = newText;
                    }
                }
            });
        }
    }

    // Run the conversion when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        convertToRupeeCurrency();
    });

    // Also run it immediately in case DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', convertToRupeeCurrency);
    } else {
        convertToRupeeCurrency();
    }



// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					//$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					$('#notification').html('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						
						//$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
						$('#cart-total').html(json['total']);
					}, 100);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart-total').html(json['total']);
					//$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				
				setTimeout(function () {
					$('#cart-total').html(json['total']);
					//$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}

				if (getURLVar('route') == 'account/build') {
					location = 'index.php?route=account/build';
				}
				//location.reload()
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart-total').html(json['total']);
					//$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#compare-total').html(json['total']);

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
})(window.jQuery);
