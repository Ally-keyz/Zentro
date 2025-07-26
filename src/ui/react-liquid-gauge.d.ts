declare module 'react-liquid-gauge' {
  import * as React from 'react';

  interface LiquidGaugeProps {
    value: number;
    width?: number;
    height?: number;
    percent?: string;
    textStyle?: React.CSSProperties;
    textRenderer?: (props: { value: number }) => React.ReactNode;
    riseAnimation?: boolean;
    waveAnimation?: boolean;
    waveFrequency?: number;
    waveAmplitude?: number;
    circleStyle?: React.CSSProperties;
    waveStyle?: React.CSSProperties;
  }

  const LiquidFillGauge: React.FC<LiquidGaugeProps>;

  export default LiquidFillGauge;
}
