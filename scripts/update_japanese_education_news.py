"""Publish recent Japanese-language education headlines for the site."""
import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

QUERY = '("日本語教育" OR "登録日本語教員" OR "日本語教員試験" OR "日本語教育機関" OR "外国人 日本語学習") when:30d'
FEED = "https://news.google.com/rss/search?" + urlencode(
    {"q": QUERY, "hl": "ja", "gl": "JP", "ceid": "JP:ja"}
)
TOPIC = re.compile(r"日本語教育|登録日本語教員|日本語教員試験|日本語学習|日本語教室|日本語指導")
OUTPUT = Path(__file__).resolve().parents[1] / "japanese-education-news.json"


def parse_feed(data, now):
    root = ET.fromstring(data)
    if root.find("channel") is None:
        raise ValueError("Missing RSS channel")
    articles = []
    for item in root.findall("./channel/item"):
        title = item.findtext("title", "").strip()
        source = item.findtext("source", "").strip()
        suffix = f" - {source}"
        if source and title.endswith(suffix):
            title = title[:-len(suffix)].strip()
        link = item.findtext("link", "").strip()
        url = urlsplit(link)
        if url.scheme != "https" or url.netloc != "news.google.com":
            continue
        if not TOPIC.search(title):
            continue
        try:
            published = parsedate_to_datetime(item.findtext("pubDate", ""))
        except (TypeError, ValueError):
            continue
        if published.tzinfo is None or not now - timedelta(days=30) <= published <= now:
            continue
        articles.append((published, title, source, link))

    results = []
    seen_links, seen_titles = set(), set()
    for published, title, source, link in sorted(articles, reverse=True):
        if link in seen_links or title in seen_titles:
            continue
        seen_links.add(link)
        seen_titles.add(title)
        results.append(dict(title=title, source=source, url=link, published=published.isoformat()))
        if len(results) == 8:
            break
    return results


def main():
    request = Request(FEED, headers={"User-Agent": "Japanese Education Site News Reader"})
    with urlopen(request, timeout=25) as response:
        data = response.read(2_000_000)
    now = datetime.now(timezone.utc)
    articles = parse_feed(data, now)
    snapshot = {"updated": now.isoformat(timespec="seconds"), "articles": articles}
    OUTPUT.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
