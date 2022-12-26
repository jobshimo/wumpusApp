export interface AppState {
  lastGame: string | null;
  darkMode: boolean;
  gameConfiguration: string | null;
}

export const initialAppState: AppState = {
  lastGame: null,
  darkMode: false,
  gameConfiguration: null,
};
