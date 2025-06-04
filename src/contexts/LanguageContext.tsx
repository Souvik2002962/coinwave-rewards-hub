
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'bn' | 'hi' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko' | 'zh' | 'ar';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    bn: 'হোম',
    hi: 'होम',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    it: 'Home',
    pt: 'Início',
    ru: 'Главная',
    ja: 'ホーム',
    ko: '홈',
    zh: '首页',
    ar: 'الرئيسية'
  },
  'nav.earnCoins': {
    en: 'Earn Coins',
    bn: 'কয়েন অর্জন করুন',
    hi: 'कॉइन अर्जित करें',
    es: 'Ganar Monedas',
    fr: 'Gagner des Pièces',
    de: 'Münzen Verdienen',
    it: 'Guadagna Monete',
    pt: 'Ganhar Moedas',
    ru: 'Заработать Монеты',
    ja: 'コインを稼ぐ',
    ko: '코인 획득',
    zh: '赚取硬币',
    ar: 'كسب العملات'
  },
  'nav.shop': {
    en: 'Shop',
    bn: 'শপ',
    hi: 'दुकान',
    es: 'Tienda',
    fr: 'Boutique',
    de: 'Shop',
    it: 'Negozio',
    pt: 'Loja',
    ru: 'Магазин',
    ja: 'ショップ',
    ko: '쇼핑',
    zh: '商店',
    ar: 'متجر'
  },
  'nav.reviews': {
    en: 'Reviews',
    bn: 'রিভিউ',
    hi: 'समीक्षा',
    es: 'Reseñas',
    fr: 'Avis',
    de: 'Bewertungen',
    it: 'Recensioni',
    pt: 'Avaliações',
    ru: 'Отзывы',
    ja: 'レビュー',
    ko: '리뷰',
    zh: '评论',
    ar: 'المراجعات'
  },
  'nav.referral': {
    en: 'Refer & Earn',
    bn: 'রেফার এবং আয় করুন',
    hi: 'रेफर करें और कमाएं',
    es: 'Referir y Ganar',
    fr: 'Parrainer et Gagner',
    de: 'Empfehlen und Verdienen',
    it: 'Riferisci e Guadagna',
    pt: 'Indicar e Ganhar',
    ru: 'Приглашать и Зарабатывать',
    ja: '紹介して稼ぐ',
    ko: '추천하고 적립',
    zh: '推荐赚钱',
    ar: 'أحل واكسب'
  },
  'nav.forAdvertisers': {
    en: 'For Advertisers',
    bn: 'বিজ্ঞাপনদাতাদের জন্য',
    hi: 'विज्ञापनदाताओं के लिए',
    es: 'Para Anunciantes',
    fr: 'Pour les Annonceurs',
    de: 'Für Werbetreibende',
    it: 'Per Inserzionisti',
    pt: 'Para Anunciantes',
    ru: 'Для Рекламодателей',
    ja: '広告主向け',
    ko: '광고주용',
    zh: '广告商',
    ar: 'للمعلنين'
  },
  // Earn page
  'earn.title': {
    en: 'Earn Coins',
    bn: 'কয়েন অর্জন করুন',
    hi: 'कॉइन अर्जित करें',
    es: 'Ganar Monedas',
    fr: 'Gagner des Pièces',
    de: 'Münzen Verdienen',
    it: 'Guadagna Monete',
    pt: 'Ganhar Moedas',
    ru: 'Заработать Монеты',
    ja: 'コインを稼ぐ',
    ko: '코인 획득',
    zh: '赚取硬币',
    ar: 'كسب العملات'
  },
  'earn.description': {
    en: 'Watch ads, complete tasks, and earn digital coins to spend on products',
    bn: 'বিজ্ঞাপন দেখুন, কাজ সম্পূর্ণ করুন এবং পণ্যগুলিতে ব্যয় করার জন্য ডিজিটাল কয়েন অর্জন করুন',
    hi: 'विज्ञापन देखें, कार्य पूरे करें, और उत्पादों पर खर्च करने के लिए डिजिटल कॉइन अर्जित करें',
    es: 'Mira anuncios, completa tareas y gana monedas digitales para gastar en productos',
    fr: 'Regardez des publicités, terminez des tâches et gagnez des pièces numériques à dépenser sur des produits',
    de: 'Schauen Sie sich Anzeigen an, erledigen Sie Aufgaben und verdienen Sie digitale Münzen, um sie für Produkte auszugeben',
    it: 'Guarda annunci, completa attività e guadagna monete digitali da spendere sui prodotti',
    pt: 'Assista anúncios, complete tarefas e ganhe moedas digitais para gastar em produtos',
    ru: 'Смотрите рекламу, выполняйте задания и зарабатывайте цифровые монеты для покупки товаров',
    ja: '広告を見て、タスクを完了し、商品に使うデジタルコインを獲得しましょう',
    ko: '광고를 보고, 작업을 완료하고, 제품에 사용할 디지털 코인을 획득하세요',
    zh: '观看广告，完成任务，赚取数字硬币购买产品',
    ar: 'شاهد الإعلانات، أكمل المهام، واكسب العملات الرقمية لإنفاقها على المنتجات'
  },
  'earn.dailyCheckIn': {
    en: 'Daily Check-in',
    bn: 'দৈনিক চেক-ইন',
    hi: 'दैनिक चेक-इन',
    es: 'Check-in Diario',
    fr: 'Connexion Quotidienne',
    de: 'Tägliches Einchecken',
    it: 'Check-in Giornaliero',
    pt: 'Check-in Diário',
    ru: 'Ежедневная Регистрация',
    ja: '毎日のチェックイン',
    ko: '일일 체크인',
    zh: '每日签到',
    ar: 'تسجيل الدخول اليومي'
  },
  'earn.spinWheel': {
    en: 'Spin the Wheel',
    bn: 'চাকা ঘোরান',
    hi: 'पहिया घुमाएं',
    es: 'Girar la Rueda',
    fr: 'Tourner la Roue',
    de: 'Rad Drehen',
    it: 'Gira la Ruota',
    pt: 'Girar a Roda',
    ru: 'Крутить Колесо',
    ja: 'ホイールを回す',
    ko: '룰렛 돌리기',
    zh: '转动轮盘',
    ar: 'أدر العجلة'
  },
  'earn.claimCoins': {
    en: 'Claim 25 Coins',
    bn: '২৫ কয়েন দাবি করুন',
    hi: '25 कॉइन का दावा करें',
    es: 'Reclamar 25 Monedas',
    fr: 'Réclamer 25 Pièces',
    de: '25 Münzen Beanspruchen',
    it: 'Rivendica 25 Monete',
    pt: 'Reivindicar 25 Moedas',
    ru: 'Получить 25 Монет',
    ja: '25コインを獲得',
    ko: '25코인 받기',
    zh: '领取25枚硬币',
    ar: 'اطلب 25 عملة'
  },
  'earn.spinWin': {
    en: 'Spin & Win',
    bn: 'ঘোরান এবং জিতুন',
    hi: 'घुमाएं और जीतें',
    es: 'Girar y Ganar',
    fr: 'Tourner et Gagner',
    de: 'Drehen und Gewinnen',
    it: 'Gira e Vinci',
    pt: 'Girar e Ganhar',
    ru: 'Крутить и Выигрывать',
    ja: '回して勝つ',
    ko: '돌리고 이기기',
    zh: '转动获胜',
    ar: 'أدر واربح'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
