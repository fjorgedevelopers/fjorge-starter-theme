<!-- For image slider section :: Reference Main.js for initiating the slider, as well as breakpoint specs :: there is also a separate sass component for styling -->

<?php if(have_rows('image_slider')) : ?>
	<div class="slider-section">
		<div class="slider-contain">
			<div class="slider">
				<?php if(have_rows('image_slider')):
					while(have_rows('image_slider')) : the_row();
					$image = get_sub_field('image');
					$slidetext = get_sub_field('slide_text');?>
						<!-- Get rid of height declaration :: Just there for something to show up -->
						<div class="slider-image" style="background-image:	url(<?php echo $image['url']; ?>); height:400px;">
							<div class="slider-image-content" >
							  <h3><?php echo $slidetext; ?></h3>
							</div>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
		</div>
	</div>

<?php endif; ?>
