import React, { useState, useRef, useEffect } from 'react';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Check, 
  X, 
  Download, 
  Share2, 
  Clipboard, 
  ArrowLeft, 
  RefreshCw, 
  ChevronRight, 
  CheckCircle2, 
  User, 
  Shield, 
  ExternalLink,
  Bookmark,
  Network,
  Terminal,
  ShieldAlert,
  Eye,
  CheckSquare,
  Clock,
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: number;
  text: string;
  category: 'Network Security' | 'Ethical Hacking' | 'Threat Detection' | 'Security Awareness' | 'Best Practices';
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctLetter: 'A' | 'B' | 'C' | 'D';
  correctAnswerText: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is the primary purpose of a firewall?",
    category: "Network Security",
    options: [
      { letter: 'A', text: "Increase internet speed" },
      { letter: 'B', text: "Store backups" },
      { letter: 'C', text: "Monitor and control network traffic" },
      { letter: 'D', text: "Encrypt passwords" }
    ],
    correctLetter: 'C',
    correctAnswerText: "C. Monitor and control network traffic",
    explanation: "Firewalls filter incoming and outgoing network traffic based on security rules to block unauthorized access."
  },
  {
    id: 2,
    text: "Which of the following is considered a strong password?",
    category: "Security Awareness",
    options: [
      { letter: 'A', text: "Password123" },
      { letter: 'B', text: "admin123" },
      { letter: 'C', text: "Mubin2026" },
      { letter: 'D', text: "M!n#7Qx@91Lp" }
    ],
    correctLetter: 'D',
    correctAnswerText: "D. M!n#7Qx@91Lp",
    explanation: "Strong passwords use a mix of uppercase, lowercase, numbers, and special characters to prevent brute-force attacks."
  },
  {
    id: 3,
    text: "What does VPN stand for?",
    category: "Network Security",
    options: [
      { letter: 'A', text: "Virtual Private Network" },
      { letter: 'B', text: "Verified Protected Network" },
      { letter: 'C', text: "Virtual Public Node" },
      { letter: 'D', text: "Variable Private Network" }
    ],
    correctLetter: 'A',
    correctAnswerText: "A. Virtual Private Network",
    explanation: "A VPN encrypts internet traffic and hides the user's IP address to protect privacy and secure data."
  },
  {
    id: 4,
    text: "A phishing attack is designed to:",
    category: "Threat Detection",
    options: [
      { letter: 'A', text: "Speed up networks" },
      { letter: 'B', text: "Trick users into revealing sensitive information" },
      { letter: 'C', text: "Remove malware" },
      { letter: 'D', text: "Encrypt files" }
    ],
    correctLetter: 'B',
    correctAnswerText: "B. Trick users into revealing sensitive information",
    explanation: "Phishing uses deceptive emails or messages to manipulate individuals into disclosing sensitive personal details."
  },
  {
    id: 5,
    text: "Which tool is commonly used for network scanning?",
    category: "Ethical Hacking",
    options: [
      { letter: 'A', text: "Photoshop" },
      { letter: 'B', text: "Wireshark" },
      { letter: 'C', text: "Nmap" },
      { letter: 'D', text: "Excel" }
    ],
    correctLetter: 'C',
    correctAnswerText: "C. Nmap",
    explanation: "Nmap is a powerful network scanning tool used to discover hosts, open ports, and analyze network topology."
  },
  {
    id: 6,
    text: "What is Multi-Factor Authentication (MFA)?",
    category: "Security Awareness",
    options: [
      { letter: 'A', text: "Multiple passwords" },
      { letter: 'B', text: "Using two or more verification methods" },
      { letter: 'C', text: "Firewall configuration" },
      { letter: 'D', text: "Password sharing" }
    ],
    correctLetter: 'B',
    correctAnswerText: "B. Using two or more verification methods",
    explanation: "MFA enhances security by requiring users to verify their identity through multiple distinct authentication layers."
  },
  {
    id: 7,
    text: "What does the Principle of Least Privilege mean?",
    category: "Best Practices",
    options: [
      { letter: 'A', text: "Give users all permissions" },
      { letter: 'B', text: "Restrict users to only the access they need" },
      { letter: 'C', text: "Remove all permissions" },
      { letter: 'D', text: "Share administrator accounts" }
    ],
    correctLetter: 'B',
    correctAnswerText: "B. Restrict users to only the access they need",
    explanation: "This core security principle minimizes security risks by limiting user access to the absolute minimum required for their role."
  },
  {
    id: 8,
    text: "Which of the following is a common web application vulnerability?",
    category: "Ethical Hacking",
    options: [
      { letter: 'A', text: "SQL Injection" },
      { letter: 'B', text: "HDMI Injection" },
      { letter: 'C', text: "USB Injection" },
      { letter: 'D', text: "DNS Broadcasting" }
    ],
    correctLetter: 'A',
    correctAnswerText: "A. SQL Injection",
    explanation: "SQL Injection allows attackers to inject malicious SQL commands to bypass security and manipulate backend databases."
  },
  {
    id: 9,
    text: "What is the primary purpose of antivirus software?",
    category: "Security Awareness",
    options: [
      { letter: 'A', text: "Increase RAM" },
      { letter: 'B', text: "Detect and remove malicious software" },
      { letter: 'C', text: "Create backups" },
      { letter: 'D', text: "Configure routers" }
    ],
    correctLetter: 'B',
    correctAnswerText: "B. Detect and remove malicious software",
    explanation: "Antivirus software scans system files, memory, and processes to identify, quarantine, and eliminate malware."
  },
  {
    id: 10,
    text: "What should you do if you receive a suspicious email asking for login credentials?",
    category: "Best Practices",
    options: [
      { letter: 'A', text: "Reply immediately" },
      { letter: 'B', text: "Click the link to verify" },
      { letter: 'C', text: "Ignore security warnings" },
      { letter: 'D', text: "Verify the sender and report the email" }
    ],
    correctLetter: 'D',
    correctAnswerText: "D. Verify the sender and report the email",
    explanation: "Suspicious requests should be handled with caution by verifying the source and reporting the threat to prevent credential theft."
  }
];

interface QuizViewProps {
  isSaudiGreenMode: boolean;
  onGoBack: () => void;
}

export default function QuizView({ isSaudiGreenMode, onGoBack }: QuizViewProps) {
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState<'intro' | 'quiz' | 'completed'>('intro');
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-scroll to top when question or step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, currentQuestionIndex]);

  // Determine Rank and Description (Strictly no emojis)
  const getResults = (scoreValue: number) => {
    if (scoreValue >= 9) {
      return {
        rank: "Cyber Security Expert",
        colorClass: "text-amber-500",
        badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        icon: <Trophy className="w-8 h-8 text-amber-500 shrink-0" />,
        description: "Successfully completed the Cyber Security Readiness Assessment with distinction and demonstrated a strong understanding of cybersecurity principles and best practices."
      };
    } else if (scoreValue >= 7) {
      return {
        rank: "Security Professional",
        colorClass: "text-[#00a36c]",
        badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />,
        description: "Successfully completed the Cyber Security Readiness Assessment and demonstrated solid cybersecurity awareness and technical knowledge."
      };
    } else if (scoreValue >= 5) {
      return {
        rank: "Security Enthusiast",
        colorClass: "text-blue-500",
        badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        icon: <Award className="w-8 h-8 text-blue-500 shrink-0" />,
        description: "Successfully completed the Cyber Security Readiness Assessment and demonstrated foundational cybersecurity knowledge."
      };
    } else {
      return {
        rank: "Future Cyber Defender",
        colorClass: "text-indigo-400",
        badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
        icon: <BookOpen className="w-8 h-8 text-indigo-400 shrink-0" />,
        description: "Participated in the Cyber Security Readiness Assessment and began their cybersecurity learning journey."
      };
    }
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setStep('quiz');
    setCurrentQuestionIndex(0);
  };

  const handleSelectAnswer = (letter: 'A' | 'B' | 'C' | 'D') => {
    const qId = QUESTIONS[currentQuestionIndex].id;
    setAnswers(prev => ({
      ...prev,
      [qId]: letter
    }));
  };

  const toggleBookmark = () => {
    setBookmarkedQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correctLetter) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setStep('completed');
  };

  // Canvas drawing logic for Certificate Download (Matching the fifth reference image)
  const handleDownloadCertificate = () => {
    if (score === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    canvas.width = 1120;
    canvas.height = 790;

    // Background: elegant ivory/cream gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1120, 790);
    if (isSaudiGreenMode) {
      bgGrad.addColorStop(0, '#060f0c');
      bgGrad.addColorStop(1, '#0c1a15');
    } else {
      bgGrad.addColorStop(0, '#fafaf7');
      bgGrad.addColorStop(1, '#f5f2e8');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1120, 790);

    // Subtle background pattern - horizontal security lines
    ctx.strokeStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.02)' : 'rgba(13, 92, 86, 0.015)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 790; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1120, i);
      ctx.stroke();
    }

    // Outer Teal Border (Frame) with double line
    ctx.strokeStyle = isSaudiGreenMode ? '#00a36c' : '#0d5c56';
    ctx.lineWidth = 3;
    ctx.strokeRect(25, 25, 1070, 740);

    ctx.strokeStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.3)' : 'rgba(13, 92, 86, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(31, 31, 1058, 728);

    // Corner flourishes / ornaments
    const drawCornerOrnament = (x: number, y: number, xDir: number, yDir: number) => {
      ctx.strokeStyle = isSaudiGreenMode ? '#00a36c' : '#0d5c56';
      ctx.lineWidth = 2;
      
      // Horizontal and vertical crossing lines
      ctx.beginPath();
      ctx.moveTo(x, y + yDir * 25);
      ctx.lineTo(x, y);
      ctx.lineTo(x + xDir * 25, y);
      ctx.stroke();

      // Small nested decorative dot or box
      ctx.fillStyle = isSaudiGreenMode ? '#00a36c' : '#0d5c56';
      ctx.fillRect(x + xDir * 8 - 2, y + yDir * 8 - 2, 4, 4);
    };
    drawCornerOrnament(38, 38, 1, 1);
    drawCornerOrnament(1082, 38, -1, 1);
    drawCornerOrnament(38, 752, 1, -1);
    drawCornerOrnament(1082, 752, -1, -1);

    // Diagonal top-right ribbon (Matching reference image)
    ctx.save();
    ctx.fillStyle = isSaudiGreenMode ? '#00a36c' : '#0d5c56';
    ctx.beginPath();
    ctx.moveTo(1020, 25);
    ctx.lineTo(1095, 25);
    ctx.lineTo(1095, 100);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // TOP LEFT: Logo & Authority info
    // 1. Draw elegant geometric chevrons/shield crest
    ctx.save();
    ctx.translate(75, 75);
    ctx.strokeStyle = isSaudiGreenMode ? '#34d399' : '#0d5c56';
    ctx.fillStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.08)' : 'rgba(13, 92, 86, 0.04)';
    ctx.lineWidth = 2.5;
    
    // Abstract geometric crest form of 'MR' badge
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(15, 0);
    ctx.lineTo(30, 15);
    ctx.lineTo(30, 35);
    ctx.lineTo(15, 45);
    ctx.lineTo(0, 35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner stylized lines
    ctx.beginPath();
    ctx.moveTo(5, 20);
    ctx.lineTo(15, 30);
    ctx.lineTo(25, 20);
    ctx.moveTo(15, 30);
    ctx.lineTo(15, 42);
    ctx.stroke();
    ctx.restore();

    // 2. Authority Title text
    ctx.textAlign = 'left';
    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#0d5c56';
    ctx.font = "bold 14px 'Inter', sans-serif";
    ctx.fillText("MUBIN ROSHAN", 120, 92);
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#52796f';
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("Cyber Security Analyst", 120, 108);
    ctx.fillText("SQL Database Administrator", 120, 120);

    // TOP RIGHT: Certificate ID (Replicating "MR-CSRQ-2025-0522-0187")
    ctx.textAlign = 'right';
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#52796f';
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("Certificate ID", 1010, 92);
    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#111827';
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.fillText(`MR-CSRQ-2026-0624-01${10 + (score || 0)}`, 1010, 108);

    // CENTER: "CERTIFICATE OF ACHIEVEMENT"
    ctx.textAlign = 'center';
    ctx.fillStyle = isSaudiGreenMode ? '#34d399' : '#0d5c56';
    ctx.font = "bold 42px 'Playfair Display', 'Georgia', serif";
    ctx.letterSpacing = '5px';
    ctx.fillText("CERTIFICATE", 560, 230);

    // "OF ACHIEVEMENT" with beautiful horizontal lines
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#475569';
    ctx.font = "500 12px 'JetBrains Mono', monospace";
    ctx.letterSpacing = '3px';
    const subTitle = "OF ACHIEVEMENT";
    ctx.fillText(subTitle, 560, 262);

    const subTextWidth = ctx.measureText(subTitle).width;
    ctx.strokeStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.3)' : 'rgba(13, 92, 86, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(560 - subTextWidth/2 - 40, 258);
    ctx.lineTo(560 - subTextWidth/2 - 10, 258);
    ctx.moveTo(560 + subTextWidth/2 + 10, 258);
    ctx.lineTo(560 + subTextWidth/2 + 40, 258);
    ctx.stroke();

    // "This is to certify that"
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#64748b';
    ctx.font = "italic 15px 'Georgia', serif";
    ctx.fillText("This is to certify that", 560, 320);

    // Recipient Name (Large, elegant serif / playfair, beautiful italic signature script vibe)
    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#0d5c56';
    ctx.font = "italic 44px 'Playfair Display', 'Georgia', serif";
    ctx.fillText(userName, 560, 385);

    // Decorative line below name
    ctx.strokeStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.35)' : 'rgba(13, 92, 86, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(320, 405);
    ctx.lineTo(800, 405);
    ctx.stroke();

    // Description paragraph
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#475569';
    ctx.font = "13px 'Inter', sans-serif";
    ctx.fillText("has successfully completed the", 560, 440);

    ctx.fillStyle = isSaudiGreenMode ? '#34d399' : '#0d5c56';
    ctx.font = "bold 17px 'Inter', sans-serif";
    ctx.fillText("Cyber Security Readiness Quiz", 560, 470);

    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#475569';
    ctx.font = "13.5px 'Inter', sans-serif";
    ctx.fillText("demonstrating knowledge in cybersecurity, SQL database administration,", 560, 500);
    ctx.fillText("and healthcare security practices.", 560, 520);

    // BOTTOM SECTION
    // Bottom Left: Score & Date
    ctx.textAlign = 'left';
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#64748b';
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("Score", 120, 620);
    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#111827';
    ctx.font = "bold 18px 'Inter', sans-serif";
    ctx.fillText(`${score} / 10`, 120, 646);

    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#64748b';
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("Date", 230, 620);
    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#111827';
    ctx.font = "bold 15px 'Inter', sans-serif";
    ctx.fillText(today, 230, 646);

    // Bottom Right: Verification Signature & Author Titles
    ctx.textAlign = 'right';
    ctx.strokeStyle = isSaudiGreenMode ? 'rgba(52, 211, 153, 0.35)' : 'rgba(13, 92, 86, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(800, 610);
    ctx.lineTo(1000, 610);
    ctx.stroke();

    // Hand-drawn cursive style signature
    ctx.fillStyle = isSaudiGreenMode ? '#34d399' : '#0d5c56';
    ctx.font = "italic 22px 'Playfair Display', 'Georgia', serif";
    ctx.fillText("Mubin Roshan", 950, 600);

    ctx.fillStyle = isSaudiGreenMode ? '#ffffff' : '#0d5c56';
    ctx.font = "bold 13px 'Inter', sans-serif";
    ctx.fillText("Mubin Roshan", 1000, 630);
    ctx.fillStyle = isSaudiGreenMode ? '#94a3b8' : '#52796f';
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("Cyber Security Analyst", 1000, 646);
    ctx.fillText("SQL Database Administrator", 1000, 658);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${userName.trim().replace(/\s+/g, '_')}_cybersecurity_certificate.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShareOnLinkedIn = () => {
    setShowShareModal(true);
  };

  const shareText = `I have completed the Cyber Security Readiness Assessment on Mubin Roshan's Cybersecurity Portfolio!\n\nScore: ${score}/10\nRank: ${score !== null ? getResults(score).rank : ''}\n\nVerify yours here: ${window.location.origin}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Get current active category to highlight
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const activeCategory = currentQuestion ? currentQuestion.category : '';

  const categoriesList = [
    { name: 'Network Security', icon: <Network className="w-4 h-4" /> },
    { name: 'Ethical Hacking', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Threat Detection', icon: <ShieldAlert className="w-4 h-4" /> },
    { name: 'Security Awareness', icon: <Eye className="w-4 h-4" /> },
    { name: 'Best Practices', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto py-6 sm:py-10 relative z-10 transition-colors ${
      isSaudiGreenMode ? 'text-gray-100' : 'text-[#0d5c56]'
    }`} id="cybersecurity-quiz-section">
      
      {/* Hidden Canvas used for generating the certificate */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Intro Step */}
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
              isSaudiGreenMode 
                ? 'bg-[#121115] border-emerald-500/20 shadow-emerald-950/20' 
                : 'bg-white border-teal-100 shadow-teal-900/5'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className={`p-4 rounded-full ${
                isSaudiGreenMode ? 'bg-[#005639]/30 text-emerald-400' : 'bg-teal-50 text-teal-700'
              }`}>
                <ShieldCheck className="w-12 h-12" />
              </div>
              
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-sans">
                  Ready to Test Your Cybersecurity Skills?
                </h1>
                <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
                  isSaudiGreenMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Take the Cyber Security Readiness Assessment and evaluate your knowledge across ethical hacking, network security, threat detection, and cybersecurity fundamentals.
                </p>
              </div>

              <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border max-w-lg w-full justify-center ${
                isSaudiGreenMode 
                  ? 'bg-[#005639]/10 border-emerald-500/20 text-emerald-300' 
                  : 'bg-amber-50/50 border-amber-200 text-amber-800'
              }`}>
                <Award className="w-5 h-5 shrink-0 text-amber-500" />
                <span className="text-xs sm:text-sm font-medium">
                  Receive a personalized certificate upon successful completion.
                </span>
              </div>

              <form onSubmit={handleStartQuiz} className="w-full max-w-md space-y-4 pt-4">
                <div className="text-left space-y-1.5">
                  <label htmlFor="user-name-input" className="text-xs font-mono font-bold uppercase tracking-wider block">
                    Full Name for Certificate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      id="user-name-input"
                      type="text"
                      required
                      placeholder="Enter your full name..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className={`w-full py-3 pl-10 pr-4 text-sm rounded-xl focus:outline-none focus:ring-2 transition-all font-sans ${
                        isSaudiGreenMode 
                          ? 'bg-[#18161b] border border-white/10 text-white placeholder-gray-500 focus:ring-emerald-500/50' 
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-teal-500/50'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg focus:outline-none flex items-center justify-center gap-2 keep-text-cream ${
                      isSaudiGreenMode 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400' 
                        : 'bg-[#0d5c56] hover:bg-[#0b4d48]'
                    }`}
                  >
                    <span className="keep-text-cream">Take the Quiz Now</span>
                    <ChevronRight className="w-4 h-4 keep-text-cream" />
                  </button>
                  <button
                    type="button"
                    onClick={onGoBack}
                    className={`w-full sm:w-1/3 py-3.5 rounded-xl text-sm font-semibold transition-all border focus:outline-none ${
                      isSaudiGreenMode 
                        ? 'bg-transparent border-white/10 hover:bg-white/[0.04] text-gray-400' 
                        : 'bg-transparent border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Quiz Step - Gorgeous 2-Column Design matching Reference Image */}
        {step === 'quiz' && currentQuestion && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Breadcrumb & Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <span className="hover:underline cursor-pointer" onClick={onGoBack}>Home</span>
                <ChevronRight className="w-3 h-3" />
                <span className="hover:underline cursor-pointer" onClick={() => setStep('intro')}>More</span>
                <ChevronRight className="w-3 h-3" />
                <span className={isSaudiGreenMode ? 'text-emerald-400' : 'text-[#0d5c56] font-semibold'}>Cyber Security Quiz</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight flex items-center gap-2">
                    <span>Cyber Security Readiness Quiz</span>
                    <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                  </h1>
                  <p className="text-sm text-gray-400">Test your knowledge and earn a certificate</p>
                </div>

                <div className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border flex items-center gap-2 ${
                  isSaudiGreenMode ? 'bg-[#121115] border-white/5' : 'bg-teal-50/50 border-teal-100'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Answering as: <span className="font-bold text-teal-500">{userName}</span></span>
                </div>
              </div>
            </div>

            {/* Main Columns Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Overview, Progress, Categories, Trophy) */}
              <div className="lg:col-span-4 space-y-5">
                
                {/* 1. Quiz Overview */}
                <div className={`p-5 rounded-2xl border ${
                  isSaudiGreenMode ? 'bg-[#121115] border-white/5' : 'bg-white border-gray-100 shadow-sm'
                }`}>
                  <div className="flex items-center gap-2.5 border-b border-white/[0.04] pb-3 mb-4">
                    <BookOpen className="w-4 h-4 text-teal-500" />
                    <h3 className="text-xs font-bold font-mono tracking-wider uppercase">Quiz Overview</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold">10 Questions • Multiple Choice</p>
                    </div>
                    <ul className="space-y-2.5 text-xs text-gray-400">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Instant Results</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Personalized Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Share2 className="w-3.5 h-3.5 text-blue-500" />
                        <span>Share on LinkedIn</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 2. Your Progress */}
                <div className={`p-5 rounded-2xl border bg-[#0d5c56] border-[#0a4641] shadow-sm text-[#fdfbf7]`}>
                  <div className="border-b border-[#fdfbf7]/15 pb-3 mb-4">
                    <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-[#fdfbf7]/90">Your Progress</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full bg-[#fdfbf7]/20 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#fdfbf7] h-full transition-all duration-500"
                        style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#fdfbf7]/90">
                      <span>Question {currentQuestionIndex + 1} of 10</span>
                      <span className="font-bold text-[#fdfbf7]">{Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* 3. Quiz Categories */}
                <div className={`p-5 rounded-2xl border ${
                  isSaudiGreenMode ? 'bg-[#121115] border-white/5' : 'bg-white border-gray-100 shadow-sm'
                }`}>
                  <div className="border-b border-white/[0.04] pb-3 mb-4">
                    <h3 className="text-xs font-bold font-mono tracking-wider uppercase">Quiz Categories</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {categoriesList.map((cat, i) => {
                      const isActive = activeCategory === cat.name;
                      return (
                        <li 
                          key={i} 
                          className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium transition-colors ${
                            isActive 
                              ? isSaudiGreenMode 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' 
                                : 'bg-teal-50 text-teal-800 border border-teal-100'
                              : 'text-gray-400'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {cat.icon}
                            <span>{cat.name}</span>
                          </span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 4. Complete the quiz / unlock */}
                <div className={`p-4 rounded-2xl border ${
                  isSaudiGreenMode 
                    ? 'bg-[#005639]/10 border-emerald-500/20' 
                    : 'bg-emerald-50/40 border-emerald-100 shadow-sm'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold font-sans">Complete the quiz</h4>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Score 70% or above to unlock your certificate.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Question Box) */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* Core Question Card */}
                <div className={`p-6 sm:p-8 rounded-2xl border ${
                  isSaudiGreenMode ? 'bg-[#121115] border-white/5' : 'bg-white border-gray-100 shadow-sm'
                }`}>
                  
                  {/* Question header */}
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-6">
                    <span className="text-xs font-mono font-bold tracking-wide text-gray-400 uppercase">
                      Question {currentQuestionIndex + 1} of 10
                    </span>
                    
                    <button
                      onClick={toggleBookmark}
                      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-all ${
                        bookmarkedQuestions[currentQuestionIndex]
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                          : 'bg-transparent border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/[0.04] text-gray-400'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarkedQuestions[currentQuestionIndex] ? 'fill-amber-500' : ''}`} />
                      <span>Bookmark</span>
                    </button>
                  </div>

                  {/* Question text */}
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight leading-snug mb-6">
                    {currentQuestion.text}
                  </h2>

                  {/* Options Stack */}
                  <div className="space-y-3.5 mb-6">
                    {currentQuestion.options.map((opt) => {
                      const selectedAnswer = answers[currentQuestion.id];
                      const isSelected = selectedAnswer === opt.letter;
                      const isCorrectAnswer = opt.letter === currentQuestion.correctLetter;

                      // Highlight styles when selected
                      let containerStyle = isSaudiGreenMode 
                        ? 'bg-[#18161b] border-white/5 hover:border-white/10 text-gray-300' 
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700';
                      
                      let radioStyle = isSaudiGreenMode ? 'border-white/20' : 'border-gray-300';

                      if (isSelected) {
                        if (isSaudiGreenMode) {
                          containerStyle = 'bg-emerald-500/10 border-emerald-500 text-white';
                          radioStyle = 'border-emerald-400 bg-emerald-500';
                        } else {
                          containerStyle = 'bg-teal-50/50 border-teal-600 text-[#0d5c56] font-semibold';
                          radioStyle = 'border-teal-600 bg-teal-600';
                        }
                      }

                      return (
                        <button
                          key={opt.letter}
                          onClick={() => handleSelectAnswer(opt.letter)}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-4 group ${containerStyle}`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${radioStyle}`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="font-medium">
                            <span className="font-mono font-bold mr-2">{opt.letter}.</span>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Banner is now shown only on the final Completed screen */}

                </div>

                {/* Navigation Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-1.5 ${
                      currentQuestionIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-gray-500 border-gray-300 dark:border-white/10'
                        : isSaudiGreenMode
                          ? 'bg-transparent border-white/10 hover:bg-white/[0.04] text-gray-300'
                          : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 select-none ${
                      answers[currentQuestion.id]
                        ? isSaudiGreenMode
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 keep-text-cream shadow-md cursor-pointer'
                          : 'bg-[#0d5c56] hover:bg-[#0b4d48] keep-text-cream shadow-md cursor-pointer'
                        : 'bg-gray-500/10 text-gray-500 dark:text-gray-600 cursor-not-allowed border border-transparent'
                    }`}
                  >
                    <span className={answers[currentQuestion.id] ? "keep-text-cream" : ""}>
                      {currentQuestionIndex === QUESTIONS.length - 1 ? 'Submit Assessment' : 'Next Question'}
                    </span>
                    <ChevronRight className={`w-4 h-4 ${answers[currentQuestion.id] ? "keep-text-cream" : ""}`} />
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Info Bar / Metrics Footer */}
            <div className={`p-4 sm:p-5 rounded-2xl border grid grid-cols-1 md:grid-cols-4 gap-4 items-center ${
              isSaudiGreenMode ? 'bg-[#121115] border-white/5' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="md:col-span-2 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">Challenge yourself. Strengthen your skills.</h4>
                  <p className="text-[11px] text-gray-400">Stay sharp. Stay secure. Keep learning.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1 md:border-l border-white/[0.04]">
                <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold">10 Questions</p>
                  <p className="text-[9px] text-gray-500 font-mono uppercase">Assessment Count</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1 md:border-l border-white/[0.04]">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold">5-7 min Duration</p>
                  <p className="text-[9px] text-gray-500 font-mono uppercase">Estimated Time</p>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* Completed Step - Assessment Summary Results Page */}
        {step === 'completed' && score !== null && (() => {
          const results = getResults(score);
          return (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 animate-fade-in"
            >
              {/* Score summary block */}
              <div className={`p-6 sm:p-10 rounded-3xl border shadow-xl text-center space-y-6 relative overflow-hidden ${
                isSaudiGreenMode 
                  ? 'bg-[#121115] border-emerald-500/20 shadow-emerald-950/20' 
                  : 'bg-white border-teal-100 shadow-teal-900/5'
              }`}>
                {/* Visual decoration line */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500" />
                
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-4 rounded-full ${
                    isSaudiGreenMode ? 'bg-[#005639]/20 border border-emerald-500/20' : 'bg-teal-50 border border-teal-100'
                  }`}>
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider font-mono text-emerald-500">
                    Assessment Completed
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
                  <div className={`p-4 rounded-2xl border flex flex-col justify-center ${
                    isSaudiGreenMode ? 'bg-[#18161b] border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Score</span>
                    <span className="text-2xl sm:text-3.5xl font-bold mt-1 text-teal-400">
                      {score} / 10
                    </span>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-center items-center ${
                    isSaudiGreenMode ? 'bg-[#18161b] border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-gray-500 mb-1 tracking-wider">Rank</span>
                    <span className="flex items-center gap-1.5">
                      {results.icon}
                      <span className={`text-base sm:text-lg font-bold font-sans tracking-tight ${results.colorClass}`}>
                        {results.rank}
                      </span>
                    </span>
                  </div>

                  <div className={`p-4 rounded-2xl border flex flex-col justify-center ${
                    isSaudiGreenMode ? 'bg-[#18161b] border-white/5' : 'bg-gray-50 border-gray-100'
                  }`}>
                    <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Certificate Status</span>
                    <span className="text-sm sm:text-base font-bold mt-1 text-amber-500">
                      Available for Download
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-lg mx-auto">
                  <button
                    onClick={handleDownloadCertificate}
                    className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow focus:outline-none flex items-center justify-center gap-2 keep-text-cream ${
                      isSaudiGreenMode 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400' 
                        : 'bg-[#0d5c56] hover:bg-[#0b4d48]'
                    }`}
                  >
                    <Download className="w-4 h-4 keep-text-cream" />
                    <span className="keep-text-cream">Download Certificate</span>
                  </button>

                  <button
                    onClick={handleShareOnLinkedIn}
                    className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all border focus:outline-none flex items-center justify-center gap-2 ${
                      isSaudiGreenMode 
                        ? 'bg-transparent border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-300' 
                        : 'bg-transparent border-teal-600 hover:bg-teal-50 text-teal-800'
                    }`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share on LinkedIn</span>
                  </button>
                </div>
              </div>

              {/* Certificate Preview visual box */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500 pl-1">
                  Certificate of Completion Preview
                </h3>
                
                <div className={`p-6 sm:p-12 rounded-3xl border relative text-center space-y-8 select-none border-dashed ${
                  isSaudiGreenMode 
                    ? 'bg-[#110f14] border-emerald-500/20 text-white' 
                    : 'bg-[#fafafa] border-teal-500/25 text-gray-900 shadow-sm'
                }`}>
                  <div className={`absolute inset-4 border rounded-2xl pointer-events-none ${
                    isSaudiGreenMode ? 'border-emerald-500/20' : 'border-teal-500/15'
                  }`} />
                  
                  <div className="space-y-1.5 relative z-10">
                    <span className="text-[10px] font-mono tracking-[4px] text-emerald-500 uppercase font-bold">
                      Cybersecurity Readiness Assessment
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight border-b border-white/5 pb-4 max-w-xl mx-auto">
                      CERTIFICATE OF COMPLETION
                    </h2>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto relative z-10">
                    <p className="text-xs sm:text-sm italic text-gray-400">
                      This is proudly presented to
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-teal-400 font-sans tracking-tight">
                      {userName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
                      {results.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-md mx-auto pt-6 text-xs font-mono relative z-10">
                    <div className="text-center">
                      <span className="text-gray-400 block border-b border-white/10 pb-1 px-4">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="text-[10px] text-gray-500 mt-1 block">DATE ISSUED</span>
                    </div>

                    <div className="text-center">
                      <span className="text-emerald-400 italic block border-b border-white/10 pb-1 px-4 font-serif">
                        Mubin Roshan
                      </span>
                      <span className="text-[10px] text-gray-500 mt-1 block">VERIFIED SIGNATURE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanations List */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500 pl-1">
                  Performance Analysis & Explanations
                </h3>

                <div className="space-y-4">
                  {QUESTIONS.map((question, index) => {
                    const selectedLetter = answers[question.id];
                    const isCorrect = selectedLetter === question.correctLetter;
                    return (
                      <div
                        key={question.id}
                        className={`p-5 sm:p-6 rounded-2xl border flex flex-col gap-4 ${
                          isCorrect 
                            ? isSaudiGreenMode 
                              ? 'bg-emerald-950/10 border-emerald-500/20' 
                              : 'bg-emerald-50/50 border-emerald-100'
                            : isSaudiGreenMode
                              ? 'bg-red-950/10 border-red-500/20'
                              : 'bg-red-50/50 border-red-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                            isCorrect 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {index + 1}
                          </span>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm sm:text-base leading-tight">
                              {question.text}
                            </h4>
                            <p className="text-xs text-gray-500 font-mono">
                              Your answer: <span className="font-bold">{selectedLetter}</span> | Correct Answer: <span className="font-bold text-emerald-500">{question.correctLetter}</span>
                            </p>
                          </div>
                        </div>

                        <div className="pl-0 sm:pl-9 space-y-2">
                          <div className={`text-xs p-3.5 rounded-xl font-mono leading-relaxed flex items-start gap-2.5 ${
                            isSaudiGreenMode ? 'bg-black/30 text-gray-300' : 'bg-white border text-gray-600'
                          }`}>
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-emerald-500 uppercase tracking-wider">Correct Answer Explanation: </span>
                              {question.correctAnswerText}. {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Retake Action */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setAnswers({});
                    setScore(null);
                    setStep('intro');
                    setCurrentQuestionIndex(0);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-all focus:outline-none ${
                    isSaudiGreenMode 
                      ? 'bg-transparent border-white/10 hover:bg-white/[0.04] text-gray-300' 
                      : 'bg-transparent border-teal-600 hover:bg-teal-50 text-teal-800'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Assessment</span>
                </button>
              </div>

            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* LinkedIn Share Modal popup */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`max-w-md w-full p-6 sm:p-8 rounded-3xl border shadow-2xl relative ${
                isSaudiGreenMode ? 'bg-[#121115] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/[0.05] transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                    <Share2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Share on LinkedIn</h3>
                    <p className="text-xs text-gray-400">Announce your credential with your network</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase text-gray-500">Post Text Preview</label>
                  <textarea
                    readOnly
                    value={shareText}
                    className={`w-full h-32 p-3 text-xs sm:text-sm rounded-xl focus:outline-none resize-none font-sans border ${
                      isSaudiGreenMode 
                        ? 'bg-black/30 border-white/5 text-gray-300' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      copied 
                        ? 'bg-emerald-600 text-white' 
                        : isSaudiGreenMode
                          ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    <span>{copied ? "Copied Post!" : "Copy Post Text"}</span>
                  </button>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0077b5] text-white hover:bg-[#006297] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Go to LinkedIn</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
