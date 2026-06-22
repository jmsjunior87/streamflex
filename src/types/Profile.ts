export interface Profile {
  id: string;
  name: string;
  avatar: string;
}

export const getDefaultProfiles = (): Profile[] => [
  { id: 'default-1', name: 'Gabriel', avatar: '🐶' },
  { id: 'default-2', name: 'Mel', avatar: '🐱' },
  { id: 'default-3', name: 'Junior', avatar: '🦄' },
];