
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  },
  // Spin Wheel page
  'spinWheel.backToEarn': {
    en: 'Back to Earn',
    bn: 'আয়ে ফিরে যান',
    hi: 'कमाई पर वापस जाएं',
    es: 'Volver a Ganar',
    fr: 'Retour aux Gains',
    de: 'Zurück zum Verdienen',
    it: 'Torna a Guadagnare',
    pt: 'Voltar para Ganhar',
    ru: 'Вернуться к Заработку',
    ja: '稼ぐに戻る',
    ko: '적립으로 돌아가기',
    zh: '返回赚取',
    ar: 'العودة للكسب'
  },
  'spinWheel.description': {
    en: 'Try your luck once daily for a chance to win up to 800 coins!',
    bn: '৮০০ কয়েন পর্যন্ত জেতার সুযোগের জন্য দৈনিক একবার আপনার ভাগ্য পরীক্ষা করুন!',
    hi: '800 सिक्के तक जीतने के लिए दैनिक एक बार अपना भाग्य आजमाएं!',
    es: '¡Prueba tu suerte una vez al día para ganar hasta 800 monedas!',
    fr: 'Tentez votre chance une fois par jour pour gagner jusqu\'à 800 pièces !',
    de: 'Versuchen Sie einmal täglich Ihr Glück, um bis zu 800 Münzen zu gewinnen!',
    it: 'Prova la tua fortuna una volta al giorno per vincere fino a 800 monete!',
    pt: 'Tente a sorte uma vez por dia para ganhar até 800 moedas!',
    ru: 'Попытайтесь ежедневно испытать удачу, чтобы выиграть до 800 монет!',
    ja: '毎日一度運を試して、最大800コインを獲得しましょう！',
    ko: '매일 한 번 운을 시험해서 최대 800코인을 획득하세요!',
    zh: '每天试一次运气，有机会赢得最多800枚硬币！',
    ar: 'جرب حظك مرة واحدة يومياً للفوز بما يصل إلى 800 عملة!'
  },
  'spinWheel.spin': {
    en: 'SPIN',
    bn: 'ঘোরান',
    hi: 'घुमाएं',
    es: 'GIRAR',
    fr: 'TOURNER',
    de: 'DREHEN',
    it: 'GIRA',
    pt: 'GIRAR',
    ru: 'КРУТИТЬ',
    ja: 'スピン',
    ko: '돌리기',
    zh: '转动',
    ar: 'أدر'
  },
  'spinWheel.spinning': {
    en: 'SPINNING...',
    bn: 'ঘোরাচ্ছে...',
    hi: 'घुमा रहे हैं...',
    es: 'GIRANDO...',
    fr: 'TOURNANT...',
    de: 'DREHEN...',
    it: 'GIRANDO...',
    pt: 'GIRANDO...',
    ru: 'КРУЧЕНИЕ...',
    ja: 'スピン中...',
    ko: '돌리는 중...',
    zh: '转动中...',
    ar: 'يدور...'
  },
  'spinWheel.usedToday': {
    en: 'USED TODAY',
    bn: 'আজ ব্যবহৃত',
    hi: 'आज उपयोग किया',
    es: 'USADO HOY',
    fr: 'UTILISÉ AUJOURD\'HUI',
    de: 'HEUTE VERWENDET',
    it: 'USATO OGGI',
    pt: 'USADO HOJE',
    ru: 'ИСПОЛЬЗОВАНО СЕГОДНЯ',
    ja: '今日使用済み',
    ko: '오늘 사용함',
    zh: '今天已使用',
    ar: 'مستخدم اليوم'
  },
  'spinWheel.comeTomorrow': {
    en: 'Come back tomorrow for another spin!',
    bn: 'আরেকটি স্পিনের জন্য আগামীকাল ফিরে আসুন!',
    hi: 'कल दूसरे स्पिन के लिए वापस आएं!',
    es: '¡Vuelve mañana para otro giro!',
    fr: 'Revenez demain pour un autre tour !',
    de: 'Kommen Sie morgen für eine weitere Drehung zurück!',
    it: 'Torna domani per un altro giro!',
    pt: 'Volte amanhã para outro giro!',
    ru: 'Возвращайтесь завтра для нового вращения!',
    ja: '明日また回しに来てください！',
    ko: '내일 다시 돌리러 오세요!',
    zh: '明天再来转一次！',
    ar: 'ارجع غداً لدورة أخرى!'
  },
  'spinWheel.congratulations': {
    en: 'Congratulations!',
    bn: 'অভিনন্দন!',
    hi: 'बधाई हो!',
    es: '¡Felicidades!',
    fr: 'Félicitations !',
    de: 'Glückwunsch!',
    it: 'Congratulazioni!',
    pt: 'Parabéns!',
    ru: 'Поздравляем!',
    ja: 'おめでとうございます！',
    ko: '축하합니다!',
    zh: '恭喜！',
    ar: 'تهانينا!'
  },
  'spinWheel.youWon': {
    en: 'You won {amount} coins!',
    bn: 'আপনি {amount} কয়েন জিতেছেন!',
    hi: 'आपने {amount} कॉइन जीते!',
    es: '¡Ganaste {amount} monedas!',
    fr: 'Vous avez gagné {amount} pièces !',
    de: 'Sie haben {amount} Münzen gewonnen!',
    it: 'Hai vinto {amount} monete!',
    pt: 'Você ganhou {amount} moedas!',
    ru: 'Вы выиграли {amount} монет!',
    ja: '{amount}コインを獲得しました！',
    ko: '{amount}코인을 획득했습니다!',
    zh: '您赢得了{amount}枚硬币！',
    ar: 'فزت بـ {amount} عملة!'
  },
  'spinWheel.betterLuck': {
    en: 'Better luck next time!',
    bn: 'পরের বার আরও ভাল ভাগ্য!',
    hi: 'अगली बार बेहतर किस्मत!',
    es: '¡Mejor suerte la próxima vez!',
    fr: 'Meilleure chance la prochaine fois !',
    de: 'Beim nächsten Mal mehr Glück!',
    it: 'Miglior fortuna la prossima volta!',
    pt: 'Melhor sorte na próxima vez!',
    ru: 'Удачи в следующий раз!',
    ja: '次回はもっと運がありますように！',
    ko: '다음번엔 더 좋은 운이 있을 거예요!',
    zh: '下次好运！',
    ar: 'حظ أفضل في المرة القادمة!'
  },
  'spinWheel.noCoins': {
    en: 'You didn\'t win any coins this time.',
    bn: 'এইবার আপনি কোন কয়েন জিতেননি।',
    hi: 'इस बार आपने कोई कॉइन नहीं जीते।',
    es: 'No ganaste monedas esta vez.',
    fr: 'Vous n\'avez pas gagné de pièces cette fois.',
    de: 'Sie haben diesmal keine Münzen gewonnen.',
    it: 'Non hai vinto monete questa volta.',
    pt: 'Você não ganhou moedas desta vez.',
    ru: 'В этот раз вы не выиграли монет.',
    ja: '今回はコインを獲得できませんでした。',
    ko: '이번에는 코인을 획득하지 못했습니다.',
    zh: '这次您没有赢得硬币。',
    ar: 'لم تفز بأي عملات هذه المرة.'
  },
  'common.coins': {
    en: 'Coins',
    bn: 'কয়েন',
    hi: 'कॉइन',
    es: 'Monedas',
    fr: 'Pièces',
    de: 'Münzen',
    it: 'Monete',
    pt: 'Moedas',
    ru: 'Монеты',
    ja: 'コイン',
    ko: '코인',
    zh: '硬币',
    ar: 'عملات'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
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
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[key]?.[language] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return translation;
  };

  useEffect(() => {
    // Force re-render when language changes
    console.log('Language changed to:', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
