import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '50px',
});

const StyledQRCodeContainer = styled('div')(({ opacity }) => ({
  marginTop: '20px',
  position: 'relative',
  display: 'inline-block',
  opacity: opacity,
}));

const StyledButton = styled(Button)({
  marginTop: '20px',
  marginRight: '10px',
});

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const qrRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const copyToClipboard = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item]);
        alert('QR code copied to clipboard!');
      });
    }
  };

  const downloadAsJpg = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.jpg';
      link.href = canvas.toDataURL('image/jpeg');
      link.click();
    }
  };

  const downloadAsSvg = () => {
    const svg = qrRef.current.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.svg';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (text) {
      qrRef.current.querySelector('canvas')?.setAttribute('id', 'qr-canvas');
    }
  }, [text]);

  return (
    <>
      <StyledContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          QR Code Generator
        </Typography>
        <TextField
          label="Enter text to generate QR code"
          variant="outlined"
          value={text}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledQRCodeContainer ref={qrRef} opacity={text ? 1 : 0.3}>
          <QRCode value={text} size={256} renderAs="canvas" />
        </StyledQRCodeContainer>
      </StyledContainer>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={copyToClipboard}
          disabled={!text}
        >
          Copy QR Code
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={downloadAsJpg}
          disabled={!text}
        >
          Download as JPG
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={downloadAsSvg}
          disabled={!text}
        >
          Download as SVG
        </StyledButton>
      </div>
    </>
  );
};

export default QRCodeGenerator;
