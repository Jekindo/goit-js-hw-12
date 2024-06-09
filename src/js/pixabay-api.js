const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(q) {
  const params = new URLSearchParams({
    key: '25232082-62f19a20a64b822fbbd43f9d6',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
