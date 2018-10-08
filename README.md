
## WORDPRESS STARTER THEME -- The Gulp Version

This theme starter provides a basic file structure for a custom WordPress theme.
____________________________________________________________

###Overview of Directories and Files:
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

README.md - this is where you should put documentation for the theme you create

style.css - this is required by WordPress in order to register as a valid theme, don't use

____________________________________________________________

###1. SASS COMPILING

The stylesheets are set up to be compiled with sass. Style.scss includes a reset (normalize.css) which you can swap for another one if you have a different reset you prefer. There are a few basic sass variables and mixins in mixins.scss which you can use/modify/delete but they are there as a start. Mobile.scss is also compiled by sass.

There's a gulp file setup to compile sass files.  In terminal, run "gulp" and styles will compile to dist/css/style.css.  You may need to run "npm install" the first time you use the theme to install gulp and other node dependencies locally in your project.

There is a hotfix.css file in dist/css/ directory that is only to be used when there is NO OTHER OPTION.

____________________________________________________________

###2. ENQUEUEING SCRIPTS AND STYLESHEETS

If you need to add another stylesheet or script, add it to the my_add_theme_scripts() function in functions.php and don't put it in the header. This is the recommended way of adding scripts and stylesheets to WordPress to avoid conflicts between themes and plugins and it also prevents dependencies from being loaded multiple times. The my_add_theme_scripts() function is set up to preload jQuery as a dependency of main.js so you don't need to add it anywhere else.

#####A NOTE ABOUT NO-CONFLICT MODE
Because WordPress loads jquery in no-conflict mode, the $ alias will work only inside a document ready function with this syntax:

`jQuery( document ).ready( function( $ ) {});`

In order to use the $ alias outside of the document ready function, wrap it in this function instead:

`( function( $ ) {  } )( jQuery );`

(from a post by Chris Coyier https://digwp.com/2011/09/using-instead-of-jquery-in-wordpress/)

ALTERNATIVELY...
You can deregister the pre-registered version of jQuery and add your own:

```
wp_deregister_script( 'jquery' );
wp_register_script('jquery', get_template_directory_uri() . '/js/<name of your jquery script goes here>');
```

Then you can use the regular document ready function and $ alias as you normally would.


LOAD SCRIPTS ONLY ON THE PAGE YOU NEED THEM
It's easy to load scripts only on the page you need them. For example, if you have a dependency that's only required on the homepage (in this case, the jQuery UI Selectmenu dependencies which are preregistered by WordPress), then you can register that script only on the homepage like so:

```
if ( is_front_page() ) :
	wp_register_script( 'main.js', get_template_directory_uri() . '/js/main.js', array('jquery', 'jquery-ui-selectmenu'), '1.0.0', true );
elseif ( !is_front_page() ) : 
	wp_register_script( 'main.js', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true );
endif;
```


PREREGISTERED SCRIPTS	
For a full list of scripts that are preregistered by WordPress read this https://developer.wordpress.org/reference/functions/wp_enqueue_script.

____________________________________________________________

###3. THEME DOCUMENTATION

This theme utilizes Gulp Tasks to generate documentation for JS, SASS, and PHP files. There are two Gulp tasks that can be run `gulp updateDocs` and `gulp document`.

updateDocs - This task can be used when you want to update the documentation, but do not need it served to the localhost site. 

document - Also updates the documentation, but also launches a local site at [http://localhost:8000](http://localhost:8000) to view the docs.

These tasks will compile the comments within the files to generate the docs. This means there are some slight modifications on how to write comments, so they will be picked up the generator. 

#####SASS
This will require the most change, as we dont often comment our SASS files. The structure of a comemnt looks like this. 

```
/// Semi Bold Weight
/// @group Fonts
/// @name Light
///
```

The first line is the description. `@group` will organize it into a group when it's displayed. `@name` will be what is identified by. There are additonal options that can be found [here](http://sassdoc.com/). The most useful way to use the SASS comments is to make sure all variables, mixins, and global classes(i.e - .button--red) have a comment. It is not necessary to comment everything you put in your sass files. You can find more examples in the variables an mixins sass files.   

#####JS
The SASS doc comment structure is based of this structure, so it will look very familiar. 

```
/** 
     * This is an example of how to comment JS for use with the documentation generation 
     * @function Doc Ready
     * @param {string} jQueryAlias so $ can be used 
     * @description This document ready syntax supports use of the $ alias in jQuery no conflict mode. See README.md for more info and alternatives.
     * @example jQuery( document ).ready( function( $ ) {} );
     * @see http://learn.jquery.com/using-jquery-core/document-ready/
     * */
```

`@function` is the name of the function. `@param` is any param based to the function. Create a new line for each param. `@description` is a short description of the purpose of the function. `@example` a quick example of how the function is used. `@see` can be a an external reference, or can refer to another function. More information about structure and options can be found [here](http://usejsdoc.org/) You can also find an example in the main.js file. 

#####PHP
Again the structure of the comments is based off of the JS style. An example looks like this: 

```php
/**
 * Add Shortcode for button 
 * 
 * Create a shortcode for admins to use to generate CTA buttons
 * 
 * @example [cta-button title="meet the team" link="/about"]
 * 
 * @package Main Functions
*/
```

The first line is a short summary. The second is a longer description. `@example` provides an example of how to use the function. `@package` will group functions together when they are dispalyed. This, and most, PHP documentation software is designed for documenting APIS that have many more classes. Adding these comments into a tempalte or tempalte part file will do nothing. So rather than waste time doing that, comment any custom functions added to functions.php or any other file. FOr more info on using PHP Documentor look [here](https://docs.phpdoc.org/getting-started/your-first-set-of-documentation.html). Examples can be found in the functions-library.php file.


One final note - If you'd like an example of this running on a live site. Pull the Fjorge repo and run the gulp tasks to see the the documentation generated for that site. 

____________________________________________________________

###4. DEVELOPERS NOTES

Developers: add your theme notes below