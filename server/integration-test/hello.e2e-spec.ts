import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import request, { SuperTest, Test } from "supertest";
import { UserRepository } from "../src/auth/repositories/user.repository";
import { createIntegrationTestModule } from "./test-module";

describe("Hello endpoints test", () => {
  let app: INestApplication;
  let server: SuperTest<Test>;

  let jwtService: JwtService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleRef = await createIntegrationTestModule();

    app = moduleRef.createNestApplication();
    jwtService = moduleRef.get(JwtService);
    userRepository = moduleRef.get(UserRepository);

    await app.init();

    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe("not authenticated", () => {
    it(`/GET hello should return 401`, async () => {
      // Arrange & Act
      const response = await server.get("/api/hello");

      // Assert
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        statusCode: 401,
        message: "Unauthorized",
      });
    });
  });

  describe("authenticated", () => {
    let token: string;

    beforeAll(async () => {
      token = jwtService.sign({}, { expiresIn: 60, subject: "1" });
    });

    it(`/GET hello should return "Hello John Doe!"`, async () => {
      // Arrange
      jest.spyOn(userRepository, "findUserById").mockResolvedValue({
        id: 1,
        name: "John Doe",
        email: "johndoe@email.com",
        password: "321321654",
      });

      // Act
      const response = await server.get("/api/hello").set("Authorization", `Bearer ${token}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.text).toEqual("Hello John Doe!");
    });
  });
});
