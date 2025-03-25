import { useState } from 'react';

const TABS = [
  { id: 1, label: 'ホーム', content: 'page1' },
  { id: 2, label: '現在地から探す', content: 'page2' },
  { id: 3, label: 'メニュー', content: 'page3' },
  { id: 4, label: 'その他/設定', content: 'page4' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col h-screen">
      {/* メイン表示エリア */}
      <div className="flex-1 flex items-center justify-center text-3xl">
        {TABS.find((tab) => tab.id === activeTab)?.content}
      </div>

      {/* ボトムメニュー */}
      <div className="flex border-t border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-2 text-sm ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
