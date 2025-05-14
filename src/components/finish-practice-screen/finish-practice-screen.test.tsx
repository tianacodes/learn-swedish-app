import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FinishPracticeScreen } from './finish-practice-screen';

// Mock Next.js Link
jest.mock('next/link', () => {
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    return ({ children, href, ...rest }: { children: React.ReactNode; href: string;[key: string]: any }) => {
        return <a href={href} {...rest}>{children}</a>;
    };
});

describe('@unit FinishPracticeScreen', () => {
    const mockHandleCategoryPracticeRestart = jest.fn();

    beforeEach(() => {
        mockHandleCategoryPracticeRestart.mockClear();
    });

    it('renders the component with correct text and buttons', () => {
        render(
            <FinishPracticeScreen
                mistakes="3"
                handleCategoryPracticeRestart={mockHandleCategoryPracticeRestart}
            />
        );

        expect(screen.getByText('You reviewed all terms!')).toBeInTheDocument();
        expect(screen.getByText('Mistakes: 3')).toBeInTheDocument();
        expect(screen.getByText('Do again')).toBeInTheDocument();
        expect(screen.getByText('Back to Categories')).toBeInTheDocument();
    });

    it('calls handleCategoryPracticeRestart when "Do again" button is clicked', () => {
        render(
            <FinishPracticeScreen
                mistakes="3"
                handleCategoryPracticeRestart={mockHandleCategoryPracticeRestart}
            />
        );

        const doAgainButton = screen.getByText('Do again');
        fireEvent.click(doAgainButton);

        expect(mockHandleCategoryPracticeRestart).toHaveBeenCalledTimes(1);
    });

    it('renders the "Back to Categories" link with correct href', () => {
        render(
            <FinishPracticeScreen
                mistakes="3"
                handleCategoryPracticeRestart={mockHandleCategoryPracticeRestart}
            />
        );

        const backToCategoriesLink = screen.getByText('Back to Categories');
        expect(backToCategoriesLink).toHaveAttribute('href', '/');
    });
});