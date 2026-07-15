import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"
import { OptionalAuth } from "@thallesp/nestjs-better-auth"

@Controller("public")
@OptionalAuth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
