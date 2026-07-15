import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  app.setGlobalPrefix("/api")

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  })

  await app.listen(process.env.NEST_PORT ?? 4000)

  console.log(`Backend is running on: ${await app.getUrl()}/api`)
}
bootstrap()
