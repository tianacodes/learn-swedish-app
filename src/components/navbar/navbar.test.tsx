import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/navbar/navbar';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  return ({ children, href, ...rest }: { children: React.ReactNode; href: string;[key: string]: any }) => {
    return <a href={href} {...rest}>{children}</a>;
  };
});

describe('@unit Navbar', () => {
  beforeEach(() => {
    render(<Navbar />);
  })

  test('renders the Logo link', () => {
    const logoElement = screen.getByText('SWETYLO');
    expect(logoElement).toBeInTheDocument();
  });

  test('Logo link has the correct href attribute', () => {
    const logoLink = screen.getByText('SWETYLO');
    expect(logoLink).toHaveAttribute('href', '/');
  });
})