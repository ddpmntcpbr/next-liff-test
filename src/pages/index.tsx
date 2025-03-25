import { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Button, Container, Paper, Typography, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SettingsIcon from '@mui/icons-material/Settings';
import liff from '@line/liff';

const TABS = [
  { id: 1, label: 'ユーザー', icon: <HomeIcon />, content: 'user' },
  { id: 2, label: '画像', icon: <PhotoCameraIcon />, content: 'page2' },
  { id: 3, label: '設定', icon: <SettingsIcon />, content: '設定' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (process.env.NODE_ENV !== 'production') {
        // 開発環境ではLIFFをスキップして空の情報を設定
        setUserName(null);
        setUserEmail(null);
        return;
      }

      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error('LIFF ID が設定されていません');
        }

        await liff.init({ liffId: liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
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

    if (activeTab === 1) {
      fetchUserProfile();
    }
  }, [activeTab]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    if (activeTab === 1) {
      return (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>ユーザー情報</Typography>
          <Typography>名前: {userName || 'ユーザー情報なし'}</Typography>
          <Typography>メールアドレス: {userEmail || 'ユーザー情報なし'}</Typography>
        </Box>
      );
    } else if (activeTab === 2) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
          <Button variant="contained" component="label">
            写真を登録
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>
          {selectedImage && (
            <Avatar src={selectedImage} alt="preview" sx={{ width: 120, height: 120, mt: 2 }} />
          )}
        </Box>
      );
    } else {
      return (
        <Box mt={4} display="flex" justifyContent="center">
          <Typography variant="h4">{TABS.find((tab) => tab.id === activeTab)?.content}</Typography>
        </Box>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box flexGrow={1} overflow="auto">
        <Container>{renderContent()}</Container>
      </Box>
      <Paper elevation={3}>
        <BottomNavigation
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          showLabels
        >
          {TABS.map((tab) => (
            <BottomNavigationAction
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              value={tab.id}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
