"""Encode the actual Chrome frames from record.cjs; no app assets are edited."""
import json
from pathlib import Path
from tempfile import gettempdir

from PIL import Image

frames_path = Path(gettempdir()) / "oomp-phase3-scroll-frames"
output = Path(__file__).resolve().parent.parent
frames = [Image.open(p).convert("RGB") for p in sorted(frames_path.glob("*.png"))]
assert len(frames) == 40
durations = [800] + [280] * 38 + [1120]
gif = output / "scroll-progression.gif"
frames[0].save(gif, save_all=True, append_images=frames[1:], duration=durations, loop=0, optimize=False)
report_path = output / "scroll-capture.json"
report = json.loads(report_path.read_text(encoding="utf-8"))
report["gif"] = {"file": gif.name, "frames": len(frames), "durationMs": sum(durations), "bytes": gif.stat().st_size}
report_path.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report["gif"]))
