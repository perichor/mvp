"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

define(["./core", "./var/document", "./var/rcssNum", "./var/rnothtmlwhite", "./css/var/cssExpand", "./css/var/isHiddenWithinTree", "./css/var/swap", "./css/adjustCSS", "./data/var/dataPriv", "./css/showHide", "./core/init", "./queue", "./deferred", "./traversing", "./manipulation", "./css", "./effects/Tween"], function (jQuery, document, rcssNum, rnothtmlwhite, cssExpand, isHiddenWithinTree, swap, adjustCSS, dataPriv, showHide) {

	"use strict";

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function raf() {
		if (timerId) {
			window.requestAnimationFrame(raf);
			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off or if document is hidden
		if (jQuery.fx.off || document.hidden) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.requestAnimationFrame ? window.requestAnimationFrame(raf) : window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		if (window.cancelAnimationFrame) {
			window.cancelAnimationFrame(timerId);
		} else {
			window.clearInterval(timerId);
		}

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	return jQuery;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvanF1ZXJ5L3NyYy9lZmZlY3RzLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImpRdWVyeSIsImRvY3VtZW50IiwicmNzc051bSIsInJub3RodG1sd2hpdGUiLCJjc3NFeHBhbmQiLCJpc0hpZGRlbldpdGhpblRyZWUiLCJzd2FwIiwiYWRqdXN0Q1NTIiwiZGF0YVByaXYiLCJzaG93SGlkZSIsImZ4Tm93IiwidGltZXJJZCIsInJmeHR5cGVzIiwicnJ1biIsInJhZiIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZ4IiwidGljayIsImNyZWF0ZUZ4Tm93Iiwic2V0VGltZW91dCIsInVuZGVmaW5lZCIsIm5vdyIsImdlbkZ4IiwidHlwZSIsImluY2x1ZGVXaWR0aCIsIndoaWNoIiwiaSIsImF0dHJzIiwiaGVpZ2h0Iiwib3BhY2l0eSIsIndpZHRoIiwiY3JlYXRlVHdlZW4iLCJ2YWx1ZSIsInByb3AiLCJhbmltYXRpb24iLCJ0d2VlbiIsImNvbGxlY3Rpb24iLCJBbmltYXRpb24iLCJ0d2VlbmVycyIsImNvbmNhdCIsImluZGV4IiwibGVuZ3RoIiwiY2FsbCIsImRlZmF1bHRQcmVmaWx0ZXIiLCJlbGVtIiwicHJvcHMiLCJvcHRzIiwidG9nZ2xlIiwiaG9va3MiLCJvbGRmaXJlIiwicHJvcFR3ZWVuIiwicmVzdG9yZURpc3BsYXkiLCJkaXNwbGF5IiwiaXNCb3giLCJhbmltIiwib3JpZyIsInN0eWxlIiwiaGlkZGVuIiwibm9kZVR5cGUiLCJkYXRhU2hvdyIsImdldCIsInF1ZXVlIiwiX3F1ZXVlSG9va3MiLCJ1bnF1ZXVlZCIsImVtcHR5IiwiZmlyZSIsImFsd2F5cyIsInRlc3QiLCJpc0VtcHR5T2JqZWN0Iiwib3ZlcmZsb3ciLCJvdmVyZmxvd1giLCJvdmVyZmxvd1kiLCJjc3MiLCJkb25lIiwiYWNjZXNzIiwicmVtb3ZlIiwic3RhcnQiLCJlbmQiLCJwcm9wRmlsdGVyIiwic3BlY2lhbEVhc2luZyIsIm5hbWUiLCJlYXNpbmciLCJjYW1lbENhc2UiLCJpc0FycmF5IiwiY3NzSG9va3MiLCJleHBhbmQiLCJwcm9wZXJ0aWVzIiwib3B0aW9ucyIsInJlc3VsdCIsInN0b3BwZWQiLCJwcmVmaWx0ZXJzIiwiZGVmZXJyZWQiLCJEZWZlcnJlZCIsImN1cnJlbnRUaW1lIiwicmVtYWluaW5nIiwiTWF0aCIsIm1heCIsInN0YXJ0VGltZSIsImR1cmF0aW9uIiwidGVtcCIsInBlcmNlbnQiLCJ0d2VlbnMiLCJydW4iLCJub3RpZnlXaXRoIiwicmVzb2x2ZVdpdGgiLCJwcm9taXNlIiwiZXh0ZW5kIiwiX2RlZmF1bHQiLCJvcmlnaW5hbFByb3BlcnRpZXMiLCJvcmlnaW5hbE9wdGlvbnMiLCJUd2VlbiIsInB1c2giLCJzdG9wIiwiZ290b0VuZCIsInJlamVjdFdpdGgiLCJpc0Z1bmN0aW9uIiwicHJveHkiLCJtYXAiLCJ0aW1lciIsInByb2dyZXNzIiwiY29tcGxldGUiLCJmYWlsIiwiZXhlYyIsInR3ZWVuZXIiLCJjYWxsYmFjayIsIm1hdGNoIiwidW5zaGlmdCIsInByZWZpbHRlciIsInByZXBlbmQiLCJzcGVlZCIsImZuIiwib3B0Iiwib2ZmIiwic3BlZWRzIiwib2xkIiwiZGVxdWV1ZSIsImZhZGVUbyIsInRvIiwiZmlsdGVyIiwic2hvdyIsImFuaW1hdGUiLCJvcHRhbGwiLCJkb0FuaW1hdGlvbiIsImZpbmlzaCIsImVhY2giLCJjbGVhclF1ZXVlIiwic3RvcFF1ZXVlIiwidGltZXJzIiwiZGF0YSIsInNwbGljZSIsImNzc0ZuIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJzbGlkZURvd24iLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJmYWRlSW4iLCJmYWRlT3V0IiwiZmFkZVRvZ2dsZSIsInBvcCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImNsZWFySW50ZXJ2YWwiLCJzbG93IiwiZmFzdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBQSxPQUFRLENBQ1AsUUFE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QVYsR0FBbUI7QUFDbEIrQixRQUFNLEdBRFk7QUFFbEJDLFFBQU0sR0FGWTs7QUFJbEI7QUFDQTFELFlBQVU7QUFMUSxFQUFuQjs7QUFRQSxRQUFPNUcsTUFBUDtBQUNDLENBcHJCRCIsImZpbGUiOiJlZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKCBbXG5cdFwiLi9jb3JlXCIsXG5cdFwiLi92YXIvZG9jdW1lbnRcIixcblx0XCIuL3Zhci9yY3NzTnVtXCIsXG5cdFwiLi92YXIvcm5vdGh0bWx3aGl0ZVwiLFxuXHRcIi4vY3NzL3Zhci9jc3NFeHBhbmRcIixcblx0XCIuL2Nzcy92YXIvaXNIaWRkZW5XaXRoaW5UcmVlXCIsXG5cdFwiLi9jc3MvdmFyL3N3YXBcIixcblx0XCIuL2Nzcy9hZGp1c3RDU1NcIixcblx0XCIuL2RhdGEvdmFyL2RhdGFQcml2XCIsXG5cdFwiLi9jc3Mvc2hvd0hpZGVcIixcblxuXHRcIi4vY29yZS9pbml0XCIsXG5cdFwiLi9xdWV1ZVwiLFxuXHRcIi4vZGVmZXJyZWRcIixcblx0XCIuL3RyYXZlcnNpbmdcIixcblx0XCIuL21hbmlwdWxhdGlvblwiLFxuXHRcIi4vY3NzXCIsXG5cdFwiLi9lZmZlY3RzL1R3ZWVuXCJcbl0sIGZ1bmN0aW9uKCBqUXVlcnksIGRvY3VtZW50LCByY3NzTnVtLCBybm90aHRtbHdoaXRlLCBjc3NFeHBhbmQsIGlzSGlkZGVuV2l0aGluVHJlZSwgc3dhcCxcblx0YWRqdXN0Q1NTLCBkYXRhUHJpdiwgc2hvd0hpZGUgKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcblx0ZnhOb3csIHRpbWVySWQsXG5cdHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuXHRycnVuID0gL3F1ZXVlSG9va3MkLztcblxuZnVuY3Rpb24gcmFmKCkge1xuXHRpZiAoIHRpbWVySWQgKSB7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggcmFmICk7XG5cdFx0alF1ZXJ5LmZ4LnRpY2soKTtcblx0fVxufVxuXG4vLyBBbmltYXRpb25zIGNyZWF0ZWQgc3luY2hyb25vdXNseSB3aWxsIHJ1biBzeW5jaHJvbm91c2x5XG5mdW5jdGlvbiBjcmVhdGVGeE5vdygpIHtcblx0d2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdGZ4Tm93ID0gdW5kZWZpbmVkO1xuXHR9ICk7XG5cdHJldHVybiAoIGZ4Tm93ID0galF1ZXJ5Lm5vdygpICk7XG59XG5cbi8vIEdlbmVyYXRlIHBhcmFtZXRlcnMgdG8gY3JlYXRlIGEgc3RhbmRhcmQgYW5pbWF0aW9uXG5mdW5jdGlvbiBnZW5GeCggdHlwZSwgaW5jbHVkZVdpZHRoICkge1xuXHR2YXIgd2hpY2gsXG5cdFx0aSA9IDAsXG5cdFx0YXR0cnMgPSB7IGhlaWdodDogdHlwZSB9O1xuXG5cdC8vIElmIHdlIGluY2x1ZGUgd2lkdGgsIHN0ZXAgdmFsdWUgaXMgMSB0byBkbyBhbGwgY3NzRXhwYW5kIHZhbHVlcyxcblx0Ly8gb3RoZXJ3aXNlIHN0ZXAgdmFsdWUgaXMgMiB0byBza2lwIG92ZXIgTGVmdCBhbmQgUmlnaHRcblx0aW5jbHVkZVdpZHRoID0gaW5jbHVkZVdpZHRoID8gMSA6IDA7XG5cdGZvciAoIDsgaSA8IDQ7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcblx0XHR3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuXHRcdGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuXHR9XG5cblx0aWYgKCBpbmNsdWRlV2lkdGggKSB7XG5cdFx0YXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcblx0fVxuXG5cdHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHdlZW4oIHZhbHVlLCBwcm9wLCBhbmltYXRpb24gKSB7XG5cdHZhciB0d2Vlbixcblx0XHRjb2xsZWN0aW9uID0gKCBBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSB8fCBbXSApLmNvbmNhdCggQW5pbWF0aW9uLnR3ZWVuZXJzWyBcIipcIiBdICksXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGlmICggKCB0d2VlbiA9IGNvbGxlY3Rpb25bIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBwcm9wLCB2YWx1ZSApICkgKSB7XG5cblx0XHRcdC8vIFdlJ3JlIGRvbmUgd2l0aCB0aGlzIHByb3BlcnR5XG5cdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRQcmVmaWx0ZXIoIGVsZW0sIHByb3BzLCBvcHRzICkge1xuXHR2YXIgcHJvcCwgdmFsdWUsIHRvZ2dsZSwgaG9va3MsIG9sZGZpcmUsIHByb3BUd2VlbiwgcmVzdG9yZURpc3BsYXksIGRpc3BsYXksXG5cdFx0aXNCb3ggPSBcIndpZHRoXCIgaW4gcHJvcHMgfHwgXCJoZWlnaHRcIiBpbiBwcm9wcyxcblx0XHRhbmltID0gdGhpcyxcblx0XHRvcmlnID0ge30sXG5cdFx0c3R5bGUgPSBlbGVtLnN0eWxlLFxuXHRcdGhpZGRlbiA9IGVsZW0ubm9kZVR5cGUgJiYgaXNIaWRkZW5XaXRoaW5UcmVlKCBlbGVtICksXG5cdFx0ZGF0YVNob3cgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwiZnhzaG93XCIgKTtcblxuXHQvLyBRdWV1ZS1za2lwcGluZyBhbmltYXRpb25zIGhpamFjayB0aGUgZnggaG9va3Ncblx0aWYgKCAhb3B0cy5xdWV1ZSApIHtcblx0XHRob29rcyA9IGpRdWVyeS5fcXVldWVIb29rcyggZWxlbSwgXCJmeFwiICk7XG5cdFx0aWYgKCBob29rcy51bnF1ZXVlZCA9PSBudWxsICkge1xuXHRcdFx0aG9va3MudW5xdWV1ZWQgPSAwO1xuXHRcdFx0b2xkZmlyZSA9IGhvb2tzLmVtcHR5LmZpcmU7XG5cdFx0XHRob29rcy5lbXB0eS5maXJlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggIWhvb2tzLnVucXVldWVkICkge1xuXHRcdFx0XHRcdG9sZGZpcmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aG9va3MudW5xdWV1ZWQrKztcblxuXHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRW5zdXJlIHRoZSBjb21wbGV0ZSBoYW5kbGVyIGlzIGNhbGxlZCBiZWZvcmUgdGhpcyBjb21wbGV0ZXNcblx0XHRcdGFuaW0uYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aG9va3MudW5xdWV1ZWQtLTtcblx0XHRcdFx0aWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IHNob3cvaGlkZSBhbmltYXRpb25zXG5cdGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG5cdFx0dmFsdWUgPSBwcm9wc1sgcHJvcCBdO1xuXHRcdGlmICggcmZ4dHlwZXMudGVzdCggdmFsdWUgKSApIHtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgcHJvcCBdO1xuXHRcdFx0dG9nZ2xlID0gdG9nZ2xlIHx8IHZhbHVlID09PSBcInRvZ2dsZVwiO1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cblx0XHRcdFx0Ly8gUHJldGVuZCB0byBiZSBoaWRkZW4gaWYgdGhpcyBpcyBhIFwic2hvd1wiIGFuZFxuXHRcdFx0XHQvLyB0aGVyZSBpcyBzdGlsbCBkYXRhIGZyb20gYSBzdG9wcGVkIHNob3cvaGlkZVxuXHRcdFx0XHRpZiAoIHZhbHVlID09PSBcInNob3dcIiAmJiBkYXRhU2hvdyAmJiBkYXRhU2hvd1sgcHJvcCBdICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0aGlkZGVuID0gdHJ1ZTtcblxuXHRcdFx0XHQvLyBJZ25vcmUgYWxsIG90aGVyIG5vLW9wIHNob3cvaGlkZSBkYXRhXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG9yaWdbIHByb3AgXSA9IGRhdGFTaG93ICYmIGRhdGFTaG93WyBwcm9wIF0gfHwgalF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQmFpbCBvdXQgaWYgdGhpcyBpcyBhIG5vLW9wIGxpa2UgLmhpZGUoKS5oaWRlKClcblx0cHJvcFR3ZWVuID0gIWpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wcyApO1xuXHRpZiAoICFwcm9wVHdlZW4gJiYgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9yaWcgKSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBSZXN0cmljdCBcIm92ZXJmbG93XCIgYW5kIFwiZGlzcGxheVwiIHN0eWxlcyBkdXJpbmcgYm94IGFuaW1hdGlvbnNcblx0aWYgKCBpc0JveCAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEsIEVkZ2UgMTIgLSAxM1xuXHRcdC8vIFJlY29yZCBhbGwgMyBvdmVyZmxvdyBhdHRyaWJ1dGVzIGJlY2F1c2UgSUUgZG9lcyBub3QgaW5mZXIgdGhlIHNob3J0aGFuZFxuXHRcdC8vIGZyb20gaWRlbnRpY2FsbHktdmFsdWVkIG92ZXJmbG93WCBhbmQgb3ZlcmZsb3dZXG5cdFx0b3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cblx0XHQvLyBJZGVudGlmeSBhIGRpc3BsYXkgdHlwZSwgcHJlZmVycmluZyBvbGQgc2hvdy9oaWRlIGRhdGEgb3ZlciB0aGUgQ1NTIGNhc2NhZGVcblx0XHRyZXN0b3JlRGlzcGxheSA9IGRhdGFTaG93ICYmIGRhdGFTaG93LmRpc3BsYXk7XG5cdFx0aWYgKCByZXN0b3JlRGlzcGxheSA9PSBudWxsICkge1xuXHRcdFx0cmVzdG9yZURpc3BsYXkgPSBkYXRhUHJpdi5nZXQoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0fVxuXHRcdGRpc3BsYXkgPSBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXHRcdGlmICggZGlzcGxheSA9PT0gXCJub25lXCIgKSB7XG5cdFx0XHRpZiAoIHJlc3RvcmVEaXNwbGF5ICkge1xuXHRcdFx0XHRkaXNwbGF5ID0gcmVzdG9yZURpc3BsYXk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIEdldCBub25lbXB0eSB2YWx1ZShzKSBieSB0ZW1wb3JhcmlseSBmb3JjaW5nIHZpc2liaWxpdHlcblx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdLCB0cnVlICk7XG5cdFx0XHRcdHJlc3RvcmVEaXNwbGF5ID0gZWxlbS5zdHlsZS5kaXNwbGF5IHx8IHJlc3RvcmVEaXNwbGF5O1xuXHRcdFx0XHRkaXNwbGF5ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKTtcblx0XHRcdFx0c2hvd0hpZGUoIFsgZWxlbSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQW5pbWF0ZSBpbmxpbmUgZWxlbWVudHMgYXMgaW5saW5lLWJsb2NrXG5cdFx0aWYgKCBkaXNwbGF5ID09PSBcImlubGluZVwiIHx8IGRpc3BsYXkgPT09IFwiaW5saW5lLWJsb2NrXCIgJiYgcmVzdG9yZURpc3BsYXkgIT0gbnVsbCApIHtcblx0XHRcdGlmICggalF1ZXJ5LmNzcyggZWxlbSwgXCJmbG9hdFwiICkgPT09IFwibm9uZVwiICkge1xuXG5cdFx0XHRcdC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIGRpc3BsYXkgdmFsdWUgYXQgdGhlIGVuZCBvZiBwdXJlIHNob3cvaGlkZSBhbmltYXRpb25zXG5cdFx0XHRcdGlmICggIXByb3BUd2VlbiApIHtcblx0XHRcdFx0XHRhbmltLmRvbmUoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0c3R5bGUuZGlzcGxheSA9IHJlc3RvcmVEaXNwbGF5O1xuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRpZiAoIHJlc3RvcmVEaXNwbGF5ID09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5ID0gc3R5bGUuZGlzcGxheTtcblx0XHRcdFx0XHRcdHJlc3RvcmVEaXNwbGF5ID0gZGlzcGxheSA9PT0gXCJub25lXCIgPyBcIlwiIDogZGlzcGxheTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBvcHRzLm92ZXJmbG93ICkge1xuXHRcdHN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0XHRhbmltLmFsd2F5cyggZnVuY3Rpb24oKSB7XG5cdFx0XHRzdHlsZS5vdmVyZmxvdyA9IG9wdHMub3ZlcmZsb3dbIDAgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WCA9IG9wdHMub3ZlcmZsb3dbIDEgXTtcblx0XHRcdHN0eWxlLm92ZXJmbG93WSA9IG9wdHMub3ZlcmZsb3dbIDIgXTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBJbXBsZW1lbnQgc2hvdy9oaWRlIGFuaW1hdGlvbnNcblx0cHJvcFR3ZWVuID0gZmFsc2U7XG5cdGZvciAoIHByb3AgaW4gb3JpZyApIHtcblxuXHRcdC8vIEdlbmVyYWwgc2hvdy9oaWRlIHNldHVwIGZvciB0aGlzIGVsZW1lbnQgYW5pbWF0aW9uXG5cdFx0aWYgKCAhcHJvcFR3ZWVuICkge1xuXHRcdFx0aWYgKCBkYXRhU2hvdyApIHtcblx0XHRcdFx0aWYgKCBcImhpZGRlblwiIGluIGRhdGFTaG93ICkge1xuXHRcdFx0XHRcdGhpZGRlbiA9IGRhdGFTaG93LmhpZGRlbjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGF0YVNob3cgPSBkYXRhUHJpdi5hY2Nlc3MoIGVsZW0sIFwiZnhzaG93XCIsIHsgZGlzcGxheTogcmVzdG9yZURpc3BsYXkgfSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdG9yZSBoaWRkZW4vdmlzaWJsZSBmb3IgdG9nZ2xlIHNvIGAuc3RvcCgpLnRvZ2dsZSgpYCBcInJldmVyc2VzXCJcblx0XHRcdGlmICggdG9nZ2xlICkge1xuXHRcdFx0XHRkYXRhU2hvdy5oaWRkZW4gPSAhaGlkZGVuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTaG93IGVsZW1lbnRzIGJlZm9yZSBhbmltYXRpbmcgdGhlbVxuXHRcdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cblxuXHRcdFx0YW5pbS5kb25lKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1sb29wLWZ1bmMgKi9cblxuXHRcdFx0XHQvLyBUaGUgZmluYWwgc3RlcCBvZiBhIFwiaGlkZVwiIGFuaW1hdGlvbiBpcyBhY3R1YWxseSBoaWRpbmcgdGhlIGVsZW1lbnRcblx0XHRcdFx0aWYgKCAhaGlkZGVuICkge1xuXHRcdFx0XHRcdHNob3dIaWRlKCBbIGVsZW0gXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJmeHNob3dcIiApO1xuXHRcdFx0XHRmb3IgKCBwcm9wIGluIG9yaWcgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LnN0eWxlKCBlbGVtLCBwcm9wLCBvcmlnWyBwcm9wIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdC8vIFBlci1wcm9wZXJ0eSBzZXR1cFxuXHRcdHByb3BUd2VlbiA9IGNyZWF0ZVR3ZWVuKCBoaWRkZW4gPyBkYXRhU2hvd1sgcHJvcCBdIDogMCwgcHJvcCwgYW5pbSApO1xuXHRcdGlmICggISggcHJvcCBpbiBkYXRhU2hvdyApICkge1xuXHRcdFx0ZGF0YVNob3dbIHByb3AgXSA9IHByb3BUd2Vlbi5zdGFydDtcblx0XHRcdGlmICggaGlkZGVuICkge1xuXHRcdFx0XHRwcm9wVHdlZW4uZW5kID0gcHJvcFR3ZWVuLnN0YXJ0O1xuXHRcdFx0XHRwcm9wVHdlZW4uc3RhcnQgPSAwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBwcm9wRmlsdGVyKCBwcm9wcywgc3BlY2lhbEVhc2luZyApIHtcblx0dmFyIGluZGV4LCBuYW1lLCBlYXNpbmcsIHZhbHVlLCBob29rcztcblxuXHQvLyBjYW1lbENhc2UsIHNwZWNpYWxFYXNpbmcgYW5kIGV4cGFuZCBjc3NIb29rIHBhc3Ncblx0Zm9yICggaW5kZXggaW4gcHJvcHMgKSB7XG5cdFx0bmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIGluZGV4ICk7XG5cdFx0ZWFzaW5nID0gc3BlY2lhbEVhc2luZ1sgbmFtZSBdO1xuXHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG5cdFx0aWYgKCBqUXVlcnkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRcdGVhc2luZyA9IHZhbHVlWyAxIF07XG5cdFx0XHR2YWx1ZSA9IHByb3BzWyBpbmRleCBdID0gdmFsdWVbIDAgXTtcblx0XHR9XG5cblx0XHRpZiAoIGluZGV4ICE9PSBuYW1lICkge1xuXHRcdFx0cHJvcHNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuXHRcdH1cblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF07XG5cdFx0aWYgKCBob29rcyAmJiBcImV4cGFuZFwiIGluIGhvb2tzICkge1xuXHRcdFx0dmFsdWUgPSBob29rcy5leHBhbmQoIHZhbHVlICk7XG5cdFx0XHRkZWxldGUgcHJvcHNbIG5hbWUgXTtcblxuXHRcdFx0Ly8gTm90IHF1aXRlICQuZXh0ZW5kLCB0aGlzIHdvbid0IG92ZXJ3cml0ZSBleGlzdGluZyBrZXlzLlxuXHRcdFx0Ly8gUmV1c2luZyAnaW5kZXgnIGJlY2F1c2Ugd2UgaGF2ZSB0aGUgY29ycmVjdCBcIm5hbWVcIlxuXHRcdFx0Zm9yICggaW5kZXggaW4gdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggISggaW5kZXggaW4gcHJvcHMgKSApIHtcblx0XHRcdFx0XHRwcm9wc1sgaW5kZXggXSA9IHZhbHVlWyBpbmRleCBdO1xuXHRcdFx0XHRcdHNwZWNpYWxFYXNpbmdbIGluZGV4IF0gPSBlYXNpbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3BlY2lhbEVhc2luZ1sgbmFtZSBdID0gZWFzaW5nO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBBbmltYXRpb24oIGVsZW0sIHByb3BlcnRpZXMsIG9wdGlvbnMgKSB7XG5cdHZhciByZXN1bHQsXG5cdFx0c3RvcHBlZCxcblx0XHRpbmRleCA9IDAsXG5cdFx0bGVuZ3RoID0gQW5pbWF0aW9uLnByZWZpbHRlcnMubGVuZ3RoLFxuXHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCkuYWx3YXlzKCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgbWF0Y2ggZWxlbSBpbiB0aGUgOmFuaW1hdGVkIHNlbGVjdG9yXG5cdFx0XHRkZWxldGUgdGljay5lbGVtO1xuXHRcdH0gKSxcblx0XHR0aWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBjdXJyZW50VGltZSA9IGZ4Tm93IHx8IGNyZWF0ZUZ4Tm93KCksXG5cdFx0XHRcdHJlbWFpbmluZyA9IE1hdGgubWF4KCAwLCBhbmltYXRpb24uc3RhcnRUaW1lICsgYW5pbWF0aW9uLmR1cmF0aW9uIC0gY3VycmVudFRpbWUgKSxcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDIuMyBvbmx5XG5cdFx0XHRcdC8vIEFyY2hhaWMgY3Jhc2ggYnVnIHdvbid0IGFsbG93IHVzIHRvIHVzZSBgMSAtICggMC41IHx8IDAgKWAgKCMxMjQ5Nylcblx0XHRcdFx0dGVtcCA9IHJlbWFpbmluZyAvIGFuaW1hdGlvbi5kdXJhdGlvbiB8fCAwLFxuXHRcdFx0XHRwZXJjZW50ID0gMSAtIHRlbXAsXG5cdFx0XHRcdGluZGV4ID0gMCxcblx0XHRcdFx0bGVuZ3RoID0gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGg7XG5cblx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCBwZXJjZW50ICk7XG5cdFx0XHR9XG5cblx0XHRcdGRlZmVycmVkLm5vdGlmeVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBwZXJjZW50LCByZW1haW5pbmcgXSApO1xuXG5cdFx0XHRpZiAoIHBlcmNlbnQgPCAxICYmIGxlbmd0aCApIHtcblx0XHRcdFx0cmV0dXJuIHJlbWFpbmluZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiBdICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGFuaW1hdGlvbiA9IGRlZmVycmVkLnByb21pc2UoIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRwcm9wczogalF1ZXJ5LmV4dGVuZCgge30sIHByb3BlcnRpZXMgKSxcblx0XHRcdG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHtcblx0XHRcdFx0c3BlY2lhbEVhc2luZzoge30sXG5cdFx0XHRcdGVhc2luZzogalF1ZXJ5LmVhc2luZy5fZGVmYXVsdFxuXHRcdFx0fSwgb3B0aW9ucyApLFxuXHRcdFx0b3JpZ2luYWxQcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuXHRcdFx0b3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0c3RhcnRUaW1lOiBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0ZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG5cdFx0XHR0d2VlbnM6IFtdLFxuXHRcdFx0Y3JlYXRlVHdlZW46IGZ1bmN0aW9uKCBwcm9wLCBlbmQgKSB7XG5cdFx0XHRcdHZhciB0d2VlbiA9IGpRdWVyeS5Ud2VlbiggZWxlbSwgYW5pbWF0aW9uLm9wdHMsIHByb3AsIGVuZCxcblx0XHRcdFx0XHRcdGFuaW1hdGlvbi5vcHRzLnNwZWNpYWxFYXNpbmdbIHByb3AgXSB8fCBhbmltYXRpb24ub3B0cy5lYXNpbmcgKTtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVucy5wdXNoKCB0d2VlbiApO1xuXHRcdFx0XHRyZXR1cm4gdHdlZW47XG5cdFx0XHR9LFxuXHRcdFx0c3RvcDogZnVuY3Rpb24oIGdvdG9FbmQgKSB7XG5cdFx0XHRcdHZhciBpbmRleCA9IDAsXG5cblx0XHRcdFx0XHQvLyBJZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcblx0XHRcdFx0XHQvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcblx0XHRcdFx0XHRsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuXHRcdFx0XHRpZiAoIHN0b3BwZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RvcHBlZCA9IHRydWU7XG5cdFx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIDEgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlc29sdmUgd2hlbiB3ZSBwbGF5ZWQgdGhlIGxhc3QgZnJhbWU7IG90aGVyd2lzZSwgcmVqZWN0XG5cdFx0XHRcdGlmICggZ290b0VuZCApIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgMSwgMCBdICk7XG5cdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBlbGVtLCBbIGFuaW1hdGlvbiwgZ290b0VuZCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSApLFxuXHRcdHByb3BzID0gYW5pbWF0aW9uLnByb3BzO1xuXG5cdHByb3BGaWx0ZXIoIHByb3BzLCBhbmltYXRpb24ub3B0cy5zcGVjaWFsRWFzaW5nICk7XG5cblx0Zm9yICggOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyApIHtcblx0XHRyZXN1bHQgPSBBbmltYXRpb24ucHJlZmlsdGVyc1sgaW5kZXggXS5jYWxsKCBhbmltYXRpb24sIGVsZW0sIHByb3BzLCBhbmltYXRpb24ub3B0cyApO1xuXHRcdGlmICggcmVzdWx0ICkge1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggcmVzdWx0LnN0b3AgKSApIHtcblx0XHRcdFx0alF1ZXJ5Ll9xdWV1ZUhvb2tzKCBhbmltYXRpb24uZWxlbSwgYW5pbWF0aW9uLm9wdHMucXVldWUgKS5zdG9wID1cblx0XHRcdFx0XHRqUXVlcnkucHJveHkoIHJlc3VsdC5zdG9wLCByZXN1bHQgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0alF1ZXJ5Lm1hcCggcHJvcHMsIGNyZWF0ZVR3ZWVuLCBhbmltYXRpb24gKTtcblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhbmltYXRpb24ub3B0cy5zdGFydCApICkge1xuXHRcdGFuaW1hdGlvbi5vcHRzLnN0YXJ0LmNhbGwoIGVsZW0sIGFuaW1hdGlvbiApO1xuXHR9XG5cblx0alF1ZXJ5LmZ4LnRpbWVyKFxuXHRcdGpRdWVyeS5leHRlbmQoIHRpY2ssIHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRhbmltOiBhbmltYXRpb24sXG5cdFx0XHRxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWVcblx0XHR9IClcblx0KTtcblxuXHQvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuXHRyZXR1cm4gYW5pbWF0aW9uLnByb2dyZXNzKCBhbmltYXRpb24ub3B0cy5wcm9ncmVzcyApXG5cdFx0LmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcblx0XHQuZmFpbCggYW5pbWF0aW9uLm9wdHMuZmFpbCApXG5cdFx0LmFsd2F5cyggYW5pbWF0aW9uLm9wdHMuYWx3YXlzICk7XG59XG5cbmpRdWVyeS5BbmltYXRpb24gPSBqUXVlcnkuZXh0ZW5kKCBBbmltYXRpb24sIHtcblxuXHR0d2VlbmVyczoge1xuXHRcdFwiKlwiOiBbIGZ1bmN0aW9uKCBwcm9wLCB2YWx1ZSApIHtcblx0XHRcdHZhciB0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICk7XG5cdFx0XHRhZGp1c3RDU1MoIHR3ZWVuLmVsZW0sIHByb3AsIHJjc3NOdW0uZXhlYyggdmFsdWUgKSwgdHdlZW4gKTtcblx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHR9IF1cblx0fSxcblxuXHR0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHByb3BzICkgKSB7XG5cdFx0XHRjYWxsYmFjayA9IHByb3BzO1xuXHRcdFx0cHJvcHMgPSBbIFwiKlwiIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb3BzID0gcHJvcHMubWF0Y2goIHJub3RodG1sd2hpdGUgKTtcblx0XHR9XG5cblx0XHR2YXIgcHJvcCxcblx0XHRcdGluZGV4ID0gMCxcblx0XHRcdGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuXHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRwcm9wID0gcHJvcHNbIGluZGV4IF07XG5cdFx0XHRBbmltYXRpb24udHdlZW5lcnNbIHByb3AgXSA9IEFuaW1hdGlvbi50d2VlbmVyc1sgcHJvcCBdIHx8IFtdO1xuXHRcdFx0QW5pbWF0aW9uLnR3ZWVuZXJzWyBwcm9wIF0udW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH0sXG5cblx0cHJlZmlsdGVyczogWyBkZWZhdWx0UHJlZmlsdGVyIF0sXG5cblx0cHJlZmlsdGVyOiBmdW5jdGlvbiggY2FsbGJhY2ssIHByZXBlbmQgKSB7XG5cdFx0aWYgKCBwcmVwZW5kICkge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMudW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0QW5pbWF0aW9uLnByZWZpbHRlcnMucHVzaCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH1cbn0gKTtcblxualF1ZXJ5LnNwZWVkID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGZuICkge1xuXHR2YXIgb3B0ID0gc3BlZWQgJiYgdHlwZW9mIHNwZWVkID09PSBcIm9iamVjdFwiID8galF1ZXJ5LmV4dGVuZCgge30sIHNwZWVkICkgOiB7XG5cdFx0Y29tcGxldGU6IGZuIHx8ICFmbiAmJiBlYXNpbmcgfHxcblx0XHRcdGpRdWVyeS5pc0Z1bmN0aW9uKCBzcGVlZCApICYmIHNwZWVkLFxuXHRcdGR1cmF0aW9uOiBzcGVlZCxcblx0XHRlYXNpbmc6IGZuICYmIGVhc2luZyB8fCBlYXNpbmcgJiYgIWpRdWVyeS5pc0Z1bmN0aW9uKCBlYXNpbmcgKSAmJiBlYXNpbmdcblx0fTtcblxuXHQvLyBHbyB0byB0aGUgZW5kIHN0YXRlIGlmIGZ4IGFyZSBvZmYgb3IgaWYgZG9jdW1lbnQgaXMgaGlkZGVuXG5cdGlmICggalF1ZXJ5LmZ4Lm9mZiB8fCBkb2N1bWVudC5oaWRkZW4gKSB7XG5cdFx0b3B0LmR1cmF0aW9uID0gMDtcblxuXHR9IGVsc2Uge1xuXHRcdGlmICggdHlwZW9mIG9wdC5kdXJhdGlvbiAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRcdGlmICggb3B0LmR1cmF0aW9uIGluIGpRdWVyeS5meC5zcGVlZHMgKSB7XG5cdFx0XHRcdG9wdC5kdXJhdGlvbiA9IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHQuZHVyYXRpb24gPSBqUXVlcnkuZnguc3BlZWRzLl9kZWZhdWx0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIE5vcm1hbGl6ZSBvcHQucXVldWUgLSB0cnVlL3VuZGVmaW5lZC9udWxsIC0+IFwiZnhcIlxuXHRpZiAoIG9wdC5xdWV1ZSA9PSBudWxsIHx8IG9wdC5xdWV1ZSA9PT0gdHJ1ZSApIHtcblx0XHRvcHQucXVldWUgPSBcImZ4XCI7XG5cdH1cblxuXHQvLyBRdWV1ZWluZ1xuXHRvcHQub2xkID0gb3B0LmNvbXBsZXRlO1xuXG5cdG9wdC5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIG9wdC5vbGQgKSApIHtcblx0XHRcdG9wdC5vbGQuY2FsbCggdGhpcyApO1xuXHRcdH1cblxuXHRcdGlmICggb3B0LnF1ZXVlICkge1xuXHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIG9wdC5xdWV1ZSApO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gb3B0O1xufTtcblxualF1ZXJ5LmZuLmV4dGVuZCgge1xuXHRmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBTaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuV2l0aGluVHJlZSApLmNzcyggXCJvcGFjaXR5XCIsIDAgKS5zaG93KClcblxuXHRcdFx0Ly8gQW5pbWF0ZSB0byB0aGUgdmFsdWUgc3BlY2lmaWVkXG5cdFx0XHQuZW5kKCkuYW5pbWF0ZSggeyBvcGFjaXR5OiB0byB9LCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9LFxuXHRhbmltYXRlOiBmdW5jdGlvbiggcHJvcCwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0dmFyIGVtcHR5ID0galF1ZXJ5LmlzRW1wdHlPYmplY3QoIHByb3AgKSxcblx0XHRcdG9wdGFsbCA9IGpRdWVyeS5zcGVlZCggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSxcblx0XHRcdGRvQW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0Ly8gT3BlcmF0ZSBvbiBhIGNvcHkgb2YgcHJvcCBzbyBwZXItcHJvcGVydHkgZWFzaW5nIHdvbid0IGJlIGxvc3Rcblx0XHRcdFx0dmFyIGFuaW0gPSBBbmltYXRpb24oIHRoaXMsIGpRdWVyeS5leHRlbmQoIHt9LCBwcm9wICksIG9wdGFsbCApO1xuXG5cdFx0XHRcdC8vIEVtcHR5IGFuaW1hdGlvbnMsIG9yIGZpbmlzaGluZyByZXNvbHZlcyBpbW1lZGlhdGVseVxuXHRcdFx0XHRpZiAoIGVtcHR5IHx8IGRhdGFQcml2LmdldCggdGhpcywgXCJmaW5pc2hcIiApICkge1xuXHRcdFx0XHRcdGFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0ZG9BbmltYXRpb24uZmluaXNoID0gZG9BbmltYXRpb247XG5cblx0XHRyZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG5cdFx0XHR0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuXHRcdFx0dGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcblx0XHR2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuXHRcdFx0dmFyIHN0b3AgPSBob29rcy5zdG9wO1xuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRzdG9wKCBnb3RvRW5kICk7XG5cdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRnb3RvRW5kID0gY2xlYXJRdWV1ZTtcblx0XHRcdGNsZWFyUXVldWUgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGVxdWV1ZSA9IHRydWUsXG5cdFx0XHRcdGluZGV4ID0gdHlwZSAhPSBudWxsICYmIHR5cGUgKyBcInF1ZXVlSG9va3NcIixcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApO1xuXG5cdFx0XHRpZiAoIGluZGV4ICkge1xuXHRcdFx0XHRpZiAoIGRhdGFbIGluZGV4IF0gJiYgZGF0YVsgaW5kZXggXS5zdG9wICkge1xuXHRcdFx0XHRcdHN0b3BRdWV1ZSggZGF0YVsgaW5kZXggXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKCBpbmRleCBpbiBkYXRhICkge1xuXHRcdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgJiYgcnJ1bi50ZXN0KCBpbmRleCApICkge1xuXHRcdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIGluZGV4ID0gdGltZXJzLmxlbmd0aDsgaW5kZXgtLTsgKSB7XG5cdFx0XHRcdGlmICggdGltZXJzWyBpbmRleCBdLmVsZW0gPT09IHRoaXMgJiZcblx0XHRcdFx0XHQoIHR5cGUgPT0gbnVsbCB8fCB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSApIHtcblxuXHRcdFx0XHRcdHRpbWVyc1sgaW5kZXggXS5hbmltLnN0b3AoIGdvdG9FbmQgKTtcblx0XHRcdFx0XHRkZXF1ZXVlID0gZmFsc2U7XG5cdFx0XHRcdFx0dGltZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTdGFydCB0aGUgbmV4dCBpbiB0aGUgcXVldWUgaWYgdGhlIGxhc3Qgc3RlcCB3YXNuJ3QgZm9yY2VkLlxuXHRcdFx0Ly8gVGltZXJzIGN1cnJlbnRseSB3aWxsIGNhbGwgdGhlaXIgY29tcGxldGUgY2FsbGJhY2tzLCB3aGljaFxuXHRcdFx0Ly8gd2lsbCBkZXF1ZXVlIGJ1dCBvbmx5IGlmIHRoZXkgd2VyZSBnb3RvRW5kLlxuXHRcdFx0aWYgKCBkZXF1ZXVlIHx8ICFnb3RvRW5kICkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblx0ZmluaXNoOiBmdW5jdGlvbiggdHlwZSApIHtcblx0XHRpZiAoIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbmRleCxcblx0XHRcdFx0ZGF0YSA9IGRhdGFQcml2LmdldCggdGhpcyApLFxuXHRcdFx0XHRxdWV1ZSA9IGRhdGFbIHR5cGUgKyBcInF1ZXVlXCIgXSxcblx0XHRcdFx0aG9va3MgPSBkYXRhWyB0eXBlICsgXCJxdWV1ZUhvb2tzXCIgXSxcblx0XHRcdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRcdFx0bGVuZ3RoID0gcXVldWUgPyBxdWV1ZS5sZW5ndGggOiAwO1xuXG5cdFx0XHQvLyBFbmFibGUgZmluaXNoaW5nIGZsYWcgb24gcHJpdmF0ZSBkYXRhXG5cdFx0XHRkYXRhLmZpbmlzaCA9IHRydWU7XG5cblx0XHRcdC8vIEVtcHR5IHRoZSBxdWV1ZSBmaXJzdFxuXHRcdFx0alF1ZXJ5LnF1ZXVlKCB0aGlzLCB0eXBlLCBbXSApO1xuXG5cdFx0XHRpZiAoIGhvb2tzICYmIGhvb2tzLnN0b3AgKSB7XG5cdFx0XHRcdGhvb2tzLnN0b3AuY2FsbCggdGhpcywgdHJ1ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb29rIGZvciBhbnkgYWN0aXZlIGFuaW1hdGlvbnMsIGFuZCBmaW5pc2ggdGhlbVxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiB0aW1lcnNbIGluZGV4IF0ucXVldWUgPT09IHR5cGUgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggdHJ1ZSApO1xuXHRcdFx0XHRcdHRpbWVycy5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9vayBmb3IgYW55IGFuaW1hdGlvbnMgaW4gdGhlIG9sZCBxdWV1ZSBhbmQgZmluaXNoIHRoZW1cblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0XHRcdGlmICggcXVldWVbIGluZGV4IF0gJiYgcXVldWVbIGluZGV4IF0uZmluaXNoICkge1xuXHRcdFx0XHRcdHF1ZXVlWyBpbmRleCBdLmZpbmlzaC5jYWxsKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVHVybiBvZmYgZmluaXNoaW5nIGZsYWdcblx0XHRcdGRlbGV0ZSBkYXRhLmZpbmlzaDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJ0b2dnbGVcIiwgXCJzaG93XCIsIFwiaGlkZVwiIF0sIGZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHR2YXIgY3NzRm4gPSBqUXVlcnkuZm5bIG5hbWUgXTtcblx0alF1ZXJ5LmZuWyBuYW1lIF0gPSBmdW5jdGlvbiggc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHNwZWVkID09IG51bGwgfHwgdHlwZW9mIHNwZWVkID09PSBcImJvb2xlYW5cIiA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG4vLyBHZW5lcmF0ZSBzaG9ydGN1dHMgZm9yIGN1c3RvbSBhbmltYXRpb25zXG5qUXVlcnkuZWFjaCgge1xuXHRzbGlkZURvd246IGdlbkZ4KCBcInNob3dcIiApLFxuXHRzbGlkZVVwOiBnZW5GeCggXCJoaWRlXCIgKSxcblx0c2xpZGVUb2dnbGU6IGdlbkZ4KCBcInRvZ2dsZVwiICksXG5cdGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuXHRmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG5cdGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG59LCBmdW5jdGlvbiggbmFtZSwgcHJvcHMgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSApO1xuXG5qUXVlcnkudGltZXJzID0gW107XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0aSA9IDAsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycztcblxuXHRmeE5vdyA9IGpRdWVyeS5ub3coKTtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblxuXHRcdC8vIENoZWNrcyB0aGUgdGltZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVtb3ZlZFxuXHRcdGlmICggIXRpbWVyKCkgJiYgdGltZXJzWyBpIF0gPT09IHRpbWVyICkge1xuXHRcdFx0dGltZXJzLnNwbGljZSggaS0tLCAxICk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCAhdGltZXJzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkuZnguc3RvcCgpO1xuXHR9XG5cdGZ4Tm93ID0gdW5kZWZpbmVkO1xufTtcblxualF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24oIHRpbWVyICkge1xuXHRqUXVlcnkudGltZXJzLnB1c2goIHRpbWVyICk7XG5cdGlmICggdGltZXIoKSApIHtcblx0XHRqUXVlcnkuZnguc3RhcnQoKTtcblx0fSBlbHNlIHtcblx0XHRqUXVlcnkudGltZXJzLnBvcCgpO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguaW50ZXJ2YWwgPSAxMztcbmpRdWVyeS5meC5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoICF0aW1lcklkICkge1xuXHRcdHRpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID9cblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHJhZiApIDpcblx0XHRcdHdpbmRvdy5zZXRJbnRlcnZhbCggalF1ZXJ5LmZ4LnRpY2ssIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSApIHtcblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoIHRpbWVySWQgKTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCggdGltZXJJZCApO1xuXHR9XG5cblx0dGltZXJJZCA9IG51bGw7XG59O1xuXG5qUXVlcnkuZnguc3BlZWRzID0ge1xuXHRzbG93OiA2MDAsXG5cdGZhc3Q6IDIwMCxcblxuXHQvLyBEZWZhdWx0IHNwZWVkXG5cdF9kZWZhdWx0OiA0MDBcbn07XG5cbnJldHVybiBqUXVlcnk7XG59ICk7XG4iXX0=