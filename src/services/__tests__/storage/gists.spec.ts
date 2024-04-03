import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GistsService } from '../../storages/gists.service'

describe('GistsService', () => {
  const mockConfig = {
    token: 'mock-token',
    id: 'mock-gist-id',
    name: 'mock-gist-name'
  };
  let mockData: app.NoteType

  beforeEach(() => {
    mockData =  {
        id: 1,
        author: {
            email: 'example@example.com',
            name: 'example',
            picture: 'https://example.com/example.png'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        moodId: 6,
        text: 'test text',
    }
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches data from GitHub Gists API', async () => {
    const mockResponse = {
      files: {
        [mockConfig.name]: {
          content: JSON.stringify(mockData)
        }
      }
    };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    globalThis.fetch = vi.fn().mockResolvedValueOnce(mockFetchPromise);

    const gistsService = new GistsService(mockConfig);
    const data = await gistsService.getData();

    expect(globalThis.fetch).toHaveBeenCalledWith(`https://api.github.com/gists/${mockConfig.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${mockConfig.token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    expect(data).toEqual(mockData);
  });

  it('sends data to GitHub Gists API', async () => {

    const gistsService = new GistsService(mockConfig);
    await gistsService.setData([mockData]);

    expect(globalThis.fetch).toHaveBeenCalledWith(`https://api.github.com/gists/${mockConfig.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${mockConfig.token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      body: JSON.stringify({
        files: {
          [mockConfig.name]: {
            content: JSON.stringify([mockData])
          }
        }
      })
    });
  });
});
