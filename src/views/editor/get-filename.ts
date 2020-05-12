export const getFilename = () => {
    const d = new Date()
    const timeString = d.toLocaleTimeString()
    const dateString = d.toLocaleDateString()
    const filename = `notes ${timeString} on ${dateString}.txt`

    return filename
}
