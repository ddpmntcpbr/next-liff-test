// components/ImagePage.tsx
import { useState, FC } from 'react';
import { Box, Button, Avatar } from '@mui/material';

const ImagePage: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
};

export default ImagePage;
