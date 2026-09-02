export const runtime = 'edge';

export async function GET() {
  return new Response('8f8b8849b3c4456ea7eaef1b4279eaeb', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
