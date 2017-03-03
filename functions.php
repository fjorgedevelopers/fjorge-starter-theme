<?php

/*************************************************************/
/*  ENQUEUE SCRIPTS AND STYLES 								*/
/***********************************************************/
// for documentation and a list of scripts that are pre-registered by wordpress see https://developer.wordpress.org/reference/functions/wp_enqueue_script
// for a quick overview read this http://www.wpbeginner.com/wp-tutorials/how-to-properly-add-javascripts-and-styles-in-wordpress

function my_add_theme_scripts() {

    // stylesheets for compiling sass on the server at runtime
    wp_enqueue_style( 'style', get_template_directory_uri().'/css/style.css' );

    // fontawesome
    wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/fonts/font-awesome-4.6.3/css/font-awesome.min.css' );

    // scripts
    wp_register_script( 'main.js', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true );
    wp_enqueue_script('main.js');

}
add_action( 'wp_enqueue_scripts', 'my_add_theme_scripts' );


/*************************************************************/
/*  REGISTER MENUS 			 								*/
/***********************************************************/

function register_my_menus() {

  register_nav_menus(
    array(
      'main-menu' => __( 'Main Menu' ),
	  'footer-menu' => __( 'Footer Menu' ),
    )
  );

}
add_action( 'init', 'register_my_menus' );



