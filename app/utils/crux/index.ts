import { getNameFromURL } from '@/utils/favicon';

export const fetchCruxData = async (url: string) => {
  try {
    const response = await fetch(
      `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.NEXT_PUBLIC_CRUX_API_KEY}`,
      {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'origin': url,
        'metrics': ['largest_contentful_paint', 'interaction_to_next_paint', 'cumulative_layout_shift'],
      })
    })

    if(!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
}

export const formatCruxData = (data: any) => {
  if(!data.record) {
    throw new Error('No data available');
  }

  return {
    'site_name': data.record.key.origin || data.record.key.url,
    'site_url': data.record.key.origin || data.record.key.url,
    'site_scores': {
      'LCP': Number(data.record.metrics.largest_contentful_paint.percentiles.p75),
      'INP': Number(data.record.metrics.interaction_to_next_paint.percentiles.p75),
      'CLS': Number(data.record.metrics.cumulative_layout_shift.percentiles.p75),
    }
  }

};