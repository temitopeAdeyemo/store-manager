class JsonResponse {
  statusCode: number;
  data: object | null;

  build(statusCode: number, message: string, data: any = null) {
    this.data = { success: true, message, data };
    this.statusCode = statusCode;
    return this;
  }
}

export default JsonResponse;
export const jsonResponse = new JsonResponse();
