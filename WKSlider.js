/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 */
 
/*global document */

function WKSlider(id) {

	this.element = document.getElementById(id);
	
	this.knob = this.element.getElementsByClassName('knob')[0];
	this.knobWidth = this.knob.offsetWidth;
	
	this.track = this.element.getElementsByClassName('track')[0];
	this.trackWidth = this.track.offsetWidth;
	
	this.element.addEventListener('touchstart', this, false);
	this.element.addEventListener('mousedown', this, false);
}

WKSlider.prototype.touchstart = function(e) {

	e.preventDefault();

	this.moveKnobTo(e.targetTouches[0].pageX);
	
	this.element.addEventListener('touchmove', this, false);
	this.element.addEventListener('touchend', this, false);
	this.element.addEventListener('touchcancel', this, false);
};

WKSlider.prototype.touchmove = function(e) {

	e.preventDefault();
	
	this.moveKnobTo(e.targetTouches[0].pageX);
};

WKSlider.prototype.touchend = function(e) {

	e.preventDefault();

	this.moveKnobTo(e.changedTouches[0].pageX);
	
	this.element.removeEventListener('touchmove', this, false);
	this.element.removeEventListener('touchend', this, false);
	this.element.removeEventListener('touchcancel', this, false);
};

WKSlider.prototype.touchcancel = function(e) {

	e.preventDefault();

	this.moveKnobTo(e.changedTouches[0].pageX);
	
	this.element.removeEventListener('touchmove', this, false);
	this.element.removeEventListener('touchend', this, false);
	this.element.removeEventListener('touchcancel', this, false);
};

WKSlider.prototype.mousedown = function(e) {

	e.preventDefault();

	this.moveKnobTo(e.pageX);
	
	this.element.addEventListener('mousemove', this, false);
	this.element.addEventListener('mouseup', this, false);
};

WKSlider.prototype.mousemove = function(e) {

	e.preventDefault();
	
	this.moveKnobTo(e.pageX);
};

WKSlider.prototype.mouseup = function(e) {

	e.preventDefault();

	this.moveKnobTo(e.pageX);
	
	this.element.removeEventListener('mousemove', this, false);
	this.element.removeEventListener('mouseup', this, false);
};

WKSlider.prototype.moveKnobTo = function(x) {

	x = Math.min(x, this.trackWidth);
	x = Math.max(x - this.knobWidth, 0);
	
	this.knob.style.left = x + 'px';
	
	var percentage = Math.round(x  / (this.trackWidth - this.knobWidth) * 100);
	this.callback(percentage);
};

WKSlider.prototype.callback = function() {

};

WKSlider.prototype.handleEvent = function(e) {

	if (typeof(this[e.type]) === 'function' ) {
		return this[e.type](e);
	}
};