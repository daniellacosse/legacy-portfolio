import Document from "./index"

export default function collapseIntoGallaries(documents) {
  let cursor = 0
  let resultingDocuments = []

  while (cursor < documents.length - 1) {
    const nextCursor = cursor + 1

    if (documents[cursor].source === documents[nextCursor].source) {
      const targetSource = documents[cursor].source

      let subdocuments = []
      let tagAggregation = []
      let subcursor = 0
      let currentSource = targetSource

      while (currentSource === targetSource) {
        const currentDocument = documents[cursor + subcursor]
        tagAggregation = [].concat.apply([], tagAggregation, currentDocument.tags)
        currentDocument.tags = []
        subdocuments.push(currentDocument)

        subcursor++ // advance cursor
        currentSource = documents[cursor + subcursor].source
      }

      const startDoc = subdocuments[length - 1];
      const endDoc = subdocuments[0];
      resultingDocuments.push(
        new Document({
          id: `${startDoc.id}-${endDoc.id}`,
          type: "gallery",
          source: targetSource,
          picture: startDoc.picture,
          title: `${targetSource} activity from ${endDoc.date} to ${startDoc.date}`,
          date: startDoc.date,
          subdocuments,
          tags: tagAggregation.filter((el, i) => tagAggregation.indexOf(el) ===
            i)
        })
      )

      cursor += subcursor
    } else {
      resultingDocuments.push(documents[cursor])
      cursor++
    }
  }


  return resultingDocuments
}
