import { privateFetchFactory } from "helpers/api"
import {
  TWITTER_SOURCE,
  TWITTER_API_HOST,
  TWITTER_TIMELINE_URL
} from "assets/constants"

const twitterFetcher = privateFetchFactory({
  source: TWITTER_SOURCE,
  error: (response = {}) => {
    if (!response.errors) return null

    return response.errors.map(({ code, message }) => {
        `${TWITTER_SOURCE}: ${message} (${code})`
      })
      .join(", ")
  }
})

export default (options) => twitterFetcher(TWITTER_TIMELINE_URL, options)