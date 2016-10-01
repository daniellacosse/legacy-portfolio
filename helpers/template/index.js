import { readFileSync } from "fs"

import { getFavicon, getWebFont, getApplicationCSS } from "../asset"

import {
  DATA_TEMPLATE,
  FAVICON_TEMPLATE,
  CSS_TEMPLATE,
  SCRIPT_TEMPLATE,
  ICONFONT_TEMPLATE,
  NEVIS_TEMPLATE,
  TYPE_TEMPLATE,
  TITLE_TEMPLATE,
  DESCRIPTION_TEMPLATE,
  PREVIEW_IMAGE_TEMPLATE,
  URL_TEMPLATE
} from "../constants"

import buildScript from "./script"

export buildApplication from "./application"
export buildScript from "./script"

export default ({ file, meta, scripts, data }) => {
  const sanitizedData = (!!data)
    ? JSON.stringify(JSON.stringify(data))
    : "{}"

  const sanitizedScript = buildScript(scripts || [])

  const buildPoints = {
    [DATA_TEMPLATE]: sanitizedData,
    [SCRIPT_TEMPLATE]: sanitizedScript,
    [FAVICON_TEMPLATE]: getFavicon(),
    [CSS_TEMPLATE]: getApplicationCSS(),
    [ICONFONT_TEMPLATE]: getWebFont("daniellacosse-icons"),
    [NEVIS_TEMPLATE]: getWebFont("nevis"),

    [TYPE_TEMPLATE]: meta.type,
    [TITLE_TEMPLATE]: meta.title,
    [DESCRIPTION_TEMPLATE]: meta.description,
    [PREVIEW_IMAGE_TEMPLATE]: meta.previewImage,
    [URL_TEMPLATE]: meta.url
  }
  
  let templateToBuild = readFileSync(`./assets/${file}.html`).toString("utf8")

  let buildPointKeys = Object.keys(buildPoints)
  let _len = buildPointKeys.length
  while(_len--) {
    const key = buildPointKeys[_len]
    const buildPointSource = buildPoints[key]
    const regex = new RegExp(key, "g")

    templateToBuild = templateToBuild.replace(regex, buildPointSource)
  }

  return templateToBuild
}
