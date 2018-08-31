<?php

/*************************************************************/
/*  ENQUEUE SCRIPTS AND STYLES 								*/
/***********************************************************/
// for documentation and a list of scripts that are pre-registered by wordpress see https://developer.wordpress.org/reference/functions/wp_enqueue_script
// for a quick overview read this http://www.wpbeginner.com/wp-tutorials/how-to-properly-add-javascripts-and-styles-in-wordpress

function my_add_theme_scripts() {

    // vendor styles
    $styles_vendor = '/dist/css/vendor.min.css';
    wp_enqueue_style( 'vendor-style', get_template_directory_uri().$styles_vendor, null, filemtime(get_stylesheet_directory().$styles_vendor), false );

    // custom styles
    $styles_custom = '/dist/css/style.min.css';
    wp_enqueue_style( 'custom-style', get_template_directory_uri().$styles_custom, null, filemtime(get_stylesheet_directory().$styles_custom), false );

    // css hotfixes
    $styles_hotfix = '/dist/css/hotfix.css';
    wp_enqueue_style( 'hotfix', get_template_directory_uri().$styles_hotfix, null, filemtime(get_stylesheet_directory().$styles_hotfix), false );

    // fontawesome
    wp_enqueue_style( 'font-awesome', get_template_directory_uri().'/fonts/font-awesome-4.6.3/css/font-awesome.min.css', null, null, false );

    // vendor scripts
    $scripts_vendor = '/dist/js/vendor.min.js';
    wp_register_script( 'vendor-scripts', get_template_directory_uri().$scripts_vendor, array('jquery'), filemtime(get_stylesheet_directory().$scripts_vendor), true );
    wp_enqueue_script('vendor-scripts');

    // custom scripts
    $scripts_custom = '/dist/js/custom.min.js';
    wp_register_script( 'custom-scripts', get_template_directory_uri().$scripts_custom, array('jquery'), filemtime(get_stylesheet_directory().$scripts_custom), true );
    wp_enqueue_script('custom-scripts');

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

/*************************************************************/
/*  REGISTER SIDEBAR                    */
/***********************************************************/

function arphabet_widgets_init() {

  register_sidebar( array(
    'name'          => 'Sidebar One',
    'id'            => 'sidebar_one',
    'before_widget' => '<div class="widget">',
    'after_widget'  => '</div>',
    'before_title'  => '<h2>',
    'after_title'   => '</h2>',
    'description'   => ''
  ) );

  register_sidebar( array(
    'name'          => 'Sidebar Two',
    'id'            => 'sidebar_two',
    'before_widget' => '<div class="widget">',
    'after_widget'  => '</div>',
    'before_title'  => '<h2>',
    'after_title'   => '</h2>',
    'description'   => ''
  ) );

}
add_action( 'widgets_init', 'arphabet_widgets_init' );