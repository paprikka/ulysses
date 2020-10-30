import { fetch } from './fetch'
import { trackVisits } from './track-visits'

// TODO: for now, we're just mocking fetch via jest.mock
// because the code is fairly trivial,
// but if this gets more complex, we might want to use
// msw or a similar tool 🤷‍♀️

jest.mock('./fetch', () => ({
    fetch: (url: unknown, opts: unknown) => ({
        url,
        opts,
    }),
}))

it('should log a visit but ignore ALL cookies', async () => {
    expect(await trackVisits()).toStrictEqual({
        url: '/api/hello',
        opts: {
            credentials: 'omit',
        },
    })
})
