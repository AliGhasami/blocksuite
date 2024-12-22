export  async function downloadFile(url:string) {
  try {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw new Error('Network response was not ok')

    const blob = await response.blob()
    const objectURL = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = objectURL
    link.download = '' // Leaving the filename blank to let the browser decide
    document.body.append(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(objectURL) // Clean up the URL object
  } catch (error) {
    console.error('Error downloading the file:', error)
  }
}
