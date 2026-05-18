'use client';

import React, {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { usePathname } from 'next/navigation';
import './StaggeredMenu.css';

export type StaggeredMenuItem = {
  label: string;
  ariaLabel?: string;
  link: string;
};

export type StaggeredMenuSocialItem = {
  label: string;
  link: string;
};

export type StaggeredMenuProps = {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  logoNode?: ReactNode;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

// "Surface motion" curve — popularised by Vercel / Linear / Vaul. Reads as
// confident without the snap of power4.out. Used for the panel + items so
// the menu lands like a tool, not a performance.
const SURFACE_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/divinus-logo.svg',
  logoNode,
  menuButtonColor = '#fafafa',
  openMenuButtonColor = '#fafafa',
  accentColor = '#C9A84C',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const pathname = usePathname();
  const isActiveLink = (link: string) => {
    if (!pathname || !link) return false;
    if (link === '/') return pathname === '/';
    return pathname === link || pathname.startsWith(link + '/');
  };

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);

  // Two-state slot, not a slot machine. One transition, no cycling.
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  // Focus management: remember what to return to on close.
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
    );
    const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map((el) => ({ el, start: offscreen }));
    const panelStart = offscreen;

    // Items: pure Y-translation, no rotate. Cleaner read, less "look at me".
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 18, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Pre-layers: tighter stagger (0.05 → was 0.07). They should feel like a
    // single weighted entrance, not three separate slides.
    const layerStagger = 0.05;
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.35, ease: SURFACE_EASE },
        i * layerStagger,
      );
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * layerStagger : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.04 : 0);
    // Panel duration: 0.4s (was 0.65). Total open lands ~500ms instead of 1.1s.
    const panelDuration = 0.4;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: SURFACE_EASE },
      panelInsertTime,
    );

    if (itemEls.length) {
      // Items begin slightly after panel starts moving so they ride in
      // *with* the surface, not after it.
      const itemsStart = panelInsertTime + panelDuration * 0.2;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          duration: 0.5,
          ease: SURFACE_EASE,
          stagger: { each: 0.06, from: 'start' },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.35,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.05, from: 'start' },
          } as gsap.TweenVars,
          itemsStart + 0.06,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.5;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.35, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: SURFACE_EASE,
            stagger: { each: 0.05, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            },
          },
          socialsStart + 0.03,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  // Focus the first interactive item inside the panel after open lands.
  const focusFirstItem = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>('a.sm-panel-item, button.sm-panel-item');
    first?.focus({ preventScroll: true });
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    // Reduced motion: skip animation, snap to the open state.
    if (prefersReducedMotion()) {
      const panel = panelRef.current;
      const layers = preLayerElsRef.current;
      if (panel) {
        gsap.set([panel, ...layers], { xPercent: 0 });
        const itemEls = panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel');
        gsap.set(itemEls, { yPercent: 0 });
        const numberEls = panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item');
        gsap.set(numberEls, { '--sm-num-opacity': 1 } as gsap.TweenVars);
        const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
        const socialLinks = panel.querySelectorAll<HTMLElement>('.sm-socials-link');
        if (socialTitle) gsap.set(socialTitle, { opacity: 1 });
        gsap.set(socialLinks, { y: 0, opacity: 1 });
      }
      busyRef.current = false;
      focusFirstItem();
      return;
    }

    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
        focusFirstItem();
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline, focusFirstItem]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    const restoreInitialState = () => {
      const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
      if (itemEls.length) gsap.set(itemEls, { yPercent: 140 });
      const numberEls = Array.from(
        panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
      );
      if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
      const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
      const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));
      if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
      if (socialLinks.length) gsap.set(socialLinks, { y: 18, opacity: 0 });
      busyRef.current = false;
    };

    if (prefersReducedMotion()) {
      gsap.set(all, { xPercent: offscreen });
      restoreInitialState();
      return;
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.28,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: restoreInitialState,
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (prefersReducedMotion()) {
      gsap.set(icon, { rotate: opening ? 45 : 0 });
      return;
    }
    // 45° turns + into ×. The previous 225° was three-quarters of an extra
    // revolution — gratuitous for a state toggle.
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 45 : 0,
      duration: 0.32,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.1,
          duration: 0.25,
          ease: 'power2.out',
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  // Single-swap text transition. No slot machine.
  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    // Two stacked labels in the order [current, target] so a 50% shift
    // reveals the target.
    setTextLines(opening ? ['Menu', 'Close'] : ['Close', 'Menu']);
    gsap.set(inner, { yPercent: 0 });

    if (prefersReducedMotion()) {
      gsap.set(inner, { yPercent: -50 });
      return;
    }

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -50,
      duration: 0.28,
      ease: 'power3.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    if (target) {
      // Remember what to return focus to.
      lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    }
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
      // Return focus to the trigger on close.
      requestAnimationFrame(() => toggleBtnRef.current?.focus());
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
      // Return focus to the trigger so keyboard users land somewhere sane.
      requestAnimationFrame(() => toggleBtnRef.current?.focus());
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  // Click-away (pointerdown — fires earlier than mousedown on touch too).
  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: PointerEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  // ESC closes. Tab while open is trapped inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === 'Tab') {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || active === toggleBtnRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeMenu]);

  // Body scroll lock + Lenis pause while the menu is open. Without this,
  // wheel/touch behind the dim panel still scrolls the page.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [open]);

  // Close the menu automatically when the route changes (clicking a menu
  // item triggers a Next.js push). Belt-and-braces alongside the `onClick`
  // in each item.
  useEffect(() => {
    if (openRef.current) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const wrapperStyle: CSSProperties | undefined = accentColor
    ? ({ ['--sm-accent']: accentColor } as CSSProperties)
    : undefined;

  // Same layer-trimming logic from the canonical source.
  const layerColors = (() => {
    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    const arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={wrapperStyle}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {layerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <a href="/" className="sm-logo" aria-label="Divinus — home">
          {logoNode ?? (
            <img
              src={logoUrl}
              alt="Divinus"
              className="sm-logo-img"
              draggable={false}
              width={140}
              height={26}
            />
          )}
        </a>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        // `inert` removes the subtree from sequential focus + AT until open.
        // Standardised in HTML, supported in all modern browsers we target.
        inert={!open}
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel ?? it.label}
                    aria-current={isActiveLink(it.link) ? 'page' : undefined}
                    data-index={idx + 1}
                    onClick={() => closeMenu()}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
