import React, { useState, useEffect } from 'react';

const ImagePropertiesModal = ({ isOpen, image, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (image) {
      setName(image.name || ''); // Assuming image has a name property
      setAlt(image.alt || ''); // Assuming image has an alt property
      setCaption(image.caption || ''); // Assuming image has a caption property
      setWidth(image.width || ''); // Assuming image has a width property
      setHeight(image.height || ''); // Assuming image has a height property
      setAspectRatio(image.width / image.height || 1);
    }
  }, [image]);

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    if (lockAspectRatio) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    if (lockAspectRatio) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handleSave = () => {
    onSave({ name, alt, caption, width: parseInt(width, 10), height: parseInt(height, 10) });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Image Properties</h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Alt Text:
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </label>
        <label>
          Caption:
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={lockAspectRatio}
            onChange={(e) => setLockAspectRatio(e.target.checked)}
          />
          Lock Aspect Ratio
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImagePropertiesModal;
