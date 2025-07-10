import { getFormattedDate } from '@/utils/date';

export const createEmailText = (invitation: {
  date: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  fee: number;
}): string => {
  return [
    'ご参加ありがとうございます！',
    '',
    '久しぶりに皆さんと顔を合わせて、懐かしい話に花を咲かせられればと思っています。',
    '皆さまにお会いできるのを楽しみにしております！',
    '',
    '▼ INFORMATION',
    `日時：${getFormattedDate(invitation.date)}`,
    `時間：${invitation.startTime} - ${invitation.endTime}`,
    `会場：${invitation.venueName}`,
    `会費：${invitation.fee}円`,
    `住所：${invitation.venueAddress}`,
    '',
    '-------------------------------',
    'あの日の仲間と、もう一度つながる。',
    '同窓会支援サービス REUNION UP(リユニオン アップ)',
    'https://reunion-up.com/',
    '-------------------------------',
  ].join('\n');
};