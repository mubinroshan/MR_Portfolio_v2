'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Shield, ShieldAlert, Cpu, Orbit, Sparkles } from 'lucide-react'

// Simple check for WebGL context and software drivers
const checkWebGLSupport = (): { supported: boolean; reason?: string } => {
  if (typeof window === 'undefined') return { supported: false, reason: 'SSR' }
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') || 
                canvas.getContext('webgl') || 
                canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    
    if (!gl) {
      return { supported: false, reason: 'No WebGL context initialized.' }
    }
    
    // Check shader precision capability
    const precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
    if (!precision || precision.precision === 0) {
      return { supported: false, reason: 'Lacks float precision required for detailed physical materials.' }
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
      const rendererLower = renderer.toLowerCase()
      
      // Virtual/Software renderers commonly crash/fail on complex custom physical shaders
      if (
        rendererLower.includes('swiftshader') || 
        rendererLower.includes('software') || 
        rendererLower.includes('llvmpipe') || 
        rendererLower.includes('mesa') && !rendererLower.includes('amd') && !rendererLower.includes('intel')
      ) {
        return { 
          supported: false, 
          reason: `Software Renderer detected (${renderer}). Accelerated GPU is recommended for high-fidelity 3D physics shaders.` 
        }
      }
    }
    return { supported: true }
  } catch (e) {
    return { supported: false, reason: 'WebGL initialization threw exception' }
  }
}

// React Error Boundary to catch any deep unhandled THREE runtime / renderer exceptions
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void }, 
  { hasError: boolean }
> {
  state: { hasError: boolean };
  props: { children: React.ReactNode; onError: () => void };

  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
    this.props = props
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("Spline 3D Shader/Renderer failure caught safely in ErrorBoundary:", error, errorInfo)
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

interface Character3DProps {
  isSaudiGreenMode?: boolean
}

export default function Character3D({ isSaudiGreenMode = false }: Character3DProps) {
  const [webglStatus, setWebglStatus] = useState<{ supported: boolean; reason?: string }>({ supported: true })
  const [forceFallback, setForceFallback] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fluid mouse tracking for interactive 2D fallback effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 })

  // Transform coordinates for subtle magnetic tilt effects on hover
  const rotateX = useTransform(springY, [-180, 180], [10, -10])
  const rotateY = useTransform(springX, [-180, 180], [-10, 10])
  
  // Transform coordinates for background glow shifts
  const glowX = useTransform(springX, [-200, 200], [-30, 30])
  const glowY = useTransform(springY, [-200, 200], [-30, 30])

  useEffect(() => {
    const status = checkWebGLSupport()
    setWebglStatus(status)
    if (!status.supported) {
      console.info("Hardware accelerated GPU WebGL is disabled or absent. Activating modern Interactive Sentinel core fallback. Reason:", status.reason)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const spotlightFill = isSaudiGreenMode 
    ? "#00a36c" 
    : "#0d5c56"

  const displayFallback = !webglStatus.supported || forceFallback

  return (
    <motion.div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`relative w-full h-[400px] sm:h-[480px] lg:h-[500px] xl:h-[550px] rounded-3xl overflow-hidden bg-transparent border transition-all duration-500 flex flex-col items-center justify-center ${
        isSaudiGreenMode 
          ? 'border-emerald-500/10 bg-black/[0.15]' 
          : 'border-[#0b4f43]/5 bg-white/[0.25] backdrop-blur-[2px]'
      }`}
      id="3d-character-container"
    >
      {/* Ambient Spotlight overlay */}
      <Spotlight
        className="-top-20 left-1/4 sm:left-1/3 md:-top-10 opacity-70"
        fill={spotlightFill}
      />

      {/* Decorative interactive background blur */}
      <motion.div 
        style={{ x: glowX, y: glowY }}
        className={`absolute inset-0 z-0 pointer-events-none transition-all duration-700 blur-[90px] opacity-35 ${
          isSaudiGreenMode 
            ? 'bg-gradient-to-tr from-[#005639]/40 via-[#00a36c]/15 to-transparent' 
            : 'bg-gradient-to-tr from-[#0d5c56]/20 via-[#FAF6EB]/10 to-transparent'
        }`} 
      />

      {/* RENDER FALLBACK: High-performance elegant Cyber Defense Sentinel Core */}
      {displayFallback ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-around p-6 sm:p-8 select-none text-center">
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${
              isSaudiGreenMode 
                ? 'text-[#00a36c] border-[#00a36c]/20 bg-[#00a36c]/5' 
                : 'text-[#0d5c56] border-[#0d5c56]/15 bg-[#0d5c56]/5'
            }`}>
              {webglStatus.supported ? "Active Cyber Core" : "Security Optimization Fallback"}
            </span>
            <div className={`text-xs mt-1 font-mono max-w-sm ${isSaudiGreenMode ? 'text-gray-400' : 'text-[#0d5c56]/70'}`}>
              {!webglStatus.supported 
                ? "Automatic vector bypass loaded to ensure fast rendering on virtual and low-resource devices." 
                : "Rendering alternative optimized interface."}
            </div>
          </div>

          {/* Interactive animated security vectors with mouse relative tilt */}
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer"
          >
            {/* Outer dotted security scanner ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className={`absolute inset-0 rounded-full border border-dashed ${
                isSaudiGreenMode ? 'border-[#00a36c]/20' : 'border-[#0d5c56]/20'
              }`}
            />

            {/* Inner secondary rotating HUD ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className={`absolute inset-4 rounded-full border-2 border-dashed ${
                isSaudiGreenMode ? 'border-[#00a36c]/40 border-t-transparent' : 'border-[#0d5c56]/40 border-t-transparent'
              }`}
            />

            {/* Pulsating core background circle */}
            <motion.div 
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className={`absolute inset-10 rounded-full blur-sm opacity-50 ${
                isSaudiGreenMode ? 'bg-[#00a36c]/10' : 'bg-[#0d5c56]/10'
              }`}
            />

            {/* Central security icon block with depth offset */}
            <motion.div 
              style={{ translateZ: 35 }}
              className={`absolute w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border backdrop-blur-md ${
                isSaudiGreenMode 
                  ? 'bg-[#0b0a0c]/80 border-emerald-500/20 text-[#00a36c] shadow-[#00a36c]/5' 
                  : 'bg-white/80 border-[#0d5c56]/10 text-[#0d5c56] shadow-[#0d5c56]/5'
              }`}
            >
              <Shield className="w-9 h-9 animate-pulse" />
            </motion.div>

            {/* Satellite decorative orbit trackers */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-1 pointer-events-none"
            >
              <span className={`absolute top-0 left-1/2 -ml-1.5 w-3 h-3 rounded-full shadow-md ${
                isSaudiGreenMode ? 'bg-[#00a36c]' : 'bg-[#0d5c56]'
              }`} />
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-1.5">
            <span className={`text-[11px] font-mono ${isSaudiGreenMode ? 'text-gray-400' : 'text-[#0d5c56]'}`}>
              Hover to interact with sentinel core vector fields
            </span>
            
            {/* If automated fallback rendered, allow manual retry attempt to satisfy technical curious users */}
            {!webglStatus.supported && (
              <button
                onClick={() => {
                  setWebglStatus({ supported: true })
                  setForceFallback(false)
                }}
                className={`text-[10px] px-3 py-1 font-mono hover:scale-[1.03] active:scale-[0.98] transition-all rounded ${
                  isSaudiGreenMode 
                    ? 'bg-purple-950/20 text-[#c296ff] hover:bg-purple-900/30' 
                    : 'bg-[#0d5c56]/5 text-[#0d5c56] hover:bg-[#0d5c56]/10'
                }`}
              >
                Force Load 3D anyway
              </button>
            )}
            
            {/* Toggle backup system if rendering but wanting fallback */}
            {webglStatus.supported && (
              <button
                onClick={() => setForceFallback(false)}
                className={`text-[10px] uppercase font-mono tracking-wider transition-colors ${
                  isSaudiGreenMode ? 'text-gray-500 hover:text-white' : 'text-[#0d5c56]/60 hover:text-[#0d5c56]'
                }`}
              >
                ← Return to Spline Space
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RENDER 3D: Actual Spline 3D Scene safely run inside custom WebGL error managers */
        <div className="absolute inset-0 z-10 w-full h-full bg-transparent">
          <SplineErrorBoundary onError={() => setForceFallback(true)}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full bg-transparent"
            />
          </SplineErrorBoundary>
        </div>
      )}

      {/* Subtle tech border label to complement the premium, high-contrast aesthetic */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none bg-black/5 dark:bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-mono select-none tracking-widest uppercase text-[#0d5c56] dark:text-[#00a36c]">
        {displayFallback ? "Sentinel Active Core" : "3D Character Space"}
      </div>
    </motion.div>
  )
}
