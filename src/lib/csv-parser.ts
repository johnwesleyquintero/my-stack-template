export class CSVParser {
  private readonly delimiter: string

  constructor(delimiter = ',') {
    this.delimiter = delimiter
  }

  async parse(file: File): Promise<Array<Record<string, string>>> {
    const content = await this.readFile(file)
    const lines = this.splitLines(content)
    const headers = this.parseHeaders(lines[0])
    return this.parseRows(lines.slice(1), headers)
  }

  private async readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  private splitLines(content: string): string[] {
    return content.split('\n').filter(line => line.trim())
  }

  private parseHeaders(headerLine: string): string[] {
    return headerLine.split(this.delimiter)
  }

  private parseRows(rows: string[], headers: string[]): Array<Record<string, string>> {
    return rows.map(row => this.parseRow(row, headers))
  }

  private parseRow(row: string, headers: string[]): Record<string, string> {
    const values = row.split(this.delimiter)
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || ''
      return obj
    }, {} as Record<string, string>)
  }
}
