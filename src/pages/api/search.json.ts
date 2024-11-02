import { getCollection } from 'astro:content';

export async function GET() {
  const thoughts = await getCollection('thoughts');
  const essays = await getCollection('essays');

  const searchData = [
    ...thoughts.map(thought => ({
      title: thought.data.title,
      content: thought.body,
      url: `/thoughts/${thought.slug}`,
      type: 'Thought',
      date: thought.data.date
    })),
    ...essays.map(essay => ({
      title: essay.data.title,
      content: essay.body,
      url: `/essays/${essay.slug}`,
      type: 'Essay',
      date: essay.data.date
    }))
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}