export class RequestQueue {
  constructor(maxConcurrent = 1) {
    this.maxConcurrent = maxConcurrent;
    this.activeCount = 0;
    this.queue = [];
  }

  enqueue(taskFn) {
    return new Promise((resolve, reject) => {
      const runTask = async () => {
        this.activeCount += 1;
        try {
          const value = await taskFn();
          resolve(value);
        } catch (error) {
          reject(error);
        } finally {
          this.activeCount -= 1;
          this.next();
        }
      };

      this.queue.push(runTask);
      this.next();
    });
  }

  next() {
    if (this.activeCount >= this.maxConcurrent) return;
    const task = this.queue.shift();
    if (task) task();
  }
}
