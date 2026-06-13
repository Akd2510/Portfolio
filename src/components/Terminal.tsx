import React, { useState, useEffect, useRef } from "react";

interface HistoryItem {
  id: number;
  command: string;
  output: React.ReactNode;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const args = cleanCmd.split(" ");
    const mainCmd = args[0];

    switch (mainCmd) {
      case "help":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 mb-4">
            <div className="text-terminal-amber font-bold">
              Available Commands:
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <span className="text-terminal-cyan">whoami</span> - Display
                user info
              </div>
              <div>
                <span className="text-terminal-cyan">neofetch</span> - Display
                system summary
              </div>
              <div>
                <span className="text-terminal-cyan">ls</span> - List experience & projects
              </div>
              <div>
                <span className="text-terminal-cyan">cat &lt;file&gt;</span> -
                View file details
              </div>
              <div>
                <span className="text-terminal-cyan">sudo get-resume</span> -
                Download resume
              </div>
              <div>
                <span className="text-terminal-cyan">clear</span> - Clear
                terminal
              </div>
            </div>
          </div>
        );

      case "whoami":
        return (
          <div className="mt-2 mb-4 leading-relaxed">
            <span className="text-terminal-amber font-bold">
              Akshat Dikshit
            </span>{" "}
            - B.Tech Graduate in Computer Science from SRMIST (CPI: 8.4/10). 
            Concentrating on Machine Learning, Full-Stack Development, and building 
            scalable, computing-intensive AI inference and quantitative data pipelines.
          </div>
        );

      case "neofetch":
        return (
          <div className="flex flex-col md:flex-row gap-8 mt-2 mb-4">
            <pre className="text-terminal-green font-mono text-[10px] md:text-sm leading-none whitespace-pre">
              {`       .---.
      /     \\
      | () () |
       \\  ^  /
        |||||
        |||||
`}
            </pre>
            <div className="flex flex-col gap-1">
              <div className="text-terminal-amber font-bold">
                guest@akshat-os
              </div>
              <div className="border-t border-gray-700 w-full mb-1"></div>
              <div>
                <span className="text-terminal-cyan font-bold">OS:</span>{" "}
                Arch/Fedora Linux
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">Host:</span>{" "}
                Web-Terminal v3.0
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">Languages:</span>{" "}
                Python, Java, C++, JavaScript, TypeScript, SQL
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">ML & Vision:</span>{" "}
                Scikit-learn, OpenCV, ONNX, YOLOv8, LangGraph, MediaPipe
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">Stack:</span>{" "}
                React, Next.js, FastAPI, Prisma, Supabase, Docker
              </div>
            </div>
          </div>
        );

      case "ls":
        return (
          <div className="flex flex-col gap-1 mt-2 mb-4">
            <div className="text-terminal-amber font-bold mb-1">./experience</div>
            <div>
              <span className="text-terminal-amber">1.</span>{" "}
              <span className="text-terminal-cyan">jio-internship.log</span>
            </div>
            <div className="text-terminal-amber font-bold mt-2 mb-1">./projects</div>
            <div>
              <span className="text-terminal-amber">2.</span>{" "}
              <span className="text-terminal-cyan">smp-valuation-engine.py</span>
            </div>
            <div>
              <span className="text-terminal-amber">3.</span>{" "}
              <span className="text-terminal-cyan">project-tran.ts</span>
            </div>
            <div>
              <span className="text-terminal-amber">4.</span>{" "}
              <span className="text-terminal-cyan">landslide-mapping.py</span>
            </div>
            <div>
              <span className="text-terminal-amber">5.</span>{" "}
              <span className="text-terminal-cyan">motion-workspace.tsx</span>
            </div>
            <div className="text-terminal-amber font-bold mt-2 mb-1">./documents</div>
            <div>
              <span className="text-terminal-amber">6.</span>{" "}
              <span className="text-terminal-cyan">certifications.txt</span>
            </div>
            <div className="mt-2 text-xs opacity-50 italic">
              Tip: Type the number or 'cat [filename]' to view.
            </div>
          </div>
        );

      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "cat": {
        const target =
          mainCmd === "1" ||
          mainCmd === "2" ||
          mainCmd === "3" ||
          mainCmd === "4" ||
          mainCmd === "5" ||
          mainCmd === "6"
            ? mainCmd
            : args[1];

        if (
          target === "jio-internship.log" ||
          target === "jio" ||
          target === "1"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Machine Learning Intern @ Jio Platforms Ltd. (Reliance Industries)
              </div>
              <div className="text-sm opacity-80 mb-2">[Apr '26 - Jun '26]</div>
              <ul className="list-disc ml-4 space-y-1">
                <li>Engineered FaceTools: an async multi-container microservices ecosystem driving decoupled deep learning model pipelines powered by ONNX Runtime, YOLOv8, and ArcFace using asyncio worker pools.</li>
                <li>Designed Face Vision analytical core, executing distributed DBSCAN clustering over dense 512-dimensional vector embedding arrays with PostgreSQL.</li>
                <li>Decentralized core analytics microservices across an enterprise-grade Nginx reverse proxy gateway communicating with a decoupled React frontend.</li>
              </ul>
            </div>
          );
        } else if (
          target === "smp-valuation-engine.py" ||
          target === "smp" ||
          target === "2"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                SMP: Quantitative Equity Valuation Engine
              </div>
              <div>
                Built a fully autonomous, institutional-grade equity valuation engine to aggregate and monitor real-time financial telemetry workflows. Architected a stateful financial pipeline via LangGraph cyclic architectures, computing automated DCF and CCA to generate presentation-ready investment memoranda.
              </div>
              <div className="mt-2 opacity-70 italic text-sm">
                Stack: Python, LangGraph architectures, quantitative workflows.
              </div>
            </div>
          );
        } else if (
          target === "project-tran.ts" ||
          target === "project-tran" ||
          target === "3"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Project Tran: Transit Tracker
              </div>
              <div>
                Engineered a scalable transit tracker web application rendering synchronized spatial paths over Google Maps geometric APIs. Designed a highly normalized PostgreSQL relational database utilizing Prisma ORM with target B-tree query indexing.
              </div>
              <div className="mt-2 opacity-70 italic text-sm">
                Stack: Next.js, Supabase Auth, Prisma, TypeScript, PostgreSQL.
              </div>
            </div>
          );
        } else if (
          target === "landslide-mapping.py" ||
          target === "landslide-mapping" ||
          target === "4"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Landslide Susceptibility Mapping
              </div>
              <div>
                Developed an end-to-end predictive geospatial ML architecture mapping hazard profiles. Ingested global landslide datasets with Google Earth Engine terrain arrays. Achieved a macro F1 score of 0.93 and a 0.663 AUC-ROC profile, leveraging SHAP explainability matrices.
              </div>
              <div className="mt-2 opacity-70 italic text-sm">
                Stack: Python, Scikit-learn, Google Earth Engine, NumPy, SHAP.
              </div>
            </div>
          );
        } else if (
          target === "motion-workspace.tsx" ||
          target === "motion-workspace" ||
          target === "5"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Motion: Collaborative Workspace
              </div>
              <div>
                Architected a high-concurrency, real-time collaborative document workspace. Configured low-latency canvas operations via Firebase Realtime Database socket protocols and created custom client-side state caching layers to insulate against network dropouts.
              </div>
              <div className="mt-2 opacity-70 italic text-sm">
                Stack: React, Node.js, Firebase.
              </div>
            </div>
          );
        } else if (
          target === "certifications.txt" ||
          target === "certifications" ||
          target === "6"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Certifications & Coursework
              </div>
              <ul className="list-disc ml-4 space-y-1">
                <li>Investment Banking with Finance (LaunchED in partnership with IIT Roorkee)</li>
                <li>Google Cloud Data Analytics (BigQuery, Looker Studio)</li>
                <li>AWS Machine Learning Foundations (SageMaker, ML Workflows)</li>
                <li>Cisco Networking Basics</li>
              </ul>
            </div>
          );
        } else if (mainCmd === "cat" && !args[1]) {
          return (
            <div className="text-red-500 mt-2">
              Usage: cat &lt;filename&gt; or just type the file number.
            </div>
          );
        } else {
          return (
            <div className="text-red-500 mt-2">File not found: {target}</div>
          );
        }
      }

      case "sudo":
        if (args[1] === "get-resume") {
          return <ResumeDownloader />;
        }
        return <div className="text-red-500 mt-2">Access denied.</div>;

      case "clear":
        setHistory([]);
        return null;

      case "dmesg":
        return (
          <div className="mt-2 mb-4 opacity-70 font-mono text-sm">
            <div>[ 0.000000] Booting Nothing Phone (1) architecture...</div>
            <div>[ 0.145021] Non-GKI 5.4 Kernel detected. Bypassing Wildkernel checks...</div>
            <div>[ 1.203451] Injecting KernelSU and APatch modules...</div>
            <div>[ 1.452912] SUSFS mounted successfully. Stealth mode enabled.</div>
            <div>[ 2.102344] Initializing crDroid / Evolution X custom environment...</div>
          </div>
        );

      default:
        return (
          <div className="mt-1 text-red-500">
            Command not found: {cmd}. Type{" "}
            <span className="text-terminal-amber">'help'</span> for available
            commands.
          </div>
        );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const output = processCommand(input);
      if (input.trim().toLowerCase() !== "clear") {
        setHistory((prev) => [
          ...prev,
          { id: Date.now(), command: input, output },
        ]);
      }
      if (input.trim()) {
        setCommandHistory((prev) => [input, ...prev]);
      }
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col p-4 md:p-8 font-mono text-terminal-green overflow-hidden selection:bg-terminal-green selection:text-black">
      <div ref={terminalRef} className="flex-1 overflow-y-auto scroll-smooth">
        <div className="mb-4 text-terminal-amber opacity-60">
          Welcome to Akshat-OS v3.0.0. Type 'help' to get started.
        </div>

        {history.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex gap-2">
              <span className="text-terminal-amber">guest@akshat-os:~$</span>
              <span>{item.command}</span>
            </div>
            {item.output}
          </div>
        ))}

        <div className="flex gap-2 items-center">
          <span className="text-terminal-amber shrink-0">
            guest@akshat-os:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none caret-terminal-green text-terminal-green w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

const ResumeDownloader: React.FC = () => {
  const [status, setStatus] = useState("authenticating");

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("bypassing"), 1000);
    const timer2 = setTimeout(() => setStatus("done"), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (status === "authenticating")
    return (
      <div className="mt-2 text-terminal-amber">Prompting for password...</div>
    );
  if (status === "bypassing")
    return (
      <div className="mt-2 text-terminal-amber">
        Authentication bypassed. Generating PDF link...
      </div>
    );

  return (
    <div className="mt-2">
      <a
        href="/Portfolio/Akshat_Dikshit_Resume.pdf"
        download="Akshat_Dikshit_Resume.pdf"
        className="text-terminal-cyan underline hover:text-terminal-green transition-colors font-bold"
      >
        [Download Akshat_Dikshit_Resume.pdf]
      </a>
    </div>
  );
};

export default Terminal;
