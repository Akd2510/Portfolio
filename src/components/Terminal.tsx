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
                <span className="text-terminal-cyan">ls</span> - List projects
              </div>
              <div>
                <span className="text-terminal-cyan">cat &lt;file&gt;</span> -
                View project details
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
            - Computer Science major with keen attention to detail,
            concentrating on Machine Learning and problem-solving with data.
            Skilled in Python and C++ programming languages.
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
                Web-Terminal v1.0
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">Languages:</span>{" "}
                Java, C++, Python, SQL, JS
              </div>
              <div>
                <span className="text-terminal-cyan font-bold">
                  Frameworks:
                </span>{" "}
                OpenCV, MediaPipe, React, Node.js, Firebase
              </div>
            </div>
          </div>
        );

      case "ls":
        return (
          <div className="flex flex-col gap-1 mt-2 mb-4">
            <div>
              <span className="text-terminal-amber">1.</span>{" "}
              <span className="text-terminal-cyan">motion-workspace.md</span>
            </div>
            <div>
              <span className="text-terminal-amber">2.</span>{" "}
              <span className="text-terminal-cyan">digital-portrait.py</span>
            </div>
            <div>
              <span className="text-terminal-amber">3.</span>{" "}
              <span className="text-terminal-cyan">landslide-mapping.py</span>
            </div>
            <div>
              <span className="text-terminal-amber">4.</span>{" "}
              <span className="text-terminal-cyan">onboard.java</span>
            </div>
            <div className="mt-2 text-xs opacity-50 italic">
              Tip: Type the number or 'cat [name]' to view.
            </div>
          </div>
        );

      case "1":
      case "2":
      case "3":
      case "4":
      case "cat": {
        const target =
          mainCmd === "1" ||
          mainCmd === "2" ||
          mainCmd === "3" ||
          mainCmd === "4"
            ? mainCmd
            : args[1];

        if (
          target === "motion-workspace.md" ||
          target === "motion-workspace" ||
          target === "1"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Motion: Collaborative Workspace
              </div>
              <div>
                Built a real-time editor with automated document recovery and
                optimized Firebase synchronization to ensure zero-latency
                concurrent editing.
              </div>
              <div className="mt-1 opacity-70 italic text-sm">
                Stack: React, Node.js, Firebase, Google Auth.
              </div>
            </div>
          );
        } else if (
          target === "digital-portrait.py" ||
          target === "digital-portrait" ||
          target === "2"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Automated Digital Portrait Pipeline
              </div>
              <div>
                Engineered a CV pipeline using Delaunay triangulation and
                Poisson blending for realistic face-template mapping,
                implementing face-gating to eliminate artifacts.
              </div>
              <div className="mt-1 opacity-70 italic text-sm">
                Stack: Python, OpenCV, MediaPipe, NumPy.
              </div>
            </div>
          );
        } else if (
          target === "landslide-mapping.py" ||
          target === "landslide-mapping" ||
          target === "3"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Landslide Susceptibility Mapping
              </div>
              <div>
                Developed a predictive ML model analyzing topographical data to
                generate high-fidelity hazard heatmaps for disaster
                preparedness.
              </div>
              <div className="mt-1 opacity-70 italic text-sm">
                Stack: Python, Scikit-learn, ML, NumPy.
              </div>
            </div>
          );
        } else if (
          target === "onboard.java" ||
          target === "onboard" ||
          target === "4"
        ) {
          return (
            <div className="mt-2 mb-4 border-l-2 border-terminal-amber pl-4">
              <div className="text-terminal-amber font-bold mb-1">
                Onboard System
              </div>
              <div>
                Designed a modular Java-based backend for employee onboarding
                with secure SQL database integration.
              </div>
              <div className="mt-1 opacity-70 italic text-sm">
                Stack: Java, SQL, Spring Boot.
              </div>
            </div>
          );
        } else if (mainCmd === "cat" && !args[1]) {
          return (
            <div className="text-red-500 mt-2">
              Usage: cat &lt;filename&gt; or just type the number.
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
            <div>[ 1.203451] Injecting KernelSU and APatch modules...</div>
            <div>
              [ 1.452912] SUSFS mounted successfully. Stealth mode enabled.
            </div>
            <div>
              [ 2.102344] Initializing crDroid / Evolution X custom
              environment...
            </div>
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
          Welcome to Akshat-OS v1.0.0. Type 'help' to get started.
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
        href="/resume.pdf"
        download="Akshat_Resume.pdf"
        className="text-terminal-cyan underline hover:text-terminal-green transition-colors font-bold"
      >
        [Download Akshat_Resume.pdf]
      </a>
    </div>
  );
};

export default Terminal;
