/**
 * Unsplash photography used as temporary editorial and service imagery.
 * Keep image URLs centralized so they can later be replaced with owned assets.
 */
const unsplashImage = (photoId: string, width = 1600) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=82`;

export const imageAssets = {
  hero: unsplashImage("photo-1722566686624-47a27ec5553e", 1800),
  suv: unsplashImage("photo-1779112477680-439c2a939dcf"),
  sedan: unsplashImage("photo-1780263298077-6a73ed4cf7c7"),
  mpv: unsplashImage("photo-1748215210950-536c6621629a"),
  minibus: unsplashImage("photo-1770180902343-955630d9f678"),
} as const;
