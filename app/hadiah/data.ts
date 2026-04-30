/** Prize definition for each bus */
export interface Prize {
  name: string;
  quantity: number;
  image: string; // path relative to /public, e.g. "/img/centong.png"
}

/** All prizes keyed by bus number */
export const BUS_PRIZES: Record<string, Prize[]> = {
  '1': [
    { name: 'Centong', quantity: 15, image: '/img/centong.png' },
    { name: 'Solet', quantity: 9, image: '/img/solet.png' },
    { name: 'Tumblr', quantity: 9, image: '/img/tumblr.png' },
    { name: 'Phone Holder', quantity: 2, image: '/img/phone-holder.png' },
    { name: 'Bantal Tiup', quantity: 1, image: '/img/bantal-tiup.png' },
    { name: 'Gayung', quantity: 3, image: '/img/gayung.png' },
    { name: 'Tisu', quantity: 2, image: '/img/tisu.png' },
    { name: 'Penebah', quantity: 2, image: '/img/penebah.png' },
    { name: 'Headset Hitam', quantity: 1, image: '/img/headset-hitam.png' },
    { name: 'Mangkok', quantity: 1, image: '/img/mangkok.png' },
    { name: 'Bolpoin', quantity: 2, image: '/img/bolpoin.png' },
    { name: 'Keranjang', quantity: 2, image: '/img/keranjang.png' },
    { name: 'Powerbank', quantity: 1, image: '/img/powerbank.png' },
  ],
  '2': [
    { name: 'Centong', quantity: 15, image: '/img/centong.png' },
    { name: 'Solet', quantity: 9, image: '/img/solet.png' },
    { name: 'Tumblr', quantity: 9, image: '/img/tumblr.png' },
    { name: 'Phone Holder', quantity: 1, image: '/img/phone-holder.png' },
    { name: 'Bantal Tiup', quantity: 1, image: '/img/bantal-tiup.png' },
    { name: 'Gayung', quantity: 4, image: '/img/gayung.png' },
    { name: 'Tisu', quantity: 2, image: '/img/tisu.png' },
    { name: 'Penebah', quantity: 2, image: '/img/penebah.png' },
    { name: 'Headset Hitam', quantity: 1, image: '/img/headset-hitam.png' },
    { name: 'Headset Macaron', quantity: 1, image: '/img/headset-macaron.png' },
    { name: 'Bolpoin', quantity: 2, image: '/img/bolpoin.png' },
    { name: 'Panci', quantity: 1, image: '/img/panci.png' },
    { name: 'Keranjang', quantity: 2, image: '/img/keranjang.png' },
  ],
};

/**
 * Curated color palette for wheel segments.
 * Each color is distinct enough to be readable side-by-side.
 */
export const SEGMENT_COLORS = [
  '#EF4444', // red
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
  '#6366F1', // indigo
  '#06B6D4', // cyan
  '#D946EF', // fuchsia
  '#84CC16', // lime
  '#E11D48', // rose
];
