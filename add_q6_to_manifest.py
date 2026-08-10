#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
n1_listening_manifest.json に「音声の特徴」40問（n1_q6_01〜40）を書き足す。

つかいかた:
    python add_q6_to_manifest.py

このスクリプトと n1_listening_manifest_q6.json を
n1_listening_manifest.json と同じフォルダ（JLPT PRACTICE）に置いて実行してください。

・既存の221問には一切さわりません（署名が変わらないので音声も作り直されません）。
・実行前に n1_listening_manifest.json.bak を作ります。
・すでに q6 の項目があれば入れ替えます（二重登録になりません）。
・既存ファイルの形をその場で読み取って、同じ形で書き足します。
  形が読み取れないときは、何も書かずに止まります。
"""
import json, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, 'n1_listening_manifest.json')
NEW = os.path.join(HERE, 'n1_listening_manifest_q6.json')
FILE_RE = re.compile(r'(?:audio/)?n1_q[1-6]_\d{2}\.mp3$')


def die(msg):
    print('\n[中止] ' + msg)
    print('マニフェストは変更していません。')
    print('この画面をそのまま知らせてください。')
    sys.exit(1)


def find_file_key(entry):
    for k, v in entry.items():
        if isinstance(v, str) and FILE_RE.search(v):
            return k
    return None


def find_seg_key(entry):
    for k, v in entry.items():
        if isinstance(v, list) and v and isinstance(v[0], dict):
            return k
    return None


def find_sub_keys(seg):
    """セグメント1つから「話者」「本文」のキー名を推定する"""
    spk = txt = None
    for k, v in seg.items():
        if not isinstance(v, str):
            continue
        if v in ('N', 'F', 'M', 'F2', 'M2') and spk is None:
            spk = k
        elif len(v) > 3 and txt is None:
            txt = k
    return spk, txt


def main():
    if not os.path.exists(MANIFEST):
        die('n1_listening_manifest.json が見つかりません。'
            'このスクリプトを JLPT PRACTICE フォルダに置いて実行してください。')
    if not os.path.exists(NEW):
        die('n1_listening_manifest_q6.json が見つかりません。ZIPの中の1つです。')

    man = json.load(open(MANIFEST, encoding='utf-8'))
    add = json.load(open(NEW, encoding='utf-8'))

    # ── 既存の形を読み取る ─────────────────────────────
    if isinstance(man, list):
        container, entries = 'list', man
    elif isinstance(man, dict):
        listkey = None
        for k, v in man.items():
            if isinstance(v, list) and v and isinstance(v[0], dict):
                listkey = k
                break
        if listkey:
            container, entries = 'dictlist', man[listkey]
        else:
            container, entries = 'dictmap', list(man.values())
    else:
        die('マニフェストの形が想定外です（配列でも辞書でもありません）。')

    if not entries or not isinstance(entries[0], dict):
        die('マニフェストの中身が読み取れませんでした。')

    sample = entries[0]
    fkey = find_file_key(sample)
    skey = find_seg_key(sample)
    if not fkey or not skey:
        die('マニフェストの項目から「ファイル名」「セグメント」の欄が見つかりませんでした。\n'
            '見つかった欄: ' + ', '.join(sample.keys()))
    spk, txt = find_sub_keys(sample[skey][0])
    if not spk or not txt:
        die('セグメントから「話者」「本文」の欄が見つかりませんでした。\n'
            '見つかった欄: ' + ', '.join(sample[skey][0].keys()))

    has_prefix = sample[fkey].startswith('audio/')
    extra = {k: v for k, v in sample.items() if k not in (fkey, skey)}
    print('読み取った形:')
    print('  ファイル名の欄 :', fkey, '（', sample[fkey], '）')
    print('  セグメントの欄 :', skey, '／ 話者=', spk, ' 本文=', txt)
    if extra:
        print('  そのほかの欄   :', ', '.join(extra.keys()), '→ 新しい項目にも同じ欄を作ります')

    # ── 既存の q6 を取り除く ───────────────────────────
    def is_q6(e):
        return isinstance(e, dict) and isinstance(e.get(fkey), str) and 'n1_q6_' in e[fkey]

    before = len(entries)
    kept = [e for e in entries if not is_q6(e)]
    removed = before - len(kept)

    # ── 新しい40件を同じ形で作る ───────────────────────
    made = []
    for a in add:
        e = {}
        for k in sample.keys():
            if k == fkey:
                e[k] = a['file'] if has_prefix else a['file'].replace('audio/', '')
            elif k == skey:
                e[k] = [{spk: s['speaker'], txt: s['text']} for s in a['segments']]
            else:
                # 声の設定など、全項目で共通の欄はそのまま写す
                e[k] = sample[k]
        made.append(e)

    out = kept + made

    # ── 書き戻す ───────────────────────────────────
    shutil.copy2(MANIFEST, MANIFEST + '.bak')
    if container == 'list':
        newman = out
    elif container == 'dictlist':
        newman = dict(man)
        newman[listkey] = out
    else:
        newman = {}
        for e in out:
            key = e[fkey]
            newman[key] = e
    json.dump(newman, open(MANIFEST, 'w', encoding='utf-8'),
              ensure_ascii=False, indent=1)

    print()
    print('できました。')
    print('  もとの項目数 :', before)
    print('  取り除いた q6:', removed)
    print('  足した q6    :', len(made))
    print('  いまの項目数 :', len(out))
    print('  控え         : n1_listening_manifest.json.bak')
    print()
    print('このあと make_n1_listening_audio.bat を実行してください。')
    print('★ 新しく作られる音声が 40 本だけであることを確かめてください。')
    print('  40本より多いときは、いったん止めて知らせてください。')


if __name__ == '__main__':
    main()
