import { Benchmark } from "./../src/index";
import { Request, Response } from "express";

describe("Benchmark Decorator", () => {
	let originalLog: typeof console.log;

	beforeAll(() => {
		// Spy on console.log and store the original implementation
		originalLog = console.log;
		console.log = jest.fn();
	});

	afterAll(() => {
		// Restore the original console.log implementation
		console.log = originalLog;
	});

	it("should log start and end time of the method execution", async () => {
		const req: Partial<Request> = {
			method: "GET",
			originalUrl: "/test",
		};

		const res: Partial<Response> = {};

		const originalMethod = jest.fn(async () => {
			// Mock some async method
			return Promise.resolve();
		});

		const descriptor = {
			value: originalMethod,
		};

		const decoratedMethod = Benchmark({}, "", descriptor);

		// Execute the decorated method
		await decoratedMethod.value(req as Request, res as Response);

		// Assert that original method is called
		expect(originalMethod).toHaveBeenCalled();

		// Assert that console.log is called with start and end time
		expect(console.log).toHaveBeenCalledTimes(3);
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("[GET] /test - Start time:")
		);
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("[GET] /test - End time:")
		);

		// Assert that duration is logged
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining("[GET] /test - Duration:")
		);
	});
});
