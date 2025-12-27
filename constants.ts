import { Question, TypeResult } from './types';

// Default LINE URL fallback
export const DEFAULT_LINE_URL = "https://line.me/R/ti/p/@example_common";

// 12 Questions (3 per axis)
// NOTE: Images should be placed in public/images/questions/q{id}.png
// Questions rewritten as statements for Yes/Neither/No format.
// If Yes -> First Option Value
// If No -> Second Option Value
export const QUESTIONS: Question[] = [
  // E vs I
  {
    id: 1,
    text: "休日は友達と遊んだり、賑やかな場所へ行くのが好きだ",
    axis: "EI",
    options: [
      { text: "YES", value: "E" },
      { text: "NO", value: "I" },
    ],
    imagePath: "/images/questions/q1.png",
  },
  {
    id: 2,
    text: "初対面の人とも自分から積極的に話しかける方だ",
    axis: "EI",
    options: [
      { text: "YES", value: "E" },
      { text: "NO", value: "I" },
    ],
    imagePath: "/images/questions/q2.png",
  },
  {
    id: 3,
    text: "忙しい一週間の後は、誰かと会うことで元気をチャージしたい",
    axis: "EI",
    options: [
      { text: "YES", value: "E" },
      { text: "NO", value: "I" },
    ],
    imagePath: "/images/questions/q3.png",
  },
  // S vs N
  {
    id: 4,
    text: "新しいことを学ぶときは、背景の理論よりも具体的な事実や手順が気になる",
    axis: "SN",
    options: [
      { text: "YES", value: "S" },
      { text: "NO", value: "N" },
    ],
    imagePath: "/images/questions/q4.png",
  },
  {
    id: 5,
    text: "物事を判断するときは、直感よりもこれまでの経験や実績を重視する",
    axis: "SN",
    options: [
      { text: "YES", value: "S" },
      { text: "NO", value: "N" },
    ],
    imagePath: "/images/questions/q5.png",
  },
  {
    id: 6,
    text: "自分は想像力豊かで夢見がちなタイプというよりは、現実的で地に足がついている方だ",
    axis: "SN",
    options: [
      { text: "YES", value: "S" },
      { text: "NO", value: "N" },
    ],
    imagePath: "/images/questions/q6.png",
  },
  // T vs F
  {
    id: 7,
    text: "大事な決断をするときは、感情よりも論理的なメリット・デメリットを優先する",
    axis: "TF",
    options: [
      { text: "YES", value: "T" },
      { text: "NO", value: "F" },
    ],
    imagePath: "/images/questions/q7.png",
  },
  {
    id: 8,
    text: "友達が落ち込んでいるときは、共感するよりも解決策やアドバイスを提示したい",
    axis: "TF",
    options: [
      { text: "YES", value: "T" },
      { text: "NO", value: "F" },
    ],
    imagePath: "/images/questions/q8.png",
  },
  {
    id: 9,
    text: "「優しい・気配りができる」と言われるより、「仕事ができる・頭がいい」と言われる方が嬉しい",
    axis: "TF",
    options: [
      { text: "YES", value: "T" },
      { text: "NO", value: "F" },
    ],
    imagePath: "/images/questions/q9.png",
  },
  // J vs P
  {
    id: 10,
    text: "机の上や部屋はいつも整理整頓されている方だ",
    axis: "JP",
    options: [
      { text: "YES", value: "J" },
      { text: "NO", value: "P" },
    ],
    imagePath: "/images/questions/q10.png",
  },
  {
    id: 11,
    text: "旅行の計画は現地での気分任せにせず、しっかりとスケジュールを立てたい",
    axis: "JP",
    options: [
      { text: "YES", value: "J" },
      { text: "NO", value: "P" },
    ],
    imagePath: "/images/questions/q11.png",
  },
  {
    id: 12,
    text: "締め切りや約束に対しては、ギリギリではなく余裕を持って終わらせたい",
    axis: "JP",
    options: [
      { text: "YES", value: "J" },
      { text: "NO", value: "P" },
    ],
    imagePath: "/images/questions/q12.png",
  },
];

// Result Data
// NOTE: Images should be placed in public/images/results/{type}.png
export const RESULTS: Record<string, TypeResult> = {
  ISTJ: {
    type: "ISTJ",
    title: "管理者タイプ",
    description: "真面目で責任感が強く、コツコツと物事を進めるしっかり者。",
    strengths: ["誠実で嘘をつかない", "責任感が強い", "計画的"],
    weaknesses: ["頑固になりがち", "変化が苦手", "理屈っぽくなることも"],
    professions: ["公務員", "会計士", "システム管理者", "法曹界"],
    lineUrl: "https://line.me/R/ti/p/@istj_link",
    imagePath: "/images/results/ISTJ.png",
  },
  ISFJ: {
    type: "ISFJ",
    title: "擁護者タイプ",
    description: "思いやりがあり、大切な人を守るために尽くす献身的なサポーター。",
    strengths: ["協調性がある", "細かい気配りができる", "忍耐強い"],
    weaknesses: ["断るのが苦手", "自分を後回しにしがち", "変化にストレスを感じる"],
    professions: ["看護師", "教師", "人事・総務", "カウンセラー"],
    lineUrl: "https://line.me/R/ti/p/@isfj_link",
    imagePath: "/images/results/ISFJ.png",
  },
  INFJ: {
    type: "INFJ",
    title: "提唱者タイプ",
    description: "静かながらも熱い理想を持ち、人々の心を動かす不思議な魅力の持ち主。",
    strengths: ["洞察力が鋭い", "創造的", "信念が強い"],
    weaknesses: ["繊細で傷つきやすい", "理想が高すぎる", "燃え尽きやすい"],
    professions: ["心理カウンセラー", "作家・ライター", "非営利団体職員", "デザイナー"],
    lineUrl: "https://line.me/R/ti/p/@infj_link",
    imagePath: "/images/results/INFJ.png",
  },
  INTJ: {
    type: "INTJ",
    title: "建築家タイプ",
    description: "豊かな想像力と戦略的思考を持ち、あらゆることの計画を立てる完璧主義者。",
    strengths: ["論理的思考力", "高い向上心", "独創的なアイデア"],
    weaknesses: ["理屈っぽすぎる", "批判的になりがち", "感情表現が苦手"],
    professions: ["経営コンサルタント", "ソフトウェア開発者", "科学者", "投資銀行家"],
    lineUrl: "https://line.me/R/ti/p/@intj_link",
    imagePath: "/images/results/INTJ.png",
  },
  ISTP: {
    type: "ISTP",
    title: "巨匠タイプ",
    description: "好奇心旺盛で、自分の手で触れて学ぶことが大好きなクールな職人肌。",
    strengths: ["冷静沈着", "手先が器用", "柔軟な対応力"],
    weaknesses: ["飽きっぽい", "リスクを冒しがち", "感情を表に出さない"],
    professions: ["エンジニア", "パイロット", "救急救命士", "データアナリスト"],
    lineUrl: "https://line.me/R/ti/p/@istp_link",
    imagePath: "/images/results/ISTP.png",
  },
  ISFP: {
    type: "ISFP",
    title: "冒険家タイプ",
    description: "感性豊かで芸術的。型にはまらず、新しい体験を楽しむ自由人。",
    strengths: ["芸術的センス", "優しい", "今この瞬間を楽しめる"],
    weaknesses: ["計画性がない", "ストレスに弱い", "競争が苦手"],
    professions: ["アーティスト", "ファッションデザイナー", "理学療法士", "フローリスト"],
    lineUrl: "https://line.me/R/ti/p/@isfp_link",
    imagePath: "/images/results/ISFP.png",
  },
  INFP: {
    type: "INFP",
    title: "仲介者タイプ",
    description: "詩的で親切。いつも良いことのためにお手伝いしたいと願う、夢見る理想主義者。",
    strengths: ["共感力が高い", "クリエイティブ", "心が広い"],
    weaknesses: ["現実離れしがち", "傷つきやすい", "決断が苦手"],
    professions: ["編集者", "心理学者", "ソーシャルワーカー", "通訳・翻訳者"],
    lineUrl: "https://line.me/R/ti/p/@infp_link",
    imagePath: "/images/results/INFP.png",
  },
  INTP: {
    type: "INTP",
    title: "論理学者タイプ",
    description: "貪欲な知識欲を持つ革新的な発明家。頭の中は常に新しいアイデアでいっぱい。",
    strengths: ["分析力が高い", "独創的", "偏見を持たない"],
    weaknesses: ["考えすぎる", "感情に疎い", "ルーチンワークが苦手"],
    professions: ["プログラマー", "研究者", "数学者", "システムアナリスト"],
    lineUrl: "https://line.me/R/ti/p/@intp_link",
    imagePath: "/images/results/INTP.png",
  },
  ESTP: {
    type: "ESTP",
    title: "起業家タイプ",
    description: "賢くてエネルギッシュ。危険と隣り合わせの生活を心から楽しむ人。",
    strengths: ["行動力がある", "現実的", "社交的で目立つ"],
    weaknesses: ["せっかち", "リスクを恐れない", "計画性がない"],
    professions: ["セールスマン", "起業家", "スポーツ選手", "警察官・消防士"],
    lineUrl: "https://line.me/R/ti/p/@estp_link",
    imagePath: "/images/results/ESTP.png",
  },
  ESFP: {
    type: "ESFP",
    title: "エンターテイナータイプ",
    description: "自発的でエネルギッシュ。周りの人を巻き込んで楽しませる天才。",
    strengths: ["明るくポジティブ", "美的センスがある", "人を楽しませる"],
    weaknesses: ["集中力が続かない", "計画性がない", "批判に弱い"],
    professions: ["イベントプランナー", "接客業", "タレント・俳優", "ツアーガイド"],
    lineUrl: "https://line.me/R/ti/p/@esfp_link",
    imagePath: "/images/results/ESFP.png",
  },
  ENFP: {
    type: "ENFP",
    title: "広報運動家タイプ",
    description: "情熱的で独創的。かつ社交的な自由人。常に笑いかける理由を見つけられる。",
    strengths: ["好奇心旺盛", "コミュニケーション能力が高い", "エネルギッシュ"],
    weaknesses: ["集中力が散漫", "考えすぎる", "ストレスを溜めやすい"],
    professions: ["ジャーナリスト", "広告代理店", "イベントプロデューサー", "教師"],
    lineUrl: "https://line.me/R/ti/p/@enfp_link",
    imagePath: "/images/results/ENFP.png",
  },
  ENTP: {
    type: "ENTP",
    title: "討論者タイプ",
    description: "賢くて好奇心旺盛な思考家。知的な挑戦には必ず受けて立つ。",
    strengths: ["知識豊富", "頭の回転が速い", "カリスマ性がある"],
    weaknesses: ["議論好きすぎる", "飽きっぽい", "細かい作業が苦手"],
    professions: ["弁護士", "マーケティング職", "政治家", "コンサルタント"],
    lineUrl: "https://line.me/R/ti/p/@entp_link",
    imagePath: "/images/results/ENTP.png",
  },
  ESTJ: {
    type: "ESTJ",
    title: "幹部タイプ",
    description: "優秀な管理者。物事や人々を管理する能力にかけては右に出る者はいない。",
    strengths: ["リーダーシップがある", "組織的", "意志が強い"],
    weaknesses: ["柔軟性に欠ける", "頑固", "感情論が通じない"],
    professions: ["プロジェクトマネージャー", "裁判官", "銀行員", "軍人・警察官"],
    lineUrl: "https://line.me/R/ti/p/@estj_link",
    imagePath: "/images/results/ESTJ.png",
  },
  ESFJ: {
    type: "ESFJ",
    title: "領事官タイプ",
    description: "非常に思いやりがあり社交的。いつも誰かの助けになりたいと考えている。",
    strengths: ["面倒見が良い", "義理堅い", "ムードメーカー"],
    weaknesses: ["批判に弱い", "変化を嫌う", "お節介になりがち"],
    professions: ["保育士", "医療事務", "広報・PR", "カウンセラー"],
    lineUrl: "https://line.me/R/ti/p/@esfj_link",
    imagePath: "/images/results/ESFJ.png",
  },
  ENFJ: {
    type: "ENFJ",
    title: "主人公タイプ",
    description: "カリスマ性があり、人々を励ますリーダー。聞く人を魅了する。",
    strengths: ["人を惹きつける", "信頼できる", "情熱的"],
    weaknesses: ["理想が高すぎる", "繊細すぎる", "自己犠牲的になりがち"],
    professions: ["教師・講師", "人事マネージャー", "政治活動家", "セールスマネージャー"],
    lineUrl: "https://line.me/R/ti/p/@enfj_link",
    imagePath: "/images/results/ENFJ.png",
  },
  ENTJ: {
    type: "ENTJ",
    title: "指揮官タイプ",
    description: "大胆で想像力豊か、かつ強い意志を持つ指導者。道を見つけるか、作り出す。",
    strengths: ["効率的", "自信に満ちている", "決断力がある"],
    weaknesses: ["高圧的になりがち", "傲慢に見える", "感情を軽視する"],
    professions: ["経営者・CEO", "投資家", "大学教授", "弁護士"],
    lineUrl: "https://line.me/R/ti/p/@entj_link",
    imagePath: "/images/results/ENTJ.png",
  },
};