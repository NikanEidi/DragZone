import { useState, useCallback } from "react";

/**
 * Represents the current processing state of the Cyber Dragon agent.
 * @typedef {'idle' | 'analyzing' | 'generating' | 'error'} AgentStatus
 */
export type AgentStatus = 'idle' | 'analyzing' | 'generating' | 'error';

/**
 * Represents the health status of the connection to the FastAPI backend.
 * @typedef {'connected' | 'disconnected' | 'reconnecting'} ConnectionHealth
 */
export type ConnectionHealth = 'connected' | 'disconnected' | 'reconnecting';

/**
 * Supported workflow commands that the agent can execute.
 * @typedef {'#note' | '#quiz' | '#workflow' | '#deploy'} AgentCommand
 */
export type AgentCommand = '#note' | '#quiz' | '#workflow' | '#deploy';

/**
 * Metadata for a file uploaded into the agent's context window.
 * @interface FileContext
 */
export interface FileContext {
  /** Unique identifier for the uploaded file */
  id: string;
  /** Original name of the file */
  name: string;
  /** MIME type or file extension */
  type: string;
  /** Size in bytes */
  size: number;
  /** The actual File object ready for FormData upload */
  rawFile: File;
}

/**
 * Custom hook to manage global state and interactions with the Cyber Dragon backend (FastAPI).
 * 
 * @returns {Object} The agent's state and interaction handlers.
 */
export function useDragonAgent() {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [connectionHealth, setConnectionHealth] = useState<ConnectionHealth>('connected');
  const [activeContextFiles, setActiveContextFiles] = useState<FileContext[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  /**
   * Validates and processes a list of files dropped into the UI.
   * Filters out unsupported types and enforces size limits before adding to context.
   * 
   * @param {FileList | File[]} files - The raw files to be processed.
   * @returns {Promise<void>}
   */
  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    setIsUploading(true);
    
    // Simulate async validation/chunking prep
    await new Promise(resolve => setTimeout(resolve, 800));

    const validFiles: FileContext[] = [];
    const MAX_SIZE_MB = 50 * 1024 * 1024; // 50MB
    const ALLOWED_EXT = ['pdf', 'png', 'jpg', 'jpeg', 'ts', 'tsx', 'md', 'json'];

    Array.from(files).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      if (file.size <= MAX_SIZE_MB && ALLOWED_EXT.includes(ext)) {
        validFiles.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          type: file.type || ext,
          size: file.size,
          rawFile: file
        });
      } else {
        console.warn(`File ${file.name} rejected: Invalid type or exceeds 50MB limit.`);
      }
    });

    setActiveContextFiles(prev => [...prev, ...validFiles]);
    setIsUploading(false);
  }, []);

  /**
   * Dispatches a specific agentic command to the backend alongside any necessary payload data.
   * 
   * @param {AgentCommand} command - The specific workflow to trigger (e.g., '#workflow').
   * @param {Record<string, any>} [payload] - Optional JSON payload containing prompt data or overrides.
   * @returns {Promise<void>}
   */
  const triggerAgentCommand = useCallback(async (command: AgentCommand, payload?: Record<string, any>) => {
    setStatus('analyzing');
    console.log(`[CyberDragon] Triggering command: ${command}`, payload);
    
    // Simulate API Call to FastAPI
    setTimeout(() => {
      setStatus('generating');
      setTimeout(() => {
        setStatus('idle');
        console.log(`[CyberDragon] Command ${command} complete.`);
      }, 2000);
    }, 1000);
  }, []);

  /**
   * Removes a file from the active agent context by its ID.
   * 
   * @param {string} fileId - The unique ID of the file to remove.
   * @returns {void}
   */
  const removeFile = useCallback((fileId: string) => {
    setActiveContextFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  return {
    status,
    connectionHealth,
    activeContextFiles,
    isUploading,
    handleFileUpload,
    triggerAgentCommand,
    removeFile
  };
}
