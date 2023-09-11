/** @type {import('next').NextConfig} */

module.exports = { async rewrites() {
    return [
      {
        source: '/mammamia/:path*',
        destination: "http://127.0.0.1:8000/:path*"
      }
    ]
  }
}