from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "images"
OUTPUT = SOURCE / "previews"


def convert(source: Path, target: Path, max_size: tuple[int, int], quality: int) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=quality, method=6)


def main() -> None:
    for folder in ("ppt-01", "ppt-02"):
        for source in sorted((SOURCE / "ppt" / folder).glob("*.jpg")):
            convert(source, OUTPUT / folder / f"{source.stem}.webp", (1280, 1280), 78)

    for source in sorted((SOURCE / "xiaohongshu").glob("*.jpg")):
        convert(source, OUTPUT / "xiaohongshu" / f"{source.stem}.webp", (720, 720), 80)


if __name__ == "__main__":
    main()
