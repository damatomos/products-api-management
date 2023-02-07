import { HttpException, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

export class FirebaseRepositoryException extends HttpException
{
  
  constructor(message: string)
  {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}