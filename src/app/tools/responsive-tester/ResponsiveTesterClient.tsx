"use client";

import React, { useState, useRef } from "react";

// デバイスの型定義
interface Device {
  id: string;
  name: string;
  width: number;
  height: number;
  active: boolean;
  custom?: boolean;
}

// 新しいデバイスの型定義
interface NewDevice {
  name: string;
  width: number | string;
  height: number | string;
}

const ResponsiveTesterClient = () => {
  const [url, setUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([
    { id: "mobile", name: "モバイル", width: 375, height: 667, active: true },
    {
      id: "tablet",
      name: "タブレット",
      width: 768,
      height: 1024,
      active: true,
    },
    {
      id: "desktop",
      name: "デスクトップ",
      width: 1440,
      height: 900,
      active: true,
    },
  ]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );
  const [showSettings, setShowSettings] = useState(false);
  const [customDevices, setCustomDevices] = useState<Device[]>([]);
  const [newDevice, setNewDevice] = useState<NewDevice>({
    name: "",
    width: "",
    height: "",
  });
  const [zoomLevel, setZoomLevel] = useState(0.5);

  const iframesRef = useRef<(HTMLIFrameElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // URLの形式を確認
    let processedUrl = inputUrl.trim();
    if (
      !processedUrl.startsWith("http://") &&
      !processedUrl.startsWith("https://")
    ) {
      processedUrl = "https://" + processedUrl;
    }

    setUrl(processedUrl);
    setIsLoading(true);
  };

  const reloadFrames = () => {
    setIsLoading(true);

    // 少し遅延させてローディング状態を表示
    setTimeout(() => {
      iframesRef.current.forEach((iframe) => {
        if (iframe) {
          const currentSrc = iframe.src;
          iframe.src = "about:blank";
          setTimeout(() => {
            iframe.src = currentSrc;
          }, 50);
        }
      });
    }, 100);
  };

  const toggleDeviceActive = (id: string) => {
    setSelectedDevices(
      selectedDevices.map((device) =>
        device.id === id ? { ...device, active: !device.active } : device
      )
    );
  };

  const toggleOrientation = () => {
    setOrientation(orientation === "portrait" ? "landscape" : "portrait");
  };

  const addCustomDevice = () => {
    if (
      newDevice.name &&
      newDevice.width &&
      newDevice.height &&
      Number(newDevice.width) > 0 &&
      Number(newDevice.height) > 0
    ) {
      const device: Device = {
        id: `custom-${Date.now()}`,
        name: newDevice.name,
        width: Number(newDevice.width),
        height: Number(newDevice.height),
        active: true,
        custom: true,
      };

      setSelectedDevices([...selectedDevices, device]);
      setCustomDevices([...customDevices, device]);
      setNewDevice({ name: "", width: "", height: "" });
    }
  };

  const removeDevice = (id: string) => {
    setSelectedDevices(selectedDevices.filter((device) => device.id !== id));
    setCustomDevices(customDevices.filter((device) => device.id !== id));
  };

  const adjustZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoomLevel < 1.0) {
      setZoomLevel((prev) => Math.min(prev + 0.1, 1.0));
    } else if (direction === "out" && zoomLevel > 0.2) {
      setZoomLevel((prev) => Math.max(prev - 0.1, 0.2));
    }
  };

  // iframeのロード完了ハンドラ
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // デバイスのプレビュー幅/高さの計算
  const getDeviceDimensions = (device: Device) => {
    if (orientation === "portrait") {
      // 縦向き：元のままの寸法
      return {
        width: device.width,
        height: device.height,
      };
    } else {
      // 横向き：幅と高さを入れ替える
      return {
        width: device.height,
        height: device.width,
      };
    }
  };

  // モバイルとタブレットのみをフィルタリング
  const mobileTabletDevices = selectedDevices.filter(
    (device) =>
      device.active &&
      (device.id === "mobile" ||
        device.id === "tablet" ||
        (device.width < 1024 && device.custom))
  );

  // デスクトップデバイスのみをフィルタリング
  const desktopDevices = selectedDevices.filter(
    (device) =>
      device.active &&
      (device.id === "desktop" || (device.width >= 1024 && device.custom))
  );

  return (
    <main className="container mx-auto w-full mt-14 px-4 md:px-8 lg:px-16">
      <div className="mx-auto lg:w-11/12">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4">
            レスポンシブデザインテスター
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            異なるデバイスサイズでWebサイトの表示を同時に確認できます
          </p>
        </header>

        <div className="mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="URLを入力 (例: example.com)"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
            >
              テスト
            </button>
            <button
              type="button"
              onClick={reloadFrames}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded flex items-center justify-center"
              disabled={!url}
            >
              再読込
            </button>
            <button
              type="button"
              onClick={toggleOrientation}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              disabled={!url}
            >
              {orientation === "portrait" ? "縦向き" : "横向き"}
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded flex items-center justify-center"
            >
              設定
            </button>
          </form>
        </div>

        {showSettings && (
          <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold mb-3">デバイス設定</h3>

            <div className="mb-4">
              <div className="font-medium mb-2">表示するデバイス</div>
              <div className="flex flex-wrap gap-2">
                {selectedDevices.map((device) => (
                  <div key={device.id} className="flex items-center">
                    <button
                      onClick={() => toggleDeviceActive(device.id)}
                      className={`px-3 py-1 rounded-lg flex items-center text-sm ${
                        device.active
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                      }`}
                    >
                      {device.name} ({device.width}x{device.height})
                    </button>
                    {device.custom && (
                      <button
                        onClick={() => removeDevice(device.id)}
                        className="ml-1 p-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-medium mb-2">カスタムデバイスを追加</div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="デバイス名"
                  value={newDevice.name}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, name: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-sm w-32"
                />
                <input
                  type="number"
                  placeholder="幅 (px)"
                  value={newDevice.width}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, width: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-sm w-24"
                  min="1"
                />
                <input
                  type="number"
                  placeholder="高さ (px)"
                  value={newDevice.height}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, height: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-sm w-24"
                  min="1"
                />
                <button
                  onClick={addCustomDevice}
                  className="px-3 py-2 bg-blue-500 text-white rounded text-sm"
                  disabled={
                    !newDevice.name || !newDevice.width || !newDevice.height
                  }
                >
                  追加
                </button>
              </div>
            </div>

            <div className="mb-2">
              <div className="font-medium mb-2">
                ズーム: {Math.round(zoomLevel * 100)}%
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => adjustZoom("out")}
                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded-l"
                  disabled={zoomLevel <= 0.2}
                >
                  −
                </button>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 h-8 relative">
                  <div
                    className="absolute h-full bg-blue-400 dark:bg-blue-600"
                    style={{ width: `${((zoomLevel - 0.2) / 0.8) * 100}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => adjustZoom("in")}
                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded-r"
                  disabled={zoomLevel >= 1.0}
                >
                  ＋
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-4">
              <p>
                <strong>縦向き/横向きについて：</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>
                  縦向きモード：すべてのデバイスが通常の向きで表示されます（モバイル・タブレットは縦長、デスクトップは横長）
                </li>
                <li>
                  横向きモード：デバイスの幅と高さが入れ替わります（モバイル・タブレットは横長になります）
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mb-4 flex justify-between items-center">
          <div>
            {url && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                表示中:{" "}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url}
                </a>
              </span>
            )}
          </div>
          {(mobileTabletDevices.length > 0 || desktopDevices.length > 0) &&
            url && (
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400 mr-2">
                  ズーム: {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => adjustZoom("out")}
                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded mr-1"
                  disabled={zoomLevel <= 0.2}
                >
                  −
                </button>
                <button
                  onClick={() => adjustZoom("in")}
                  className="p-1 bg-gray-200 dark:bg-gray-700 rounded"
                  disabled={zoomLevel >= 1.0}
                >
                  ＋
                </button>
              </div>
            )}
        </div>

        {mobileTabletDevices.length === 0 && desktopDevices.length === 0 ? (
          <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              表示するデバイスが選択されていません。設定から少なくとも1つのデバイスを選択してください。
            </p>
          </div>
        ) : !url ? (
          <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              URLを入力して「テスト」ボタンをクリックしてください。
            </p>
          </div>
        ) : (
          <div>
            {/* モバイルとタブレットの行 */}
            {mobileTabletDevices.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4 border-b pb-2">
                  モバイル / タブレット
                </h3>
                <div className="flex flex-wrap justify-center -mx-2">
                  {mobileTabletDevices.map((device, index) => {
                    const dimensions = getDeviceDimensions(device);
                    return (
                      <div
                        key={device.id}
                        className={`px-2 mb-6 ${
                          mobileTabletDevices.length === 1
                            ? "w-full md:w-1/2 lg:w-1/3"
                            : "w-full md:w-1/2"
                        }`}
                      >
                        <div className="mb-2 text-center">
                          <div className="text-sm font-medium">
                            {device.name} ({dimensions.width}x
                            {dimensions.height})
                          </div>
                        </div>
                        <div
                          className="mx-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white"
                          style={{
                            width: `${dimensions.width * zoomLevel}px`,
                            height: `${dimensions.height * zoomLevel}px`,
                          }}
                        >
                          {isLoading && (
                            <div className="flex justify-center items-center h-full">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                          )}
                          <iframe
                            ref={(el) => {
                              iframesRef.current[index] = el;
                            }}
                            src={url}
                            title={`${device.name} Preview`}
                            className="border-0 w-full h-full transform origin-top-left"
                            style={{
                              visibility: isLoading ? "hidden" : "visible",
                              width: `${dimensions.width}px`,
                              height: `${dimensions.height}px`,
                              transform: `scale(${zoomLevel})`,
                            }}
                            onLoad={handleIframeLoad}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          ></iframe>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* デスクトップの行 */}
            {desktopDevices.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4 border-b pb-2">
                  デスクトップ / ラージスクリーン
                </h3>
                <div className="flex flex-wrap justify-center -mx-2">
                  {desktopDevices.map((device, index) => {
                    const dimensions = getDeviceDimensions(device);
                    // インデックスをオフセットする（mobileTabletDevicesの後に続けるため）
                    const frameIndex = mobileTabletDevices.length + index;

                    return (
                      <div key={device.id} className="px-2 mb-6 w-full">
                        <div className="mb-2 text-center">
                          <div className="text-sm font-medium">
                            {device.name} ({dimensions.width}x
                            {dimensions.height})
                          </div>
                        </div>
                        <div
                          className="mx-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white"
                          style={{
                            width: `${dimensions.width * zoomLevel}px`,
                            height: `${dimensions.height * zoomLevel}px`,
                            maxWidth: "100%",
                          }}
                        >
                          {isLoading && (
                            <div className="flex justify-center items-center h-full">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                          )}
                          <iframe
                            ref={(el) => {
                              iframesRef.current[frameIndex] = el;
                            }}
                            src={url}
                            title={`${device.name} Preview`}
                            className="border-0 w-full h-full transform origin-top-left"
                            style={{
                              visibility: isLoading ? "hidden" : "visible",
                              width: `${dimensions.width}px`,
                              height: `${dimensions.height}px`,
                              transform: `scale(${zoomLevel})`,
                            }}
                            onLoad={handleIframeLoad}
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          ></iframe>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="font-semibold mb-2">使い方のヒント</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              確認したいウェブサイトのURLを入力し、「テスト」ボタンをクリックします
            </li>
            <li>
              「設定」からデバイスの表示/非表示を切り替えたり、カスタムデバイスを追加できます
            </li>
            <li>
              <strong>縦向き</strong>
              ：通常のデバイス表示（モバイルは縦長、デスクトップは横長）
            </li>
            <li>
              <strong>横向き</strong>
              ：デバイスを90度回転させた表示（モバイルが横長になるなど）
            </li>
            <li>ズームコントロールでプレビューのサイズを調整できます</li>
            <li>
              一度に多くのデバイスを表示すると重なることがあるため、必要なデバイスだけを選択すると見やすくなります
            </li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">注意事項:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              一部のウェブサイトでは、セキュリティ上の理由からiframe内での表示が禁止されている場合があります
            </li>
            <li>ログインが必要なページは正しく表示されない場合があります</li>
            <li>
              このツールは実際のデバイスでの表示を完全に再現するものではありません
            </li>
            <li>
              本ツールはクライアントサイドで動作し、URLやデータはサーバーに送信されません
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ResponsiveTesterClient;
