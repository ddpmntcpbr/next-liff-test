// components/UserPage.tsx
import { useEffect, useState, FC } from 'react';
import { Box, Typography } from '@mui/material';
import liff from '@line/liff';

const UserPage: FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (process.env.NODE_ENV !== 'production') {
        setUserName("LIFF ID が設定されていません");
        setUserEmail("LIFF ID が設定されていません");
        return;
      }

      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) throw new Error('LIFF ID が設定されていません');

        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || window.location.href });
        } else {
          const profile = await liff.getProfile();
          setUserName(profile.displayName);

          const idToken = liff.getIDToken();
          if (idToken) {
            const decoded = JSON.parse(atob(idToken.split('.')[1]));
            setUserEmail(decoded.email || null);
          } else {
            setUserEmail(null);
          }
        }
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>ユーザー情報</Typography>
      <Typography>名前: {userName || 'ユーザー情報なし'}</Typography>
      <Typography>メールアドレス: {userEmail || 'ユーザー情報なし'}</Typography>
    </Box>
  );
};

export default UserPage;
