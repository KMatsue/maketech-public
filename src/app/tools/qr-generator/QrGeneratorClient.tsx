"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

type QRTypeOption = "text" | "url" | "email" | "tel" | "sms" | "wifi" | "vcard";

interface QRSettings {
  size: number;
  color: string;
  backgroundColor: string;
  margin: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

const QrGeneratorClient = () => {
  // QRコードの内容
  const [content, setContent] = useState<string>("");
  const [qrType, setQrType] = useState<QRTypeOption>("text");

  // 連絡先情報用のフォームフィールド
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  // WiFi用のフォームフィールド
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [encryption, setEncryption] = useState<string>("WPA");
  const [hidden, setHidden] = useState<boolean>(false);

  // QRコードの設定
  const [settings, setSettings] = useState<QRSettings>({
    size: 200,
    color: "#000000",
    backgroundColor: "#ffffff",
    margin: 4,
    errorCorrectionLevel: "M",
  });

  // 生成されたQRコード
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [generationError, setGenerationError] = useState<string | null>(null);

  // デフォルトコンテンツを設定
  useEffect(() => {
    switch (qrType) {
      case "url":
        setContent("https://example.com");
        break;
      case "email":
        setContent("example@example.com");
        break;
      case "tel":
        setContent("+81901234567");
        break;
      case "sms":
        setContent("+81901234567");
        break;
      case "wifi":
        setSsid("MyWiFi");
        setPassword("password123");
        setEncryption("WPA");
        setHidden(false);
        break;
      case "vcard":
        setFirstName("太郎");
        setLastName("山田");
        setCompany("サンプル株式会社");
        setTitle("部長");
        setEmail("taro.yamada@example.com");
        setPhone("+81901234567");
        setWebsite("https://example.com");
        setAddress("東京都千代田区1-1-1");
        break;
      default:
        setContent("QRコードのテキスト");
    }
  }, [qrType]);

  // QRコードの内容を構築
  const buildQRContent = (): string => {
    switch (qrType) {
      case "url":
        return content.startsWith("http") ? content : `https://${content}`;
      case "email":
        return `mailto:${content}`;
      case "tel":
        return `tel:${content}`;
      case "sms":
        return `sms:${content}`;
      case "wifi":
        return `WIFI:S:${ssid};T:${encryption};P:${password};H:${
          hidden ? "true" : "false"
        };;`;
      case "vcard":
        return [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:${lastName};${firstName};;;`,
          `FN:${firstName} ${lastName}`,
          company ? `ORG:${company}` : "",
          title ? `TITLE:${title}` : "",
          email ? `EMAIL:${email}` : "",
          phone ? `TEL:${phone}` : "",
          website ? `URL:${website}` : "",
          address ? `ADR:;;${address};;;` : "",
          "END:VCARD",
        ]
          .filter((line) => line !== "")
          .join("\n");
      default:
        return content;
    }
  };

  // QRコードの生成
  const generateQRCode = () => {
    try {
      const qrContent = buildQRContent();

      if (!qrContent.trim()) {
        setGenerationError("内容を入力してください");
        setQrCodeDataUrl("");
        return;
      }

      const options = {
        errorCorrectionLevel: settings.errorCorrectionLevel,
        margin: settings.margin,
        color: {
          dark: settings.color,
          light: settings.backgroundColor,
        },
        width: settings.size,
      };

      QRCode.toDataURL(qrContent, options, (err, url) => {
        if (err) {
          console.error("QRコードの生成に失敗しました:", err);
          setGenerationError("QRコードの生成に失敗しました");
          setQrCodeDataUrl("");
        } else {
          setQrCodeDataUrl(url);
          setGenerationError(null);
        }
      });
    } catch (err) {
      console.error("QRコードの生成中にエラーが発生しました:", err);
      setGenerationError("QRコードの生成中にエラーが発生しました");
      setQrCodeDataUrl("");
    }
  };

  // QRコードのダウンロード
  const downloadQRCode = (format: "png" | "svg") => {
    if (!qrCodeDataUrl && format === "png") return;

    if (format === "png") {
      // PNGとしてダウンロード
      const link = document.createElement("a");
      link.href = qrCodeDataUrl;
      link.download = `qrcode-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === "svg") {
      // SVGとしてダウンロード
      const qrContent = buildQRContent();
      QRCode.toString(
        qrContent,
        {
          errorCorrectionLevel: settings.errorCorrectionLevel,
          margin: settings.margin,
          type: "svg",
          color: {
            dark: settings.color,
            light: settings.backgroundColor,
          },
        },
        (err, string) => {
          if (err) {
            console.error("SVG生成に失敗しました:", err);
            return;
          }

          const blob = new Blob([string], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `qrcode-${new Date().toISOString().slice(0, 10)}.svg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      );
    }
  };

  // 設定の変更
  const handleSettingChange = (key: keyof QRSettings, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-10/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">QRコードジェネレーター</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            テキスト、URL、連絡先情報などからQRコードを簡単に生成できます
          </p>
        </header>

        {/* 全体レイアウトを変更 - 上下に分割 */}
        <div className="flex flex-col space-y-6 mb-8">
          {/* 入力フォームと生成結果を上下に配置 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 入力エリア - 左側 2/3 */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                QRコード情報
              </h2>

              <div className="mb-4">
                <label htmlFor="qrType" className="block font-medium mb-2">
                  タイプ
                </label>
                <select
                  id="qrType"
                  value={qrType}
                  onChange={(e) => setQrType(e.target.value as QRTypeOption)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="text">テキスト</option>
                  <option value="url">URL</option>
                  <option value="email">メールアドレス</option>
                  <option value="tel">電話番号</option>
                  <option value="sms">SMS</option>
                  <option value="wifi">Wi-Fi</option>
                  <option value="vcard">連絡先</option>
                </select>
              </div>

              {/* QRコードタイプに応じたフォーム */}
              <div className="overflow-y-auto max-h-96 pr-2">
                {qrType === "text" && (
                  <div className="mb-4">
                    <label htmlFor="content" className="block font-medium mb-2">
                      テキスト
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="QRコードに埋め込むテキストを入力"
                    ></textarea>
                  </div>
                )}

                {qrType === "url" && (
                  <div className="mb-4">
                    <label htmlFor="url" className="block font-medium mb-2">
                      URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {qrType === "email" && (
                  <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="example@example.com"
                    />
                  </div>
                )}

                {qrType === "tel" && (
                  <div className="mb-4">
                    <label htmlFor="tel" className="block font-medium mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="tel"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="+81901234567"
                    />
                  </div>
                )}

                {qrType === "sms" && (
                  <div className="mb-4">
                    <label htmlFor="sms" className="block font-medium mb-2">
                      SMS送信先
                    </label>
                    <input
                      type="tel"
                      id="sms"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      placeholder="+81901234567"
                    />
                  </div>
                )}

                {qrType === "wifi" && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="ssid" className="block font-medium mb-2">
                        ネットワーク名 (SSID)
                      </label>
                      <input
                        type="text"
                        id="ssid"
                        value={ssid}
                        onChange={(e) => setSsid(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="WiFiネットワーク名"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block font-medium mb-2"
                      >
                        パスワード
                      </label>
                      <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="WiFiパスワード"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="encryption"
                        className="block font-medium mb-2"
                      >
                        暗号化タイプ
                      </label>
                      <select
                        id="encryption"
                        value={encryption}
                        onChange={(e) => setEncryption(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">暗号化なし</option>
                      </select>
                    </div>

                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        id="hidden"
                        checked={hidden}
                        onChange={(e) => setHidden(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor="hidden">非公開ネットワーク</label>
                    </div>
                  </>
                )}

                {qrType === "vcard" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block font-medium mb-2"
                        >
                          姓
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                          placeholder="山田"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="firstName"
                          className="block font-medium mb-2"
                        >
                          名
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                          placeholder="太郎"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="company"
                        className="block font-medium mb-2"
                      >
                        会社名
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="サンプル株式会社"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="title" className="block font-medium mb-2">
                        役職
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="部長"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contactEmail"
                        className="block font-medium mb-2"
                      >
                        メールアドレス
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="taro.yamada@example.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="contactPhone"
                        className="block font-medium mb-2"
                      >
                        電話番号
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="+81901234567"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="website"
                        className="block font-medium mb-2"
                      >
                        ウェブサイト
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block font-medium mb-2"
                      >
                        住所
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        placeholder="東京都千代田区1-1-1"
                      />
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={generateQRCode}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
              >
                QRコードを生成
              </button>
            </div>

            {/* QRコード表示エリア - 右側 1/3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                QRコード
              </h2>

              <div className="flex flex-col items-center mb-6">
                {qrCodeDataUrl ? (
                  <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
                    <img
                      src={qrCodeDataUrl}
                      alt="生成されたQRコード"
                      className="max-w-full"
                    />
                  </div>
                ) : (
                  <div
                    className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                    style={{
                      width: `${settings.size}px`,
                      height: `${settings.size}px`,
                    }}
                  >
                    {generationError ? (
                      <p className="text-red-500 dark:text-red-400 text-center">
                        {generationError}
                      </p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        QRコードが表示されます
                      </p>
                    )}
                  </div>
                )}

                {qrCodeDataUrl && (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => downloadQRCode("png")}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200 text-sm"
                    >
                      PNG形式でダウンロード
                    </button>
                    <button
                      onClick={() => downloadQRCode("svg")}
                      className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200 text-sm"
                    >
                      SVG形式でダウンロード
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 設定エリア - 下部に配置 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              QRコード設定
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label htmlFor="size" className="block text-sm mb-1">
                  サイズ ({settings.size}px)
                </label>
                <input
                  type="range"
                  id="size"
                  min="100"
                  max="500"
                  step="10"
                  value={settings.size}
                  onChange={(e) =>
                    handleSettingChange("size", Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="margin" className="block text-sm mb-1">
                  余白 ({settings.margin})
                </label>
                <input
                  type="range"
                  id="margin"
                  min="0"
                  max="10"
                  value={settings.margin}
                  onChange={(e) =>
                    handleSettingChange("margin", Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-sm mb-1">
                  前景色
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="color"
                    value={settings.color}
                    onChange={(e) =>
                      handleSettingChange("color", e.target.value)
                    }
                    className="w-8 h-8 rounded"
                  />
                  <input
                    type="text"
                    value={settings.color}
                    onChange={(e) =>
                      handleSettingChange("color", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="backgroundColor" className="block text-sm mb-1">
                  背景色
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="backgroundColor"
                    value={settings.backgroundColor}
                    onChange={(e) =>
                      handleSettingChange("backgroundColor", e.target.value)
                    }
                    className="w-8 h-8 rounded"
                  />
                  <input
                    type="text"
                    value={settings.backgroundColor}
                    onChange={(e) =>
                      handleSettingChange("backgroundColor", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label
                  htmlFor="errorCorrectionLevel"
                  className="block text-sm mb-1"
                >
                  誤り訂正レベル
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    id="errorCorrectionLevel"
                    value={settings.errorCorrectionLevel}
                    onChange={(e) =>
                      handleSettingChange(
                        "errorCorrectionLevel",
                        e.target.value
                      )
                    }
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
                  >
                    <option value="L">低 (7%)</option>
                    <option value="M">中 (15%)</option>
                    <option value="Q">標準 (25%)</option>
                    <option value="H">高 (30%)</option>
                  </select>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    誤り訂正レベルが高いほど、QRコードが損傷しても読み取り可能ですが、データ容量は減少します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 使い方 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">使い方</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              生成したいQRコードのタイプを選択します（テキスト、URL、連絡先など）
            </li>
            <li>必要な情報を入力フィールドに入力します</li>
            <li>「QRコードを生成」ボタンをクリックします</li>
            <li>
              必要に応じてQRコードの設定（サイズ、色、誤り訂正レベルなど）を調整できます
            </li>
            <li>生成されたQRコードはPNGまたはSVG形式でダウンロードできます</li>
            <li>
              QRコードはスマートフォンやQRコードリーダーで読み取ることができます
            </li>
          </ol>

          <div className="mt-4">
            <h3 className="font-medium mb-2">QRコードタイプ別の使用例</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                <strong>テキスト</strong>: メモ、メッセージ、パスワードなど
              </li>
              <li>
                <strong>URL</strong>:
                ウェブサイト、ブログ記事、SNSプロフィールなど
              </li>
              <li>
                <strong>メールアドレス</strong>:
                連絡先のメールアドレス（クリックするとメーラーが起動）
              </li>
              <li>
                <strong>電話番号</strong>:
                電話番号（クリックすると電話アプリが起動）
              </li>
              <li>
                <strong>SMS</strong>:
                SMS送信先の電話番号（クリックするとSMSアプリが起動）
              </li>
              <li>
                <strong>Wi-Fi</strong>:
                Wi-Fiネットワーク情報（読み取ると自動接続）
              </li>
              <li>
                <strong>連絡先</strong>: 名刺情報（読み取ると連絡先に追加可能）
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QrGeneratorClient;
