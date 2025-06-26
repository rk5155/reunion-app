export const useSendEmail = () => {
  const sendEmail = async (email: string) => {
    try {
      await $fetch('/api/send-email', {
        method: 'POST',
        body: {
          to: email,
          subject: 'テストメール',
          text: 'これはテストです',
        },
      });
      alert('メール送信成功！');
    } catch (error) {
      console.error('通信エラー:', error);
      alert('通信エラーが発生しました');
    }
  };

  return { sendEmail };
};