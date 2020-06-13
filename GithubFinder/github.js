class Github {
  constructor() {
    this.client_id = '8b45580369e185d374fd';
    this.client_secret = 'b95540346f5429e194d3e02b1fa40fc3db61d315';
  }

  async getUser(username) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await profileResponse.json();
    return { profile };
  }
}
