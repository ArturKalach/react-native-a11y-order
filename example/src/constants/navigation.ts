export type NavItem = {
  id: string;
  label: string;
  desc: string;
  color: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'Circle',
    label: 'Unit Circle',
    desc: 'Focus order on the math unit circle',
    color: '#2563eb',
  },
  {
    id: 'Reorder',
    label: 'Reorder',
    desc: 'Dynamic focus order changes',
    color: '#059669',
  },
  {
    id: 'Group',
    label: 'Group',
    desc: 'Grouped accessibility layout',
    color: '#d97706',
  },
  {
    id: 'ScreenReaderFocus',
    label: 'Focus Events',
    desc: 'Focus and blur event tracking',
    color: '#dc2626',
  },
  {
    id: 'FocusLock',
    label: 'Focus Lock',
    desc: 'Trap focus within an area',
    color: '#9333ea',
  },
  {
    id: 'AutoFocus',
    label: 'Auto Focus',
    desc: 'Auto-focus on mount',
    color: '#0891b2',
  },
  {
    id: 'AnnounceExamples',
    label: 'Announce',
    desc: 'Screen reader announcements',
    color: '#65a30d',
  },
  {
    id: 'Card',
    label: 'Card',
    desc: 'Tappable card with inner buttons',
    color: '#0369a1',
  },
  {
    id: 'UIContainer',
    label: 'UI Container',
    desc: 'iOS UIAccessibilityContainerType variants',
    color: '#7c3aed',
  },
  {
    id: 'Slider',
    label: 'Slider',
    desc: 'Accessible horizontal scroll',
    color: '#7c3aed',
  },
];
