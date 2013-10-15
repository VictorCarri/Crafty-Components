/*
*	Component
*
*	@name			MenuButton
*	@author			Victor Carri
*	@description	Makes it easier to create a menu button entity - can re-use common functionality.
*					It causes an entity to behave like a button, and to animate the menus in various ways
*/

Crafty.c("MenuButton", 
	{
		// On startup
		init: function(entity)
		{
			// Get required components
			this.requires("2D, Tween");
			
			// Create private array to store buttons
			this._menuButtons = [];
		},
		
		/* 
		*	@name 			MenuButton
		*	@type 			function
		*	@description	Creates a menu button with custom values
		*	@args:
		*		1) Object bgattrs - A list of attributes that can be passed to CraftyJS's .attr() - to be applied to the background
		*		2) Object colours - This has the properties:
		*			a) bgColour - Background colour of button
		*			b) textColour - Colour of text
		*		3) Object handlers - Specifies event handlers: a key represents a Crafty event (e.g. "Click"), and the value of the key is the event handler.
		*			a) e.g. Passing in this object ({"Click": function(){alert("Hello, World!");}, "KeyDown": function(e){alert("You pressed key " + e.keyCode + "!");}}
		*		   	   would cause the following to occur:
		*			i) var ent = Crafty.e("2D, etc, etc...")
		*			ii) for (event in handlers) // Loop through keys (user-specified events)
		*				{
		*					ent.bind(event, handlers[event]); // Bind user-specified function for that event to that event on this entity
		*				}
		*		4) Object btText - Object describing the text which the menu button should contain - properties:
		*			a) String text - The actual text to display
		*			b) Object font - Describes the text's font - should be an object which can be passed to Crafty.textFont();
		*		5) String renderType - The way in which Crafty should render the button
		*			a) Either "Canvas" or "DOM"
		*		6) Object tattrs - Text attributes (position, etc.)
		*		7) Number id - An integer describing this button's code - to allow the user to specify handlers for this button
		*/
		MenuButton: function(bgattrs, colours, handlers, btText, renderType, tattrs, id)
		{	
			// Create array for this button in our array of buttons
			this._menuButtons[id] = [];
			
			// Create button (background for text)
			this._menuButtons[id][0] = Crafty.e("2D, " + renderType + ", Color, Mouse, Tween, Time").color(colours.bgColour).attr(bgattrs);
			
			// Create text
			this._menuButtons[id][1] = Crafty.e("2D, " + renderType + ", Text, Mouse, Tween, Time").attr(tattrs).text(btText.text).textColor(colours.textColour).textFont(btText.font);
			//console.log("MenuButton: this._menuButtons[%d][1] = %o", id, this._menuButtons[id][1]);
			
			// Attach user-given handlers to both text and button, so that both will be affected by the event in the same way
			for (var event in handlers)
			{
				// Bind handler to button for this event
				this._menuButtons[id][0].bind(event, function(){handlers[event].apply(this, [id]);});
				
				// Bind same handler to text for this event
				this._menuButtons[id][1].bind(event, function(){handlers[event].apply(this, [id]);});
			}
			
			// End of method, allow user to continue chaining calls to Crafty components
			return this;
		}
	}
);