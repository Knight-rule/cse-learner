export interface SRSCard {
  id: string;
  questionId: string;
  courseSlug: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: number;
  lastReview?: number;
  history: SRSReview[];
}

export interface SRSReview {
  date: number;
  quality: number;
  interval: number;
  easeFactor: number;
}

export interface SRSStats {
  total: number;
  due: number;
  learning: number;
  review: number;
  mastered: number;
  avgEaseFactor: number;
}

const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;
const INITIAL_INTERVALS = [1, 6]; // days

export function createSRSCard(questionId: string, courseSlug: string): SRSCard {
  return {
    id: `${courseSlug}-${questionId}`,
    questionId,
    courseSlug,
    interval: 0,
    repetition: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    nextReview: Date.now(),
    history: [],
  };
}

export function calculateSM2(card: SRSCard, quality: 0 | 1 | 2 | 3 | 4 | 5): { card: SRSCard; nextInterval: number } {
  const { interval, repetition, easeFactor } = card;
  let newInterval = interval;
  let newRepetition = repetition;
  let newEaseFactor = easeFactor;

  if (quality >= 3) {
    if (repetition === 0) {
      newInterval = INITIAL_INTERVALS[0];
    } else if (repetition === 1) {
      newInterval = INITIAL_INTERVALS[1];
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetition = repetition + 1;
  } else {
    newRepetition = 0;
    newInterval = 0;
  }

  newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const nextReview = Date.now() + newInterval * 24 * 60 * 60 * 1000;

  const newCard: SRSCard = {
    ...card,
    interval: newInterval,
    repetition: newRepetition,
    easeFactor: newEaseFactor,
    nextReview,
    lastReview: Date.now(),
    history: [
      ...card.history.slice(-50),
      {
        date: Date.now(),
        quality,
        interval: newInterval,
        easeFactor: newEaseFactor,
      },
    ],
  };

  return { card: newCard, nextInterval: newInterval };
}

export function getDueCards(cards: SRSCard[]): SRSCard[] {
  const now = Date.now();
  return cards.filter((c) => c.nextReview <= now);
}

export function getSRSStats(cards: SRSCard[]): SRSStats {
  const now = Date.now();
  const due = cards.filter((c) => c.nextReview <= now);
  const learning = cards.filter((c) => c.repetition < 2 && c.nextReview > now);
  const review = cards.filter((c) => c.repetition >= 2 && c.nextReview > now);
  const mastered = cards.filter((c) => c.repetition >= 5 && c.interval >= 30);

  return {
    total: cards.length,
    due: due.length,
    learning: learning.length,
    review: review.length,
    mastered: mastered.length,
    avgEaseFactor: cards.length > 0
      ? Math.round(cards.reduce((sum, c) => sum + c.easeFactor, 0) / cards.length * 100) / 100
      : 0,
  };
}

export function getNextReviewDates(cards: SRSCard[], days = 7): { date: string; count: number }[] {
  const now = Date.now();
  const dates: Record<string, number> = {};

  for (let i = 0; i < days; i++) {
    const date = new Date(now + i * 24 * 60 * 60 * 1000);
    const key = date.toISOString().split("T")[0];
    dates[key] = 0;
  }

  for (const card of cards) {
    if (card.nextReview > now) {
      const date = new Date(card.nextReview);
      const key = date.toISOString().split("T")[0];
      if (dates[key] !== undefined) {
        dates[key]++;
      }
    }
  }

  return Object.entries(dates).map(([date, count]) => ({ date, count }));
}

export function resetSRSCard(cards: SRSCard[], questionId: string, courseSlug: string): SRSCard[] {
  return cards.map((c) =>
    c.id === `${courseSlug}-${questionId}` ? createSRSCard(questionId, courseSlug) : c
  );
}

export function getCardState(card: SRSCard): "new" | "learning" | "review" | "mastered" {
  if (card.repetition === 0) return "new";
  if (card.repetition < 2) return "learning";
  if (card.repetition >= 5 && card.interval >= 30) return "mastered";
  return "review";
}