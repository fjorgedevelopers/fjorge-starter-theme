<?php
/**
* Template Name: Flexible Template
*/

get_header(); ?>

<div class="page">

	<!-- flexible content loop -->
	<?php if( have_rows('flexible_content') ): ?>
		<?php while ( have_rows('flexible_content') ) : the_row(); ?>

			<?php if( get_row_layout() == 'banner_section' ): ?>
				<?php get_template_part('template-parts/block','banner-section'); ?>

			<?php elseif( get_row_layout() == 'text_section' ): ?>
				<?php get_template_part('template-parts/block','text'); ?>

			<?php elseif(get_row_layout() == 'image_slider_section' ): ?>
				<?php get_template_part('template-parts/block','slider-section'); ?>

			<?php elseif(get_row_layout() == 'two_column_block_section' ): ?>
				<?php get_template_part('template-parts/block','two-column-block-section'); ?>

		<!-- end of whole loop -->
		<?php
		endif;
		endwhile;
		else :
		endif;
		?>

	</div> <!-- end div.page -->

	<?php get_footer(); ?>
