export const getOneMethod = (url: string): Promise<any> => {
  return fetch(url).then((res) => res.json());
};

export const getAllMethod = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export const postMethod = (
  url: string,
  body: Record<string, any>
): Promise<any> => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

export const updateMethod = (
  url: string,
  body: Record<string, any>
): Promise<any> => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const deleteMethod = (url: string): Promise<any> => {
  return fetch(url, {
    method: "DELETE",
  }).then((res) => res.json());
};
