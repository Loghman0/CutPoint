import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star } from 'lucide-react';
import { Badge, Button, EmptyState, Panel } from './ui/primitives';

export const AssetsMarketplaceView: React.FC = () => {
  const { addToast, marketplaceAssets } = useApp();

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="bg-paper-50/60 border-b border-ink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-900 tracking-tight">
            LUTs, transitions, and templates
          </h1>
          <p className="text-ink-500 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            Created by top editors on CutPoint. Elevate your editing workflow with professional
            After Effects, Premiere, and DaVinci asset packs.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {marketplaceAssets.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-5 h-5" />}
            title="No assets listed yet"
            description="Once editors start uploading LUTs, transitions, and templates, they will show up here."
          />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none">
            {marketplaceAssets.map((asset) => (
              <li key={asset.id}>
                <Panel hover className="p-5 flex flex-col justify-between group h-full">
                  <div>
                    <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-3 left-3">
                        <Badge tone="accent">{asset.category}</Badge>
                      </span>
                    </div>

                    <h2 className="font-bold text-ink-900 text-base leading-snug">{asset.title}</h2>
                    <p className="text-xs text-ink-400 mt-1">by @{asset.editor.username}</p>

                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 text-signal-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-signal-600" aria-hidden="true" />
                        <span className="sr-only">Rating:</span>
                        {asset.rating}
                      </span>
                      <span className="text-ink-300">({asset.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-ink-900 font-mono">${asset.price}</span>
                    <Button size="sm" onClick={() => addToast(`Downloaded ${asset.title}`)}>
                      Download asset
                    </Button>
                  </div>
                </Panel>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
