"use client";

import React, { useState, useEffect } from "react";

type ColorFormat = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
};

const ColorPickerClient = () => {
  const [color, setColor] = useState<ColorFormat>({
    hex: "#3498db",
    rgb: { r: 52, g: 152, b: 219 },
    hsl: { h: 204, s: 70, l: 53 },
  });

  // 基本色の配列
  const basicColors = [
    { name: "黒", hex: "#000000" },
    { name: "グレー", hex: "#808080" },
    { name: "白", hex: "#FFFFFF" },
    { name: "赤", hex: "#FF0000" },
    { name: "オレンジ", hex: "#FFA500" },
    { name: "黄", hex: "#FFFF00" },
    { name: "黄緑", hex: "#ADFF2F" },
    { name: "ライム", hex: "#00FF00" },
    { name: "緑", hex: "#008000" },
    { name: "青緑", hex: "#008B8B" },
    { name: "青", hex: "#0000FF" },
    { name: "紫", hex: "#800080" },
    { name: "ピンク", hex: "#FFC0CB" },
    { name: "茶", hex: "#A52A2A" },
    { name: "ベージュ", hex: "#F5F5DC" },
    { name: "金", hex: "#FFD700" },
    { name: "銀", hex: "#C0C0C0" },
  ];
  const [copied, setCopied] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [saturation, setSaturation] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);

  // HEX値からRGB値を計算
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // RGB値からHEX値を計算
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  // RGB値からHSL値を計算
  const rgbToHsl = (
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // HSL値からRGB値を計算
  const hslToRgb = (
    h: number,
    s: number,
    l: number
  ): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // コンプリメンタリーカラー（補色）を計算
  const getComplementaryColor = (hex: string): string => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
  };

  // 類似色を計算
  const getAnalogousColors = (hex: string): string[] => {
    const { r, g, b } = hexToRgb(hex);
    const hsl = rgbToHsl(r, g, b);

    // 30度ずつ色相をずらした色
    const color1 = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l);
    const color2 = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);

    return [
      rgbToHex(color1.r, color1.g, color1.b),
      rgbToHex(color2.r, color2.g, color2.b),
    ];
  };

  // HEXカラー変更ハンドラ
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      const rgb = hexToRgb(hexValue);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColor({ hex: hexValue, rgb, hsl });
      addToHistory(hexValue);
    }
  };

  // RGB値変更ハンドラ
  const handleRgbChange = (component: "r" | "g" | "b", value: number) => {
    if (value >= 0 && value <= 255) {
      const newRgb = { ...color.rgb, [component]: value };
      const hexValue = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      const hsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
      setColor({ hex: hexValue, rgb: newRgb, hsl });
      addToHistory(hexValue);
    }
  };

  // HSL値変更ハンドラ
  const handleHslChange = (component: "h" | "s" | "l", value: number) => {
    const max = component === "h" ? 360 : 100;
    if (value >= 0 && value <= max) {
      const newHsl = { ...color.hsl, [component]: value };
      const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b);
      setColor({ hex: hexValue, rgb, hsl: newHsl });
      addToHistory(hexValue);
    }
  };

  // 彩度・明度の変更ハンドラ
  const handleSaturationChange = (value: number) => {
    setSaturation(value);
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
  };

  // クリップボードにコピー
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  // カラー履歴に追加
  const addToHistory = (hex: string) => {
    if (!colorHistory.includes(hex)) {
      setColorHistory((prev) => [hex, ...prev].slice(0, 10));
    }
  };

  // カラーピッカーの変更処理
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    const rgb = hexToRgb(hexValue);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setColor({ hex: hexValue, rgb, hsl });
    addToHistory(hexValue);
  };

  // 履歴から色を選択
  const selectFromHistory = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setColor({ hex, rgb, hsl });
  };

  // 彩度・明度調整後の色を取得
  const getAdjustedColor = (): string => {
    const { h, s, l } = color.hsl;
    const adjustedS = Math.min(100, Math.max(0, s * (saturation / 100)));
    const adjustedL = Math.min(100, Math.max(0, l * (brightness / 100)));
    const rgb = hslToRgb(h, adjustedS, adjustedL);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-9/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            カラーピッカー＆コード変換
          </h1>
          <p className="text-lg text-muted-foreground">
            色を選択・調整して、様々な形式のカラーコードを取得できます
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* カラー選択部分 */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              色を選択
            </h2>
            {/* 基本色パレット */}
            <div className="mb-6">
              <label className="block font-medium mb-2">基本色</label>
              <div className="flex flex-wrap gap-2">
                {basicColors.map((basicColor, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-md border border-border-primary hover:scale-110 transition-transform"
                    style={{ backgroundColor: basicColor.hex }}
                    onClick={() => {
                      const rgb = hexToRgb(basicColor.hex);
                      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                      setColor({ hex: basicColor.hex, rgb, hsl });
                      addToHistory(basicColor.hex);
                    }}
                    title={`${basicColor.name} (${basicColor.hex})`}
                    aria-label={`${basicColor.name}色を選択`}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="colorPicker" className="font-medium">
                  カラーピッカー
                </label>
                <div
                  className="w-8 h-8 rounded border border-border-primary"
                  style={{ backgroundColor: color.hex }}
                ></div>
              </div>
              <input
                type="color"
                id="colorPicker"
                value={color.hex}
                onChange={handleColorPickerChange}
                className="w-full h-10 cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="hexInput" className="block font-medium mb-2">
                HEX
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="hexInput"
                  value={color.hex}
                  onChange={handleHexChange}
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
                <button
                  onClick={() => copyToClipboard(color.hex, "hex")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {copied === "hex" ? "✓" : "コピー"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="rgbR" className="block font-medium mb-2">
                  R
                </label>
                <input
                  type="number"
                  id="rgbR"
                  min="0"
                  max="255"
                  value={color.rgb.r}
                  onChange={(e) =>
                    handleRgbChange("r", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
              <div>
                <label htmlFor="rgbG" className="block font-medium mb-2">
                  G
                </label>
                <input
                  type="number"
                  id="rgbG"
                  min="0"
                  max="255"
                  value={color.rgb.g}
                  onChange={(e) =>
                    handleRgbChange("g", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
              <div>
                <label htmlFor="rgbB" className="block font-medium mb-2">
                  B
                </label>
                <input
                  type="number"
                  id="rgbB"
                  min="0"
                  max="255"
                  value={color.rgb.b}
                  onChange={(e) =>
                    handleRgbChange("b", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="rgbValue" className="block font-medium mb-2">
                RGB
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="rgbValue"
                  value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}
                  readOnly
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                      "rgb"
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {copied === "rgb" ? "✓" : "コピー"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="hslH" className="block font-medium mb-2">
                  H
                </label>
                <input
                  type="number"
                  id="hslH"
                  min="0"
                  max="360"
                  value={color.hsl.h}
                  onChange={(e) =>
                    handleHslChange("h", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
              <div>
                <label htmlFor="hslS" className="block font-medium mb-2">
                  S %
                </label>
                <input
                  type="number"
                  id="hslS"
                  min="0"
                  max="100"
                  value={color.hsl.s}
                  onChange={(e) =>
                    handleHslChange("s", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
              <div>
                <label htmlFor="hslL" className="block font-medium mb-2">
                  L %
                </label>
                <input
                  type="number"
                  id="hslL"
                  min="0"
                  max="100"
                  value={color.hsl.l}
                  onChange={(e) =>
                    handleHslChange("l", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="hslValue" className="block font-medium mb-2">
                HSL
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="hslValue"
                  value={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}
                  readOnly
                  className="w-full px-4 py-2 border border-border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-input text-foreground"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
                      "hsl"
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {copied === "hsl" ? "✓" : "コピー"}
                </button>
              </div>
            </div>
          </div>

          {/* プレビューと調整部分 */}
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
              プレビュー
            </h2>

            <div className="mb-6">
              <div
                className="w-full h-32 rounded-lg border border-border-primary mb-4"
                style={{ backgroundColor: color.hex }}
              ></div>
              <div className="text-center font-medium">{color.hex}</div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">調整</h3>
              <div className="mb-4">
                <label htmlFor="saturation" className="block mb-2">
                  彩度 ({saturation}%)
                </label>
                <input
                  type="range"
                  id="saturation"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) =>
                    handleSaturationChange(parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="brightness" className="block mb-2">
                  明度 ({brightness}%)
                </label>
                <input
                  type="range"
                  id="brightness"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) =>
                    handleBrightnessChange(parseInt(e.target.value))
                  }
                  className="w-full"
                />
              </div>
              <div
                className="w-full h-16 rounded-lg border border-border-primary mb-2"
                style={{ backgroundColor: getAdjustedColor() }}
              ></div>
              <div className="text-center text-sm mb-4">
                調整後: {getAdjustedColor()}
              </div>
              <button
                onClick={() => {
                  const adjustedColor = getAdjustedColor();
                  const rgb = hexToRgb(adjustedColor);
                  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                  setColor({ hex: adjustedColor, rgb, hsl });
                  addToHistory(adjustedColor);
                }}
                className="w-full py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition duration-200"
              >
                この色を採用
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">カラーバリエーション</h3>
              <div className="flex space-x-2 mb-4">
                <div className="flex-1">
                  <div
                    className="w-full h-12 rounded-lg border border-border-primary mb-1"
                    style={{
                      backgroundColor: getComplementaryColor(color.hex),
                    }}
                    onClick={() =>
                      selectFromHistory(getComplementaryColor(color.hex))
                    }
                  ></div>
                  <div className="text-center text-xs">補色</div>
                </div>
                {getAnalogousColors(color.hex).map((analogColor, index) => (
                  <div className="flex-1" key={index}>
                    <div
                      className="w-full h-12 rounded-lg border border-border-primary mb-1 cursor-pointer"
                      style={{ backgroundColor: analogColor }}
                      onClick={() => selectFromHistory(analogColor)}
                    ></div>
                    <div className="text-center text-xs">
                      類似色 {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {colorHistory.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">最近使用した色</h3>
                <div className="flex flex-wrap gap-2">
                  {colorHistory.map((hex, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-md border border-border-primary cursor-pointer"
                      style={{ backgroundColor: hex }}
                      onClick={() => selectFromHistory(hex)}
                      title={hex}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-border-primary pb-2 text-foreground">
            使い方
          </h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              カラーピッカーで色を選択するか、HEX/RGB/HSL値を直接入力してください
            </li>
            <li>
              彩度・明度スライダーで色を調整し、「この色を採用」ボタンで確定できます
            </li>
            <li>
              カラーバリエーション（補色や類似色）をクリックして選択することもできます
            </li>
            <li>
              選択した色のコードは「コピー」ボタンでクリップボードにコピーできます
            </li>
            <li>最近使用した色は履歴に保存され、クリックで再選択できます</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ColorPickerClient;
