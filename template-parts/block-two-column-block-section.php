	<div class="two-column-block-section">

		<!-- print out individual blocks -->
		<?php if(have_rows('block')): ?>
			<div class="block-section">
				<?php while(have_rows('block')) : the_row();
					$title = get_sub_field('block_title');
					$content = get_sub_field('content'); ?>
						<div class="individual-block">
							<h2><?php echo $title; ?></h2>
							<?php echo $content; ?>
						</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>

	</div>