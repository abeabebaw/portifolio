import { NextResponse } from 'next/server'
import { getCvAsset } from '@/lib/data'

export const runtime = 'nodejs'

export async function GET() {
  const cvAsset = await getCvAsset()

  if (!cvAsset) {
    return NextResponse.json({ error: 'CV not found' }, { status: 404 })
  }

  const pdfBytes = Buffer.from(cvAsset.dataBase64, 'base64')

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': cvAsset.contentType || 'application/pdf',
      'Content-Disposition': `inline; filename="${cvAsset.filename || 'cv.pdf'}"`,
      'Content-Length': String(pdfBytes.length),
      'Cache-Control': 'no-store',
    },
  })
}