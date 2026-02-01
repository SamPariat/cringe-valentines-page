"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FloatingHeartsSVG,
  SparklesBackground,
  Cupid,
  CupidArrow,
  Rose,
  LoveLetter,
} from "@/components/animated-svgs";

// QUOTES FOR HER (guy asking a girl) - maximum cringe 💀
const quotesForHer = [
  "Are you my screen time report? Because you're all I think about and it's becoming a problem... my mom is concerned 📱💀",
  "I'd pause my gym session for you... and I NEVER skip leg day. That's how you know this is real 🦵💪",
  "You're the 'very demure, very mindful' to my 'feral goblin at 3am playing video games' 💅🎮",
  "Are you a talking stage? Because I've been here for 6 months waiting for you to text back first 🤡📱",
  "I'd let you take the Fanum tax on ALL my fries... even the crispy ones at the bottom. Marriage material fr 🍟",
  "You have more rizz than I'll ever have and honestly I'm just here hoping the algorithm blesses me 📈",
  "I think about you more than I think about the Roman Empire... which is concerning because that's a LOT 🏛️⚔️",
  "You understood the assignment and the assignment was making me forget how to talk like a normal person 📝🫠",
  "Not me catching feelings in THIS economy?? My portfolio is down but my love for you is UP 📈😭",
  "You're the only green flag I've ever seen and I had to google what that meant 🟢",
  "POV: You're the reason I failed No Simp September AND Movember because I shaved for our first date 📅🪒",
  "It's giving... me anxiety. The vibe is stressed. I am down BAD. Please say yes queen 🛐👑",
  "You're my Roman Empire, my 2am Wikipedia rabbit hole, my reason for being on Pinterest 🏛️📌",
  "No cap fr fr, you're the only person I'd share my gaming account password with 🎮🔐",
  "Are you a situationship? Because I want to DTR so bad but I'm scared you'll say 'I like what we have' 🫠💀",
  "You must be a red flag because- wait no you're actually perfect that's the problem 🚩➡️🟢",
  "I'd let you pick the movie AND the restaurant... that's basically a marriage proposal where I'm from 🎬🍕",
  "You're the reason I finally cleaned my room (my mom is shook) 🧹😳",
  "Is your name Spotify? Because you've got the best playlists and I want to share an account 🎵",
  "I'd give you my hoodie and I'm ALWAYS cold... do you understand the sacrifice 🥶👕",
  "You make me want to learn your coffee order and remember your birthday without Facebook reminding me ☕🎂",
  "I'd watch your favorite show even if it has 47 seasons and no action scenes 📺😤",
  "You're the 'I can fix him' girl and I'm trying to be worthy of being fixed 🔧💀",
  "I'd let you use my charger at 5% battery... my phone might die but my love won't 🔋💀",
  "Are you my gym crush? Because I've been too scared to talk to you for 3 months now 🏋️😰",
  "You make my heart rate spike more than pre-workout and that's saying something 💓⚡",
  "I'm not saying you're my whole personality now but my boys are staging an intervention 👨‍👦‍👦",
  "You're the Wingstop to my emotional breakdown at 1am... comforting and slightly concerning 🍗😭",
  "I'd change my Instagram bio to 'taken' for you and I've been 'focusing on myself' since 2019 📱💍",
  "You're giving main character energy and I just want a supporting role in your story 🎬🥺",
];

// QUOTES FOR HIM (girl asking a guy) - maximum cringe 💀
const quotesForHim = [
  "Are you my screen time report? Because you're all I think about and my bestie is TIRED of hearing about it 📱💅",
  "I'd pause my Spotify Wrapped listening session for you... and my top song was played 847 times bestie 🎵",
  "You're the 'sigma grindset' to my 'feral girl summer' energy and somehow it works?? 💅🐺",
  "Are you a talking stage? Because I've been here for 6 months and I've already named our kids 🤡👶",
  "I'd let you have the last bite... and I NEVER share food. My friends are concerned 🍕😳",
  "You have more rizz than my ex and that bar was underground but you CLEARED it 📈💀",
  "I think about you more than I think about that embarrassing thing I did in 2019... so like constantly 🏛️😭",
  "You understood the assignment and the assignment was making me act unhinged in the group chat 📝👯‍♀️",
  "Not me catching feelings in THIS economy?? Inflation is crazy but my delusion is crazier 📈✨",
  "You're the only green flag I've ever been attracted to and honestly I'm suspicious 🟢🤨",
  "POV: You're the reason I failed my 'focusing on myself' era after 3 whole days 📅💀",
  "It's giving... obsession. The vibe is unwell. I have screenshots. Please say yes 🛐📸",
  "You're my Roman Empire, my 3am thought, my villain origin story if you say no 🏛️😤",
  "No cap bestie, you're the only person I'd share my Netflix AND my location with 🔐📍",
  "Are you a situationship? Because I've already told my mom about you (she's invested now) 🫠👩",
  "You must be a red flag because I keep running towards you and my therapist is TIRED 🚩🏃‍♀️💨",
  "I'd let you see me without makeup AND without my lashes... that's basically a proposal 💄👰",
  "You're the reason I actually replied 'haha' instead of leaving you on read for 3 days 📱✨",
  "Is your name Pinterest? Because I've already planned our wedding board 📌💒",
  "I'd give you my hair tie and I only have ONE left... the sacrifice is real 💇‍♀️😤",
  "You make me want to learn about sports and pretend I understand what offsides means ⚽🤷‍♀️",
  "I'd watch your favorite anime even if it has 800 episodes and weird filler arcs 📺🍥",
  "You're the 'I can fix him' and I've already got the toolkit ready bestie 🔧💅",
  "I'd let you borrow my charger AND my scrunchie... do you understand the WEIGHT of that 🔋💕",
  "Are you my Hinge match? Because I've been manifesting you on my vision board since January 📱✨",
  "You make my heart rate spike more than my morning cold brew and that's SAYING something 💓☕",
  "I'm not saying you're my whole personality now but my friends created a support group chat 👯‍♀️💀",
  "You're the late-night drive-thru run to my emotional spiral... chaotic but necessary 🚗🍟",
  "I'd change my Instagram aesthetic for you and I've had the same feed since 2020 📱🎨",
  "You're giving provider energy and I'm giving 'will absolutely make your life unhinged' 💅👑",
];

// NO BUTTON MESSAGES FOR HER (guy being rejected)
const noMessagesForHer = [
  "No 💔",
  "wait what 😰",
  "bro please 🥺",
  "i'm gonna cry",
  "the audacity 💀",
  "erm... sigma?",
  "this isn't very",
  "cash money of u",
  "my heart bro 😭",
  "THE BOYS BELIEVED",
  "i literally can't",
  "villain arc loading",
  "gonna go gym 😤",
  "EMOTIONAL DAMAGE",
  "telling the boys",
  "this is so ohio",
  "pain. just pain.",
  "why you gotta",
  "i'm so cooked",
  "please i'm begging",
  "NO RIZZ FR 😔",
  "my joker arc",
  "GYATT... jk 😭",
  "i'm down bad fr",
];

// NO BUTTON MESSAGES FOR HIM (girl being rejected)
const noMessagesForHim = [
  "No 💔",
  "wait what 😰",
  "bestie pls 🥺",
  "i'm gonna cry",
  "not the ick 😭",
  "this isn't giving",
  "THIS ISN'T DEMURE",
  "i'm shaking rn",
  "the audacity 💀",
  "BESTIE HELP",
  "i literally can't",
  "villain era starts",
  "gonna go mew 😤",
  "EMOTIONAL DAMAGE",
  "telling the gc 📱",
  "this is so ohio",
  "naurrr 😭😭😭",
  "why you gotta",
  "i'm so cooked",
  "please i'm begging",
  "my delulu era 😔",
  "blocking u rn jk",
  "SLAY... jk pls no",
  "manifesting failed",
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const Confetti = ({ isPink }: { isPink: boolean }) => {
  const confetti = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        emoji: isPink
          ? ["🎉", "🎊", "💖", "✨", "💕", "🥳", "💗", "🩷", "💅", "👑"][i % 10]
          : ["🎉", "🎊", "💙", "✨", "⭐", "🥳", "🏆", "💪", "🔥", "👑"][i % 10],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      })),
    [isPink]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: item.left }}
          initial={{ y: "-10vh", rotate: 0, opacity: 1 }}
          animate={{ y: "100vh", rotate: 720, opacity: 0 }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || searchParams.get("n") || "";

  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [noMessageIndex, setNoMessageIndex] = useState(0);
  const [noOpacity, setNoOpacity] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [heartBeat, setHeartBeat] = useState(0);
  const [exclamations, setExclamations] = useState(1);

  // Get gender-specific content
  const quotes = gender === "female" ? quotesForHim : quotesForHer;
  const noMessages = gender === "female" ? noMessagesForHim : noMessagesForHer;
  const isPink = gender === "female";

  // Format name for display
  const displayName = name.trim();

  // Auto-cycle quotes every 3.5 seconds
  useEffect(() => {
    if (gender && !accepted) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [gender, accepted, quotes.length]);

  const handleNoClick = useCallback(() => {
    // Cycle to next message
    setNoMessageIndex((prev) => (prev + 1) % noMessages.length);
    // Reduce opacity by 5% (disappears at 0)
    setNoOpacity((prev) => Math.max(prev - 0.05, 0));
    // Trigger heartbeat on yes button
    setHeartBeat((prev) => prev + 1);
    // Add exclamation mark to yes button
    setExclamations((prev) => prev + 1);
  }, [noMessages.length]);

  const bgGradient = isPink
    ? "from-pink-500 via-rose-400 to-fuchsia-500"
    : "from-blue-500 via-cyan-400 to-indigo-500";

  // GENDER SELECTION SCREEN
  if (!gender) {
    return (
      <div className="min-h-dvh bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400 flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="text-center">
            <motion.div
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-linear-to-br from-pink-400 to-violet-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg"
              animate={{ rotate: [12, -12, 12] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-3xl -rotate-12">💝</span>
            </motion.div>

            <CardHeader className="pt-8">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl bg-linear-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                {displayName ? `oh hey ${displayName} 👀` : "oh hey there 👀"}
              </CardTitle>
              <p className="text-white/80 text-base sm:text-lg font-light mt-2">
                who's asking the question?
              </p>
              <p className="text-white/60 text-sm mt-1">
                (this is gonna be UNHINGED, you've been warned 💀)
              </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pt-8">
              <Button
                variant="pink"
                size="xl"
                onClick={() => setGender("female")}
                className="w-full text-lg sm:text-xl"
              >
                I'm a Girl 💅✨
              </Button>

              <Button
                variant="blue"
                size="xl"
                onClick={() => setGender("male")}
                className="w-full text-lg sm:text-xl"
              >
                I'm a Guy 🗿💪
              </Button>

              <p className="text-white/40 text-xs sm:text-sm mt-4">
                no pressure, just choose ur fighter
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // SUCCESS SCREEN 🎉
  if (accepted) {
    return (
      <div
        className={`min-h-dvh bg-linear-to-br ${bgGradient} flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative`}
      >
        <FloatingHeartsSVG isPink={isPink} />
        <SparklesBackground />
        <Confetti isPink={isPink} />

        {/* Decorative Cupid */}
        <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-20">
          <Cupid size={70} />
        </div>
        <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 hidden sm:block">
          <LoveLetter size={60} />
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="text-center">
            <CardHeader>
              <motion.div
                className="text-7xl sm:text-8xl mb-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                🎉
              </motion.div>

              <CardTitle className="text-4xl sm:text-5xl md:text-6xl">
                {isPink ? "LETS GOOOO 💅" : "LETS GOOOO 🔥"}
              </CardTitle>

              <p className="text-white/90 text-lg sm:text-xl mt-4">
                {displayName
                  ? `${displayName.toUpperCase()} SAID YES 😭${isPink ? "💕" : "🏆"}`
                  : isPink
                    ? "THEY ACTUALLY SAID YES 😭💕"
                    : "SHE ACTUALLY SAID YES 😭🏆"}
              </p>
              <p className="text-white/70 text-base sm:text-lg mt-2">
                {isPink
                  ? "this is literally my roman empire now bestie"
                  : "this is literally my roman empire now bro"}
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex justify-center gap-1 sm:gap-2 mb-6">
                {(isPink
                  ? ["💕", "🥹", "💗", "✨", "💖"]
                  : ["🔥", "🥹", "💙", "✨", "🏆"]
                ).map((emoji, i) => (
                  <motion.span
                    key={emoji}
                    className="text-3xl sm:text-4xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.1,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              <div
                className={`${isPink ? "bg-pink-600/30" : "bg-blue-600/30"} rounded-2xl p-4 backdrop-blur-sm`}
              >
                <p className="text-white/90 text-sm sm:text-base font-medium">
                  📸 SCREENSHOT THIS AND SEND IT RN
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1">
                  {isPink
                    ? "(do it for the plot bestie)"
                    : "(the boys need to see this W)"}
                </p>
              </div>

              <p className="text-white/50 text-xs mt-6">
                {isPink
                  ? "you understood the assignment fr fr 💅"
                  : "you understood the assignment king 👑"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // MAIN VALENTINE SCREEN 💘
  return (
    <div
      className={`min-h-dvh bg-linear-to-br ${bgGradient} flex items-center justify-center p-4 sm:p-6 animate-gradient overflow-hidden relative`}
    >
      <FloatingHeartsSVG isPink={isPink} />
      <SparklesBackground />

      {/* Cupid in corner */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-20 hidden sm:block">
        <Cupid size={80} />
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-20 hidden sm:block">
        <Rose size={50} />
      </div>
      <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-20 hidden md:block">
        <CupidArrow size={50} />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative z-10 w-full max-w-xl"
      >
        <Card>
          <div className="text-center">
            <motion.div
              className="relative inline-block mb-2 sm:mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-6xl sm:text-7xl">💘</span>
              <motion.span
                className={`absolute -right-1 -top-1 w-3 h-3 sm:w-4 sm:h-4 ${isPink ? "bg-pink-300" : "bg-blue-300"} rounded-full`}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <p className="text-white/60 text-xs sm:text-sm mb-2 tracking-widest uppercase">
              {isPink ? "okay here goes nothing bestie 😳" : "okay here goes nothing bro 😳"}
            </p>

            {displayName && (
              <h1 className="font-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                Hey {displayName} 👋
              </h1>
            )}
            <h1 className="font-romantic text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight">
              Will You Be My
            </h1>
            <h2
              className={`font-romantic text-4xl sm:text-5xl md:text-6xl font-bold ${isPink ? "text-pink-200" : "text-cyan-200"} mb-6`}
            >
              Valentine? 👉👈
            </h2>

            <div
              className={`${isPink ? "bg-pink-600/20" : "bg-blue-600/20"} rounded-2xl p-4 sm:p-6 mb-4 backdrop-blur-sm min-h-25 sm:min-h-30 flex items-center justify-center`}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-white/90 text-sm sm:text-base md:text-lg font-light leading-relaxed"
                >
                  "<TypewriterText text={quotes[currentQuote]} />"
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <span
                className={`text-xs ${isPink ? "text-pink-200/60" : "text-cyan-200/60"}`}
              >
                auto-cringe every 3.5s 💀
              </span>
              <motion.span
                className="text-sm"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                🔄
              </motion.span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-30 sm:min-h-25">
              <motion.div
                key={heartBeat}
                animate={{
                  scale: [1, 1.15, 1, 1.1, 1],
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="relative group"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                <Button
                  variant={isPink ? "glassPink" : "glassBlue"}
                  size="lg"
                  onClick={() => setAccepted(true)}
                  className="min-w-35 sm:min-w-40 text-base sm:text-lg font-bold relative"
                >
                  {isPink
                    ? `Yes${"!".repeat(exclamations)} 🥺💖`
                    : `Yes${"!".repeat(exclamations)} 🥺💙`}
                </Button>
              </motion.div>

              <AnimatePresence>
                {noOpacity > 0 && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: noOpacity, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleNoClick}
                      className="min-w-30 text-base"
                    >
                      {noMessages[noMessageIndex]}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-white/40 mt-6 sm:mt-8 text-xs sm:text-sm">
              {(() => {
                if (noOpacity > 0) {
                  return isPink
                    ? "psst... keep clicking no and watch it fade away like his excuses 🙈"
                    : "psst... keep clicking no and watch it disappear like her red flags 🙈";
                }
                return isPink
                  ? "the no button gave up... just like you should give in 💅"
                  : "the no button left the chat... take the hint bro 🏆";
              })()}
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
