"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Trash2, Sparkles, MessageCircle, Settings, Moon, Sun, ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function TextTransformerApp() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [userStyle, setUserStyle] = useState("")
  const [tempUserStyle, setTempUserStyle] = useState("")
  const [mounted, setMounted] = useState(false) // Added mounted state to prevent hydration issues
  const timeoutRef = useRef<NodeJS.Timeout>()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true) // Added mounted effect to prevent hydration mismatch
  }, [])

  useEffect(() => {
    const savedStyle = localStorage.getItem("userSpeakingStyle")
    if (savedStyle) {
      setUserStyle(savedStyle)
      setTempUserStyle(savedStyle)
    }
  }, [])

  useEffect(() => {
    if (inputText.trim()) {
      setShowWelcome(false)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        transformText()
      }, 2000)
    } else {
      setShowWelcome(true)
      setOutputText("")
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [inputText, userStyle]) // Added userStyle dependency

  const transformText = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          style: userStyle || "친근하고 따뜻한 말투로, 적절한 이모지를 사용해서",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "변환 실패")
      }

      const data = await response.json()
      setOutputText(data.transformedText)
    } catch (error) {
      console.error("Transform error:", error)
      toast({
        title: "AI 변환 실패 😅",
        description: "로컬 변환으로 대체합니다!",
        variant: "destructive",
      })
      const fallbackResult = addFriendlyToneAndEmojis(inputText)
      setOutputText(fallbackResult)
    } finally {
      setIsProcessing(false)
    }
  }

  const addFriendlyToneAndEmojis = (text: string): string => {
    let result = text.trim()

    const sentences = result.split(/[.!?]/).filter((s) => s.trim())

    const transformedSentences = sentences.map((sentence) => {
      let transformed = sentence.trim()

      if (userStyle.trim()) {
        const styleKeywords = userStyle.toLowerCase()

        if (styleKeywords.includes("반말") || styleKeywords.includes("친구")) {
          transformed = transformed.replace(/습니다/g, "어요")
          transformed = transformed.replace(/해요/g, "해")
          transformed = transformed.replace(/이에요/g, "야")
        }

        if (styleKeywords.includes("귀여운") || styleKeywords.includes("애교")) {
          transformed += " >.<"
        }

        if (styleKeywords.includes("정중한") || styleKeywords.includes("존댓말")) {
          transformed = transformed.replace(/해/g, "해요")
          transformed = transformed.replace(/야/g, "이에요")
        }

        if (styleKeywords.includes("유머") || styleKeywords.includes("재미")) {
          const funnyEmojis = ["😂", "🤣", "😆", "🙃", "😜", "🤪"]
          transformed += ` ${funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)]}`
        }
      } else {
        transformed = transformed.replace(/안녕하세요/g, "안녕하세요! 👋✨")
        transformed = transformed.replace(/감사합니다/g, "감사해요! 🙏💖")
        transformed = transformed.replace(/고맙습니다/g, "고마워요! 😊🌟")
        transformed = transformed.replace(/좋습니다/g, "좋네요! ✨🎉")
        transformed = transformed.replace(/괜찮습니다/g, "괜찮아요! 😄👍")
        transformed = transformed.replace(/네/g, "네! 😊")
        transformed = transformed.replace(/아니요/g, "아니에요~ 😅")
        transformed = transformed.replace(/죄송합니다/g, "죄송해요! 🙇‍♀️💦")
        transformed = transformed.replace(/미안합니다/g, "미안해요! 😅💧")
        transformed = transformed.replace(/도움/g, "도움 🤝")
        transformed = transformed.replace(/문제/g, "문제 🤔")
        transformed = transformed.replace(/해결/g, "해결 ✅")
        transformed = transformed.replace(/완료/g, "완료 🎯")
        transformed = transformed.replace(/시작/g, "시작 🚀")
        transformed = transformed.replace(/끝/g, "끝 🏁")
      }

      if (transformed.includes("기쁘") || transformed.includes("행복") || transformed.includes("좋아")) {
        transformed += " 😄🎉"
      } else if (transformed.includes("슬프") || transformed.includes("아쉽") || transformed.includes("안타까")) {
        transformed += " 😢💙"
      } else if (transformed.includes("놀라") || transformed.includes("신기") || transformed.includes("대단")) {
        transformed += " 😲✨"
      } else if (transformed.includes("화나") || transformed.includes("짜증") || transformed.includes("답답")) {
        transformed += " 😤💢"
      } else {
        const defaultEmojis = ["😊", "✨", "💫", "🌟", "💖", "🎈", "🌈", "⭐", "💝", "🎊"]
        transformed += ` ${defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)]}`
      }

      return transformed
    })

    result = transformedSentences.join("\n\n")

    if (result.length > 200) {
      const words = result.split(" ")
      if (words.length > 30) {
        result = words.slice(0, 25).join(" ") + "...\n\n더 간단히 말하면! 😊✨"
      }
    }

    return result
  }

  const handleTransformNow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    transformText()
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    setShowWelcome(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      toast({
        title: "복사 완료! 📋",
        description: "변환된 텍스트가 클립보드에 복사되었어요! ✨",
      })
    }
  }

  const handleSaveStyle = () => {
    setUserStyle(tempUserStyle)
    localStorage.setItem("userSpeakingStyle", tempUserStyle)
    setShowSettings(false)
    toast({
      title: "말투 저장 완료! 🎉",
      description: "이제 입력한 말투 스타일로 변환됩니다! ✨",
    })
    if (inputText.trim()) {
      setTimeout(() => transformText(), 100)
    }
  }

  const handleOpenSettings = () => {
    setTempUserStyle(userStyle)
    setShowSettings(true)
  }

  if (!mounted) {
    return null // Prevent rendering until mounted to avoid hydration issues
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-4">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <Button onClick={() => setShowSettings(false)} variant="ghost" size="icon" className="hover:bg-muted">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">설정</h1>
            </div>
          </div>

          <Card className="shadow-lg border border-border bg-card backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-card-foreground flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                테마 설정
              </h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => setTheme("light")}
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  라이트
                </Button>
                <Button
                  onClick={() => setTheme("dark")}
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                >
                  <Moon className="w-4 h-4 mr-2" />
                  다크
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border bg-card backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium text-card-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />내 말투 설정
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">원하는 말투나 스타일을 설명해주세요! 🎭</p>
                <Textarea
                  placeholder="예: 친근하고 귀여운 말투, 반말로 대화하는 스타일, 정중하고 예의바른 어조 등..."
                  value={tempUserStyle}
                  onChange={(e) => setTempUserStyle(e.target.value)}
                  className="min-h-[100px] resize-none border border-border bg-input text-foreground placeholder:text-muted-foreground"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>💡 팁:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• "반말, 친구같은" → 편한 말투로 변환</li>
                    <li>• "정중한, 존댓말" → 예의바른 말투로 변환</li>
                    <li>• "귀여운, 애교" → 귀여운 표현 추가</li>
                    <li>• "유머, 재미있는" → 재미있는 이모지 추가</li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={handleSaveStyle}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                말투 저장하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2 flex-1">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">내 말투 변환기</h1>
            </div>
            <Button onClick={handleOpenSettings} variant="ghost" size="icon" className="hover:bg-muted">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            {userStyle
              ? "내가 설정한 말투로 텍스트를 변환해드려요! 🎭"
              : "텍스트를 따뜻하고 친근한 말투로 바꿔드려요! 🌟"}
          </p>
        </div>

        <Card className="shadow-lg border border-border bg-card backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-card-foreground">입력</span>
            </div>
            <Textarea
              placeholder="변환하고 싶은 텍스트를 입력해주세요... ✍️"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] resize-none border border-border bg-input text-foreground placeholder:text-muted-foreground"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleTransformNow}
                disabled={!inputText.trim() || isProcessing}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    변환 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    지금 변환하기
                  </>
                )}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="icon"
                className="border-border hover:bg-muted bg-transparent"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border border-border bg-card backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-card-foreground">변환 결과</span>
              </div>
              {outputText && (
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-accent hover:text-accent/80 hover:bg-accent/10"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  복사
                </Button>
              )}
            </div>

            <div className="min-h-[120px] p-3 rounded-lg bg-muted/50 border border-border">
              {showWelcome ? (
                <div className="text-muted-foreground text-sm space-y-2">
                  <p className="font-medium text-accent">🌟 사용법</p>
                  <ul className="space-y-1 text-xs">
                    <li>• 위 입력창에 텍스트를 입력하세요</li>
                    <li>• 2초 후 자동으로 변환됩니다 ⏰</li>
                    <li>• 또는 "지금 변환하기" 버튼을 눌러주세요</li>
                    <li>• 친근한 말투와 이모지가 추가됩니다! 😊</li>
                  </ul>
                </div>
              ) : isProcessing ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Sparkles className="w-5 h-5 mr-2 animate-spin text-primary" />
                  <span className="text-sm">AI가 친근한 말투로 변환 중이에요... ✨</span>
                </div>
              ) : outputText ? (
                <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">{outputText}</p>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <span className="text-sm">변환된 텍스트가 여기에 나타납니다 📝</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">Made by Alf Bae, 2025</div>
      </div>
    </div>
  )
}
