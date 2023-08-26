export const makeRecordLogo = async (url: string, title: string) => {
  if (!url) {
    return `letter=${title[0].toUpperCase()}`;
  } else {
    const regex = /^(?:https?:\/\/)?(?:www\.)?([^/.]+)\.[a-z]{2,}(?:\/|$)/i;
    const match = url.match(regex);
    let domain = "";

    if (match) {
      domain = match[1];
    }

    try {
      const response = await fetch(
        `https://cdn.simpleicons.org/${domain}/white`
      );
      if (response.ok) {
        const data = await response.text();
        const logUrl = data
          ? `url=https://cdn.simpleicons.org/${domain}/white`
          : `letter=${title[0].toUpperCase()}`;
        return logUrl;
      } else {
        console.error(
          `Error fetching ${url}: ${response.status} ${response.statusText}`
        );
        return `letter=${title[0].toUpperCase()}`;
      }
    } catch (error) {
      console.error(`Error fetching ${url}: ${error.message}`);
      return `letter=${title[0].toUpperCase()}`;
    }
  }
};
