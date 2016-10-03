import { publicFetchFactory } from "../factory"
import {
  YOUTUBE_SOURCE,
  YOUTUBE_API_HOST,
  YOUTUBE_CHANNEL,
  YOUTUBE_UPLOADS_URL
} from "../../constants"

const youtubeFetcher = publicFetchFactory({
  entry: "items",
  format: ({ snippet: { thumbnails, resourceId } }) => ({
    id: resourceId.videoId,
    type: "media",
    source: YOUTUBE_SOURCE,
    picture: thumbnails.default.url,
    frame: `https://www.youtube.com/embed/${resourceId.videoId}`,
    date: publishedAt
  }),
  error: (response) => {
    if (!response.code) return null;

    return `${YOUTUBE_SOURCE}: (${response.code})`;
  }
})

export default ({ count, since } = {}) => {
  return publicFetch({...YOUTUBE_UPLOADS_URL,
    query: {...YOUTUBE_UPLOADS_URL
      .query,
      maxResults: count
    }
  })
}
