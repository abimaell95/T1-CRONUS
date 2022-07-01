function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

async function login(userData) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('/accounts/login/', requestOptions).then(handleResponse);
}

export const UserService = {
  login,
};
