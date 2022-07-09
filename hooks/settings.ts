import { showToast } from "@/components/Toast";
import { Favorite } from "@/types/favorites";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themes = ["light", "dark"] as const;
type Theme = typeof themes[number];

interface Settings {
  theme: Theme;
  openLinksInNewTab: boolean;
  favoritesEnabled: boolean;
  favorites: Favorite[];
}

const settingsAtom = atomWithStorage<Settings>("settings", {
  theme: "dark",
  openLinksInNewTab: false,
  favoritesEnabled: false,
  favorites: [],
});

export const useSettings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const mergeSettings = (newSettings: Partial<Settings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return { settings, setSettings, mergeSettings };
};

export const useTheme = () => {
  const { settings, mergeSettings } = useSettings();

  const setTheme = (theme: Theme) => {
    mergeSettings({ theme });
    document.body.dataset.theme = theme;
  };

  const toggleTheme = () => {
    if (settings.theme == "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isLightTheme = settings.theme == "light";
  const isDarkTheme = settings.theme == "dark";

  return {
    setTheme,
    toggleTheme,
    isLightTheme,
    isDarkTheme,
  };
};

export const useFavorites = () => {
  const { settings, mergeSettings } = useSettings();

  const setFavoritesEnabled = (favoritesEnabled: boolean) => {
    console.log("Setting favs enavled: ", favoritesEnabled);
    mergeSettings({ favoritesEnabled });
  };

  const setFavorites = (favorites: Favorite[]) => mergeSettings({ favorites });

  const addFavorite = (newFavorite: Favorite) => {
    mergeSettings({
      favoritesEnabled: true,
      favorites: [...settings.favorites, newFavorite],
    });
    showToast({ text: "Favorite added" });
  };

  const isFavorited = (favorite: Pick<Favorite, "href">) =>
    !!settings.favorites.find(
      (existingFavorite) => existingFavorite.href === favorite.href
    );

  const removeFavorite = (favorite: Pick<Favorite, "href">) => {
    mergeSettings({
      favorites: settings.favorites.filter(
        (existingFavorite) => existingFavorite.href !== favorite.href
      ),
    });
    showToast({ text: "Favorite removed" });
  };

  return {
    setFavoritesEnabled,
    setFavorites,
    addFavorite,
    isFavorited,
    removeFavorite,
  };
};