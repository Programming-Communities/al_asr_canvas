// components/shared/SocialShareButtons.tsx
'use client';
import React, { useState } from 'react';

interface SocialShareButtonsProps {
  title: string;
  slug?: string;
  excerpt?: string;
  url?: string;
  onShare?: () => void;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ 
  title, 
  slug, 
  excerpt = '',
  url,
  onShare
}) => {
  const [copied, setCopied] = useState(false);

  // Get the correct URL
  const getShareUrl = () => {
    if (url) return url;
    if (slug) return `https://al-asr.centers.pk/posts/${slug}`;
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const shareOnPlatform = (platform: string) => {
    const shareUrl = getShareUrl();
    if (!shareUrl) return;
    
    const shareText = `${title} - Al Asr Islamic Service`;
    
    const platforms: { [key: string]: string } = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    };

    const windowFeatures = 'width=600,height=400,menubar=no,toolbar=no,location=no';
    const newWindow = window.open(platforms[platform], '_blank', windowFeatures);
    
    if (newWindow) {
      newWindow.opener = null;
    }
    
    if (onShare) {
      onShare();
    }
  };

  const copyToClipboard = async () => {
    const shareUrl = getShareUrl();
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialButtons = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      color: 'bg-green-500 hover:bg-green-600',
      icon: '📱',
      textColor: 'text-white'
    },
    {
      key: 'facebook',
      label: 'Facebook', 
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: 'f',
      textColor: 'text-white'
    },
    {
      key: 'twitter',
      label: 'Twitter',
      color: 'bg-black hover:bg-gray-800',
      icon: '𝕏',
      textColor: 'text-white'
    },
    {
      key: 'telegram',
      label: 'Telegram',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '✈️',
      textColor: 'text-white'
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800',
      icon: 'in',
      textColor: 'text-white'
    },
    {
      key: 'copy',
      label: copied ? 'Copied!' : 'Copy Link',
      color: copied ? 'bg-green-500' : 'bg-gray-600 hover:bg-gray-700',
      icon: copied ? '✓' : '📋',
      textColor: 'text-white',
      action: copyToClipboard
    }
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Share Header - More Subtle */}
      <div className="text-center mb-1">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Share Via
        </span>
      </div>

      {/* Social Buttons - Compact Grid */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-60">
        {socialButtons.map((button) => (
          <button
            key={button.key}
            onClick={button.key === 'copy' ? button.action : () => shareOnPlatform(button.key)}
            className={`flex flex-col items-center justify-center p-2 ${button.color} ${button.textColor} rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-16`}
            title={`Share on ${button.label}`}
            aria-label={`Share on ${button.label}`}
          >
            <span className={`font-semibold ${button.key === 'twitter' ? 'text-lg' : button.key === 'facebook' ? 'text-base' : 'text-base'}`}>
              {button.icon}
            </span>
            <span className="text-[10px] font-medium mt-1 leading-tight">
              {button.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialShareButtons;