import React, { useEffect, useRef } from "react";

export function BirdsBackground() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);  

  useEffect(() => {
    if (window.VANTA && window.VANTA.BIRDS) {
      effectRef.current = window.VANTA.BIRDS({
        el: vantaRef.current,
        backgroundColor: 0xffffff,
        backgroundAlpha: 0.00,
        color1: 0xff0000,
        color2: 0x00d1ff,
        quantity: 3,
      });
    }

    return () => {
      if (effectRef.current) effectRef.current.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}
