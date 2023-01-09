import { screen, render } from '@testing-library/react';
import Home, { getStaticProps } from '../pages/index';

import userEvent from '@testing-library/user-event';
const user = userEvent.setup();

let response = null;

beforeEach(async () => {
	response = await getStaticProps(null);
	render(<Home posts={response.props.posts} />);
});

describe('Home Page Get Static Props', () => {
	test('Should return object containing props', () => {
		expect(response).toHaveProperty('props');
	});

	test('Should return props object containing posts', () => {
		const props = response.props;
		expect(props).toHaveProperty('posts');
	});
});

describe('Render Home Page', () => {
	test('Should render heading', () => {
		const heading = screen.getByRole('heading', { name: "Hi, I'm Ilham 👋🏻" });
		expect(heading).toBeInTheDocument();
	});

	test('Should render social media links', () => {
		const twitterLink = screen.getByRole('link', { name: "Twitter" });
		expect(twitterLink).toBeInTheDocument();

		const linkedinLink = screen.getByRole('link', { name: "LinkedIn" });
		expect(linkedinLink).toBeInTheDocument();

		const githubLink = screen.getByRole('link', { name: "GitHub" });
		expect(githubLink).toBeInTheDocument();
	});

	test('Should render list of posts', () => {
		const postList = screen.getByTestId('latest-posts');
		expect(postList).toBeInTheDocument();

		const posts = screen.getAllByTestId('latest-post-item');
		expect(posts.length).toBeGreaterThan(0);
	});

	// Work in progress
	test.skip('Should redirect to post page when user click post item link', async () => {
		const mockResponse = jest.fn();
		Object.defineProperty(window, 'location', {
			value: {
				hash: {
					endsWith: mockResponse,
					includes: mockResponse,
				},
				assign: mockResponse,
			},
			writable: true,
		});

		const posts = screen.getAllByTestId('latest-post-item');
		const postItemLink = posts[0];

		await user.click(postItemLink);

		expect("").toContain("/posts/");
	});
});
