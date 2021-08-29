/// <reference path="../node_modules/@figma/plugin-typings/index.d.ts" />

figma.showUI(__html__, { width: 300, height: 300 })

figma.ui.onmessage = (msg) => {
  const { type } = msg
  console.log("msg type", type)
  if (type === "CANVAS_TO_IMAGE") {
    Promise.all(
      figma.currentPage.selection.map((selected) =>
        replaceToNewImage(selected, msg.bytes)
      )
    ).then(() => {
      console.log("complete")
    })
  }
}

async function invertPaint(paint, bytes) {
  if (paint.type === "IMAGE") {
    const newPaint = JSON.parse(JSON.stringify(paint))
    newPaint.imageHash = figma.createImage(bytes).hash
    return newPaint
  }
  return paint
}

async function replaceToNewImage(node, bytes) {
  const newFills = []
  for (const paint of node.fills) {
    newFills.push(await invertPaint(paint, bytes))
  }
  node.fills = newFills
}
