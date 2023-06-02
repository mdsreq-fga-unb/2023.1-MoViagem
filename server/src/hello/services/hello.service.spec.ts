import { createMock } from "@golevelup/ts-jest";
import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { UserRepository } from "../../auth/repositories/user.repository";
import { HelloService } from "./hello.service";

describe("HelloService tests", () => {
  let userRepository: UserRepository;
  let helloService: HelloService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HelloService],
    })
      .useMocker(createMock)
      .compile();

    userRepository = moduleRef.get(UserRepository);
    helloService = moduleRef.get(HelloService);
  });

  describe("getHello", () => {
    it('should return "Hello test!"', async () => {
      // Arrange
      jest.spyOn(userRepository, "findUserById").mockResolvedValue({
        id: 1,
        name: "test",
        email: "email@example.com",
        password: "password",
      });

      // Act
      const result = await helloService.getHello(1);

      // Assert
      expect(result).toBe("Hello test!");
    });
  });

  it("should throw an error if user is not found", async () => {
    // Arrange
    jest.spyOn(userRepository, "findUserById").mockResolvedValue(null);

    // Act
    const result = helloService.getHello(1);

    // Assert
    await expect(result).rejects.toThrow(UnauthorizedException);
  });
});
