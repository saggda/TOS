import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image size
export const size = {
  width: 32,
  height: 32,
}

// Image metadata
export const contentType = 'image/png'

// Generate icon using ImageResponse
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: 'linear-gradient(135deg, #7A0F1C 0%, #9333EA 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          borderRadius: '8px',
        }}
      >
        P
      </div>
    ),
    {
      ...size,
    }
  )
}
