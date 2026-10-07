import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Volume2, 
  Mic, 
  Radio, 
  CheckCircle2, 
  Maximize2,
  Sliders
} from 'lucide-react';

interface MovingExplainingAvatarProps {
  isSpeaking: boolean;
  language?: 'en' | 'de';
  activeTopic?: string;
  avatarStyle?: 'studio' | 'holographic';
}

export const MovingExplainingAvatar: React.FC<MovingExplainingAvatarProps> = ({
  isSpeaking,
  language = 'en',
  activeTopic = 'Data & Infrastructure',
  avatarStyle = 'studio'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentStyle, setCurrentStyle] = useState<'studio' | 'holographic'>(avatarStyle);
  const [gestureMode, setGestureMode] = useState<'conversational' | 'architecture' | 'highlights'>('conversational');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = Math.max(280, container.clientWidth || 320));
    let height = (canvas.height = 340);

    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = Math.max(280, container.clientWidth || 320);
      if (canvas.width !== newWidth) {
        width = canvas.width = newWidth;
        height = canvas.height = 340;
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation variables
    let frame = 0;
    let eyeBlinkTimer = 0;
    let isBlinking = false;
    let blinkDuration = 0;

    // Gesture variables
    let handGesturePhase = 0;
    let headTilt = 0;
    let headNod = 0;
    let mouthOpenness = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Natural Breathing & Head Motion Kinetics
      const breatheOffset = Math.sin(frame * 0.04) * 3;
      const idleSway = Math.sin(frame * 0.02) * 1.5;

      // When speaking, head nods and tilts naturally to emphasize points
      if (isSpeaking) {
        headTilt = Math.sin(frame * 0.08) * 0.05 + Math.cos(frame * 0.05) * 0.03;
        headNod = Math.sin(frame * 0.12) * 2.5 + Math.sin(frame * 0.06) * 1.5;
        // Speech phoneme lip-sync modulation
        mouthOpenness = Math.abs(Math.sin(frame * 0.3) * 0.7 + Math.sin(frame * 0.45) * 0.3);
      } else {
        headTilt = Math.sin(frame * 0.02) * 0.02;
        headNod = Math.sin(frame * 0.03) * 0.8;
        mouthOpenness = 0.05; // Gentle resting smile
      }

      // Blinking Cycle (blinks every ~180-240 frames, lasts 10 frames)
      eyeBlinkTimer++;
      if (eyeBlinkTimer > 210) {
        isBlinking = true;
        blinkDuration++;
        if (blinkDuration > 9) {
          isBlinking = false;
          blinkDuration = 0;
          eyeBlinkTimer = Math.floor(Math.random() * 40); // random interval
        }
      }

      // Hand gesture speed and amplitude
      if (isSpeaking) {
        handGesturePhase += 0.04;
      } else {
        handGesturePhase += 0.01;
      }

      // ------------------------------------------------------------------
      // BACKGROUND AMBIENT GLOW & STUDIO SPOTLIGHT
      // ------------------------------------------------------------------
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY - 40,
        20,
        centerX,
        centerY,
        width * 0.65
      );
      if (currentStyle === 'studio') {
        bgGrad.addColorStop(0, isSpeaking ? 'rgba(16, 185, 129, 0.22)' : 'rgba(6, 182, 212, 0.15)');
        bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.4)');
        bgGrad.addColorStop(1, 'rgba(4, 6, 14, 0)');
      } else {
        bgGrad.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
        bgGrad.addColorStop(0.7, 'rgba(16, 185, 129, 0.1)');
        bgGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Acoustic Speech Waves / Holographic Particles
      if (isSpeaking) {
        ctx.save();
        for (let i = 0; i < 6; i++) {
          const ringRadius = 80 + i * 22 + ((frame * 1.5) % 30);
          const ringAlpha = Math.max(0, 0.25 - (ringRadius / 220));
          ctx.strokeStyle = currentStyle === 'studio' 
            ? `rgba(52, 211, 153, ${ringAlpha})` 
            : `rgba(56, 189, 248, ${ringAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(centerX + idleSway, centerY - 45 + headNod, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // ------------------------------------------------------------------
      // BODY & CLOTHING: Tailored Navy Blazer & Professional Attire
      // ------------------------------------------------------------------
      ctx.save();
      const bodyY = centerY + 80 + breatheOffset;

      // Shoulders / Torso
      ctx.beginPath();
      ctx.moveTo(centerX - 110, height);
      ctx.lineTo(centerX - 95, bodyY + 30);
      ctx.quadraticCurveTo(centerX - 60, bodyY - 10, centerX, bodyY);
      ctx.quadraticCurveTo(centerX + 60, bodyY - 10, centerX + 95, bodyY + 30);
      ctx.lineTo(centerX + 110, height);
      ctx.closePath();

      if (currentStyle === 'studio') {
        const blazerGrad = ctx.createLinearGradient(centerX - 80, bodyY, centerX + 80, height);
        blazerGrad.addColorStop(0, '#1e293b');
        blazerGrad.addColorStop(0.5, '#0f172a');
        blazerGrad.addColorStop(1, '#020617');
        ctx.fillStyle = blazerGrad;
        ctx.fill();

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner Collared Shirt / Crewneck
        ctx.beginPath();
        ctx.moveTo(centerX - 35, bodyY + 5);
        ctx.lineTo(centerX, bodyY + 65);
        ctx.lineTo(centerX + 35, bodyY + 5);
        ctx.quadraticCurveTo(centerX, bodyY + 20, centerX - 35, bodyY + 5);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        // Shirt Collar Accent
        ctx.beginPath();
        ctx.moveTo(centerX - 24, bodyY + 6);
        ctx.lineTo(centerX, bodyY + 38);
        ctx.lineTo(centerX + 24, bodyY + 6);
        ctx.fillStyle = '#f8fafc';
        ctx.fill();

        // Blazer Lapels
        ctx.beginPath();
        ctx.moveTo(centerX - 55, bodyY + 12);
        ctx.lineTo(centerX - 15, bodyY + 70);
        ctx.lineTo(centerX, height);
        ctx.lineTo(centerX + 15, bodyY + 70);
        ctx.lineTo(centerX + 55, bodyY + 12);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      } else {
        // Holographic Cyber Attire
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Cyber Grid Lines
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.beginPath();
        ctx.moveTo(centerX - 50, bodyY + 30);
        ctx.lineTo(centerX + 50, bodyY + 30);
        ctx.moveTo(centerX - 70, bodyY + 60);
        ctx.lineTo(centerX + 70, bodyY + 60);
        ctx.stroke();
      }
      ctx.restore();

      // ------------------------------------------------------------------
      // GESTURING ARM & HAND (Explaining Technical Concepts)
      // ------------------------------------------------------------------
      ctx.save();
      // Calculate hand gesturing coordinates based on gesture mode
      let handTargetX = centerX + 75;
      let handTargetY = bodyY + 15;

      if (isSpeaking) {
        if (gestureMode === 'conversational') {
          // Conversational open-hand gesture moving fluidly
          handTargetX = centerX + 65 + Math.sin(handGesturePhase) * 22;
          handTargetY = bodyY - 10 + Math.cos(handGesturePhase * 1.3) * 18;
        } else if (gestureMode === 'architecture') {
          // Higher hand gesture explaining structural layers
          handTargetX = centerX + 80 + Math.sin(handGesturePhase * 0.8) * 16;
          handTargetY = bodyY - 30 + Math.cos(handGesturePhase) * 12;
        } else {
          // Emphatic forward gesture
          handTargetX = centerX + 70 + Math.sin(handGesturePhase * 1.2) * 25;
          handTargetY = bodyY + Math.sin(handGesturePhase * 0.7) * 15;
        }
      } else {
        // Rest position
        handTargetX = centerX + 60;
        handTargetY = bodyY + 45;
      }

      // Draw Arm leading to Hand
      ctx.beginPath();
      ctx.moveTo(centerX + 70, bodyY + 25);
      ctx.quadraticCurveTo(centerX + 90, bodyY + 35, handTargetX - 10, handTargetY + 15);
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#1e293b';
      ctx.stroke();

      // Draw Hand Palm & Gesturing Fingers
      ctx.save();
      ctx.translate(handTargetX, handTargetY);
      const handAngle = isSpeaking ? Math.sin(handGesturePhase) * 0.2 - 0.2 : 0;
      ctx.rotate(handAngle);

      // Palm
      ctx.beginPath();
      ctx.ellipse(0, 0, 11, 14, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#c68642'; // warm natural skin tone
      ctx.fill();

      // Thumb
      ctx.beginPath();
      ctx.ellipse(-7, -4, 4.5, 8, -0.6, 0, Math.PI * 2);
      ctx.fill();

      // Open Fingers (articulating points)
      for (let f = 0; f < 4; f++) {
        const fingerX = 3 + f * 3.5;
        const fingerY = -12 + (f === 1 ? -3 : f === 2 ? -2 : 0);
        ctx.beginPath();
        ctx.ellipse(fingerX - 4, fingerY, 3, 7, 0.1 * f, 0, Math.PI * 2);
        ctx.fill();
      }

      // Holographic Concept Particle emitted from hand while explaining
      if (isSpeaking) {
        ctx.beginPath();
        ctx.arc(8, -18, 4 + Math.sin(frame * 0.2) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = currentStyle === 'studio' ? '#10b981' : '#38bdf8';
        ctx.fill();
      }
      ctx.restore();
      ctx.restore();

      // ------------------------------------------------------------------
      // NECK & HEAD RIG
      // ------------------------------------------------------------------
      ctx.save();
      ctx.translate(centerX + idleSway, centerY - 25 + headNod + breatheOffset * 0.5);
      ctx.rotate(headTilt);

      // Neck
      ctx.beginPath();
      ctx.moveTo(-18, 40);
      ctx.lineTo(-16, 75);
      ctx.lineTo(16, 75);
      ctx.lineTo(18, 40);
      ctx.closePath();
      ctx.fillStyle = '#b87737';
      ctx.fill();

      // Neck Shadow
      ctx.beginPath();
      ctx.ellipse(0, 52, 17, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();

      // Head / Face Contour
      ctx.beginPath();
      ctx.moveTo(-38, -25);
      ctx.quadraticCurveTo(-44, 25, -24, 48);
      ctx.quadraticCurveTo(0, 62, 24, 48);
      ctx.quadraticCurveTo(44, 25, 38, -25);
      ctx.quadraticCurveTo(0, -60, -38, -25);
      ctx.closePath();

      const faceGrad = ctx.createLinearGradient(-35, -40, 35, 55);
      faceGrad.addColorStop(0, '#d99855');
      faceGrad.addColorStop(0.6, '#c68642');
      faceGrad.addColorStop(1, '#ab6d2d');
      ctx.fillStyle = faceGrad;
      ctx.fill();

      // Ears
      // Left Ear
      ctx.beginPath();
      ctx.ellipse(-42, 6, 7, 12, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#ba7837';
      ctx.fill();
      // Right Ear
      ctx.beginPath();
      ctx.ellipse(42, 6, 7, 12, -0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#ba7837';
      ctx.fill();

      // Hair (Neat, modern dark executive styling)
      ctx.beginPath();
      ctx.moveTo(-42, -18);
      ctx.quadraticCurveTo(-46, -55, 0, -65);
      ctx.quadraticCurveTo(46, -55, 42, -18);
      ctx.quadraticCurveTo(34, -40, 0, -48);
      ctx.quadraticCurveTo(-34, -40, -42, -18);
      ctx.closePath();
      ctx.fillStyle = '#171923';
      ctx.fill();

      // Hair texture highlights
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-20, -58);
      ctx.quadraticCurveTo(5, -60, 25, -50);
      ctx.moveTo(-10, -52);
      ctx.quadraticCurveTo(15, -54, 32, -42);
      ctx.stroke();

      // Eyebrows (expressive animation during explanation)
      const browLift = isSpeaking ? Math.sin(frame * 0.1) * 2 : 0;
      ctx.strokeStyle = '#1a202c';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      // Left Eyebrow
      ctx.beginPath();
      ctx.moveTo(-28, -12 - browLift);
      ctx.quadraticCurveTo(-18, -17 - browLift, -8, -13 - browLift);
      ctx.stroke();
      // Right Eyebrow
      ctx.beginPath();
      ctx.moveTo(8, -13 - browLift);
      ctx.quadraticCurveTo(18, -17 - browLift, 28, -12 - browLift);
      ctx.stroke();

      // Eyes (with natural blink cycle & tracking)
      if (isBlinking) {
        // Closed eyelids
        ctx.strokeStyle = '#5a3d1c';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-26, 2);
        ctx.quadraticCurveTo(-17, 5, -8, 2);
        ctx.moveTo(8, 2);
        ctx.quadraticCurveTo(17, 5, 26, 2);
        ctx.stroke();
      } else {
        // Eye Sclera (White)
        ctx.fillStyle = '#ffffff';
        // Left Eye
        ctx.beginPath();
        ctx.ellipse(-17, 1, 9, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Right Eye
        ctx.beginPath();
        ctx.ellipse(17, 1, 9, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Iris & Pupil (Warm dark brown, slight conversational tracking)
        const pupilTrackX = Math.sin(frame * 0.03) * 1.5;
        const pupilTrackY = Math.cos(frame * 0.03) * 0.8;

        ctx.fillStyle = '#2d1808';
        // Left Iris
        ctx.beginPath();
        ctx.arc(-17 + pupilTrackX, 1 + pupilTrackY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        // Right Iris
        ctx.beginPath();
        ctx.arc(17 + pupilTrackX, 1 + pupilTrackY, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye Catchlight (Liveliness reflection)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-15 + pupilTrackX, -0.5 + pupilTrackY, 1.3, 0, Math.PI * 2);
        ctx.arc(19 + pupilTrackX, -0.5 + pupilTrackY, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Smart Glasses (Executive spectacles with clean glare)
      ctx.strokeStyle = currentStyle === 'studio' ? '#334155' : '#38bdf8';
      ctx.lineWidth = 2;
      // Left Frame
      ctx.beginPath();
      ctx.roundRect(-29, -8, 23, 18, 5);
      ctx.stroke();
      // Right Frame
      ctx.beginPath();
      ctx.roundRect(6, -8, 23, 18, 5);
      ctx.stroke();
      // Bridge
      ctx.beginPath();
      ctx.moveTo(-6, -1);
      ctx.lineTo(6, -1);
      ctx.stroke();

      // Glasses Glare Reflection
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-24, -5);
      ctx.lineTo(-12, 5);
      ctx.moveTo(11, -5);
      ctx.lineTo(23, 5);
      ctx.stroke();

      // Nose
      ctx.strokeStyle = '#a66426';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(2, 18);
      ctx.lineTo(-3, 22);
      ctx.stroke();

      // ------------------------------------------------------------------
      // MOUTH / PHONETIC LIP-SYNC WHEN EXPLAINING
      // ------------------------------------------------------------------
      ctx.save();
      const mouthY = 36;
      if (isSpeaking && mouthOpenness > 0.15) {
        // Dynamic speaking mouth shape (vowel / consonant modulation)
        const openH = Math.max(3, mouthOpenness * 11);
        const openW = Math.max(8, 14 - mouthOpenness * 3);

        ctx.beginPath();
        ctx.ellipse(0, mouthY, openW, openH, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#5c1d1d'; // mouth cavity
        ctx.fill();

        // Upper Teeth visible during speech
        ctx.beginPath();
        ctx.ellipse(0, mouthY - openH * 0.5, openW * 0.7, 2.5, 0, 0, Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Lips contour
        ctx.strokeStyle = '#8c4838';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Friendly resting closed mouth / smile
        ctx.strokeStyle = '#8c4838';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-12, mouthY);
        ctx.quadraticCurveTo(0, mouthY + 4, 12, mouthY);
        ctx.stroke();
      }
      ctx.restore();

      ctx.restore(); // end head transform

      // ------------------------------------------------------------------
      // FOREGROUND STUDIO BROADCAST MICROPHONE (Shure SM7B Style)
      // ------------------------------------------------------------------
      ctx.save();
      const micX = centerX - 60 + idleSway * 0.5;
      const micY = centerY + 70;

      // Mic Boom Stand Rod
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(micX, micY + 30);
      ctx.stroke();

      // Mic Body
      ctx.save();
      ctx.translate(micX, micY);
      ctx.rotate(-0.4);

      // Foam Windscreen Capsule
      ctx.beginPath();
      ctx.roundRect(-10, -25, 20, 36, 8);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Red/Green "ON AIR" indicator ring on microphone
      ctx.beginPath();
      ctx.arc(0, 14, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isSpeaking ? '#10b981' : '#f59e0b';
      ctx.fill();
      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSpeaking, currentStyle, gestureMode]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none">
      
      {/* Moving Avatar Canvas Stage */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-[320px] aspect-[4/5] max-h-[350px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-[#050811] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 flex items-center justify-center"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />

        {/* Top Floating Badge: Explaining Status */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 backdrop-blur-md shadow-lg">
          <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <span>{isSpeaking ? (language === 'de' ? 'ERKLÄRT GERADE...' : 'EXPLAINING LIVE...') : (language === 'de' ? 'BEREIT' : 'STANDBY')}</span>
        </div>

        {/* Top Right: Gesture & Visual Style Switcher */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-slate-950/90 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
          <button
            onClick={() => setCurrentStyle(currentStyle === 'studio' ? 'holographic' : 'studio')}
            className={`px-2 py-0.5 rounded transition-colors ${
              currentStyle === 'studio' 
                ? 'bg-slate-800 text-slate-200' 
                : 'bg-cyan-500 text-slate-950 font-bold'
            }`}
            title="Toggle between Realistic Studio Presenter and Holographic AI mode"
          >
            {currentStyle === 'studio' ? 'Studio' : 'Holo'}
          </button>
        </div>

        {/* Bottom Floating Technical Topic Telemetry */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] font-mono backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-slate-300 truncate pr-2">
            <Activity className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{activeTopic}</span>
          </div>
          <span className="text-emerald-400 font-bold shrink-0">
            {isSpeaking ? '60 FPS Motion' : 'Listening'}
          </span>
        </div>
      </div>

      {/* Interactive Gesturing & Explanation Mode Selector */}
      <div className="w-full max-w-[320px] mt-2.5 flex items-center justify-between gap-1 p-1 rounded-xl bg-slate-950/90 border border-slate-800 text-[10px] font-mono">
        <span className="text-slate-400 px-1.5 flex items-center gap-1">
          <Sliders className="w-3 h-3 text-emerald-400" />
          {language === 'de' ? 'Gesten:' : 'Gestures:'}
        </span>
        <button
          onClick={() => setGestureMode('conversational')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            gestureMode === 'conversational'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Natural conversational interview gestures"
        >
          {language === 'de' ? 'Gespräch' : 'Natural'}
        </button>
        <button
          onClick={() => setGestureMode('architecture')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            gestureMode === 'architecture'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Hands gesturing towards technical architecture points"
        >
          {language === 'de' ? 'Systeme' : 'Systems'}
        </button>
        <button
          onClick={() => setGestureMode('highlights')}
          className={`flex-1 py-1 rounded-lg transition-all ${
            gestureMode === 'highlights'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Emphatic presentation gestures"
        >
          {language === 'de' ? 'Fokus' : 'Pitch'}
        </button>
      </div>

    </div>
  );
};
