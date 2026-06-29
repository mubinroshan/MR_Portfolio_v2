'use client';

import { Suspense, lazy, useEffect } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  useEffect(() => {
    // Periodically search for Spline watermarks and hide them, even inside shadow DOMs
    const interval = setInterval(() => {
      // 1. Target spline-viewer elements
      const viewers = document.querySelectorAll('spline-viewer');
      viewers.forEach(viewer => {
        if (viewer.shadowRoot) {
          const logo = viewer.shadowRoot.getElementById('logo') || 
                       viewer.shadowRoot.querySelector('#logo') ||
                       viewer.shadowRoot.querySelector('a[href*="spline.design"]');
          if (logo) {
            (logo as HTMLElement).style.display = 'none';
            (logo as HTMLElement).style.opacity = '0';
            (logo as HTMLElement).style.visibility = 'hidden';
            (logo as HTMLElement).style.pointerEvents = 'none';
            (logo as HTMLElement).style.height = '0px';
            (logo as HTMLElement).style.width = '0px';
          }
        }
      });

      // 2. Broad scan of all shadow roots in case of nested rendering
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el.shadowRoot) {
          const shadowLogo = el.shadowRoot.querySelector('#logo') || 
                             el.shadowRoot.querySelector('a[href*="spline.design"]') ||
                             el.shadowRoot.querySelector('[class*="logo"]');
          if (shadowLogo) {
            (shadowLogo as HTMLElement).style.display = 'none';
            (shadowLogo as HTMLElement).style.opacity = '0';
            (shadowLogo as HTMLElement).style.visibility = 'hidden';
            (shadowLogo as HTMLElement).style.pointerEvents = 'none';
            (shadowLogo as HTMLElement).style.height = '0px';
            (shadowLogo as HTMLElement).style.width = '0px';
          }
        }
      });

      // 3. Regular DOM check (non-shadow fallback)
      const normalLogo = document.getElementById('logo') || 
                         document.querySelector('#logo') || 
                         document.querySelector('a[href*="spline.design"]') ||
                         document.querySelector('.spline-watermark');
      if (normalLogo) {
        (normalLogo as HTMLElement).style.display = 'none';
        (normalLogo as HTMLElement).style.opacity = '0';
        (normalLogo as HTMLElement).style.visibility = 'hidden';
        (normalLogo as HTMLElement).style.pointerEvents = 'none';
        (normalLogo as HTMLElement).style.height = '0px';
        (normalLogo as HTMLElement).style.width = '0px';
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-[#FAF6EB] text-[#0d5c56] rounded-2xl ${className}`}>
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-6 w-6 text-[#0d5c56]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
            <span className="text-[10px] font-mono tracking-wider uppercase opacity-60">Summoning MURO ROBO...</span>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className} 
      />
    </Suspense>
  );
}
