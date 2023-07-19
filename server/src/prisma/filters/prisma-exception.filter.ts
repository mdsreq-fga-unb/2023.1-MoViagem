import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError, PrismaClientUnknownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | PrismaClientKnownRequestError
      | PrismaClientUnknownRequestError
      | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof PrismaClientUnknownRequestError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Unknown Error",
        message: [exception.message],
      });
    }

    if (exception instanceof PrismaClientValidationError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: "Validation Error",
        message: [exception.message],
      });
    }

    const messageSeparatedByNewLine = exception.message.split("\n");
    const message = messageSeparatedByNewLine[messageSeparatedByNewLine.length - 1];

    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      error: "Bad Request. Error Code: " + exception.code,
      message: [message],
    });
  }
}
