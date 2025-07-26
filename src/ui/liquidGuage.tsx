// LiquidGauge.tsx
import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';

type Props = {
  value: number;
};

const LiquidGauge: React.FC<Props> = ({ value }) => {
  const radius = 100;
  const fillColor = "#6495ED";

  return (
    <div className="flex justify-center items-center">
      <LiquidFillGauge
        width={radius * 2}
        height={radius * 2}
        value={value}
        percent="%"
        textStyle={{
          fill: '#444',
          fontSize: '1.5em'
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={3}
        circleStyle={{
          fill: fillColor,
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          return (
            <tspan>
              {value}
              <tspan>%</tspan>
            </tspan>
          );
        }}
      />
    </div>
  );
};

export default LiquidGauge;
