export function getYoutubeEmbedUrl(url: string): string {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([\w\-]{11})/);
  const videoId = match?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}
