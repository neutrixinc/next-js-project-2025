/** @type {import('next').NextConfig} */

const staticPatterns = [
  {
    hostname: 'cannavate.nyc3.digitaloceanspaces.com',
  },
  {
    hostname: 'cannavate.nyc3.cdn.digitaloceanspaces.com',
  },
  {
    hostname: 'bloomery-dutchie.nyc3.cdn.digitaloceanspaces.com',
  },
  {
    hostname: 'images.dutchie.com',
  },
  {
    hostname: 's3-us-west-2.amazonaws.com',
  },
  {
    hostname: 'neutrix-site.nyc3.digitaloceanspaces.com',
  },
  {
    hostname: 'dutchie-images.s3.us-west-2.amazonaws.com',
  },
  {
    hostname: 'cdn.alpineiq.com',
  },
]

const getUniqueHostnames = (arr) => {
  return [...new Map(arr.map((item) => [item.hostname, item])).values()]
}

const fetchRemoteImagePatterns = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}api/v1/remote-image-pattern?type=site`
  try {
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(
        `Failed to fetch remote patterns. Status: ${response.status}, Message: ${response.statusText}`,
      )
    }

    const data = await response.json()

    if (!data || !Array.isArray(data?.data)) {
      return staticPatterns
    }

    const patterns = data?.data
      .map((item) => item?.hostname?.trim())
      .filter((hostname) => hostname)

    return getUniqueHostnames([
      ...staticPatterns,
      ...patterns.map((hostname) => ({ hostname })),
    ])
  } catch (error) {
    console.error('Error fetching remote image patterns:', error.message)
    return staticPatterns
  }
}

const remotePatterns = await fetchRemoteImagePatterns()

const nextConfig = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false, // Disable build activity indicators
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/Categories', // for JARS
        destination: '/categories',
      },
      {
        source: '/progressier.js',
        destination: '/api/progressier',
      },
    ]
  },
  images: {
    // unoptimized: true,
    remotePatterns,
  },
  async redirects() {
    const siteName = process.env.NEXT_PUBLIC_SITE_HOST?.replace(
      /^https?:\/\//,
      '',
    )

    const staticRedirects = [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.' + siteName }],
        destination: `https://${siteName}/:path*`,
        permanent: true, // redirect to 301 status
      },
    ]

    console.info('redirects', staticRedirects)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_HOST}api/v1/site-config-link/redirects`,
      )

      if (!res.ok) {
        throw new Error(`Failed to fetch redirects: ${res.statusText}`)
      }

      const redirectDataRaw = await res.json()
      const redirectData = redirectDataRaw?.data

      if (!Array.isArray(redirectData) || redirectData.length === 0) {
        console.warn('No redirect data available')
        return staticRedirects
      }

      const dynamicRedirects = redirectData.map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent,
      }))

      return [...staticRedirects, ...dynamicRedirects]
    } catch (error) {
      console.error('Error fetching redirects link:', error.message)
      return staticRedirects
    }
  },
}

export default nextConfig
