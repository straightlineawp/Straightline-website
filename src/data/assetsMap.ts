export const assetsMap: Record<string, { images: string[], video: string | null }> = {
  'articulated-diesel': {
    images: ['articulated-diesel-1.webp', 'articulated-diesel-2-.webp', 'articulated-diesel-3.webp', 'articulated-diesel-4.webp'],
    video: 'articulating-boom-lift.mp4'
  },
  'articulated-electric': {
    images: ['articulated-electric-1.webp', 'articulated-electric-2.webp', 'articulated-electric-3.webp'],
    video: 'articulated-electric-boom-lift.mp4'
  },
  'telescopic-diesel': {
    images: ['telescopic-diesel-1.webp', 'telescopic-diesel-2.webp', 'telescopic-diesel-3.webp'],
    video: 'telescopic-boom-lift-diesel.mp4'
  },
  'telescopic-electric': {
    images: ['telescopic-electric-1.webp', 'telescopic-electric-2.webp'],
    video: 'telescopic-electric.mp4'
  },
  'self-propelled-scissor-lift': {
    images: ['scissor-lift-1.png', 'scissor-lift-2.jpg', 'scissor-lift-3.png', 'scissor-lift-4.jpg', 'scissor-lift-5.png'],
    video: 'self-propelled-scissor-lift.mp4'
  },
  'crawler-scissor-lift': {
    images: ['crawler-scissor-lift-1.png', 'crawler-scissor-lift-2.png', 'crawler-scissor-lift-3.png'],
    video: 'crawler-scissor-lift-.mp4'
  },
  'rough-terrain-scissor-lift': {
    images: ['rough-terrain-scissor-lift-1.png', 'rough-terrain-scissor-lift-2.png', 'rough-terrain-scissor-lift-3.png'],
    video: 'rough-terrain-scissor-lift.mp4'
  },
  'mini-electric-scissor-lift': {
    images: ['mini-electric-scissor-lift-1.png', 'mini-electric-scissor-lift-2.png', 'mini-electric-scissor-lift-3.png', 'mini-electric-scissor-lift-4.png', 'mini-electric-scissor-lift-5.png'],
    video: 'mini-electric-scissor-lift.mp4'
  }
};

export const getCategoryFolder = (sku: string) => {
  if (sku.includes('A-EV')) return 'articulated-electric';
  if (sku.includes('T-EV')) return 'telescopic-electric';
  if (sku.includes('A') && !sku.includes('GTJZ')) return 'articulated-diesel';
  if (sku.includes('T') && !sku.includes('GTJZ')) return 'telescopic-diesel';
  if (sku.includes('ZTLD')) return 'crawler-scissor-lift';
  if (sku.includes('YY')) return 'rough-terrain-scissor-lift';
  
  if (sku.includes('GTJZ')) {
    // Mini Electric Scissor Lifts:
    const minis = ['SLGTJZ03', 'SLGTJZ04', 'SLGTJZ04.5', 'SLGTJZ05.6', 'SLGTJZ06A', 'SLGTJZ08A'];
    if (minis.includes(sku)) return 'mini-electric-scissor-lift';
    
    // Default for the rest of GTJZ is self-propelled
    return 'self-propelled-scissor-lift';
  }
  
  return 'self-propelled-scissor-lift';
};

export const getAssetsForSku = (sku: string) => {
  const folder = getCategoryFolder(sku);
  const data = assetsMap[folder];
  return {
    folder,
    images: data?.images || [],
    video: data?.video || null
  };
};
