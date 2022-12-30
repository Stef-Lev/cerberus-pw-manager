export const getOneMethod = url => {
  return fetch(url).then(res => res.json());
};

export const getAllMethod = url => {
  return fetch(url).then(res => res.json());
};

export const postMethod = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

export const updateMethod = (url, body) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
};

export const deleteMethod = url => {
  return fetch(url, {
    method: 'DELETE',
  }).then(res => res.json());
};
