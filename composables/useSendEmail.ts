export const useSendEmail = () => {
  const sendEmail = async (email: string, subject: string, text: string) => {
    try {
      await $fetch('/api/send-email', {
        method: 'POST',
        body: {
          to: email,
          subject: subject,
          text: text,
        },
      });
      console.log('メール送信成功');
    } catch (error) {
      console.error('通信エラー:', error);
      alert('通信エラーが発生しました');
    }
  };

  return { sendEmail };
};