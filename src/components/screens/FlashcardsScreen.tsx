import React, { useState } from "react";
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { sampleFlashcards } from "../../data/mockData";
import { FlashcardItem } from "../../types";

export const FlashcardsScreen: React.FC = () => {
  const [cards, setCards] = useState<FlashcardItem[]>(sampleFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "System Design", "Algorithms", "Behavioral", "Frontend", "Concurrency"];

  const filteredCards = cards.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  const currentCard = filteredCards[currentIndex % (filteredCards.length || 1)];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleMastered = () => {
    if (!currentCard) return;
    const updated = cards.map((c) =>
      c.id === currentCard.id ? { ...c, mastered: true } : c
    );
    setCards(updated);
    handleNext();
  };

  return (
    <div id="flashcards-screen" className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 text-center sm:text-left">
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          Rapid-Fire Recall
        </span>
        <h1 className="mt-2 font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
          FAANG Concept Flashcards & Spaced Repetition
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Quickly review high-frequency algorithms, system design trade-offs, and behavioral key terms.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcard Card Body */}
      {currentCard ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="font-semibold text-indigo-400">{currentCard.category}</span>
          </div>

          {/* Interactive Flip Area */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] flex flex-col justify-between rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-8 sm:p-12 text-center transition-all hover:border-indigo-500/50 shadow-2xl shadow-indigo-500/5"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-300">
                {isFlipped ? "Answer & Key Trade-Offs" : "Prompt / Question"}
              </span>
              <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                <RotateCw className="h-3.5 w-3.5" />
                <span>Click card to flip</span>
              </span>
            </div>

            {/* Front & Back Content */}
            <div className="my-8 space-y-4">
              {!isFlipped ? (
                <h2 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentCard.front}
                </h2>
              ) : (
                <p className="text-sm sm:text-base text-emerald-300 font-medium leading-relaxed max-w-xl mx-auto">
                  {currentCard.back}
                </p>
              )}
            </div>

            <div className="text-[11px] text-slate-500">
              {currentCard.mastered ? (
                <span className="text-emerald-400 font-bold">✓ Mastered in your memory deck</span>
              ) : (
                <span>Needs active practice</span>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-4 py-2.5 text-xs font-bold text-rose-300 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Need Review</span>
              </button>

              <button
                type="button"
                onClick={handleMastered}
                className="flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mastered ✓</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center text-slate-400 text-xs">
          No flashcards found in this category.
        </div>
      )}
    </div>
  );
};
