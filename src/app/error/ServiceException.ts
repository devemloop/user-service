class ServiceException extends Error {
  #status: number;

  #messages?: string[];

  #category: string;

  constructor({
    status,
    message,
    messages,
    category,
  }: {
    status: number;
    message: string;
    messages?: string[];
    category: string;
  }) {
    super(message);
    this.#status = status;
    this.#messages = messages;
    this.#category = category;
  }

  public get status(): number {
    return this.#status;
  }

  public get messages(): string[] {
    return this.#messages || [];
  }

  public get category(): string {
    return this.#category;
  }
}

export default ServiceException;
