import React, { useEffect, useState } from "react";
import { CoreScaleLogo } from "../assets/DragonAssets";
import type { AgentStatus, ConnectionHealth } from "../../hooks/useDragonAgent";
import { Activity, Cpu, Wifi } from "lucide-react";

/**
 * Props for TopNavigation
 * @interface TopNavigationProps
 */
interface TopNavigationProps {
  /** The current status of the agent (idle, analyzing, etc.) */
  status: AgentStatus;
  /** The websocket/API connection health */
  connectionHealth: ConnectionHealth;
}

/**
 * The top navigation bar housing the breathing logo, system status, and mock resource monitors.
 * 
 * @param {TopNavigationProps} props
 * @returns {JSX.Element}
 */
export function TopNavigation({ status, connectionHealth }: TopNavigationProps) {
  // Mock CPU/RAM for aesthetic realism
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10))));
      setRam(prev => Math.min(100, Math.max(20, prev + (Math.random() * 10 - 5))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'analyzing': return 'text-[#A020F0] text-shadow-[0_0_8px_#A020F0]';
      case 'generating': return 'text-[#00F3FF] text-shadow-[0_0_8px_#00F3FF]';
      case 'error': return 'text-red-500 text-shadow-[0_0_8px_red]';
      default: return 'text-gray-400';
    }
  };

  const getConnectionColor = () => {
    switch (connectionHealth) {
      case 'connected': return 'text-[#00F3FF]';
      case 'disconnected': return 'text-red-500 animate-pulse';
      case 'reconnecting': return 'text-[#A020F0] animate-pulse';
    }
  };

  return (
    <header className="relative z-40 w-full h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#A020F0]/30 flex items-center justify-between px-6 shrink-0">
      
      {/* Left: Logo & Branding */}
      <div className="flex items-center gap-4">
        <CoreScaleLogo />
        <div className="flex flex-col">
          <h1 className="font-pixel text-[10px] md:text-xs text-[#00F3FF] tracking-widest uppercase">Cyber Dragon</h1>
          <span className="font-mono text-[10px] text-[#A020F0]">v1.0.0_BETA</span>
        </div>
      </div>

      {/* Right: System Monitors */}
      <div className="flex items-center gap-6 font-mono text-[10px] md:text-xs">
        
        {/* Agent Status */}
        <div className="hidden sm:flex items-center gap-2">
          <Activity size={14} className={getStatusColor()} />
          <span className={`uppercase tracking-wider ${getStatusColor()}`}>
            {status}
          </span>
        </div>

        {/* Mock CPU */}
        <div className="hidden md:flex items-center gap-2 text-[#A020F0]/80">
          <Cpu size={14} />
          <span>CPU:{cpu.toFixed(1)}%</span>
        </div>

        {/* Mock RAM */}
        <div className="hidden md:flex items-center gap-2 text-[#A020F0]/80">
          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-[#A020F0]/30">
            <div 
              className="h-full bg-gradient-to-r from-[#A020F0] to-[#00F3FF] transition-all duration-1000 ease-out"
              style={{ width: `${ram}%` }}
            />
          </div>
          <span>RAM:{ram.toFixed(0)}%</span>
        </div>

        {/* Connection Health */}
        <div className={`flex items-center gap-2 ${getConnectionColor()}`}>
          <Wifi size={14} />
          <span className="uppercase tracking-widest hidden sm:inline">{connectionHealth}</span>
        </div>

      </div>
    </header>
  );
}
