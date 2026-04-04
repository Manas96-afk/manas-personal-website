import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manas Bandhu | Creative Technologist',
    short_name: 'Manas Bandhu',
    description: 'Personal portfolio of Manas Bandhu, exploring the intersection of creative storytelling, data analysis, and technical logic.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
