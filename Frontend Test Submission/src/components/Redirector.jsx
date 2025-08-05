import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logger from './LoggerMiddleware';

const redirectionMap = {
  ggl123: 'https://www.google.com',
  aiopen: 'https://openai.com',
  yt123: 'https://youtube.com'
};

export default function Redirector() {
  const { shortcode } = useParams();

  useEffect(() => {
    logger('Redirection accessed', { shortcode });

    const targetUrl = redirectionMap[shortcode] || 'https://example.com';
    alert(`Redirecting to: ${targetUrl}`);
    window.location.href = targetUrl;
  }, [shortcode]);

  return <p>Redirecting...</p>;
}
