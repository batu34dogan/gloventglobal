// Glo etkileşim prototipi — AnalysisFlow'da tutulan konuşma durumu. Bu dosya hafif tutulur (tipler +
// başlangıç durumu); konuşma mantığı lib/glo/prototype.ts'te ve yalnızca Glo paneli yüklenince gelir.
// Durum yalnızca bellekte yaşar: storage'a veya sunucuya yazılmaz.
import type { QuestionId } from '@/lib/analysis/questions';

export type GloStart = 'selling' | 'new' | 'brand';
export type GloContextField = 'start' | 'product' | 'target';
export type GloField = QuestionId | GloContextField;

export type GloMessage = {
  id: number;
  from: 'glo' | 'user';
  text: string;
  /** 'note': Glo'nun kayıt/yardım notu (daha sade görünür). */
  tone?: 'note';
  /** Kullanıcı mesajının doldurduğu alanlar — "Değiştir" bağlantıları bunlardan çıkar. */
  fields?: GloField[];
  /** Sonradan değiştirilen alanlar; hepsi değiştiyse mesaj "güncellendi" olarak soluklaşır. */
  replaced?: GloField[];
};

/**
 * Belirsiz serbest metin eşleşmesi — yalnızca kullanıcı seçerse kaydedilir. `clarify`: tek bir kanalın
 * mevcut mu, hedef mi, henüz net değil mi olduğu sorulur (options[0] = kanal).
 */
export type GloSuggestion = { field: QuestionId; options: string[]; kind?: 'clarify' };

export type GloState = {
  messages: GloMessage[];
  nextId: number;
  start?: GloStart;
  product?: string;
  productSkipped: boolean;
  targetChannels: string[];
  targetMarkets: string[];
  targetText?: string;
  targetSkipped: boolean;
  currentMarkets: string[];
  /** Netleştirmede "Henüz net değil" denilen kanallar (analiz alanına yazılmaz, yalnızca not). */
  unsureChannels: string[];
  extraNotes: string[];
  /** salesVolume, "Henüz Satış Yapmıyorum" kanal cevabından türetildiyse true (kanal değişince silinir). */
  inferredVolume: boolean;
  /** "Yeni başlayacağım" sonrası kanal sorusunda "Bazı kanallarda satışım var" seçildi. */
  channelsExpanded: boolean;
  suggestions: GloSuggestion[];
  editing?: GloField;
  /** "Eklemek istediğiniz bir şey var mı?" alanı; undefined iken anlaşılamayan mesajlardan başlar. */
  notesExtra?: string;
  /** Sonuç ekranındaki "Notunuz" alanı elle değiştirildiyse tam not metni (bağlam dahil). */
  notesRaw?: string;
  /** Sonuç ekranına en son aktarılan not — geri dönüşte değişiklik olup olmadığını anlamak için. */
  notesSent?: string;
};

// Karşılama sohbet balonunda değil, Glo panelinin karşılama alanında gösterilir (tekrar edilmez).
export const GLO_WELCOME = { title: 'Merhaba, ben Glo.', text: 'İşinizi ve hedefinizi birlikte netleştirelim.' } as const;

export function createGloState(formAnswerCount: number): GloState {
  const messages: GloMessage[] = [];
  if (formAnswerCount > 0) {
    messages.push({
      id: 1,
      from: 'glo',
      tone: 'note',
      text: `Formda verdiğiniz ${formAnswerCount} cevabı aldım; bunları yeniden sormayacağım.`,
    });
  }
  return {
    messages,
    nextId: messages.length + 1,
    productSkipped: false,
    targetChannels: [],
    targetMarkets: [],
    targetSkipped: false,
    currentMarkets: [],
    unsureChannels: [],
    extraNotes: [],
    inferredVolume: false,
    channelsExpanded: false,
    suggestions: [],
  };
}

/** AnalysisFlow Glo paneline girip çıkınca yayınlanır: detail = { variant: 'page' | 'modal', active }. */
export const GLO_MODE_EVENT = 'analysis-glo-mode';
export type GloModeDetail = { variant: 'page' | 'modal'; active: boolean };
/** Glo paneli açıkken "7 kısa soruyla" yerine kullanılan nötr açıklama. */
export const GLO_NEUTRAL_INTRO = 'Birkaç kısa soruyla mevcut yapınızı, önceliklerinizi ve büyüme alanlarınızı değerlendirin.';

export const NO_SALES_CHANNEL = 'Henüz Satış Yapmıyorum';
export const NO_SALES_VOLUME = 'Henüz satış yok';
