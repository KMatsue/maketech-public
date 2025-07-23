"use client";

import React, { useState, useEffect, useCallback } from "react";

// タイムゾーンの定義
const TIMEZONES = [
  { label: "UTC", value: "UTC" },
  { label: "JST (日本)", value: "Asia/Tokyo" },
  { label: "EST (東部)", value: "America/New_York" },
  { label: "PST (太平洋)", value: "America/Los_Angeles" },
  { label: "GMT (グリニッジ)", value: "Europe/London" },
  { label: "CET (中央欧州)", value: "Europe/Paris" },
  { label: "CST (中国)", value: "Asia/Shanghai" },
  { label: "KST (韓国)", value: "Asia/Seoul" },
];

const UnixConverterClient = () => {
  // 状態管理
  const [currentUnix, setCurrentUnix] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [unixInput, setUnixInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] =
    useState<string>("Asia/Tokyo");
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  // マウント状態の管理
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 現在時刻の更新
  useEffect(() => {
    if (!isMounted) return;

    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentDate(now);
      setCurrentUnix(Math.floor(now.getTime() / 1000));
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, [isMounted]);

  // UNIXタイムスタンプを日時に変換
  const convertUnixToDate = useCallback((timestamp: string) => {
    if (!timestamp.trim()) {
      return null;
    }

    const num = parseInt(timestamp);
    if (isNaN(num)) {
      return null;
    }

    // 10桁（秒）または13桁（ミリ秒）の判定
    const isMilliseconds = timestamp.length === 13;
    const date = isMilliseconds ? new Date(num) : new Date(num * 1000);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  }, []);

  // 日時をUNIXタイムスタンプに変換
  const convertDateToUnix = useCallback((dateStr: string) => {
    if (!dateStr.trim()) {
      return null;
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }

    return Math.floor(date.getTime() / 1000);
  }, []);

  // 日時をフォーマット
  const formatDate = useCallback((date: Date, timezone: string) => {
    return {
      iso: date.toISOString(),
      local: date.toLocaleString("ja-JP", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      utc: date.toUTCString(),
      timestamp: Math.floor(date.getTime() / 1000),
      timestampMs: date.getTime(),
    };
  }, []);

  // クリップボードにコピー
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${type}をコピーしました`);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("コピーに失敗しました");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  // UNIX入力の処理
  const handleUnixInput = (value: string) => {
    setUnixInput(value);
    setInputError("");

    if (!value.trim()) {
      return;
    }

    const converted = convertUnixToDate(value);
    if (!converted) {
      setInputError(
        "有効なUNIXタイムスタンプを入力してください（10桁または13桁）"
      );
    }
  };

  // 日時入力の処理
  const handleDateInput = (value: string) => {
    setDateInput(value);
    setInputError("");

    if (!value.trim()) {
      return;
    }

    const converted = convertDateToUnix(value);
    if (converted === null) {
      setInputError("有効な日時を入力してください（例: 2024-01-01 12:00:00）");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            UNIXタイムスタンプ変換ツール
          </h1>
          <p className="text-muted-foreground">
            UNIXタイムスタンプとわかりやすい日時形式を相互変換できるツールです
          </p>
        </div>

        {/* エラーメッセージ */}
        {inputError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm">{inputError}</p>
          </div>
        )}

        {/* コピー成功メッセージ */}
        {copySuccess && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-700">
            <p className="text-green-700 dark:text-green-300 text-sm">
              {copySuccess}
            </p>
          </div>
        )}

        {/* 現在時刻表示 */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            現在時刻
          </h2>
          {!isMounted ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">UNIX (秒):</span>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {currentUnix}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(currentUnix.toString(), "UNIX時刻")
                      }
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
                    >
                      コピー
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">UNIX (ミリ秒):</span>
                  <div className="flex items-center space-x-2">
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {currentDate.getTime()}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          currentDate.getTime().toString(),
                          "UNIX時刻(ms)"
                        )
                      }
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
                    >
                      コピー
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">JST: </span>
                  <span className="text-foreground">
                    {currentDate.toLocaleString("ja-JP", {
                      timeZone: "Asia/Tokyo",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">UTC: </span>
                  <span className="text-foreground">
                    {currentDate.toUTCString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* UNIX → 日時変換 */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            UNIX → 日時
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={unixInput}
                onChange={(e) => handleUnixInput(e.target.value)}
                placeholder="1640995200 (10桁) または 1640995200000 (13桁)"
                className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            {unixInput && convertUnixToDate(unixInput) && (
              <div className="space-y-3">
                {(() => {
                  const date = convertUnixToDate(unixInput)!;
                  const formatted = formatDate(date, selectedTimezone);
                  return (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground">ISO: </span>
                          <code className="text-foreground">
                            {formatted.iso}
                          </code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">UTC: </span>
                          <code className="text-foreground">
                            {formatted.utc}
                          </code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {
                              TIMEZONES.find(
                                (tz) => tz.value === selectedTimezone
                              )?.label
                            }
                            :
                          </span>
                          <code className="text-foreground ml-1">
                            {formatted.local}
                          </code>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* 日時 → UNIX変換 */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            日時 → UNIX
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={dateInput}
                onChange={(e) => handleDateInput(e.target.value)}
                placeholder="2024-01-01 12:00:00 または 2024-01-01T12:00:00Z"
                className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            {dateInput && convertDateToUnix(dateInput) !== null && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">UNIX (秒):</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {convertDateToUnix(dateInput)}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            convertDateToUnix(dateInput)!.toString(),
                            "UNIX時刻"
                          )
                        }
                        className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
                      >
                        コピー
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      UNIX (ミリ秒):
                    </span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {convertDateToUnix(dateInput)! * 1000}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            (convertDateToUnix(dateInput)! * 1000).toString(),
                            "UNIX時刻(ms)"
                          )
                        }
                        className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
                      >
                        コピー
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* タイムゾーン設定 */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            タイムゾーン設定
          </h2>
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="w-full px-3 py-2 border border-border-primary rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* 使用方法 */}
        <div className="bg-info-bg border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            使用方法
          </h2>
          <div className="text-info-text space-y-2 text-sm">
            <p>
              • <strong>現在時刻</strong>:
              リアルタイムで更新される現在のUNIXタイムスタンプを表示
            </p>
            <p>
              • <strong>UNIX → 日時</strong>:
              10桁（秒）または13桁（ミリ秒）のタイムスタンプを入力
            </p>
            <p>
              • <strong>日時 → UNIX</strong>: &ldquo;2024-01-01 12:00:00&rdquo;
              形式で日時を入力
            </p>
            <p>
              • <strong>タイムゾーン</strong>:
              表示する地域のタイムゾーンを選択可能
            </p>
            <p>
              • <strong>コピー</strong>:
              各値をワンクリックでクリップボードにコピー
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnixConverterClient;
