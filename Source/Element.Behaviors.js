/*
---

name: Element.Behaviors

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

author: Ryan Florence

requires:
  - Core/Element
  - Core/JSON

provides: [Element.Behaviors]

...
*/


(function(){

var behaviors = {};

var define = Element.defineBehavior = function(behavior, fn){
	behaviors[behavior] = fn;
	return this;
};
Element.defineBehaviors = define.overloadSetter();

var lookup = Element.lookupBehavior = function(behavior){
	return behaviors[behavior];
}
Element.lookupBehaviors = lookup.overloadGetter();

Element.filterBehaviors = function(){
	$$('[data-filter]').each(function(element){
		element.get('data-filter').split(/ +|\t+|\n+/).each(function(raw){
			var split = raw.split(':'),
			    filter = split[0],
			    options = JSON.decode((element.get('data-' + (split[1] || filter))) || '{}');
			if (raw == '' || element.retrieve('behavior-' + raw)) return;
			var behavior = behaviors[filter]
			if (!behavior) throw new Error('Filter `' + filter + '` is undefined');
			element.store('behavior-' + raw, behavior.call(element, options) || true);
		});
	});
};

})();
