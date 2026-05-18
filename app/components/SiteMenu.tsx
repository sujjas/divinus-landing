'use client';

import StaggeredMenu from './StaggeredMenu';
import LogoLockup from './LogoLockup';

const MENU_ITEMS = [
  { label: 'Home',        ariaLabel: 'Home',                  link: '/' },
  { label: 'About',       ariaLabel: 'About Divinus',         link: '/about' },
  { label: 'Divisions',   ariaLabel: 'Seven divisions',       link: '/divisions' },
  { label: 'Communities', ariaLabel: 'Communities',           link: '/communities' },
  { label: 'Events',      ariaLabel: 'Events and convenings', link: '/events' },
  { label: 'Insights',    ariaLabel: 'Writing and insights',  link: '/blog' },
  { label: 'Connect',     ariaLabel: 'Get in touch',          link: '/contact' },
];

const SOCIAL_ITEMS = [
  { label: 'Instagram', link: 'https://www.instagram.com/divinus_investment_group?igsh=OHpibzQ1eWNtN2l5&utm_source=qr' },
  { label: 'X',         link: 'https://x.com/divinus_ai?s=21&t=8ojLx-hNg3eHv6iQt1Q5UA' },
];

export default function SiteMenu() {
  return (
    <StaggeredMenu
      isFixed
      position="right"
      items={MENU_ITEMS}
      socialItems={SOCIAL_ITEMS}
      displaySocials
      displayItemNumbering
      logoNode={<LogoLockup className="sm-logo-img" />}
      menuButtonColor="#fafafa"
      openMenuButtonColor="#fafafa"
      changeMenuColorOnOpen
      accentColor="#C9A84C"
      colors={['#0a0a0a', '#171717', '#1f1f1f']}
    />
  );
}
