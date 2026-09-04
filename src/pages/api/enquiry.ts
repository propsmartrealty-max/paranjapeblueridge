import type { APIRoute } from 'astro';
import { POST as leadPost } from './lead';

export const prerender = false;

/**
 * Universal Enquiry Handler: /api/enquiry
 * Seamlessly routes all enquiry submissions to the triple-redundant lead dispatch pipeline,
 * delivering formatted VIP alerts directly to propsmartrealty@gmail.com.
 */
export const POST: APIRoute = async (context) => {
  return leadPost(context);
};

export const ALL: APIRoute = async () => {
  return new Response(JSON.stringify({ status: 'active', endpoint: '/api/enquiry', recipient: 'propsmartrealty@gmail.com' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
