export function errorHandler(error: unknown) {
    if (error instanceof Error) {
        console.error(error.message);
    }

    console.error(error as string);
}
