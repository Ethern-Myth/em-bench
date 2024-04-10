import { Request, Response } from "express";

/**
 * Decorator function that logs the start time, end time, and duration of method execution.
 * @param _target - Ignored parameter, represents the constructor function of the class for instance methods.
 * @param _propertyKey - Ignored parameter, represents the name of the decorated property.
 * @param descriptor - Descriptor object representing the property being decorated.
 * @returns Modified descriptor with timing logging functionality added.
 */

export function Benchmark(
	_target: any,
	_propertyKey: string,
	descriptor: PropertyDescriptor
) {
	const originalMethod = descriptor.value;

	descriptor.value = async function (req: Request, res: Response) {
		// Log the start time
		const start = process.hrtime();
		console.log(
			`[${req.method}] ${req.originalUrl} - Start time: ${start[0]}s ${
				start[1] / 1000000
			}ms`
		);

		// Call the original method asynchronously
		await originalMethod.apply(this, [req, res]);

		// Calculate and log the end time
		const end = process.hrtime(start);
		console.log(
			`[${req.method}] ${req.originalUrl} - End time: ${end[0]}s ${
				end[1] / 1000000
			}ms`
		);

		// Calculate the elapsed time in milliseconds
		const elapsedTime = (end[0] * 1e9 + end[1]) / 1e6; // in milliseconds
		// Log the duration
		console.log(
			`[${req.method}] ${req.originalUrl} - Duration: ${elapsedTime}ms`
		);
	};

	// Return the modified descriptor
	return descriptor;
}
