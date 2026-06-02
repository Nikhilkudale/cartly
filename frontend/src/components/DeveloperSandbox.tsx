import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Code2, Play, CornerDownRight, Copy, Check, Download, RotateCcw, Trash2, ArrowRight } from 'lucide-react';
import { SpringLog, MySQLTable } from '../types';
import { SPRING_BOOT_TEMPLATES } from '../codeTemplates';
import { runCustomSQLQuery } from '../utils/dbSimulator';

interface DeveloperSandboxProps {
  logs: SpringLog[];
  onClearLogs: () => void;
  tables: MySQLTable[];
  onResetDB: () => void;
  activeTab: 'terminal' | 'database' | 'code';
  setActiveTab: (tab: 'terminal' | 'database' | 'code') => void;
}

export default function DeveloperSandbox({
  logs,
  onClearLogs,
  tables,
  onResetDB,
  activeTab,
  setActiveTab
}: DeveloperSandboxProps) {
  // Terminal logs state
  const [selectedLog, setSelectedLog] = useState<SpringLog | null>(null);
  const [logFilter, setLogFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR'>('ALL');
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const [copiedLogId, setCopiedLogId] = useState<string | null>(null);

  // Database states
  const [selectedTableName, setSelectedTableName] = useState<string>('products');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM products WHERE stock < 10;');
  const [sqlResult, setSqlResult] = useState<{ success: boolean; columns?: string[]; rows?: any[]; error?: string } | null>(null);

  // Code exporter states
  const [selectedFile, setSelectedFile] = useState<keyof typeof SPRING_BOOT_TEMPLATES>('mysqlSchema');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (activeTab === 'terminal' && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPayload = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLogId(id);
    setTimeout(() => setCopiedLogId(null), 2000);
  };

  const handleRunSQL = () => {
    const result = runCustomSQLQuery(sqlQuery);
    setSqlResult(result);
  };

  const handleDownloadFile = (fileName: string, content: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const logsList = Array.isArray(logs) ? logs : [];
  const filteredLogs = logsList.filter(log => {
    if (logFilter === 'ALL') return true;
    return log && log.level === logFilter;
  });

  const tablesList = Array.isArray(tables) ? tables : [];
  const activeTable = tablesList.find(t => t.name === selectedTableName) || tablesList[0];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 font-sans dark-scrollbar shadow-2xl">
      {/* Drawer Header */}
      <div className="px-5 py-4 border-b border-white/5 bg-slate-950/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-luxury-gold animate-pulse" />
          <span className="font-display font-extrabold tracking-tight text-white uppercase text-xs">Cartly Luxe Server Engine</span>
          <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20 uppercase tracking-widest font-black leading-none">
            Cluster Online
          </span>
        </div>
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-white/5 text-xs">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'terminal' ? 'bg-white/10 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-luxury-gold" /> Log Monitor
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'database' ? 'bg-white/10 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="h-3.5 w-3.5 text-luxury-gold" /> MySQL Workspace
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'code' ? 'bg-white/10 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-luxury-gold" /> Java Repos
          </button>
        </div>
      </div>

      {/* Main Sandbox Inner Body */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        
        {/* TAB 1: SPRING LOG TERMINAL MONITOR */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Terminal filters */}
            <div className="bg-slate-900/90 px-4 py-2.5 flex items-center justify-between gap-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 mr-2">Filter levels:</span>
                {(['ALL', 'INFO', 'WARN', 'ERROR'] as const).map(lev => (
                  <button
                    key={lev}
                    onClick={() => setLogFilter(lev)}
                    className={`px-2 py-1 rounded-sm transition-colors ${
                      logFilter === lev
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {lev}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClearLogs}
                  className="p-1 px-2 text-xs rounded-sm hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1"
                  title="Clear Console Logs"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear Logs
                </button>
              </div>
            </div>

            {/* Terminal stream */}
            <div ref={terminalContainerRef} className="flex-1 overflow-y-auto px-4 py-3 bg-[#0a0f1d] font-mono text-xs leading-relaxed space-y-2 dark-scrollbar">
              {filteredLogs.length === 0 ? (
                <div className="text-slate-500 italic py-8 text-center flex flex-col items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-current animate-ping" />
                  No Spring context executions received. Add products to cart, search, or place orders to trigger backend activities.
                </div>
              ) : (
                filteredLogs.map(log => {
                  let badgeCol = "text-sky-400 bg-sky-950/40 border-sky-500/20";
                  if (log.level === 'WARN') badgeCol = "text-yellow-400 bg-yellow-950/40 border-yellow-500/20";
                  if (log.level === 'ERROR') badgeCol = "text-rose-400 bg-rose-950/40 border-rose-500/20";

                  return (
                    <div
                      key={log.id}
                      onClick={() => (log.requestBody || log.responseBody || log.sqlQuery) ? setSelectedLog(selectedLog?.id === log.id ? null : log) : null}
                      className={`p-2 rounded-sm border border-transparent transition-all group ${
                        (log.requestBody || log.responseBody || log.sqlQuery) ? 'cursor-pointer hover:bg-slate-900/60 hover:border-slate-800' : ''
                      } ${selectedLog?.id === log.id ? 'bg-slate-900/90 border-slate-700 shadow-inner' : ''}`}
                    >
                      <div className="flex items-start gap-2.5 md:gap-4 select-none">
                        <span className="text-slate-500 text-[10px] shrink-0 font-light pt-0.5">{log.timestamp}</span>
                        <span className={`text-[9px] font-bold px-1 py-0.5 rounded border shrink-0 ${badgeCol}`}>
                          {log.level}
                        </span>
                        <span className="text-emerald-400 shrink-0 select-all font-semibold">[{log.className}]</span>
                        <span className="text-slate-100 flex-1 break-words">{log.message}</span>
                        
                        {(log.requestBody || log.responseBody || log.sqlQuery) && (
                          <span className={`text-[10px] ml-auto shrink-0 select-none ${selectedLog?.id === log.id ? 'text-fk-blue font-bold' : 'text-slate-500 group-hover:text-slate-400'}`}>
                            {selectedLog?.id === log.id ? "Collapse ▲" : "Inspect ▼"}
                          </span>
                        )}
                      </div>

                      {/* Expandable Debugger Panel */}
                      {selectedLog?.id === log.id && (
                        <div className="mt-3.5 pl-6 pr-2 py-3 border-t border-slate-800 bg-slate-950/80 rounded-lg space-y-3.5 transition-all text-xs select-text">
                          {log.method && log.endpoint && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">Endpoint:</span>
                              <span className="px-1.5 py-0.5 rounded bg-violet-950/60 text-violet-300 font-bold border border-violet-500/20 text-[10px]">
                                {log.method}
                              </span>
                              <span className="text-violet-400 font-mono tracking-wide">{log.endpoint}</span>
                            </div>
                          )}

                          {log.sqlQuery && (
                            <div className="space-y-1 bg-amber-950/20 border border-amber-500/10 p-2 text-amber-300 rounded">
                              <div className="flex items-center justify-between text-[10px] text-amber-500 mb-1 font-bold">
                                <span>HIBERNATE AUTO-GENERATED SQL</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPayload(log.sqlQuery || "", log.id + '_sql');
                                  }}
                                  className="p-1 rounded hover:bg-amber-950 hover:text-amber-200"
                                >
                                  {copiedLogId === log.id + '_sql' ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                </button>
                              </div>
                              <pre className="text-[11px] whitespace-pre-wrap select-all font-mono break-all">{log.sqlQuery}</pre>
                            </div>
                          )}

                          {log.requestBody && (
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-semibold">
                                <span>Payload: HTTP Request Body (JSON)</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPayload(log.requestBody || "", log.id + '_req');
                                  }}
                                  className="p-1 rounded hover:bg-slate-900"
                                >
                                  {copiedLogId === log.id + '_req' ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                </button>
                              </div>
                              <pre className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-[11px] overflow-x-auto text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                                {log.requestBody}
                              </pre>
                            </div>
                          )}

                          {log.responseBody && (
                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-semibold">
                                <span>Payload: HTTP Response Body (JSON)</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyPayload(log.responseBody || "", log.id + '_res');
                                  }}
                                  className="p-1 rounded hover:bg-slate-900"
                                >
                                  {copiedLogId === log.id + '_res' ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                                </button>
                              </div>
                              <pre className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-[11px] overflow-x-auto text-sky-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                                {log.responseBody}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MYSQL LIVE DATABASE INSPECTOR */}
        {activeTab === 'database' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 p-4 space-y-4">
            
            {/* Table Navigation Selector & SQL controller */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Database className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300 mr-2">MySQL tables:</span>
                {tablesList.map(table => (
                  <button
                    key={table.name}
                    onClick={() => {
                      setSelectedTableName(table.name);
                      setSqlQuery(`SELECT * FROM ${table.name};`);
                      setSqlResult(null);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                      selectedTableName === table.name
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40 shadow-inner'
                        : 'text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {table.name}
                    <span className="ml-1 text-[10px] text-slate-500">[{table.rows.length}]</span>
                  </button>
                ))}
              </div>

              <button
                onClick={onResetDB}
                className="flex items-center gap-1 self-start md:self-auto text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset Database
              </button>
            </div>

            {/* SQL Terminal Playground */}
            <div className="bg-[#0b0f19] border border-slate-800 rounded-lg p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">mysql&gt;</span>
                  <span>SQL Query Playground</span>
                </div>
                <span className="text-[10px] text-slate-500">Query tables directly!</span>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="SELECT * FROM products WHERE stock < 10;"
                  className="flex-1 font-mono text-xs text-emerald-300 bg-slate-950 border border-slate-800 rounded px-3 py-2 outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                />
                <button
                  onClick={handleRunSQL}
                  className="px-3.5 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1 transition-all shadow"
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Run SQL
                </button>
              </div>

              <div className="text-[10px] text-slate-500 leading-snug">
                Try: <code className="text-amber-500/90 font-mono">SELECT * FROM products;</code> or <code className="text-amber-500/95 font-mono">SELECT * FROM users;</code> or <code className="text-amber-500/90 font-mono">SELECT * FROM orders;</code> or <code className="text-amber-500/90 font-mono">SELECT * FROM cart_items;</code>
              </div>
            </div>

            {/* Render Output Grid (either SQL result or high-level active table) */}
            <div className="flex-1 bg-[#0b0f19] border border-slate-800 rounded-lg overflow-hidden flex flex-col min-h-0">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  {sqlResult ? "Active Query View" : `Dynamic Table: ${activeTable.name}`}
                </span>
                <span className="text-slate-500 font-mono text-[10px]">
                  Engine: InnoDB
                </span>
              </div>

              {/* Data Table Grid container */}
              <div className="flex-1 overflow-auto dark-scrollbar p-3">
                {sqlResult ? (
                  sqlResult.success ? (
                    sqlResult.rows && sqlResult.rows.length > 0 ? (
                      <table className="w-full text-left font-mono text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500">
                            {sqlResult.columns?.map(col => (
                              <th key={col} className="pb-2 font-semibold capitalize pr-4">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300">
                          {sqlResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/30">
                              {sqlResult.columns?.map(col => (
                                <td key={col} className="py-2.5 pr-4 truncate font-mono text-slate-300 select-all max-w-[200px]">
                                  {row[col] != null ? row[col] : <span className="text-slate-600 italic">NULL</span>}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-slate-500 italic py-8 text-center font-mono">
                        Empty set (0.00 sec)
                      </div>
                    )
                  ) : (
                    <div className="text-rose-400 py-6 text-sm font-mono whitespace-pre-wrap">
                      ⚠️ {sqlResult.error}
                    </div>
                  )
                ) : (
                  // General Table Renderer
                  activeTable.rows.length === 0 ? (
                    <div className="text-slate-600 italic py-12 text-center font-mono text-xs">
                      No records found in '{activeTable.name}' dataset. Perform some orders or add cart items using the store dashboard.
                    </div>
                  ) : (
                    <table className="w-full text-left font-mono text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          {activeTable.columns.map(col => (
                            <th key={col} className="pb-2 font-semibold capitalize pr-4">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {activeTable.rows.map((row, rIdx) => (
                          <tr key={String(row.id || rIdx)} className="hover:bg-slate-900/30 transition-colors animate-fade-in">
                            {activeTable.columns.map(col => (
                              <td key={col} className="py-2.5 pr-4 truncate text-slate-300 select-all max-w-[240px]">
                                {row[col] != null ? (
                                  col === 'status' ? (
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                      row[col] === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                                    }`}>
                                      {row[col]}
                                    </span>
                                  ) : (
                                    String(row[col])
                                  )
                                ) : (
                                  <span className="text-slate-600 italic">NULL</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IMMERSIVE SPRING BOOT & SQL SOURCE FILES VAULT */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
            {/* Section tabs */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs gap-2 select-none overflow-x-auto">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-slate-400 font-semibold shrink-0 mr-1.5">File list:</span>
                {(Object.keys(SPRING_BOOT_TEMPLATES) as Array<keyof typeof SPRING_BOOT_TEMPLATES>).map(fileKey => {
                  let fileLabel = "";
                  if (fileKey === 'mysqlSchema') fileLabel = "schema.sql";
                  else if (fileKey === 'entity') fileLabel = "Product.java";
                  else if (fileKey === 'repository') fileLabel = "ProductRepository.java";
                  else if (fileKey === 'controller') fileLabel = "ProductController.java";
                  else if (fileKey === 'userModel') fileLabel = "User.java";
                  else if (fileKey === 'userRepository') fileLabel = "UserRepository.java";
                  else if (fileKey === 'jwtTokenProvider') fileLabel = "JwtTokenProvider.java";
                  else if (fileKey === 'jwtFilter') fileLabel = "JwtAuthFilter.java";
                  else if (fileKey === 'securityConfig') fileLabel = "WebSecurityConfig.java";
                  else if (fileKey === 'authController') fileLabel = "AuthController.java";
                  else if (fileKey === 'orderController') fileLabel = "OrderController.java";
                  else if (fileKey === 'orderService') fileLabel = "OrderService.java";
                  else fileLabel = String(fileKey);

                  return (
                    <button
                      key={String(fileKey)}
                      onClick={() => setSelectedFile(fileKey)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap font-mono ${
                        selectedFile === fileKey
                          ? 'bg-slate-800 text-white font-medium border border-slate-700'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {fileLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-hidden flex flex-col pt-2 bg-[#090b11]">
              <div className="px-5 py-2.5 bg-slate-950/60 flex items-center justify-between border-b border-slate-900 select-none text-xs">
                <span className="text-[11px] font-mono text-slate-500">
                  {selectedFile === 'mysqlSchema' ? 'MySQL DDL / DML Seed Script' : 'Spring Boot REST Java Frame'}
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(SPRING_BOOT_TEMPLATES[selectedFile])}
                    className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded hover:bg-slate-900 border border-slate-800 font-medium text-xs text-slate-300 hover:text-white transition-all shadow-sm"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-400" /> Coined Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      let tag = "schema.sql";
                      if (selectedFile === 'entity') tag = "Product.java";
                      else if (selectedFile === 'repository') tag = "ProductRepository.java";
                      else if (selectedFile === 'controller') tag = "ProductController.java";
                      else if (selectedFile === 'userModel') tag = "User.java";
                      else if (selectedFile === 'userRepository') tag = "UserRepository.java";
                      else if (selectedFile === 'jwtTokenProvider') tag = "JwtTokenProvider.java";
                      else if (selectedFile === 'jwtFilter') tag = "JwtAuthenticationFilter.java";
                      else if (selectedFile === 'securityConfig') tag = "WebSecurityConfig.java";
                      else if (selectedFile === 'authController') tag = "AuthController.java";
                      else if (selectedFile === 'orderController') tag = "OrderController.java";
                      else if (selectedFile === 'orderService') tag = "OrderService.java";
                      handleDownloadFile(tag, SPRING_BOOT_TEMPLATES[selectedFile]);
                    }}
                    className="flex items-center gap-0.5 sm:gap-1 px-3 py-1.5 rounded-md bg-gold-gradient text-[#0B0F19] font-bold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download File
                  </button>
                </div>
              </div>

              {/* Code viewer container */}
              <div className="flex-1 overflow-y-auto px-5 py-4 font-mono text-[11px] md:text-xs leading-relaxed text-slate-300 whitespace-pre scrollbar-thin scrollbar-thumb-slate-800">
                <code className="block select-text select-all">{SPRING_BOOT_TEMPLATES[selectedFile]}</code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="p-4 bg-slate-950 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>MySQL JDBC Port: 3306</span>
        </div>
        <span>Spring Boot Tomcat Port: 8080</span>
      </div>
    </div>
  );
}
