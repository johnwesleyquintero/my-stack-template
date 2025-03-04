import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

async function generateIcons() {
  // Read the SVG file
  const svgBuffer = await sharp(path.join(PUBLIC_DIR, 'icon.svg'))
    .flatten({ background: '#FFFFFF' })
    .toBuffer()

  // Generate different sizes
  const sizes = [
    { name: 'icon-192x192.png', size: 192 },
    { name: 'icon-512x512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.ico', size: 32 },
  ]

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(PUBLIC_DIR, name))

    console.log(`✓ Generated ${name}`)
  }
}

async function generateSocialImages() {
  // Read the social card SVG
  const svgBuffer = await sharp(path.join(PUBLIC_DIR, 'social-card.svg'))
    .flatten({ background: '#FFFFFF' })
    .toBuffer()

  // Generate OG image
  await sharp(svgBuffer)
    .resize(1200, 630)
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'))

  console.log('✓ Generated og-image.png')

  // Generate Twitter image
  await sharp(svgBuffer)
    .resize(1200, 600)
    .toFile(path.join(PUBLIC_DIR, 'twitter-image.png'))

  console.log('✓ Generated twitter-image.png')
}

async function main() {
  console.log('🎨 Generating assets...\n')

  try {
    await generateIcons()
    await generateSocialImages()
    console.log('\n✨ All assets generated successfully!')
  } catch (error) {
    console.error('\n❌ Error generating assets:', error)
    process.exit(1)
  }
}

main()
