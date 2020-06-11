class EasyHTTP {
  async get(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`An error was caught: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  async post(url, newData) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        throw new Error(`An error was caught: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  async put(url, updatedData) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error(`An error was caught: ${res.status}`);
      }
      const data = res.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  async delete(url) {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`An error was caught: ${res.status}`);
      }
      const data = await Promise.resolve('Entry deleted');
      return data;
    } catch (err) {
      return err;
    }
  }
}
