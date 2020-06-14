class Github {
  constructor() {
    this.config = {
      headers: {
        Authorization: '08cc4c4a3aa9a56129935f4db66e3eb34e6484ce',
      },
    };
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(username) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${username}`,
      this.config
    );
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`,
      this.config
    );

    const profile = await profileResponse.json();
    const repos = await reposResponse.json();
    return { profile, repos };
  }
}
