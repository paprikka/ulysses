import { trackVisits } from './track-visits'
import { mocked } from 'ts-jest/utils'

// TODO: for now, we're just mocking fetch via jest.mock
// because the code is fairly trivial,
// but if this gets more complex, we might want to use
// msw or a similar tool 🤷‍♀️
const oldFetch = window.fetch
beforeEach(() => {
    window.fetch = jest
        .fn()
        .mockImplementation((url: unknown, opts: unknown) =>
            Promise.resolve({ url, opts })
        )
})

afterEach(() => mocked(window.fetch).mockClear())

afterAll(() => (window.fetch = oldFetch))

it('should log a visit but ignore ALL cookies', async () => {
    expect(await trackVisits()).toStrictEqual({
        url: '/api/hello',
        opts: {
            credentials: 'omit',
        },
    })
})
