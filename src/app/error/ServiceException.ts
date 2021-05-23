class ServiceException extends Error {
  #status: number;

  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.#status = status;
  }

  public get status(): number {
    return this.#status;
  }
}

export default ServiceException;
