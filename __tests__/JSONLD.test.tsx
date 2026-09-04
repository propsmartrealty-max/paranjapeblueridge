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

  it('includes AggregateRating schema with ratingValue 4.9 for SERP rich snippet review stars', () => {
    const { container } = render(React.createElement(JSONLD, { pathname: '/' }));
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();
    const json = JSON.parse(script?.textContent || '{}');
    const businessNode = json['@graph'].find((item: any) => 
      Array.isArray(item['@type']) && item['@type'].includes('ApartmentComplex')
    );
    expect(businessNode).toBeDefined();
    expect(businessNode.aggregateRating).toBeDefined();
    expect(businessNode.aggregateRating['@type']).toBe('AggregateRating');
    expect(businessNode.aggregateRating.ratingValue).toBe('4.9');
    expect(businessNode.aggregateRating.reviewCount).toBe('384');
  });
});
