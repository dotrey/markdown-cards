export class FileLoader {
  async load(file: string) {
    let response = await fetch(file)
    if (response.ok) {
      return response.text()
    }
    throw new Error(`Failed to load file '${file}': ${response.status}`)
  }
}
