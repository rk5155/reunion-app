// 機能・特徴データ
export const useFeatures = () => {
  const features = [
    {
      number: 1,
      image: '/images/26679704.png',
      alt: '完全無料で使える',
      title: '幹事のやることはWEB招待状を拡散するのみ！',
      description:
        '面倒な準備はすべてリユニオンアップにお任せ！幹事はWEB招待状を拡散するだけ。LINEやSNSで気軽にシェアできます！',
    },
    {
      number: 2,
      image: '/images/mark_heart_anshin_anzen.png',
      alt: '卒業年やクラス単位の管理',
      title: 'ドタキャンリスク保証！',
      description: '当日のドタキャンが何人いても幹事さんの自己負担は0円です！',
    },
    {
      number: 3,
      image: '/images/image.png',
      alt: '準備の手間なし！',
      title: '準備の手間なし！',
      description:
        '会場手配から出欠管理、参加費の回収までリユニオンアップが代行。幹事も安心して参加できます！',
    },
  ];

  return { features };
};

// 問題・課題データ
export const useProblems = () => {
  const problems = [
    {
      icon: 'mdi-calendar-alert',
      title: '会場探しや人数調整が大変...',
    },
    {
      icon: 'mdi-phone-alert',
      title: '出欠確認の連絡が面倒...',
    },
    {
      icon: 'mdi-currency-jpy',
      title: '集金でトラブルにならないか不安...',
    },
    {
      icon: 'mdi-clock-alert',
      title: '当日バタバタして楽しめない...',
    },
    {
      icon: 'mdi-account-question',
      title: 'そもそも誰に声をかけたらいいかわからない...',
    },
  ];

  return { problems };
};

// プラン情報データ
export const usePlans = () => {
  const plans = [
    {
      title: 'ホテル・式場プラン',
      description:
        '雰囲気も料理も大満足！リユニオンアップおすすめの人気プラン。全国のホテルや式場と提携しているので、料理のクオリティはもちろん、ドリンクも豊富にご用意。「せっかくの同窓会だから、雰囲気にもこだわりたい！」という方に選ばれています。ステージやプロジェクター付きの会場も多数ご紹介可能。盛り上がること間違いなしです！',
      image: '/images/masood-aslami-7w-cRdewpJA-unsplash.jpg',
      price: '8,000円〜',
    },
    {
      title: 'レストランプラン - Casual',
      description:
        '若い世代に好評！おしゃれカジュアルな同窓会プラン。気取らず楽しめる雰囲気で、子連れ参加もOK。少人数〜大人数まで幅広く対応できる柔軟なプランです。',
      image: '/images/glenov-brankovic-e4B5AvA7Jqo-unsplash.jpg',
      price: '7,000円〜',
    },
  ];

  return { plans };
};

// 利用の流れデータ
export const useSteps = () => {
    const steps = [
      {
        number: 1,
        title: '希望日時・プランなどを相談',
        description:
          'ご希望の開催日時や会場のイメージ、参加予定人数などをお聞かせください。専任プランナーがご要望に合わせて最適なプランをご提案いたします。',
        timing: '開催5ヶ月前',
      },
      {
        number: 2,
        title: '会場手配&会費決定',
        description:
          'プランナーが会場の手配を行い、参加費を決定いたします。全国4,000件以上の提携会場から、ご予算と人数に最適な会場をご提案いたします。',
        timing: '開催4ヶ月前',
      },
      {
        number: 3,
        title: 'WEB案内状の拡散',
        description:
          'WEB招待状による出欠確認を開始いたします。ご参加状況の確認に加え、名簿管理や未達者の確認も弊社にて対応いたしますので、安心してお任せください。',
        timing: '開催3ヶ月前',
      },
      {
        number: 4,
        title: 'プランナーと最終確認',
        description:
          '参加人数の確定や当日の流れ、特別な演出などについて最終確認を行います。不安なことがあれば何でもご相談ください。',
        timing: '開催1ヶ月前',
      },
      {
        number: 5,
        title: '同窓会を開催',
        description:
          '当日は運営スタッフが受付から司会進行まで全面サポート。幹事様も安心して同窓会をお楽しみください。写真撮影や精算業務もお任せです。',
        timing: '開催当日',
      },
    ];

  return { steps };
};

// サービス項目データ
export const useServices = () => {
  const plannerServices = [
    { title: '企画プランニング', icon: 'mdi-lightbulb-on-outline' },
    { title: '同窓会SNS提供', icon: 'mdi-devices' },
    { title: '参加促進のフォロー', icon: 'mdi-trending-up' },
    { title: '会場リサーチ・交渉', icon: 'mdi-map-search-outline' },
    { title: '会場手配', icon: 'mdi-phone' },
    { title: '打ち合わせ', icon: 'mdi-account-group-outline' },
    { title: '同窓会SNSへの写真アップロード', icon: 'mdi-camera-plus-outline' },
  ];

  const guidanceServices = [
    { title: '案内状デザイン', icon: 'mdi-palette-outline' },
    { title: '案内状印刷・発送', icon: 'mdi-printer-outline' },
    { title: '名簿管理', icon: 'mdi-account-multiple-outline' },
    { title: '名簿データ化', icon: 'mdi-database-outline' },
    { title: '案内状不着確認', icon: 'mdi-email-check-outline' },
  ];

  const eventDayServices = [
    { title: 'ディレクター業務', icon: 'mdi-face-man-outline' },
    { title: '運営スタッフ', icon: 'mdi-account-group' },
    { title: '受付業務', icon: 'mdi-desk' },
    { title: '精算業務', icon: 'mdi-calculator-variant-outline' },
    { title: '名札作成', icon: 'mdi-badge-account-outline' },
    { title: '参加者名簿作成', icon: 'mdi-file-document-outline' },
    { title: '司会進行サポート', icon: 'mdi-microphone-outline' },
    { title: '写真撮影', icon: 'mdi-camera-outline' },
    { title: 'お食事', icon: 'mdi-food-fork-drink' },
    { title: 'フリードリンク', icon: 'mdi-glass-cocktail' },
    { title: '当日キャンセルリスク保証', icon: 'mdi-shield-check-outline' },
  ];

  return { plannerServices, guidanceServices, eventDayServices };
};

// 利用者の声データ
export const useReviews = () => {
  const reviews = [
    {
      name: '荒井 美香さん',
      role: '高校3年2組 同窓会幹事',
      initial: '田',
      avatarColor: 'deep-purple-lighten-1',
      rating: 5,
      comment:
        '初めての幹事で不安でしたが、リユニオンアップのおかげで大成功でした！出欠管理から会場手配まで全てお任せできて、当日は私も心から楽しめました。みんなから「また来年もやろう！」と言ってもらえて嬉しかったです。',
      eventType: 'ホテル・式場プラン',
    },
    {
      name: '泉 健太さん',
      role: '大学ゼミ 卒業10周年',
      initial: '山',
      avatarColor: 'pink-accent-3',
      rating: 5,
      comment:
        'カジュアルな雰囲気で久しぶりの仲間と楽しい時間を過ごせました。子連れでも参加しやすく、みんなが気軽に来てくれたのが良かったです。料金も手頃で大満足でした！',
      eventType: 'レストランプラン',
    },
    {
      name: '山口 麗子さん',
      role: '中学校同窓会 実行委員長',
      initial: '佐',
      avatarColor: 'light-blue-darken-1',
      rating: 5,
      comment:
        '150人規模の同窓会でしたが、ドタキャン保証があったので安心でした。当日7名のキャンセルがありましたが、追加料金は一切なし。会場も素晴らしく、みんなに喜んでもらえました。',
      eventType: 'ホテル・式場プラン',
    },
  ];

  return { reviews };
};

// 統合された composable
export const usePageData = () => {
  const { features } = useFeatures();
  const { problems } = useProblems();
  const { plans } = usePlans();
  const { steps } = useSteps();
  const { plannerServices, guidanceServices, eventDayServices } = useServices();
  const { reviews } = useReviews();

  return {
    features,
    problems,
    plans,
    steps,
    plannerServices,
    guidanceServices,
    eventDayServices,
    reviews,
    faqs: [
      {
        question: "手数料はいくらですか？",
        answer: "参加者お一人様につき980円の手数料をいただいております。幹事様からの負担はございません。"
      },
      {
        question: "最低参加人数はありますか？",
        answer: "最低参加人数の制限はございません。少人数でもお気軽にご相談ください。"
      },
      {
        question: "キャンセル料はかかりますか？",
        answer: "同窓会自体を中止されると、その時点で弊社側のキャンセル料（契約フォーム内のキャンセル規定に記載）と会場によってはキャンセル料が発生してしまいます。ただ、ご人数が少なくなっても会を中止されない限りはキャンセル料は発生致しませんので、ご人数が予定より少なくなってもご予定通り開催されることをお勧めしております。"
      },
      {
        question: "遠方の同窓会でも対応してもらえますか？",
        answer: "全国どこでも対応可能です。地方での開催実績も豊富にございますのでお任せください。"
      },
      {
        question: "写真撮影は含まれますか？",
        answer: "プロカメラマンによる写真撮影がプランに含まれております。撮影した写真は後日お渡しします。"
      },
      {
        question: "当日参加できなくなった場合はどうなりますか？",
        answer: "ドタキャン保証により、当日キャンセルがあっても幹事様に追加費用をお支払いいただくことはありません。"
      },
      {
        question: "会場の提案はしてもらえますか？",
        answer: "はい、ご希望のエリアや予算に合わせて最適な会場をご提案いたします。提携外の会場でも対応可能です。"
      },
      {
        question: "準備期間はどのくらい必要ですか？",
        answer: "理想的には3〜6ヶ月前からの準備をおすすめしますが、短期間でも可能な限り対応いたします。"
      }
    ],
  };
};