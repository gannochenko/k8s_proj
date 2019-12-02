/**
 * https://github.com/sapegin/jest-cheat-sheet
 */

import React from 'react';
import { fireEvent, cleanup, render, prettyDOM } from '@testing-library/react';

import HomePage from '..';

describe('<HomePage />', () => {
    // beforeAll(async () => {
    // });
    // beforeEach(async () => {
    // });
    afterEach(async () => {
        cleanup();
    });

    it('should render itself', async () => {
        const { getByText, getByTestId, container } = render(<HomePage />);

        console.dir(prettyDOM(container)); // to see what a render contains

        // to search by text or id (data-testid="some_id")
        expect(getByText('Some text')).toBeInstanceOf(HTMLElement);
        expect(getByTestId('some_id')).toBeInstanceOf(HTMLElement);

        // to search by a selector
        const inner = container.querySelector('[class^="style_some-class"]');
        expect(inner).toBeInstanceOf(HTMLElement);

        // to dump a render to a snapshot
        expect(container.outerHTML).toMatchSnapshot();

        // to emit an event
        const input = container.querySelector('input[type="text"]');
        fireEvent.click(input);
        fireEvent.change(input, { target: { value: 'hello' } });
    });
});
