import React from 'react';
import { render } from '@testing-library/react';
import JSONLD from '../src/components/JSONLD';

describe('JSONLD component', () => {
  it('includes paymentAccepted in generated JSON-LD script', () => {
    const { container } = render(React.createElement(JSONLD, { pathname: '/' }));
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const json = JSON.parse(script?.textContent || '{}');
    const jsonString = JSON.stringify(json);
    expect(jsonString).toContain('paymentAccepted');
  });
});
