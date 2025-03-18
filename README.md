# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

**Windows Note**: If you are on Windows and the above commands do not run
because of NODE_ENV not recognized then first set the environment variable from the terminal using `SET NODE_ENV=test` and then
run the jest command `npx jest --covereage /path/to/test/file`. The coverage is optional.

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

The existing tests in authorSchema.test.ts focus only on schema validation rules and virtual properties. They don't verify interactions with the real database, meaning issues like database constraints, connection errors, or integration problems might not be detected by these tests.



## Part 3

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.

1. Database Exceptions Testing:
I'll simulate scenarios where database operations fail by explicitly mocking methods to throw errors (e.g., testing methods like getAllAuthors, getAuthorCount, and getAuthorIdByName).
This ensures that error-handling logic is triggered, verifying proper responses when the database encounters issues.
2. Edge Cases with Empty Results:
I'll add tests to verify behavior when the database returns no data, such as empty author lists or a count of zero. This step validates that the application gracefully handles cases where expected data is absent.
3. Handling Null and Undefined Values:
I'll implement tests to examine the application's behavior when encountering null or undefined values for essential fields (e.g., author name, birth, or death dates).
These tests help ensure the robustness of virtual property computations and prevent unexpected runtime errors.
4. Invalid or Incorrect Input Parameters:
I'll craft tests with deliberately invalid parameters (such as malformed IDs or incorrect sorting options) to verify that methods handle incorrect inputs predictably, either by defaulting safely or by producing clear, meaningful error messages.
5. Validation of Virtual Properties:
I'll write specific tests to fully cover virtual properties (name and lifespan) within the author model, ensuring correctness under various data combinations (e.g., missing birth or death dates). This step guarantees that computed properties accurately reflect intended logic across all possible cases.

Expected Outcome:
By systematically executing this enhanced testing strategy, I will achieve higher code coverage, reinforcing my application's reliability. These rigorous tests will help uncover and prevent potential bugs and vulnerabilities, leading to more robust error handling and greater maintainability in the long term. Ultimately, this approach ensures the codebase is both resilient and ready for future development and integration.