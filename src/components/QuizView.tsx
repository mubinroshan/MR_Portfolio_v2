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
  ChevronLeft,
  Target,
  Star,
  IdCard,
  AlertTriangle
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
  const [nameError, setNameError] = useState('');
  const [step, setStep] = useState<'intro' | 'quiz' | 'completed'>('intro');
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [certificateId, setCertificateId] = useState('');
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
    if (!userName.trim()) {
      setNameError('Please fill out this field.');
      return;
    }
    setNameError('');
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

    // Generate a unique, stable certificate ID
    const year = 2026;
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digits
    setCertificateId(`MR-${year}-${randomNum}`);

    setStep('completed');
  };

  // Canvas drawing logic for Certificate Download (Matching the real certificate template)
  const handleDownloadCertificate = () => {
    if (score === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const verifyUrl = `https://mubinroshan.com/verify/${certificateId}`;
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    const sigImg = new Image();
    sigImg.crossOrigin = "anonymous";
    const patternImg = new Image();
    patternImg.crossOrigin = "anonymous";

    let imagesLoaded = 0;
    const totalImages = 4;

    const checkAndDraw = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        drawCertificateOnCanvas();
      }
    };

    logoImg.onload = checkAndDraw;
    logoImg.onerror = () => {
      console.error("Failed to load logo image");
      checkAndDraw();
    };

    qrImg.onload = checkAndDraw;
    qrImg.onerror = () => {
      console.error("Failed to load QR code image");
      checkAndDraw();
    };

    sigImg.onload = checkAndDraw;
    sigImg.onerror = () => {
      console.error("Failed to load signature image");
      checkAndDraw();
    };

    patternImg.onload = checkAndDraw;
    patternImg.onerror = () => {
      console.error("Failed to load pattern image");
      checkAndDraw();
    };

    // Load resources
    logoImg.src = '/favicon.png';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}`;
    sigImg.src = '/mubin_signature.png';
    patternImg.src = '/cert_patterns.png';

    const drawCertificateOnCanvas = () => {
      canvas.width = 1050;
      canvas.height = 660;

      // 1. Draw Cream Background
      ctx.fillStyle = '#FAF6EB';
      ctx.fillRect(0, 0, 1050, 660);

      // 2. Draw Pattern Borders on Top Header and Bottom Footer (Height 35px)
      if (patternImg.complete && patternImg.naturalWidth > 0) {
        // Draw top header pattern band
        ctx.drawImage(patternImg, 0, 0, 1050, 35);
        // Draw bottom footer pattern band
        ctx.drawImage(patternImg, 0, 625, 1050, 35);
      } else {
        // Fallback simple solid color bands if image is missing
        ctx.fillStyle = '#0C6A63';
        ctx.fillRect(0, 0, 1050, 35);
        ctx.fillRect(0, 625, 1050, 35);
      }

      // 3. Draw Logo Image and Text (Top-Left)
      const logoX = 73; // 7% of 1050
      const logoY = 46; // 7% of 660
      const logoSize = 84;
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      }

      // Logo text
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#0C6A63';
      ctx.font = "bold 21px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("MUBIN ROSHAN ACADEMY", logoX + logoSize + 16, logoY + 16);

      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.font = "bold 11px 'JetBrains Mono', monospace";
      ctx.fillText("INSPIRE. EMPOWER. EXCEL.", logoX + logoSize + 16, logoY + 44);

      // 4. Draw Title "CERTIFICATE OF ACHIEVEMENT" (Left-aligned)
      const titleX = 73;
      const titleY = 165;
      
      ctx.strokeStyle = '#004d40';
      ctx.lineWidth = 2.0;
      ctx.font = "bold 59px 'Montserrat', sans-serif";
      ctx.strokeText("CERTIFICATE", titleX, titleY);

      ctx.fillStyle = '#0C6A63';
      ctx.font = "extrabold 22px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("OF ACHIEVEMENT", titleX, titleY + 65);

      // 5. Draw "This is to certify that"
      const certY = 297;
      ctx.fillStyle = '#4B5563'; // gray-600
      ctx.font = "italic 17px Georgia, serif";
      ctx.fillText("This is to certify that", titleX, certY);

      // 6. Draw Name with conditional underline length & center centering for TEST
      const nameY = 330;
      const nameUpper = (userName || 'PARTICIPANT').toUpperCase();
      const isTest = nameUpper === 'TEST';
      
      ctx.fillStyle = '#0C6A63';
      ctx.font = "bold 44px 'Poppins', 'Inter', sans-serif";
      const textWidth = ctx.measureText(nameUpper).width;

      if (isTest) {
        // Centered name and line
        const centerNameX = 73 + 262.5; // Center of the 525px left column width
        ctx.textAlign = 'center';
        ctx.fillText(nameUpper, centerNameX, nameY);

        // Underline only a little wider than the word "TEST"
        const lineLen = textWidth + 40;
        ctx.strokeStyle = '#D1D5DB'; // gray-300
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerNameX - lineLen / 2, nameY + 60);
        ctx.lineTo(centerNameX + lineLen / 2, nameY + 60);
        ctx.stroke();

        // Draw Shield Check icon centered on this underline
        ctx.fillStyle = '#FAF6EB';
        ctx.fillRect(centerNameX - 16, nameY + 48, 32, 24);
        
        ctx.strokeStyle = '#0C6A63';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#0C6A63';
        ctx.beginPath();
        ctx.moveTo(centerNameX, nameY + 52);
        ctx.lineTo(centerNameX + 8, nameY + 55);
        ctx.lineTo(centerNameX + 8, nameY + 61);
        ctx.quadraticCurveTo(centerNameX + 8, nameY + 66, centerNameX, nameY + 69);
        ctx.quadraticCurveTo(centerNameX - 8, nameY + 66, centerNameX - 8, nameY + 61);
        ctx.lineTo(centerNameX - 8, nameY + 55);
        ctx.closePath();
        ctx.stroke();
      } else {
        // Left-aligned name with underline ending exactly at the end of the name
        ctx.textAlign = 'left';
        ctx.fillText(nameUpper, titleX, nameY);

        ctx.strokeStyle = '#D1D5DB'; // gray-300
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(titleX, nameY + 60);
        ctx.lineTo(titleX + textWidth, nameY + 60);
        ctx.stroke();

        // Draw Shield Check icon centered on this underline
        const badgeX = titleX + textWidth / 2;
        ctx.fillStyle = '#FAF6EB';
        ctx.fillRect(badgeX - 16, nameY + 48, 32, 24);
        
        ctx.strokeStyle = '#0C6A63';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#0C6A63';
        ctx.beginPath();
        ctx.moveTo(badgeX, nameY + 52);
        ctx.lineTo(badgeX + 8, nameY + 55);
        ctx.lineTo(badgeX + 8, nameY + 61);
        ctx.quadraticCurveTo(badgeX + 8, nameY + 66, badgeX, nameY + 69);
        ctx.quadraticCurveTo(badgeX - 8, nameY + 66, badgeX - 8, nameY + 61);
        ctx.lineTo(badgeX - 8, nameY + 55);
        ctx.closePath();
        ctx.stroke();
      }

      // 7. Draw Course Information
      const courseY = 416;
      ctx.textAlign = 'left';
      ctx.fillStyle = '#4B5563'; // gray-600
      ctx.font = "14px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("has successfully completed the", titleX, courseY);

      ctx.fillStyle = '#0C6A63';
      ctx.font = "bold 19px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("CYBER SECURITY READINESS ASSESSMENT", titleX, courseY + 24);

      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.font = "12px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("demonstrating knowledge in cybersecurity, SQL database administration,", titleX, courseY + 50);
      ctx.fillText("and healthcare security practices.", titleX, courseY + 68);

      // 8. Draw QR Code and Scan To Verify inside a small card style (Bottom Left)
      const qrX = 73;
      const qrY = 554;
      const qrWidth = 68;
      const qrHeight = 68;

      // Draw rounded rectangle card for QR Code
      const cardX = qrX - 12;
      const cardY = qrY - 10;
      const cardW = 235;
      const cardH = 88;
      const cardR = 12;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cardX + cardR, cardY);
      ctx.lineTo(cardX + cardW - cardR, cardY);
      ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + cardR);
      ctx.lineTo(cardX + cardW, cardY + cardH - cardR);
      ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - cardR, cardY + cardH);
      ctx.lineTo(cardX + cardR, cardY + cardH);
      ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - cardR);
      ctx.lineTo(cardX, cardY + cardR);
      ctx.quadraticCurveTo(cardX, cardY, cardX + cardR, cardY);
      ctx.closePath();
      
      // Card background fill (matches theme cream card #F5EFE1)
      ctx.fillStyle = '#F5EFE1';
      ctx.fill();
      
      // Card border stroke (light teal outline)
      ctx.strokeStyle = 'rgba(12, 106, 99, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      if (qrImg.complete && qrImg.naturalWidth > 0) {
        // Multiply blends white QR background into the soft F5EFE1 card background
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(qrImg, qrX, qrY, qrWidth, qrHeight);
      } else {
        ctx.fillStyle = '#0C6A63';
        ctx.fillRect(qrX, qrY, qrWidth, qrHeight);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX + 4, qrY + 4, qrWidth - 8, qrHeight - 8);
      }
      ctx.restore();

      // QR Verify text
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0C6A63'; // Rich brand green for contrast inside card
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.fillText("SCAN TO VERIFY", qrX + qrWidth + 16, qrY + 20);

      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillText("mubin.roshan/verify", qrX + qrWidth + 16, qrY + 38);

      // 9. Draw Middle Metadata Column
      const metaX = 567; // 54% of 1050
      const metaY = 297;

      const drawMetaItem = (label: string, value: string, yPos: number) => {
        ctx.fillStyle = '#9CA3AF'; // gray-400
        ctx.font = "bold 9px 'Poppins', 'Inter', sans-serif";
        ctx.fillText(label, metaX + 36, yPos);

        ctx.fillStyle = '#0C6A63';
        ctx.font = "bold 15px 'Poppins', 'Inter', sans-serif";
        ctx.fillText(value, metaX + 36, yPos + 16);
      };

      // Score
      drawMetaItem("SCORE", `${score} / 10`, metaY);
      ctx.strokeStyle = '#0C6A63';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(metaX + 12, metaY + 12, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Date
      const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      drawMetaItem("DATE", dateStr, metaY + 55);
      ctx.beginPath();
      ctx.arc(metaX + 12, metaY + 12 + 55, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Certificate ID
      drawMetaItem("CERTIFICATE ID", certificateId, metaY + 110);
      ctx.beginPath();
      ctx.arc(metaX + 12, metaY + 12 + 110, 10, 0, Math.PI * 2);
      ctx.stroke();

      // 10. Bottom Middle Text
      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.font = "11px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("Recognizing your commitment to cybersecurity", 420, 574);
      ctx.fillText("excellence and continuous learning.", 420, 592);

      // 11. Draw Signature (Right Column) - Increased size
      const sigX = 840;
      const sigY = 363;
      
      ctx.textAlign = 'center';
      if (sigImg.complete && sigImg.naturalWidth > 0) {
        // Increased from 160x55 to 220x75
        ctx.drawImage(sigImg, sigX - 110, sigY - 60, 220, 75);
      } else {
        ctx.fillStyle = '#0C6A63';
        ctx.font = "italic 32px Georgia, serif";
        ctx.fillText("Mubin Roshan", sigX, sigY);
      }

      ctx.strokeStyle = '#9CA3AF'; // gray-400
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sigX - 100, sigY + 10);
      ctx.lineTo(sigX + 100, sigY + 10);
      ctx.stroke();

      ctx.fillStyle = '#0C6A63';
      ctx.font = "bold 11px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("MUBIN ROSHAN", sigX, sigY + 26);

      ctx.fillStyle = '#6B7280'; // gray-500
      ctx.font = "10px 'Poppins', 'Inter', sans-serif";
      ctx.fillText("Cyber Security Analyst", sigX, sigY + 42);
      ctx.fillText("SQL Database Administrator", sigX, sigY + 56);

      // 12. Draw Stamp Logo on Bottom Right
      const stampX = 840;
      const stampY = 544;
      const stampSize = 84;
      if (logoImg.complete && logoImg.naturalWidth > 0) {
        ctx.drawImage(logoImg, stampX - stampSize / 2, stampY, stampSize, stampSize);
      }

      // 13. Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${userName.trim().replace(/\s+/g, '_')}_cybersecurity_certificate.png`;
      link.href = dataUrl;
      link.click();
    };

    // Fallback: If images load fails, trigger draw anyway
    setTimeout(() => {
      if (imagesLoaded < totalImages) {
        console.warn("Falling back to draw due to resource timeout");
        drawCertificateOnCanvas();
      }
    }, 1200);
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

              <form onSubmit={handleStartQuiz} noValidate className="w-full max-w-md space-y-4 pt-4">
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
                      placeholder="Enter your full name..."
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        if (e.target.value.trim()) {
                          setNameError('');
                        }
                      }}
                      className={`w-full py-3 pl-10 pr-4 text-sm rounded-xl focus:outline-none focus:ring-2 transition-all font-sans ${
                        nameError 
                          ? 'border-red-500/60 bg-red-950/10 text-red-100 placeholder-red-900 focus:ring-red-500/30'
                          : isSaudiGreenMode 
                            ? 'bg-[#18161b] border border-white/10 text-white placeholder-gray-500 focus:ring-emerald-500/50' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-teal-500/50'
                      }`}
                    />
                  </div>
                  {nameError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -4 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs font-mono shadow-sm ${
                        isSaudiGreenMode 
                          ? 'bg-[#121115] border-red-500/20 text-red-300' 
                          : 'bg-red-50 border-red-200 text-red-800'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-red-400 block font-mono">
                          [Validation Warning]
                        </span>
                        <p className="leading-relaxed font-sans font-medium text-xs">
                          {nameError}
                        </p>
                      </div>
                    </motion.div>
                  )}
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
                <div className={`p-5 rounded-2xl border bg-[#0d5c56] border-[#0a4641] shadow-sm text-[#fdfbf7] keep-text-cream`}>
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                    <h3 className="text-xs font-bold font-mono tracking-wider uppercase keep-text-cream" style={{ color: '#FAF6EB' }}>YOUR PROGRESS</h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] text-[#FAF6EB]/60 font-mono tracking-tight leading-none">
                        You are on track to complete the assessment
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold font-mono tracking-tight text-[#FAF6EB]">
                        {Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0a4641] border border-white/10 text-[10px] font-bold text-emerald-300 font-mono">
                        <span className="text-emerald-400">↑</span>
                        <span>Q{currentQuestionIndex + 1} of 10</span>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono">vs. total</span>
                    </div>

                    {/* Segmented Progress Bar */}
                    <div className="flex gap-[2px] h-7 w-full bg-[#083531] p-1 rounded-lg border border-white/5">
                      {Array.from({ length: 24 }).map((_, idx) => {
                        const totalSegments = 24;
                        const filledSegments = Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * totalSegments);
                        const isFilled = idx < filledSegments;
                        return (
                          <div
                            key={idx}
                            className={`h-full flex-1 transition-all duration-300 first:rounded-l-[4px] last:rounded-r-[4px] ${
                              isFilled 
                                ? 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.3)]' 
                                : 'bg-[#0a4641]'
                            }`}
                          />
                        );
                      })}
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-6 animate-fade-in"
            >
              {/* Score summary block (Assessment Completed Card Redesigned to exactly match reference with optimized compact heights) */}
              <div className="relative w-full overflow-hidden rounded-[28px] border border-gray-200/60 shadow-lg bg-[#FAF6EB] p-5 sm:p-7 flex flex-col items-center">
                
                {/* Top Border line (Teal on left, orange/amber on right) */}
                <div className="absolute top-0 inset-x-0 h-[5px] flex">
                  <div className="w-4/5 bg-[#0C6A63] rounded-tl-[28px]" />
                  <div className="w-1/5 bg-amber-500 rounded-tr-[28px]" />
                </div>

                {/* Left corner wave background patterns */}
                <svg className="absolute bottom-0 left-0 w-[45%] h-[55%] pointer-events-none z-0 opacity-80" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0,130 C90,150 130,90 200,170 C240,210 180,250 0,250 Z" fill="url(#left-grad)" />
                  <path d="M0,160 C60,170 100,140 160,200 C200,240 150,250 0,250 Z" fill="url(#left-grad-2)" opacity="0.4" />
                  <path d="M0,110 C70,120 110,70 180,140" stroke="#0C6A63" strokeWidth="0.75" strokeDasharray="1,3" opacity="0.3" />
                  <path d="M0,120 C75,130 115,80 185,150" stroke="#0C6A63" strokeWidth="0.75" strokeDasharray="1,3" opacity="0.2" />
                  <defs>
                    <linearGradient id="left-grad" x1="0" y1="130" x2="200" y2="250" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8BD8CE" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0C6A63" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="left-grad-2" x1="0" y1="160" x2="160" y2="250" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#CBEBE6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#1E8077" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Right corner wave background patterns */}
                <svg className="absolute bottom-0 right-0 w-[55%] h-[65%] pointer-events-none z-0 opacity-90" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M120,300 C200,230 280,120 450,140 L450,300 Z" fill="url(#right-grad-1)" />
                  <path d="M160,300 C240,240 310,160 450,180 L450,300 Z" fill="url(#right-grad-2)" />
                  <path d="M70,300 C150,220 250,110 450,120" stroke="#0C6A63" strokeWidth="1" strokeDasharray="2,3" opacity="0.25" />
                  <path d="M90,300 C170,230 270,130 450,140" stroke="#0C6A63" strokeWidth="1" strokeDasharray="2,3" opacity="0.2" />
                  <path d="M110,300 C190,240 290,150 450,160" stroke="#0C6A63" strokeWidth="0.75" strokeDasharray="1,2" opacity="0.15" />
                  
                  <defs>
                    <linearGradient id="right-grad-1" x1="120" y1="300" x2="450" y2="140" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4FB3A9" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0C6A63" stopOpacity="0.45" />
                    </linearGradient>
                    <linearGradient id="right-grad-2" x1="160" y1="300" x2="450" y2="180" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0C6A63" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#023B37" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Shield and Lock watermark on right wave */}
                <div className="absolute right-[8%] bottom-[20%] text-[#0C6A63]/10 pointer-events-none z-0 hidden md:block">
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-full border border-[#0C6A63]/10">
                    <Shield className="w-12 h-12 stroke-[1]" />
                    <Lock className="w-5 h-5 absolute stroke-[1.2] top-[38%]" />
                  </div>
                </div>

                {/* 1. Top Checkmark Icon Container */}
                <div className="relative flex items-center justify-center mt-1 z-10">
                  {/* Subtle golden/green sparkling dots surrounding checkmark circle */}
                  <div className="absolute -top-1.5 -left-3 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="absolute top-4 -right-4 w-1 h-1 rounded-full bg-emerald-500" />
                  <div className="absolute -bottom-2.5 right-4 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="absolute bottom-5 -left-5 w-1 h-1 rounded-full bg-emerald-500" />
                  <div className="absolute -top-3 right-8 w-1.5 h-1.5 rounded-full bg-amber-500" />
                  
                  <div className="w-16 h-16 rounded-full bg-[#EBF5F3] flex items-center justify-center relative shadow-sm">
                    <div className="w-12 h-12 rounded-full border-[3px] border-[#0C6A63] flex items-center justify-center bg-white shadow-sm">
                      <Check className="w-6 h-6 text-[#0C6A63] stroke-[3.5]" />
                    </div>
                  </div>
                </div>

                {/* 2. Main Completed Heading and Description */}
                <div className="text-center space-y-1 mt-2.5 relative z-10 max-w-xl">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C6A63] font-sans tracking-tight">
                    Assessment Completed
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                    Great job! You have successfully completed the
                  </p>
                  <p className="text-sm sm:text-base text-[#0C6A63] font-bold">
                    Cyber Security Readiness Assessment.
                  </p>
                </div>

                {/* 3. Small Center Shield Divider */}
                <div className="flex items-center justify-center gap-3 w-full max-w-[180px] mx-auto my-3 relative z-10">
                  <div className="h-[1px] bg-gray-200/80 flex-grow" />
                  <Shield className="w-3.5 h-3.5 text-gray-400 stroke-[1.5]" />
                  <div className="h-[1px] bg-gray-200/80 flex-grow" />
                </div>

                {/* 4. White Stat Board Cards (Score, Rank, Certificate Status, Certificate ID in a single line on desktop) */}
                <div className="bg-white shadow-[0_12px_40px_rgba(12,106,99,0.05)] rounded-[20px] border border-gray-100 p-3 sm:p-4 grid grid-cols-2 md:flex md:flex-row md:items-center md:divide-x md:divide-gray-100 relative z-10 max-w-3xl w-full mx-auto mb-5">
                  {/* Score item */}
                  <div className="flex flex-col items-center text-center p-2.5 md:flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#E6F4F1] flex items-center justify-center mb-1.5 shadow-sm">
                      <Target className="w-4.5 h-4.5 text-[#0C6A63] stroke-[2]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Score</span>
                    <span className="text-base sm:text-lg font-extrabold text-[#0C6A63] mt-0.5">{score} / 10</span>
                  </div>

                  {/* Rank item */}
                  <div className="flex flex-col items-center text-center p-2.5 md:flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#EEF1FF] flex items-center justify-center mb-1.5 shadow-sm">
                      <Star className="w-4.5 h-4.5 text-blue-500 stroke-[2]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rank</span>
                    <span className="text-xs sm:text-xs font-extrabold text-[#0C6A63] mt-1 leading-snug">{results.rank}</span>
                  </div>

                  {/* Certificate Status item */}
                  <div className="flex flex-col items-center text-center p-2.5 md:flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#EBF7F5] flex items-center justify-center mb-1.5 shadow-sm">
                      <Award className="w-4.5 h-4.5 text-[#0C6A63] stroke-[2]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Certificate Status</span>
                    <span className="text-xs sm:text-xs font-extrabold text-[#0C6A63] mt-1 leading-snug">Available for Download</span>
                  </div>

                  {/* Certificate ID item */}
                  <div className="flex flex-col items-center text-center p-2.5 md:flex-1">
                    <div className="w-10 h-10 rounded-full bg-[#EAF6F4] flex items-center justify-center mb-1.5 shadow-sm">
                      <IdCard className="w-4.5 h-4.5 text-[#0C6A63] stroke-[2]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Certificate ID</span>
                    <span className="text-xs sm:text-xs font-extrabold text-[#0C6A63] mt-1 leading-snug">{certificateId}</span>
                  </div>
                </div>

                {/* 5. Bottom Action Controls Footer Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200/50 relative z-10 w-full max-w-3xl">
                  {/* Left Certificate ID capsule */}
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-2xl border border-gray-200/50 shadow-sm shrink-0 w-full md:w-auto justify-center md:justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#EBF5F3] flex items-center justify-center border border-[#0C6A63]/10 shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-[#0C6A63]" />
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Certificate ID</span>
                      <span className="text-xs font-extrabold text-[#0C6A63] tracking-wider">{certificateId}</span>
                    </div>
                    <div className="hidden md:block w-[1.5px] h-7 bg-gray-200/70 ml-2" />
                  </div>

                  {/* Right Download & Share actions */}
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                    <button
                      onClick={handleDownloadCertificate}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow hover:shadow-lg focus:outline-none flex items-center justify-center gap-2 bg-[#0C6A63] text-white hover:bg-[#09524c] keep-text-white"
                      style={{ color: '#ffffff' }}
                    >
                      <Download className="w-4 h-4 text-white keep-text-white" style={{ stroke: '#ffffff' }} />
                      <span className="keep-text-white text-white" style={{ color: '#ffffff' }}>Download Certificate</span>
                    </button>

                    <button
                      onClick={handleShareOnLinkedIn}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all border border-[#0C6A63]/50 text-[#0C6A63] hover:bg-[#0C6A63]/5 focus:outline-none flex items-center justify-center gap-2 bg-white shadow-sm"
                    >
                      <Share2 className="w-4 h-4 text-[#0C6A63]" />
                      <span>Share on LinkedIn</span>
                    </button>
                  </div>
                </div>

                {/* 6. Very bottom Lock Secure Message */}
                <div className="flex items-center justify-center gap-3 w-full max-w-[400px] mx-auto pt-3 relative z-10">
                  <div className="h-[1px] bg-gray-200/60 flex-grow" />
                  <div className="flex items-center gap-1.5 text-gray-400 text-[9px] font-mono shrink-0">
                    <Lock className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>Your certificate is securely generated and verified.</span>
                  </div>
                  <div className="h-[1px] bg-gray-200/60 flex-grow" />
                </div>

              </div>

              {/* Certificate Preview visual box */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-500 pl-1">
                  Certificate of Completion Preview
                </h3>
                
                <div 
                  className="relative w-full aspect-[1050/660] max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-xl border border-teal-500/20 select-none bg-[#FAF6EB]"
                  style={{ containerType: 'inline-size' }}
                >
                  {/* Top and Bottom Pattern Borders */}
                  <img 
                    src="/cert_patterns.png" 
                    alt="Top Border Pattern" 
                    className="absolute top-0 left-0 w-full h-[3.3cqw] object-cover pointer-events-none" 
                  />
                  <img 
                    src="/cert_patterns.png" 
                    alt="Bottom Border Pattern" 
                    className="absolute bottom-0 left-0 w-full h-[3.3cqw] object-cover pointer-events-none" 
                  />

                  {/* 1. Top-Left Logo and Subtitle */}
                  <div className="absolute left-[7%] top-[7%] flex items-center gap-[1.5cqw]">
                    <img src="/favicon.png" alt="Logo" className="w-[8cqw] h-[8cqw] object-contain" />
                    <div className="text-left">
                      <h4 className="font-poppins font-bold text-[#0C6A63] tracking-wider leading-tight" style={{ fontSize: '2.0cqw' }}>
                        MUBIN ROSHAN ACADEMY
                      </h4>
                      <p className="font-mono text-gray-500 font-medium tracking-[0.15em] leading-none mt-0.5" style={{ fontSize: '1.0cqw' }}>
                        INSPIRE. EMPOWER. EXCEL.
                      </p>
                    </div>
                  </div>

                  {/* 2. Certificate Title */}
                  <div className="absolute left-[7%] top-[25%] text-left">
                    <h1 className="certificate-title-hollow font-bold tracking-[0.08em] leading-none" style={{ fontSize: '5.6cqw' }}>
                      CERTIFICATE
                    </h1>
                    <p className="font-poppins font-extrabold tracking-[0.05em] text-[#0C6A63] leading-none mt-1" style={{ fontSize: '2.1cqw' }}>
                      OF ACHIEVEMENT
                    </p>
                  </div>

                  {/* 3. "This is to certify that" */}
                  <div className="absolute left-[7%] top-[45%] text-left">
                    <p className="font-serif italic text-gray-600 leading-none" style={{ fontSize: '1.6cqw' }}>
                      This is to certify that
                    </p>
                  </div>

                  {/* 4. Recipient Name */}
                  <div className={`absolute top-[50%] left-[7%] w-[50%] ${
                    (userName || 'PARTICIPANT').toUpperCase() === 'TEST' ? 'text-center flex flex-col items-center' : 'text-left'
                  }`}>
                    {(userName || 'PARTICIPANT').toUpperCase() === 'TEST' ? (
                      <div className="inline-flex flex-col items-center">
                        <h2 className="font-poppins font-bold text-[#0C6A63] leading-none uppercase" style={{ fontSize: '4.2cqw', letterSpacing: '0.02cqw' }}>
                          TEST
                        </h2>
                        {/* Underline only slightly wider than TEST */}
                        <div className="relative w-[12cqw] h-[1px] bg-gray-300 mt-[1cqw] flex items-center justify-center">
                          <div className="bg-[#FAF6EB] px-[0.5cqw] absolute">
                            <ShieldCheck className="text-[#0C6A63] fill-[#FAF6EB]" style={{ width: '2cqw', height: '2cqw' }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex flex-col items-start relative max-w-full">
                        <h2 className="font-poppins font-bold text-[#0C6A63] leading-none uppercase truncate max-w-[25cqw]" style={{ fontSize: '4.2cqw', letterSpacing: '0.02cqw' }}>
                          {userName || 'PARTICIPANT'}
                        </h2>
                        {/* Underline only extends to the end of the name */}
                        <div className="absolute left-0 right-0 bottom-[-1cqw] h-[1px] bg-gray-300 flex items-center justify-center">
                          <div className="bg-[#FAF6EB] px-[0.5cqw]">
                            <ShieldCheck className="text-[#0C6A63] fill-[#FAF6EB]" style={{ width: '2cqw', height: '2cqw' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. Course Complete and Details */}
                  <div className="absolute left-[7%] top-[63%] w-[45%] text-left space-y-[0.8cqw]">
                    <p className="font-sans text-gray-600 leading-tight" style={{ fontSize: '1.3cqw' }}>
                      has successfully completed the
                    </p>
                    <h3 className="font-poppins font-bold text-[#0C6A63] leading-tight uppercase" style={{ fontSize: '1.8cqw' }}>
                      CYBER SECURITY READINESS ASSESSMENT
                    </h3>
                    <p className="font-sans text-gray-500 leading-normal" style={{ fontSize: '1.1cqw' }}>
                      demonstrating knowledge in cybersecurity, SQL database administration, and healthcare security practices.
                    </p>
                  </div>

                  {/* 6. QR Code Verification (Bottom Left) inside a small card style */}
                  <div className="absolute left-[7%] bottom-[5%] flex items-center gap-[1.5cqw] bg-[#F5EFE1] border border-teal-900/15 p-[0.8cqw] px-[1.2cqw] rounded-xl shadow-sm">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`https://mubinroshan.com/verify/${certificateId}`)}`}
                      alt="Verification QR Code"
                      className="object-contain mix-blend-multiply"
                      style={{ width: '6.5cqw', height: '6.5cqw' }}
                    />
                    <div className="text-left font-mono">
                      <p className="font-bold text-[#0C6A63] uppercase tracking-wider leading-none" style={{ fontSize: '0.9cqw' }}>SCAN TO VERIFY</p>
                      <p className="text-gray-500 mt-[0.3cqw] leading-none" style={{ fontSize: '0.8cqw' }}>mubin.roshan/verify</p>
                    </div>
                  </div>

                  {/* 7. Metadata Column (Score, Date, Certificate ID) */}
                  <div className="absolute left-[54%] top-[45%] text-left space-y-[2.2cqw] w-[22%] font-poppins">
                    {/* Score */}
                    <div className="flex items-center gap-[1.2cqw]">
                      <ShieldCheck className="text-[#0C6A63] shrink-0" style={{ width: '2.5cqw', height: '2.5cqw' }} />
                      <div>
                        <p className="font-bold text-gray-400 uppercase tracking-wider leading-none" style={{ fontSize: '0.8cqw' }}>SCORE</p>
                        <p className="font-bold text-[#0C6A63] mt-[0.3cqw] leading-none" style={{ fontSize: '1.4cqw' }}>{score} / 10</p>
                      </div>
                    </div>
                    {/* Date */}
                    <div className="flex items-center gap-[1.2cqw]">
                      <Clock className="text-[#0C6A63] shrink-0" style={{ width: '2.5cqw', height: '2.5cqw' }} />
                      <div>
                        <p className="font-bold text-gray-400 uppercase tracking-wider leading-none" style={{ fontSize: '0.8cqw' }}>DATE</p>
                        <p className="font-bold text-[#0C6A63] mt-[0.3cqw] leading-none" style={{ fontSize: '1.4cqw' }}>
                          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {/* Certificate ID */}
                    <div className="flex items-center gap-[1.2cqw]">
                      <Award className="text-[#0C6A63] shrink-0" style={{ width: '2.5cqw', height: '2.5cqw' }} />
                      <div>
                        <p className="font-bold text-gray-400 uppercase tracking-wider leading-none" style={{ fontSize: '0.8cqw' }}>CERTIFICATE ID</p>
                        <p className="font-bold text-[#0C6A63] mt-[0.3cqw] leading-none truncate" style={{ fontSize: '1.4cqw' }}>{certificateId}</p>
                      </div>
                    </div>
                  </div>

                  {/* 8. Bottom Middle Slogan */}
                  <div className="absolute left-[38%] bottom-[7%] w-[35%] text-left">
                    <p className="font-sans text-gray-500 leading-normal" style={{ fontSize: '1.0cqw' }}>
                      Recognizing your commitment to cybersecurity excellence and continuous learning.
                    </p>
                  </div>

                  {/* 9. Signature Block (Right Column) */}
                  <div className="absolute right-[7%] top-[55%] w-[20%] text-center flex flex-col items-center justify-center">
                    <img 
                      src="/mubin_signature.png" 
                      alt="Mubin Roshan Signature" 
                      className="w-[18cqw] h-[5cqw] object-contain select-none mb-[-0.2cqw] mt-[-1cqw]" 
                    />
                    <div className="w-full h-[1px] bg-gray-400 my-[1cqw]" />
                    <p className="font-poppins font-bold text-[#0C6A63] uppercase tracking-wider leading-none" style={{ fontSize: '1.1cqw' }}>
                      MUBIN ROSHAN
                    </p>
                    <p className="font-sans text-gray-500 leading-tight mt-[0.5cqw]" style={{ fontSize: '0.9cqw' }}>
                      Cyber Security Analyst
                    </p>
                    <p className="font-sans text-gray-500 leading-tight" style={{ fontSize: '0.9cqw' }}>
                      SQL Database Administrator
                    </p>
                  </div>

                  {/* 10. Stamp Logo (Bottom Right) */}
                  <div className="absolute right-[7%] bottom-[7%] flex items-center justify-end">
                    <img src="/favicon.png" alt="Stamp Logo" className="w-[8cqw] h-[8cqw] object-contain opacity-95 hover:scale-105 transition-transform" />
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
                    setCertificateId('');
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
