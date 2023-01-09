import { screen, render } from '@testing-library/react';
import Post, { getStaticProps, Props } from '../pages/posts/[post]';

// beforeEach(async () => {
// 	const response = await getStaticProps({ params: { post: 'how-effective-am-i' } });
// 	const props = response['props'] as Props;
// 	render(
// 		<Post  
// 			title={props.title}
// 			dateString={props.dateString}
// 			slug={props.slug}
// 			description={props.description}
// 			tags={props.tags}
// 			author={props.author}
// 			source={props.source}
// 			postsByYear={props.postsByYear}
// 		/>
// 	);
// });

describe('Render Post Page', () => {
	// Work in progress
	test.skip('Should render heading', () => {
		const heading = screen.getByRole('heading', { level: 1, name: "How Effective Am I?" });
		expect(heading).toBeInTheDocument();
	});
});
