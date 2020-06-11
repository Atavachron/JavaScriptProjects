class easyHTTP {
  handleErrors(res) {
    if (!res.ok) {
      throw new Error(res.error);
    }
    return res;
  }

  get(url) {
    return fetch(url)
      .then(this.handleErrors)
      .then(res => res.json())
      .catch(err => err);
  }

  post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(this.handleErrors)
      .then(res => res.json())
      .catch(err => err);
  }

  put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(this.handleErrors)
      .then(res => res.json())
      .catch(err => err);
  }

  delete(url) {
    return fetch(url, {
      method: 'DELETE',
    })
      .then(this.handleErrors)
      .then(res => 'Entry deleted')
      .catch(err => err);
  }
}
