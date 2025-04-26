import { useState } from 'react';

export default function TitleContext() {
  const [title, setTitle] = useState<string>('');
  return {
    getTitle: title,
    setTitle: setTitle
  };
}
