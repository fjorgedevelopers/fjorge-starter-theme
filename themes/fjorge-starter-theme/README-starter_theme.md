WORDPRESS THEME STARTER
This theme starter provides a basic file structure for a custom WordPress theme.

____________________________________________________________

1. ENQUEUEING SCRIPTS AND STYLESHEETS

If you need to add another stylesheet or script, add it to the my_add_theme_scripts() function in functions.php and don't put it in the header. This is the recommended way of adding scripts and stylesheets to WordPress to avoid conflicts between themes and plugins and it also prevents dependencies from being loaded multiple times. The my_add_theme_scripts() function is set up to preload jQuery as a dependency of main.js so you don't need to add it anywhere else.

A NOTE ABOUT NO-CONFLICT MODE
Because WordPress loads jquery in no-conflict mode, the $ alias will work only inside a document ready function with this syntax:
	jQuery( document ).ready( function( $ ) {
		
	});

In order to use the $ alias outside of the document ready function, wrap it in this function instead:
	( function( $ ) {  
  
	} )( jQuery );

(from a post by Chris Coyier https://digwp.com/2011/09/using-instead-of-jquery-in-wordpress/)

ALTERNATIVELY...
You can deregister the pre-registered version of jQuery and add your own:

	wp_deregister_script( 'jquery' );
    wp_register_script('jquery', get_template_directory_uri() . '/js/<name of your jquery script goes here>');

Then you can use the regular document ready function and $ alias as you normally would.


LOAD SCRIPTS ONLY ON THE PAGE YOU NEED THEM
It's easy to load scripts only on the page you need them. For example, if you have a dependency that's only required on the homepage (in this case, the jQuery UI Selectmenu dependencies which are preregistered by WordPress), then you can register that script only on the homepage like so:

	if ( is_front_page() ) :
    	wp_register_script( 'main.js', get_template_directory_uri() . '/js/main.js', array('jquery', 'jquery-ui-selectmenu'), '1.0.0', true );
	elseif ( !is_front_page() ) : 
		wp_register_script( 'main.js', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true );
	endif;


PREREGISTERED SCRIPTS	
For a full list of scripts that are preregistered by WordPress read this https://developer.wordpress.org/reference/functions/wp_enqueue_script.
    

____________________________________________________________


2. SASS COMPILING

The stylesheets are set up to be compiled with sass. Style.scss includes a reset (normalize.css) which you can swap for another one if you have a different reset you prefer. There are a few basic sass variables and mixins in mixins.scss which you can use/modify/delete but they are there as a start. Mobile.scss is also compiled by sass.

Sass files are compiled at runtime on the server using SCSS Compiler by Leaf Corcoran. More info at http://leafo.net/scssphp/.

____________________________________________________________


3. SASS AND FUNCTIONS SNIPPETS
There are some sass snippets in mixins.scss which you can use or ignore/delete. Though you can add mixins and variables directly to a stylesheet, by putting them in mixins.scss, you can then import that into both style.scss and mobile.scss and have access to them everywhere.

There are also some common functions in functions-library.php which you can copy into functions.php if you need them.


____________________________________________________________


4. BEANSTALK REPOSITORY
In the future, we will set this up as a repository on Beanstalk so you can make a branch for a personalized version of this theme starter while still being able to pull down any updates to the original.
