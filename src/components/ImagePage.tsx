// components/ImagePage.tsx
import { useState, FC } from 'react';
import { Box, Button } from '@mui/material';

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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} px={2}>
      <Button variant="contained" component="label">
        写真を登録
        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
      </Button>
      {selectedImage && (
        <Box
          component="img"
          src={selectedImage}
          alt="preview"
          sx={{ width: '100%', height: 'auto', mt: 2, borderRadius: 1 }}
        />
      )}
    </Box>
  );
};

export default ImagePage;
