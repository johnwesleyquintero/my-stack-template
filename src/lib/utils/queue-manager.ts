export class QueueManager<T> {
  private queue: T[] = []
  private processing = false

  constructor(
    private readonly processor: (item: T) => Promise<void>,
    private readonly concurrency: number = 3
  ) {}

  async add(items: T[]): Promise<void> {
    this.queue.push(...items)
    if (!this.processing) {
      await this.processQueue()
    }
  }

  private async processQueue(): Promise<void> {
    this.processing = true
    
    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.concurrency)
      await Promise.all(batch.map(item => this.processor(item)))
    }

    this.processing = false
  }
}
