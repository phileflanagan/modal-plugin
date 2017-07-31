(function() {
	// Constructor
	window.Modal = function Modal(options) {
		// In case they forgot 'new'
		if (!(this instanceof Modal)) {
			return new Modal(options);
		}

		// Global Element Refs
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;

		// Determine Transition Event
		this.transitionEnd = whichTransitionEvent();

		// Default Options
		var defaults = {
			classNames: ['pf-modal'],
			closeBtn: true,
			title: 'pf-modal',
			color: 'cornflowerblue',
			content: '',
			maxWidth: 600,
			minWidth: 300,
			overlay: true
		};

		// Override Default Options
		if (options && typeof options === 'object') {
			this.options = extendDefaults(defaults, options);
		} else {
			this.options = defaults;
		}
	};

	//Public Methods
	Modal.prototype.open = function() {
		_buildModal.call(this);
		_initEvents.call(this);

		//Trick to get DOM to recognize modal
		window.getComputedStyle(this.modal).height;

		this.modal.classList.add('pf-modal-open');

		if (this.options.overlay) {
			this.overlay.classList.add('pf-modal-open');
		}

		if (this.modal.offsetHeight > window.innerHeight) {
			this.modal.classList.add('pf-modal-anchored');
		}
	};

	Modal.prototype.close = function() {
		var self = this;
		this.modal.classList.remove('pf-modal-open');
		this.modal.addEventListener(
			this.transitionEnd,
			function(e) {
				if (e.propertyName === 'opacity') {
					this.modal.parentNode.removeChild(this.modal);
				}
			}.bind(this)
		);

		if (this.options.overlay) {
			this.overlay.classList.remove('pf-modal-open');
			this.overlay.addEventListener(
				this.transitionEnd,
				function(e) {
					if (e.propertyName === 'opacity') {
						this.overlay.parentNode.removeChild(this.overlay);
					}
				}.bind(this)
			);
		}
	};

	// Utility Methods
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property))
				source[property] = properties[property];
		}
		return source;
	}

	function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var transitions = {
			transition: 'transitionend',
			OTransition: 'oTransitionEnd',
			MozTransition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd'
		};
		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}

	// Private Methods
	function _buildModal() {
		var title, content, contentHolder, classNames, fragment;

		content = _getContent(this.options.content);
		classNames = _getClassNames(this.options.classNames);

		fragment = document.createDocumentFragment();

		this.modal = document.createElement('div');
		this.modal.style.minWidth = this.options.minWidth + 'px';
		this.modal.style.maxWidth = this.options.maxWidth + 'px';
		for (var i = 0; i < classNames.length; i++) {
			this.modal.classList.add(classNames[i]);
		}

		if (this.options.closeBtn) {
			this.closeBtn = document.createElement('button');
			this.closeBtn.className = 'pf-modal-close-btn';
			this.closeBtn.innerHTML = '×';
			this.modal.appendChild(this.closeBtn);
		}

		if (this.options.overlay) {
			this.overlay = document.createElement('div');
			this.overlay.className = 'pf-modal-overlay ';
			fragment.appendChild(this.overlay);
		}

		title = document.createElement('div');
		title.classList.add('pf-modal-title-bar');
		title.style.backgroundColor = this.options.color;
		title.textContent = this.options.title;
		this.modal.appendChild(title);

		contentHolder = document.createElement('div');
		contentHolder.classList.add('pf-modal-content');
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		fragment.appendChild(this.modal);
		document.body.appendChild(fragment);
	}

	function _getContent(content) {
		try {
			if (typeof content === 'string') {
				return content;
			} else if (content instanceof HTMLElement) {
				return content.innerHTML;
			} else {
				throw new TypeError('Cannot parse content: input was ' + content);
			}
		} catch (err) {
			console.error(err);
		}

		return '';
	}

	function _getClassNames(classNames) {
		var names = ['pf-modal'];
		if (classNames.length === 1 && classNames[0] === names[0]) {
			return names;
		}

		try {
			if (typeof classNames === 'string') {
				names.push(classNames);
			} else if (classNames instanceof Array) {
				for (var i = 0; i < classNames.length; i++) {
					names.push(classNames[i]);
				}
			} else {
				throw new TypeError('Cannot parse class names: input was ' + classNames);
			}
		} catch (err) {
			console.error(err);
		}

		return names;
	}

	function _initEvents() {
		if (this.closeBtn) {
			this.closeBtn.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}
})();
