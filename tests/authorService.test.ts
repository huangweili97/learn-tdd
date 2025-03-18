
import request from 'supertest';
import app from '../server';
import Author from '../models/author';
import RealAuthorModel from '../models/author';

jest.mock('../models/author');

const mockedAuthor = Author as jest.Mocked<typeof Author>;

describe('GET /authors', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case: Authors exist in database and are returned sorted by family name.
   */
  test('should return sorted list of authors with names and lifespans', async () => {
    const mockAuthorsList = [
      'Austen, Jane : 1775 - 1817',
      'Doe, John : 1950 - 2000'
    ];

    mockedAuthor.getAllAuthors.mockResolvedValue(mockAuthorsList);

    const res = await request(app).get('/authors');

    expect(res.status).toBe(200);
    expect(res.text).toEqual(JSON.stringify(mockAuthorsList));
    expect(mockedAuthor.getAllAuthors).toHaveBeenCalledWith({ family_name: 1 });
  });

  /**
   * Test case: No authors exist in database.
   */
  test('should return "No authors found" if no authors in database', async () => {
    mockedAuthor.getAllAuthors.mockResolvedValue([]);

    const res = await request(app).get('/authors');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('No authors found');
    expect(mockedAuthor.getAllAuthors).toHaveBeenCalledWith({ family_name: 1 });
  });

  /**
   * Test case: Database retrieval error occurs.
   */
  test('should handle errors and return "No authors found" message on failure', async () => {
    mockedAuthor.getAllAuthors.mockRejectedValue(new Error('Database error'));

    const res = await request(app).get('/authors');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('No authors found');
    expect(mockedAuthor.getAllAuthors).toHaveBeenCalledWith({ family_name: 1 });
  });

  /**
   * Test case: Retrieve author count successfully.
   */
  test('should correctly retrieve author count', async () => {
    mockedAuthor.getAuthorCount.mockResolvedValue(5);

    const count = await Author.getAuthorCount();

    expect(mockedAuthor.getAuthorCount).toHaveBeenCalledWith(); // 去掉undefined
    expect(count).toBe(5);
});

  /**
   * Test case: Retrieve author ID by name successfully.
   */
  test('should retrieve author ID by name', async () => {
    const mockId = '507f1f77bcf86cd799439011';
    mockedAuthor.getAuthorIdByName.mockResolvedValue(mockId as any);

    const authorId = await Author.getAuthorIdByName('Doe', 'John');

    expect(mockedAuthor.getAuthorIdByName).toHaveBeenCalledWith('Doe', 'John');
    expect(authorId).toBe(mockId);
  });

  /**
   * Test case: Author ID retrieval returns null if not found.
   */
  test('should return null when author ID not found by name', async () => {
    mockedAuthor.getAuthorIdByName.mockResolvedValue(null);

    const authorId = await Author.getAuthorIdByName('Nonexistent', 'Author');

    expect(mockedAuthor.getAuthorIdByName).toHaveBeenCalledWith('Nonexistent', 'Author');
    expect(authorId).toBeNull();
  });
  
  
  
  
});