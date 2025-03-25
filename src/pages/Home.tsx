// pages/Home.tsx
import { useState, FC } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Container, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SettingsIcon from '@mui/icons-material/Settings';

import UserPage from '../components/UserPage';
import ImagePage from '../components/ImagePage';
import SettingsPage from '../components/SettingsPage';

const TABS = [
  { id: 1, label: 'ユーザー', icon: <HomeIcon /> },
  { id: 2, label: '画像', icon: <PhotoCameraIcon /> },
  { id: 3, label: '設定', icon: <SettingsIcon /> },
];

const Home: FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <UserPage />;
      case 2:
        return <ImagePage />;
      case 3:
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="white">
      <Box flexGrow={1} overflow="auto">
        <Container>{renderContent()}</Container>
      </Box>
      <Paper elevation={3}>
        <BottomNavigation
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
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
};

export default Home;
