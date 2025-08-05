// UrlShortenerForm component placeholder
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import logger from './LoggerMiddleware';

export default function UrlShortenerForm() {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlField = () => {
    if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
  };

  const validateUrl = (url) => /^https?:\/\/.+\..+/.test(url);

  const handleSubmit = () => {
    const newResults = [];
    for (let { url, validity, shortcode } of urls) {
      if (!validateUrl(url)) {
        alert(`Invalid URL: ${url}`);
        return;
      }

      const payload = {
        longUrl: url,
        validity: parseInt(validity) || 30,
        shortcode: shortcode || undefined,
      };

      logger('Submitting URL', payload);

      const shortCode = payload.shortcode || Math.random().toString(36).substring(2, 8);
      const shortUrl = `${window.location.origin}/${shortCode}`;
      const expiry = new Date(Date.now() + payload.validity * 60000);

      newResults.push({ longUrl: url, shortUrl, expiry: expiry.toLocaleString() });
    }
    setResults(newResults);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Long URL" value={item.url} onChange={(e) => handleChange(index, 'url', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Validity (min)" value={item.validity} onChange={(e) => handleChange(index, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Shortcode (optional)" value={item.shortcode} onChange={(e) => handleChange(index, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addUrlField}>+ Add More</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>

      {results.map((res, i) => (
        <Card key={i} sx={{ mt: 2 }}>
          <CardContent>
            <Typography><b>Original:</b> {res.longUrl}</Typography>
            <Typography><b>Short:</b> <a href={res.shortUrl}>{res.shortUrl}</a></Typography>
            <Typography><b>Expires at:</b> {res.expiry}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
