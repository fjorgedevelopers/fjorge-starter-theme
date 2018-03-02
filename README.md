WORDPRESS STARTER THEME - the gulp version

This theme starter provides a basic file structure for a custom WordPress theme.
____________________________________________________________

Overview of Directories and Files:
dist/ - compiled assets (these get rewritten by gulp)
fonts/ - a place to put locally hosted fonts
node_modules/ - 
	these are the node.js dependencies for this theme including gulp and gulp-sass, this directory is not part of the repo but is created when you setup or clone this project for the first time (by running npm install from the theme directory)
src/ - the source files that create the compiled assets, includes sass, bourbon and neat, js
template-parts/ - put partials that get called by wordpress templates here
.gitignore - this is set up to work with this theme, can be edited to meet your needs
functions-library.php - 
	these are snippets for common WordPress functions that you can move into functions.php if you need them
Gulpfile.js - this is what tells gulp what to do, it can be edited if need be
package.json - this is what tells node package manager what to do when you run "npm install"
README-starter_theme.md - hey, that's this file!
README.md - this is where you should put documentation for the theme you create
style.css - this is required by WordPress in order to register as a valid theme, don't use

____________________________________________________________

1. SASS COMPILING

The stylesheets are set up to be compiled with sass. Style.scss includes a reset (normalize.css) which you can swap for another one if you have a different reset you prefer. There are a few basic sass variables and mixins in mixins.scss which you can use/modify/delete but they are there as a start. Mobile.scss is also compiled by sass.

There's a gulp file setup to compile sass files.  In terminal, run "gulp" and styles will compile to dist/css/style.css.  You may need to run "npm install" the first time you use the theme to install gulp and other node dependencies locally in your project.

There is a hotfix.css file in dist/css/ directory that is only to be used when there is NO OTHER OPTION.

____________________________________________________________

2. ENQUEUEING SCRIPTS AND STYLESHEETS

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
