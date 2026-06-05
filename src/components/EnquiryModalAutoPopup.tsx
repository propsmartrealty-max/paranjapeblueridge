"use client";

import React, { useState, useEffect } from 'react';
import EnquiryModal from '@/components/EnquiryModal';

export default function EnquiryModalAutoPopup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />;
}
