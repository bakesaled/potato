export class Message {
  constructor(
    public controllerId: string,
    public callback: (...params: any[]) => void
  ) {}
}
