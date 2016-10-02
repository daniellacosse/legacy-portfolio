import URL from "url"

import {
  publicFetch
} from "./index"
import {
  SOUNDCLOUD_SOURCE,
  SOUNDCLOUD_API_HOST
} from "../constants"

const SOUNDCLOUD_TRACKS_URL = {
  protocol: "https",
  hostname: SOUNDCLOUD_API_HOST,
  pathname: "/tracks",
  query: {
    client_id: process.env["SOUNDCLOUD_CONSUMER_KEY"]
  }
}

const formatFactory = (count) => {
  return (data) => {
    const mappedData = data.map(({
      id,
      uri,
      title,
      description,
      created_at,
      tag_list,
      genre,
      permalink_url,
      artwork_url
    }) => {

      return {
        id,
        type: "media",
        source: SOUNDCLOUD_SOURCE,
        url: permalink_url,
        title,
        previewImage: artwork_url,
        frameHeight: 165,
        frameUrl: URL.format({
          protocol: "https",
          hostname: "w.soundcloud.com",
          pathname: "/player",
          query: {
            url: uri,
            show_artwork: true
          }
        }),
        body: description ?
          `<p>${description.split("\n").join("</p><p>")}</p>` :
          "",
        date: new Date(created_at)
          .toLocaleDateString(),
        tags: [genre, ...tag_list.split(/\s?\"/)
          .filter(tag => tag)]
      }
    })

    if (count)
      return mappedData.slice(0, count)

    return mappedData
  }
}

const error = (data) => {
  if (!data) return `${SOUNDCLOUD_SOURCE}: No data!`
  if (!data.statusCode) return null

  return `${SOUNDCLOUD_SOURCE}: ${data} (${statusCode})`
}

export default ({
  count,
  since
} = {}) => {
  return publicFetch({
    format: formatFactory(count),
    error,
    url: SOUNDCLOUD_TRACKS_URL
  })
}
