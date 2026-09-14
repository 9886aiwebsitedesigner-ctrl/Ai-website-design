import React from 'react';

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  ariaLabel: string;
  isHighlighted?: boolean;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/junkohairstudio/',
    ariaLabel: 'Visit Junko Hair Studio on Instagram'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/junkohairstudio/',
    ariaLabel: 'Visit Junko Hair Studio on Facebook'
  },
  {
    id: 'yelp',
    name: 'Yelp',
    url: 'https://www.yelp.com/biz/junko-hair-studio-atlanta?dd_referrer=',
    ariaLabel: 'Read Junko Hair Studio Reviews on Yelp'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    url: 'https://www.instagram.com/junkohairstudio/',
    ariaLabel: 'Discover Junko Hair Studio on Pinterest'
  },
  {
    id: 'shop',
    name: 'Shop Products',
    url: 'https://shop.saloninteractive.com/store/junko-hair-studio-95652',
    ariaLabel: 'Shop Professional Hair Care Products on SalonInteractive',
    isHighlighted: true
  }
];

interface SocialIconsProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  includeShop?: boolean;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  className = '',
  iconSize = 'sm',
  showLabels = false,
  includeShop = true
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const buttonClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5'
  };

  const filteredLinks = SOCIAL_LINKS.filter(item => includeShop || item.id !== 'shop');

  const renderIcon = (id: string, sizeClass: string) => {
    switch (id) {
      case 'shop':
        return (
          <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className={sizeClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.82 0-1.667.207-2.073.655-.407.447-.487 1.096-.487 2.077v1.252h4.526l-.602 3.667h-3.924v7.98a12.015 12.015 0 0 0 3.01-.849 11.97 11.97 0 0 0 4.966-4.066 12.01 12.01 0 0 0 2.22-6.985c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 2.593.823 4.996 2.22 6.985a11.97 11.97 0 0 0 4.966 4.066 12.015 12.015 0 0 0 3.01.849z" />
          </svg>
        );
      case 'yelp':
        return (
          <svg className={sizeClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.44 14.12l4.89 3.05c.82.51.55 1.76-.39 1.85l-5.69.57c-.55.05-1.02-.37-.99-.92l.24-5.74c.03-.68.74-1.08 1.94 1.19zm-3.05-1.89L4.5 9.18c-.82-.51-.55-1.76.39-1.85l5.69-.57c.55-.05 1.02.37.99.92l-.24 5.74c-.03.68-.74 1.08-1.94-1.19zm2.46-2.58l.68-5.68c.11-.96 1.4-.96 1.51 0l.68 5.68c.07.55-.31 1.05-.85 1.11l-1.17.13c-.54.06-1.05-.31-.85-1.24zm3.93 1.48l5.22-2.43c.88-.41 1.43.76.79 1.45l-4.11 4.45c-.4.43-1.07.45-1.49.03l-.86-.86c-.42-.42-.4-1.09.45-2.64zm-5.45 4.67l-2.43 5.22c-.41.88-1.76.65-1.85-.39l-.57-5.69c-.05-.55.37-1.02.92-.99l5.74.24c.68.03 1.08.74-1.81 1.61z" />
          </svg>
        );
      case 'pinterest':
        return (
          <svg className={sizeClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.08-.98-.15-2.49.03-3.56.17-.98 1.1-4.7 1.1-4.7s-.28-.56-.28-1.39c0-1.3 0.75-2.27 1.69-2.27.8 0 1.18.6 1.18 1.32 0 .8-.51 2.01-.78 3.12-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.84-3.95-3.84-2.88 0-4.57 2.16-4.57 4.39 0 .87.33 1.8.75 2.31.08.1.09.19.07.29-.08.33-.26 1.07-.3 1.22-.05.2-.17.24-.39.15-1.45-.67-2.36-2.79-2.36-4.49 0-3.66 2.66-7.02 7.68-7.02 4.03 0 7.16 2.87 7.16 6.71 0 4.01-2.53 7.23-6.04 7.23-1.18 0-2.29-.61-2.67-1.33l-.73 2.77c-.26 1.01-.98 2.27-1.46 3.05A12 12 0 1 0 12 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {filteredLinks.map((item) => {
        const isShop = item.id === 'shop';
        return (
          <a
            key={item.id}
            id={`social-link-${item.id}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            title={item.name}
            className={`group flex items-center gap-1.5 ${buttonClasses[iconSize]} rounded-sm transition-all duration-200 ${
              isShop
                ? 'text-[#F7F4EF] bg-gradient-to-r from-[#C5A880]/25 to-[#9E825D]/25 hover:from-[#C5A880] hover:to-[#D5BCA0] hover:text-[#121110] border border-[#C5A880]/70 hover:border-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.25)]'
                : 'text-[#A89F93] hover:text-[#C5A880] bg-[#1F1D1A]/60 hover:bg-[#2A2621] border border-[#332F2A] hover:border-[#C5A880]/50'
            }`}
          >
            <span className={`${isShop ? 'text-[#C5A880] group-hover:text-[#121110]' : ''} group-hover:scale-110 transition-transform duration-200 relative`}>
              {renderIcon(item.id, sizeClasses[iconSize])}
              {isShop && (
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-ping" />
              )}
            </span>
            {showLabels && (
              <span className={`text-[11px] font-medium tracking-wider uppercase pr-1 ${
                isShop 
                  ? 'text-[#C5A880] group-hover:text-[#121110] font-semibold'
                  : 'text-[#C8C0B5] group-hover:text-[#F3EFEA]'
              }`}>
                {item.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};
