import { Test } from "@nestjs/testing" // May not import automatically
import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AppModule } from "src/app.module"
import { PrismaService } from "src/prisma/prisma.service"
import { describe } from "node:test"
import * as pactum from "pactum"
import { SignUpDto } from "src/auth/dto"

describe("App e2e", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    // Imports module, good for unit testing
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    // Created a testing application
    app = moduleRef.createNestApplication()

    // Enabled Global Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )

    // Started application testing
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService) // app.get gives u acces to any service use
    await prisma.cleanDb()

    // Setting base Url
    pactum.request.setBaseUrl("http://localhost:3333")
  })

  afterAll(() => {
    app.close() // Every started application needs to close
  })

  describe("Auth", () => {
    const dto: SignUpDto = {
      email: "r@g.com",
      password: "123",
    }

    describe("Signup", () => {
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })

      it("should throw if no body provided", () => {
        return pactum.spec().post("/auth/signup").withBody({}).expectStatus(400)
      })

      it("should signup", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto)
          .expectStatus(201)
      })
    })

    describe("Signin", () => {
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it("should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })

      it("should throw if no body provided", () => {
        return pactum.spec().post("/auth/signin").withBody({}).expectStatus(400)
      })
      it("should signin", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
          // userAt is the key at which the value is stored, and 'access_token' is acquired from body
          .stores('userAt', 'access_token') 
      })
    })
  })

  describe("User", () => {
    describe("Get me", () => {
        it("Should get current user", ()=> {
            return pactum.spec().get('/users/me').withHeaders({
                Authorization: 'Bearer $S{userAt}' // $S acts as variable marker, userAt is from .stores
            }).expectStatus(200)
        })
    })
    describe("Edit User", () => {})
  })

  describe("Bookmarks", () => {
    describe("Create Bookmarks", () => {})
    describe("Get bookmark by id", () => {})
    describe("Edit bookmark by id", () => {})
    describe("Delete bookmark by id", () => {})
  })
})
