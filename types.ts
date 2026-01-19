import React from 'react';

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  deadline: string;
  amount: string;
  tags: string[];
}

export interface StatProps {
  label: string;
  value: string;
  description: string;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}