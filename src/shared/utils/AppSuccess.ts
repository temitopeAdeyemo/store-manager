import { Request, Response } from 'express';

class JsonResponse {
  statusCode: number;
  data: object | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, message: string, data: any = null) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    this.data = { ...data };

    // this.k()
    // return this;
  }

  k(req: Request, res: Response) {
    return res.status(200).json(this);
  }
}

export default JsonResponse;
// export const jsonResponse = new JsonResponse();
