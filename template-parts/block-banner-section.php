	<!-- For full Width Hero Banner -->

	<?php
	//vars
	$image = get_sub_field('image');
	$header = get_sub_field('header');
	?>
	<div class="banner-section">
		<!-- Grab the background image -->
		<div class="full-screen background-photo" style="background-image: url('<?php echo $image['url']; ?>');">
		  <div class="align-header">
			  <h1 style="color:<?php the_sub_field('header_color'); ?>;">
				  <?php echo $header ?>
			  </h1>
		  </div>
		</div>
		<div class="clearfix"></div>
	</div>

