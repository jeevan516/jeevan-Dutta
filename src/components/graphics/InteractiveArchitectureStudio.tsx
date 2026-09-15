import React, { useState } from 'react';
import { 
  Layers, 
  Activity, 
  Cpu, 
  Radio, 
  ArrowRight, 
  Database, 
  Server, 
  Clock, 
  ShieldCheck, 
  Zap, 
  FileCode2, 
  Binary, 
  Play, 
  Pause,
  Maximize2
} from 'lucide-react';

export const InteractiveArchitectureStudio: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<'edge' | 'telemetry' | 'ai' | 'vlsi'>('edge');
  const [isSimulating, setIsSimulating] = useState(true);
  const [simRate, setSimRate] = useState<number>(100);

  const layers = [
    {
      id: 'vlsi',
      title: 'Microelectronic Foundation',
      subtitle: 'Xilinx FPGA & VHDL State Logic',
      tag: 'Academic Research · TU Clausthal',
      latency: '< 12 µs (Zero Jitter)',
      badgeColor: 'from-purple-500 to-indigo-500',
      description: 'ZanderLink 4-Node deterministic bus protocol created under Prof. Dr. Christian Siemers. Features clock-synchronized round-robin transmission and hardware-level CRC-5 verification.',
      specs: [
        { label: 'Bus Standard', val: 'EIA-485 Synchronous Differential' },
        { label: 'Target Silicon', val: 'Xilinx Artix-7 / Spartan FPGA' },
        { label: 'Netlist Complexity', val: '1,086 Nets · 832 Leaf Cells' },
        { label: 'Clocking Logic', val: 'Distributed H-Tree Global CLK' },
      ],
      codeSnippet: `entity zanderlink_node is\n  Port ( clk_485 : in STD_LOGIC;\n         tx_data : out STD_LOGIC_VECTOR(15 downto 0);\n         crc5_ok : out STD_LOGIC );\nend entity;`,
    },
    {
      id: 'edge',
      title: 'Industrial Edge Ingestion',
      subtitle: 'WaDaCon Next-Gen MRF Recycling Facility',
      tag: 'Industry Production · WaDaCon GmbH',
      latency: '10 ms High-Frequency Sampling',
      badgeColor: 'from-emerald-500 to-teal-500',
      description: 'Ruggedized IoT edge nodes and optical sorting machines transmitting vibration, temperature, and pneumatic pressure metrics via isolated zero-trust Teleport edge tunnels.',
      specs: [
        { label: 'Protocols', val: 'Modbus-TCP · MQTT · CAN bus' },
        { label: 'Edge Security', val: 'Zero-Trust Teleport SSH Tunnels' },
        { label: 'Payload Integrity', val: 'ISO 10816 Vibration Envelopes' },
        { label: 'Reliability Tier', val: '99.98% High Availability' },
      ],
      codeSnippet: `// Industrial edge scraper\nconst sensor = await modbus.readHoldingRegisters(0x100, 8);\nconst metric = { rpm: sensor[0], isoVibRms: sensor[1] / 100 };\nprometheusGauge.set(metric.isoVibRms);`,
    },
    {
      id: 'telemetry',
      title: 'Observability & Metrics Pipeline',
      subtitle: 'Prometheus, Grafana & Real-time Alertmanager',
      tag: 'Cloud & Infrastructure',
      latency: '50 ms Push Aggregation',
      badgeColor: 'from-cyan-500 to-blue-500',
      description: 'Real-time telemetry ingestion pipelines aggregating industrial facility health. Implements automated Prometheus alert rules dispatching instant webhooks for bearing anomalies.',
      specs: [
        { label: 'Metrics Engine', val: 'Prometheus TSDB + Pushgateway' },
        { label: 'Dashboards', val: 'Grafana Enterprise + Dark Panels' },
        { label: 'Notification', val: 'Automated Slack/Ops Webhooks' },
        { label: 'Retention', val: '90-Day Rolling Partitioning' },
      ],
      codeSnippet: `alert: BearingCriticalVibration\nexpr: rate(sorter_bearing_vib_mm_s[1m]) > 4.5\nfor: 30s\nlabels:\n  severity: critical\nannotations:\n  summary: "Immediate bearing shutdown required"`,
    },
    {
      id: 'ai',
      title: 'AI Anomaly Intelligence',
      subtitle: 'Spatial-Temporal Sequence Forecasting',
      tag: 'Deep Learning & ML Ops',
      latency: '24-Hour Horizon Ahead',
      badgeColor: 'from-amber-500 to-orange-500',
      description: 'LSTM neural models forecasting mechanical failure patterns 24-48 hours before physical degradation, eliminating catastrophic sorter downtime in recycling plants.',
      specs: [
        { label: 'Frameworks', val: 'PyTorch · NumPy · Pandas · Scikit' },
        { label: 'Model Topology', val: 'Bi-Directional 2-Layer LSTM + Attn' },
        { label: 'Prediction Lead', val: '24 to 48 Hours Ahead' },
        { label: 'F1 Score', val: '0.942 on Real-World Datasets' },
      ],
      codeSnippet: `class AnomalyLSTM(nn.Module):\n    def __init__(self, in_features=12, hidden_dim=64):\n        super().__init__()\n        self.lstm = nn.LSTM(in_features, hidden_dim, batch_first=True)\n        self.head = nn.Linear(hidden_dim, 1)`,
    },
  ];

  const current = layers.find((l) => l.id === selectedLayer) || layers[0];

  return (
    <section id="observability" className="py-20 border-t border-slate-800/80 bg-slate-950/70 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              End-to-End System Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Interactive Industrial Observability & VLSI Studio
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Explore the four architectural layers engineered by Jeevan: from low-level silicon microelectronic state machines to edge IoT scrapers and automated AI fault prevention.
            </p>
          </div>

          {/* Quick Simulation controls */}
          <div className="flex items-center gap-3 p-2 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isSimulating 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Sim Active' : 'Sim Paused'}</span>
            </button>
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 pr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry Bus 100% Ok</span>
            </div>
          </div>
        </div>

        {/* 4 Interactive Layer Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id as any)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-400/80 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30 -translate-y-1'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-slate-500 font-bold">0{idx + 1} // LAYER</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {layer.latency}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-white">
                  {layer.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {layer.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-emerald-400/90 font-medium">
                    {layer.tag}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Inspection Workbench */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Specs & Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Layer Deep-Dive & Hardware Specifications</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  {current.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.specs.map((spec, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-100 font-mono mt-1">
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Production Verification Pill */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Engineering Provenance: </span>
                  Implemented, benchmarked, and validated under real industrial operations or peer-reviewed master thesis grading.
                </div>
              </div>
            </div>

            {/* Right Live Visual Code & Telemetry Terminal */}
            <div className="lg:col-span-6 space-y-4">
              {/* Code Snippet Terminal */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-300 ml-2 font-semibold">
                      {selectedLayer === 'vlsi' ? 'zanderlink_node.vhd' : selectedLayer === 'edge' ? 'edge_scraper.ts' : selectedLayer === 'telemetry' ? 'prometheus_rules.yml' : 'lstm_anomaly.py'}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">SYNTAX VERIFIED</span>
                </div>
                <div className="p-4 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed bg-[#050811]">
                  <pre>{current.codeSnippet}</pre>
                </div>
              </div>

              {/* Live Simulated Signal Stream */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-slate-300 font-bold text-[11px]">SIGNAL BUS PIPELINE</div>
                    <div className="text-[10px] text-slate-500">Live heartbeat stream · 100Hz CRC checksum active</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-emerald-400 font-bold">STATUS: OK</div>
                  <div className="text-[10px] text-slate-400">0 PACKET LOSS</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
